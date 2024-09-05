const express = require("express");
const router = express.Router();
const { getAllCats, addCat } = require("../controllers/catController");

// GET all cats
router.get("/", getAllCats);

// POST add new cat
router.post("/add", addCat);

module.exports = router;
