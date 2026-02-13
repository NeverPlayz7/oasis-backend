require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 1. Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected!"))
  .catch(err => console.error("❌ Connection Error:", err));

// 2. Product Schema (Database ka structure)
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String
});
const Product = mongoose.model("Product", productSchema);

// 3. GET Route (Products dikhane ke liye)
app.get("/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 4. POST Route (Naya product add karne ke liye)
app.post("/products", async (req, res) => {
    const newProduct = new Product(req.body);
    try {
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get("/", (req, res) => res.send("Oasis Server Active! 🔥"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Port: ${PORT}`));