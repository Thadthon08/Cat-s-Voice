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
const authenticateJWT = require("../middleware/authenticateJWT");

router.post("/adoptions", createAdoption);
router.get("/adoptions", getAllAdoptions);
router.get("/adoptions/:id", getAdoptionById);
router.get("/adoption/:animal_id", getAdoptionByAnimalId);
router.put("/:id/status", authenticateJWT, updateAdoptionStatus);
router.delete("/adoptions/:id", deleteAdoptionById);

module.exports = router;
