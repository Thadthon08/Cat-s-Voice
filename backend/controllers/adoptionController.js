const Adoption = require("../models/schema.js").Adoption;
const Animal = require("../models/schema.js").Animal;
const mongoose = require("mongoose");

// Create a new adoption record
exports.createAdoption = async (req, res) => {
  try {
    const {
      animal_id,
      adopter_name,
      adopter_email,
      adopter_phone,
      adopter_salary,
      adoption_reason,
      adoption_date,
      status,
    } = req.body;

    const animal = await Animal.findById(animal_id);
    if (!animal) {
      return res.status(404).json({ message: "Animal not found" });
    }

    const newAdoption = new Adoption({
      animal_id,
      adopter_name,
      adopter_email,
      adopter_phone,
      adopter_salary,
      adoption_reason,
      adoption_date,
      status,
    });

    await newAdoption.save();

    // Update the status of the associated animal to "pending"
    animal.status = "pending";
    await animal.save();

    res.status(201).json(newAdoption);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all adoption records
exports.getAllAdoptions = async (req, res) => {
  try {
    const adoptions = await Adoption.find();
    res.status(200).json(adoptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single adoption record by ID
exports.getAdoptionById = async (req, res) => {
  try {
    const { id } = req.params;
    const adoption = await Adoption.findById(req.params.id);

    if (!adoption) {
      return res.status(404).json({ message: "Adoption record not found" });
    }

    res.status(200).json(adoption);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// exports.getAdoptionByAnimalId = async (req, res) => {
//   try {
//     const { animal_id } = req.params; // ดึง animal_id จาก req.params
//     // ตรวจสอบว่า animal_id เป็น ObjectId ที่ถูกต้องหรือไม่
//     if (!mongoose.Types.ObjectId.isValid(animal_id)) {
//       return res.status(400).json({ message: 'Invalid animal_id format' });
//     }

//     // ค้นหา adoption โดยใช้ animal_id
//     const adoption = await Adoption.findOne({
//       animal_id: new mongoose.Types.ObjectId(animal_id)
//     });

//     if (!adoption) {
//       return res.status(404).json({ message: 'Adoption record not found' });
//     }

//     res.status(200).json(adoption);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// Delete an adoption record by ID

exports.getAdoptionByAnimalId = async (req, res) => {
  try {
    const { animal_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(animal_id)) {
      return res.status(400).json({ message: "Invalid animal_id format" });
    }
    const adoption = await Adoption.findOne({
      animal_id: new mongoose.Types.ObjectId(animal_id),
    }).populate("animal_id", "name image_url");

    if (!adoption) {
      return res.status(404).json({ message: "Adoption record not found" });
    }

    res.status(200).json(adoption);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAdoptionById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Adoption.deleteOne({ adoption_id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Adoption record not found" });
    }

    res.status(200).json({ message: "Adoption record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
