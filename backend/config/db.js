const mongoose = require("mongoose");

// โหลดตัวแปรสภาพแวดล้อมจากไฟล์ .env
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // ออกจากโปรเซสด้วยข้อผิดพลาด
  }
};

module.exports = connectDB;
