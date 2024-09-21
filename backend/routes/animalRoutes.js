const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadImage");
const { uploadAnimalImage } = require("../controllers/animalController");
const animalController = require("../controllers/animalController");
const authenticateJWT = require("../middleware/authenticateJWT");

// เส้นทาง API สำหรับการจัดการข้อมูลสัตว์
router.get("/", animalController.getAllAnimals);
router.get("/without", animalController.getAnimalsWithoutHealthRecord);
router.get("/:id", animalController.getAnimalById);
router.post("/", authenticateJWT, animalController.createAnimal);
router.put("/:id", authenticateJWT, animalController.updateAnimal);
router.delete("/:id", authenticateJWT, animalController.deleteAnimal);
router.post("/upload", upload.single("image"), uploadAnimalImage);
// ey test
router.get("/species/:species", animalController.getAnimalBy);
router.get("/gender/:gender", animalController.getAnimalBy);
router.get("/species/:species/gender/:gender", animalController.getAnimalBy);
module.exports = router;
