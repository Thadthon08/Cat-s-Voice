const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadImage");
const { uploadAnimalImage } = require("../controllers/animalController");
const animalController = require("../controllers/animalController");

// เส้นทาง API สำหรับการจัดการข้อมูลสัตว์
router.get("/", animalController.getAllAnimals);
router.get("/without", animalController.getAnimalsWithoutHealthRecord);
router.get("/:id", animalController.getAnimalById);
router.post("/", animalController.createAnimal);
router.put("/:id", animalController.updateAnimal);
router.delete("/:id", animalController.deleteAnimal);
router.post("/upload", upload.single("image"), uploadAnimalImage);

module.exports = router;
