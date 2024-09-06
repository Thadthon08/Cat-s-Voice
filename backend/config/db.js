require("dotenv").config(); // โหลดตัวแปรจากไฟล์ .env
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // ออกจากโปรแกรมเมื่อการเชื่อมต่อล้มเหลว
  }
};

module.exports = connectDB;
