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

// MongoDB connection
mongoose.connect(
  "mongodb+srv://mongo2024:mongo2024@cluster0.yvsdl.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce"
);

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
    mongoose.disconnect();
  } catch (err) {
    console.error("Failed to load all data:", err);
    mongoose.disconnect();
  }
}

// loadAllCSVs();
