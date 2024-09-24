const express = require("express");
const router = express.Router();
const HealthRecordController = require("../controllers/HealthRecordController");
const authenticateJWT = require("../middleware/authenticateJWT");
// เส้นทา API สำหรับการจัดการข้อมูลการรับบริการสัตว์ป่วย

router.get("/", HealthRecordController.getAllHealthRecords);
router.get("/:id", HealthRecordController.getHealthRecordById);
router.post("/", authenticateJWT, HealthRecordController.createHealthRecord);
router.put("/:id", authenticateJWT, HealthRecordController.updateHealthRecord);
router.delete(
  "/:id",
  authenticateJWT,
  HealthRecordController.deleteHealthRecord
);

//เส้นทาง API สำหรับการค้นหาสัตว์
router.get("/age/:age", HealthRecordController.getFilteredAnimalDetails);

module.exports = router;
