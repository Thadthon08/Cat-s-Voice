const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const authenticateJWT = require("./middleware/authenticateJWT");
const animalRoutes = require("./routes/animalRoutes");
const authRoutes = require("./routes/auth");
const animalSpeciesRoutes = require("./routes/speciesRoute");
const healthRecordRoutes = require("./routes/HealthRecord");
const adopterRouter = require('./routes/adoptionRoute');
const donationRoutes = require('./routes/donationRoute');
const activity = require("./routes/activityRoute");

require("dotenv").config();

const app = express();

connectDB();

// ใช้ middleware สำหรับแปลงข้อมูล JSON
app.use(express.json({ limit: "10mb" })); // เพิ่มขนาด limit
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Middleware for JSON parsing
app.use(cors()); // Enable CORS

app.use("/uploads", express.static("uploads"));
// เชื่อมต่อเส้นทาง API ของ Animal
app.use("/api/animals", animalRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/species", animalSpeciesRoutes);
app.use("/api/HealthRecord", healthRecordRoutes);
// เชื่อมต่อเส้นทาง API ของ Adopter
app.use("/api/adoption", adopterRouter);
// เชื่อมต่อเส้นทาง API ของ Donations
app.use("/api/donations", donationRoutes);
// เชื่อมต่อเส้นทาง API ของ activity
app.use("/api/activities", activity);
// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
