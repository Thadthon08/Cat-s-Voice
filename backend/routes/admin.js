const express = require("express");
const router = express.Router();
const { getAllAdmins } = require("../controllers/adminController");

// Get all admins
router.get("/", getAllAdmins);

module.exports = router;
