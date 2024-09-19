const express = require("express");
const router = express.Router();
module.exports = router;
const {
  createAdoption,
  getAllAdoptions,
  getAdoptionById,
  deleteAdoptionById,
  getAdoptionByAnimalId,
  updateAdoptionStatus,
} = require("../controllers/adoptionController");

router.post("/adoptions", createAdoption);
router.get("/adoptions", getAllAdoptions);
router.get("/adoptions/:id", getAdoptionById);
router.get("/adoption/:animal_id", getAdoptionByAnimalId);
router.put("/:id/status", updateAdoptionStatus);
router.delete("/adoptions/:id", deleteAdoptionById);

module.exports = router;
