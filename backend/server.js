const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const authenticateJWT = require("./middleware/authenticateJWT");
require("dotenv").config();

const app = express();

connectDB();

// ใช้ middleware สำหรับแปลงข้อมูล JSON
app.use(express.json());

// Middleware for JSON parsing
app.use(cors()); // Enable CORS

// เชื่อมต่อเส้นทาง API ของ Animal
const animalRoutes = require("./routes/animalRoutes");
const authRoutes = require("./routes/auth");
app.use("/api/animals", animalRoutes);
app.use("/api/auth", authRoutes);


// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
  });

  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
