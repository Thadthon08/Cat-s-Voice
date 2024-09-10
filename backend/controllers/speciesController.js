const AnimalSpecies = require("../models/schema.js").AnimalSpecies; 

// GET - ดึงข้อมูลสายพันธุ์ทั้งหมด
exports.getAllSpecies = async (req, res) => {
  try {
    const species = await AnimalSpecies.find();
    res.status(200).json(species);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET - ดึงข้อมูลสายพันธุ์ตาม ID
exports.getSpeciesById = async (req, res) => {
  try {
    const species = await AnimalSpecies.findById(req.params.id);
    if (!species) return res.status(404).json({ message: "Species not found" });
    res.status(200).json(species);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST - สร้างข้อมูลสายพันธุ์ใหม่
exports.createSpecies = async (req, res) => {
  const newSpecies = new AnimalSpecies(req.body);
  try {
    const savedSpecies = await newSpecies.save();
    res.status(201).json(savedSpecies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT - แก้ไขข้อมูลสายพันธุ์
exports.updateSpecies = async (req, res) => {
  try {
    const updatedSpecies = await AnimalSpecies.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSpecies)
      return res.status(404).json({ message: "Species not found" });
    res.status(200).json(updatedSpecies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE - ลบข้อมูลสายพันธุ์
exports.deleteSpecies = async (req, res) => {
  try {
    const deletedSpecies = await AnimalSpecies.findByIdAndDelete(req.params.id);
    if (!deletedSpecies)
      return res.status(404).json({ message: "Species not found" });
    res.status(200).json({ message: "Species deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
