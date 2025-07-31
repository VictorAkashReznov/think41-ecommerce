const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const csv = require("csv-parser");
const {
  DistributionCenter,
  InventoryItem,
  OrderItem,
  Order,
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
    await loadCSVToDB("../archive/products.csv", Product);
    await loadCSVToDB("../archive/users.csv", User);
    console.log(" All data loaded successfully!");
    // Don't disconnect when called from API - let the main server manage the connection
  } catch (err) {
    console.error("Failed to load all data:", err);
    // Don't disconnect on error either - let the main server handle it
  }
}

module.exports = loadAllCSVs;
