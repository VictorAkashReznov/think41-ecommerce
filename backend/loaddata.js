const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const csv = require("csv-parser");
const {
  DistributionCenter,
  InventoryItem,
  OrderItem,
  Order,
  Department,
  Product,
  User,
} = require("./db"); // assumes db.js is in the same directory

// MongoDB connection (only connect if not already connected)
if (mongoose.connection.readyState === 0) {
  mongoose.connect("mongodb://127.0.0.1:27017/ecommerce").then(() => {
    console.log("Connected to MongoDB from loaddata");
  });
}

// CSV Loader Function
function loadCSVToDB(filePath, Model) {
  return new Promise((resolve, reject) => {
    const records = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => records.push(data))
      .on("end", async () => {
        try {
          await Model.insertMany(records, { ordered: false });
          console.log(
            `Loaded ${records.length} records from ${path.basename(filePath)}`
          );
          resolve();
        } catch (err) {
          console.error(
            ` Error loading ${path.basename(filePath)}:`,
            err.message
          );
          reject(err);
        }
      });
  });
}

// Specialized function for loading products with department relationships
async function loadProductsWithDepartments(filePath) {
  return new Promise((resolve, reject) => {
    const records = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => records.push(data))
      .on("end", async () => {
        try {
          console.log(`Processing ${records.length} product records...`);

          // First, extract unique departments and create them
          const uniqueDepartments = [
            ...new Set(
              records
                .map((record) => record.department)
                .filter((dept) => dept && dept.trim())
            ),
          ];

          console.log(`Found ${uniqueDepartments.length} unique departments`);

          // Create department documents
          const departmentDocs = uniqueDepartments.map((dept, index) => ({
            id: `dept_${index + 1}`,
            name: dept.trim(),
            created_at: new Date(),
          }));

          // Insert departments (handle duplicates gracefully)
          let departments = [];
          try {
            departments = await Department.insertMany(departmentDocs, {
              ordered: false,
            });
            console.log(`Created ${departments.length} new departments`);
          } catch (error) {
            if (error.code === 11000) {
              console.log(
                "Some departments already exist, fetching all departments..."
              );
              departments = await Department.find({});
            } else {
              throw error;
            }
          }

          // Create department mapping
          const departmentMap = {};
          departments.forEach((dept) => {
            departmentMap[dept.name] = dept.id;
          });

          // Process product records to add department_id
          const processedRecords = records.map((record) => {
            const processed = { ...record };
            if (record.department && departmentMap[record.department.trim()]) {
              processed.department_id = departmentMap[record.department.trim()];
            }
            return processed;
          });

          // Insert products
          await Product.insertMany(processedRecords, { ordered: false });
          console.log(
            `Loaded ${processedRecords.length} products with department relationships`
          );

          resolve();
        } catch (err) {
          console.error(`Error loading products:`, err.message);
          reject(err);
        }
      });
  });
}

// Load all CSVs
async function loadAllCSVs() {
  try {
    await loadCSVToDB(
      "../archive/distribution_centers.csv",
      DistributionCenter
    );
    await loadCSVToDB("../archive/inventory_items.csv", InventoryItem);
    await loadCSVToDB("../archive/order_items.csv", OrderItem);
    await loadCSVToDB("../archive/orders.csv", Order);

    // Use specialized function for products to handle department relationships
    await loadProductsWithDepartments("../archive/products.csv");

    await loadCSVToDB("../archive/users.csv", User);
    console.log(" All data loaded successfully!");
    // Don't disconnect when called from API - let the main server manage the connection
  } catch (err) {
    console.error("Failed to load all data:", err);
    // Don't disconnect on error either - let the main server handle it
  }
}

module.exports = loadAllCSVs;
