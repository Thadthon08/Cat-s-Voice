const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

connectDB();

// ใช้ middleware สำหรับแปลงข้อมูล JSON
app.use(express.json());

// เชื่อมต่อเส้นทาง API ของ Animal
const animalRoutes = require("./routes/animalRoutes");
app.use("/api/animals", animalRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
