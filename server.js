require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected!"))
  .catch(err => console.error("❌ Connection Error:", err));

app.get("/", (req, res) => res.send("Oasis Server Active! 🔥"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Port: ${PORT}`));