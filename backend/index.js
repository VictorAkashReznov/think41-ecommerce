const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// Initialize express app
const app = express();
const apiRoute = require("./routes/api.route");
const loadAllCSVs = require("./loaddata");

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/ecommerce")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

app.use("/api", apiRoute);
app.get("/", async (req, res) => {
  await loadAllCSVs();
  res.send("data is loaded in db");
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});

//
