const express = require("express");
const router = express.Router();
const animalController = require("../controllers/animalController");

// เส้นทาง API สำหรับการจัดการข้อมูลสัตว์
router.get("/", animalController.getAllAnimals);
router.get("/:id", animalController.getAnimalById);
router.post("/", animalController.createAnimal);
router.put("/:id", animalController.updateAnimal);
router.delete("/:id", animalController.deleteAnimal);

module.exports = router;
