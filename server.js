require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected!"))
  .catch(err => console.error("❌ Connection Error:", err));

// Structure
const Product = mongoose.model("Product", new mongoose.Schema({
    name: String, price: Number, image: String
}));

// Routes
app.get("/products", async (req, res) => {
    try { res.json(await Product.find()); } catch (e) { res.status(500).send(e.message); }
});

app.post("/products", async (req, res) => {
    try { res.status(201).json(await new Product(req.body).save()); } catch (e) { res.status(400).send(e.message); }
});

app.get("/", (req, res) => res.send("Oasis Server is Running! 🔥"));

app.listen(process.env.PORT || 5000);