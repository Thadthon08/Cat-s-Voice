const Adoption = require("../models/schema.js").Adoption;

// Create a new adoption record
exports.createAdoption = async (req, res) => {
  try {
    const { adoption_id, animal_id, adopter_name, adopter_email, adopter_phone, adopter_salary, adoption_reason, adoption_date, status } = req.body;

    const newAdoption = new Adoption({
      adoption_id,
      animal_id,
      adopter_name,
      adopter_email,
      adopter_phone,
      adopter_salary,
      adoption_reason,
      adoption_date,
      status
    });

    await newAdoption.save();
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
    const adoption = await Adoption.findOne({ adoption_id: id });

    if (!adoption) {
      return res.status(404).json({ message: 'Adoption record not found' });
    }

    res.status(200).json(adoption);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an adoption record by ID
exports.deleteAdoptionById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Adoption.deleteOne({ adoption_id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Adoption record not found' });
    }

    res.status(200).json({ message: 'Adoption record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};