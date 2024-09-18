const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadImage");
const { uploadactivity } = require("../controllers/activityController");
const activityController = require("../controllers/activityController");


// เส้นทา�� API สำหรับการจัดการข้อมูลกิจกรรม
router.get("/", activityController.getAllActivities);
router.get("/:id", activityController.getActivityById);
router.post("/", activityController.createActivity);
router.put("/:id", activityController.updateActivity);
router.delete("/:id", activityController.deleteActivityById);
router.post("/upload", upload.single("image"), uploadactivity);

module.exports = router;