const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// Initialize express app
const app = express();

app.use(express.json());
app.use(cors());
// Connect to MongoDB
connectionString =
  "mongodb+srv://mongo2024:mongo2024@cluster0.yvsdl.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce";
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});

//
