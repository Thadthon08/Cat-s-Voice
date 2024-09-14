const express = require('express');
const router = express.Router();
const HealthRecordController = require("../controllers/HealthRecordController");

// เส้นทา API สำหรับการจัดการข้อมูลการรับบริการสัตว์ป่วย

router.get('/', HealthRecordController.getAllHealthRecords);
router.get('/:id', HealthRecordController.getHealthRecordById);
router.post('/', HealthRecordController.createHealthRecord);
router.delete('/:id', HealthRecordController.deleteHealthRecord);

module.exports = router;