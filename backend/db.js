// db.js
const mongoose = require("mongoose");

// 1. Distribution Center Schema
const distributionCenterSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  name: String,
  latitude: Number,
  longitude: Number,
});

// 2. Inventory Item Schema
const inventoryItemSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  product_id: String,
  created_at: Date,
  sold_at: Date,
  cost: Number,
  product_category: String,
  product_name: String,
  product_brand: String,
  product_retail_price: Number,
  product_department: String,
  product_sku: String,
  product_distribution_center_id: String,
});

// 3. Order Item Schema
const orderItemSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  order_id: String,
  user_id: String,
  product_id: String,
  inventory_item_id: String,
  status: String,
  created_at: Date,
  shipped_at: Date,
  delivered_at: Date,
  returned_at: Date,
});

// 4. Order Schema
const orderSchema = new mongoose.Schema({
  order_id: { type: String, unique: true },
  user_id: String,
  status: String,
  gender: String,
  created_at: Date,
  returned_at: Date,
  shipped_at: Date,
  delivered_at: Date,
  num_of_item: Number,
});

// 5. Department Schema
const departmentSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  name: { type: String, required: true, unique: true },
  created_at: { type: Date, default: Date.now },
});

// 6. Product Schema (updated with department_id reference)
const productSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  cost: Number,
  category: String,
  name: String,
  brand: String,
  retail_price: Number,
  department_id: { type: String },
  // Keep the old department field temporarily for migration
  department: String,
  sku: String,
  distribution_center_id: String,
});

// 7. User Schema
const userSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  first_name: String,
  last_name: String,
  email: String,
  age: Number,
  gender: String,
  state: String,
  street_address: String,
  postal_code: String,
  city: String,
  country: String,
  latitude: Number,
  longitude: Number,
  traffic_source: String,
  created_at: Date,
});

module.exports = {
  DistributionCenter: mongoose.model(
    "DistributionCenter",
    distributionCenterSchema
  ),
  InventoryItem: mongoose.model("InventoryItem", inventoryItemSchema),
  OrderItem: mongoose.model("OrderItem", orderItemSchema),
  Order: mongoose.model("Order", orderSchema),
  Department: mongoose.model("Department", departmentSchema),
  Product: mongoose.model("Product", productSchema),
  User: mongoose.model("User", userSchema),
};
