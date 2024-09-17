const express = require('express');
const router = express.Router();
const { createAdoption, getAllAdoptions, getAdoptionById, deleteAdoptionById, getAdoptionByAnimalId } = require('../controllers/adoptionController');

router.post('/adoptions', createAdoption);
router.get('/adoptions', getAllAdoptions);
router.get('/adoptions/:id', getAdoptionById);
router.get('/adoption/:animal_id', getAdoptionByAnimalId);
router.delete('/adoptions/:id', deleteAdoptionById);

module.exports = router;