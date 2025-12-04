const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const MenuItem = require("./models/MenuItem");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;
const uri = process.env.MONGODB_URI || "mongodb+srv://janjuatariq7614_db_user:tyfrkGJP0uB9oaOz@coffee-shop.3xuvmty.mongodb.net/?appName=coffee-shop";

mongoose.connect(uri)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err.message));

app.get("/menu", async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch menu", error: err.message });
  }
});

app.get("/menu/random", async (req, res) => {
  try {
    const [item] = await MenuItem.aggregate([
      { $match: { inStock: true } },
      { $sample: { size: 1 } }
    ]);
    if (!item) return res.status(404).json({ success: false, message: "No in-stock item found" });
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch random item", error: err.message });
  }
});

module.exports=app;
