const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// Initialize express app
const app = express();
const apiRoute = require("./routes/api.route");

app.use(express.json());
app.use(cors());
// Connect to MongoDB

app.use("/api", apiRoute);

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});

//
