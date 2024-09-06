const Animal = require("../models/schema.js").Animal;

// GET - ดึงข้อมูลสัตว์ทั้งหมด
exports.getAllAnimals = async (req, res) => {
  try {
    const animals = await Animal.find();
    res.status(200).json(animals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET - ดึงข้อมูลสัตว์ตาม ID
exports.getAnimalById = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) return res.status(404).json({ message: "Animal not found" });
    res.status(200).json(animal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST - สร้างข้อมูลสัตว์ใหม่
exports.createAnimal = async (req, res) => {
  const animal = new Animal(req.body);
  try {
    const newAnimal = await animal.save();
    res.status(201).json(newAnimal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT - แก้ไขข้อมูลสัตว์
exports.updateAnimal = async (req, res) => {
  try {
    const animal = await Animal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!animal) return res.status(404).json({ message: "Animal not found" });
    res.status(200).json(animal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE - ลบข้อมูลสัตว์
exports.deleteAnimal = async (req, res) => {
  try {
    const animal = await Animal.findByIdAndDelete(req.params.id);
    if (!animal) return res.status(404).json({ message: "Animal not found" });
    res.status(200).json({ message: "Animal deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
