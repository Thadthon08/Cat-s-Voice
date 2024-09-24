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


router.get("/age/:age", HealthRecordController.getFilteredHealthRecordsByAnimal);
router.get("/species/:species/age/:age", HealthRecordController.getFilteredHealthRecordsByAnimal);
router.get("/gender/:gender/age/:age", HealthRecordController.getFilteredHealthRecordsByAnimal);
router.get("/species/:species/gender/:gender/age/:age", HealthRecordController.getFilteredHealthRecordsByAnimal);


module.exports = router;
