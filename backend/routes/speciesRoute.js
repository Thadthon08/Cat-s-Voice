const express = require("express");
const router = express.Router();
const animalSpeciesController = require("../controllers/speciesController");

// เส้นทาง API สำหรับการจัดการข้อมูลสายพันธุ์
router.get("/", animalSpeciesController.getAllSpecies);
router.get("/:id", animalSpeciesController.getSpeciesById);
router.post("/", animalSpeciesController.createSpecies);
router.put("/:id", animalSpeciesController.updateSpecies);
router.delete("/:id", animalSpeciesController.deleteSpecies);

module.exports = router;
