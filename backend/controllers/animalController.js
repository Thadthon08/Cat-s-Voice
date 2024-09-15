const Animal = require("../models/schema.js").Animal;
const upload = require("../middlewares/uploadImage");
const HealthRecord = require("../models/schema.js").HealthRecord;

// GET - ดึงข้อมูลสัตว์ทั้งหมด

exports.getAllAnimals = async (req, res) => {
  try {
    const status = req.query.status;
    const query = status ? { status: status } : {};

    const animals = await Animal.find(query);

    const animalInfoWithDiagnosis = await Promise.all(
      animals.map(async (animal) => {
        const healthRecord = await HealthRecord.findOne({
          animal_id: animal._id,
        }).sort({ checkup_date: -1 });

        return {
          _id: animal._id,
          name: animal.name,
          gender: animal.gender,
          age: animal.age,
          color: animal.color,
          personality: animal.personality,
          status: animal.status,
          image_url: animal.image_url,
          diagnosis: healthRecord ? healthRecord.diagnosis : "none",
        };
      })
    );

    res.status(200).json(animalInfoWithDiagnosis);
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
  try {
    const animal = new Animal(req.body);
    console.log(animal);

    const newAnimal = await animal.save();
    res.status(201).json(newAnimal);
  } catch (error) {
    res.status(400).json({ message: error.message, data: req.body });
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

exports.uploadAnimalImage = async (req, res) => {
  try {
    const {
      name,
      species,
      age,
      gender,
      size,
      color,
      personality,
      symptoms,
      status,
      added_by_admin_id,
    } = req.body;

    // สร้าง animal ใหม่พร้อม URL ของรูปภาพ
    const animal = new Animal({
      name,
      species,
      age,
      gender,
      size,
      color,
      personality,
      symptoms,
      status,
      added_by_admin_id,
      image_url: req.file ? `/uploads/${req.file.filename}` : undefined, // เก็บ URL รูปภาพ
    });

    await animal.save();
    res.status(201).json({ message: "Animal added successfully", animal });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add animal", error: error.message });
  }
};

// DELETE - ลบข้อมูลสัตว์
exports.deleteAnimal = async (req, res) => {
  try {
    const animal = await Animal.findOneAndDelete({ _id: req.params.id });
    if (!animal) return res.status(404).json({ message: "Animal not found" });
    res
      .status(200)
      .json({ message: "Animal and related records deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
