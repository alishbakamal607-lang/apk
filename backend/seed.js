const mongoose = require("mongoose");
const dotenv = require("dotenv");
const MenuItem = require("./models/MenuItem");

dotenv.config();

const uri = process.env.MONGODB_URI || "mongodb+srv://janjuatariq7614_db_user:tyfrkGJP0uB9oaOz@coffee-shop.3xuvmty.mongodb.net/?appName=coffee-shop";

const sampleItems = [
  { name: "Espresso", category: "Hot Drinks", price: 800.50 },
  { name: "Cappuccino", category: "Hot Drinks", price: 550.50 },
  { name: "Latte", category: "Hot Drinks", price: 900.00 },
  { name: "Iced Coffee", category: "Cold Drinks", price: 800.00 },
  { name: "Croissant", category: "Pastries", price: 700.50 },
  { name: "Muffin", category: "Pastries", price: 400.00, inStock: false }
];

mongoose.connect(uri)
  .then(async () => {
    console.log("✅ Connected to MongoDB for seeding");
    await MenuItem.deleteMany({});
    await MenuItem.insertMany(sampleItems);
    console.log("🌱 Sample data inserted successfully!");
    process.exit();
  })
  .catch(err => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  });
