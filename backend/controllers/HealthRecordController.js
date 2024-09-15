const HealthRecord = require("../models/schema.js").HealthRecord;
const Animal = require("../models/schema.js").Animal;

// Post
exports.createHealthRecord = async (req, res) => {
  try {
    if (!req.body.animal_id || !req.body.checkup_date) {
      return res
        .status(400)
        .json({ message: "Both 'animal_id' and 'checkup_date' are required." });
    }

    const animalExists = await Animal.findById(req.body.animal_id);
    if (!animalExists) {
      return res
        .status(404)
        .json({ message: "Animal not found with the provided 'animal_id'." });
    }

    const healthRecord = new HealthRecord({
      animal_id: req.body.animal_id,
      checkup_date: req.body.checkup_date,
      diagnosis: req.body.diagnosis || "none",
      treatment: req.body.treatment || "",
      notes: req.body.notes || "",
    });

    const newHealthRecord = await healthRecord.save();
    res.status(201).json(newHealthRecord);
  } catch (error) {
    console.error("Error creating health record:", error);
    res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
};

//Get
exports.getAllHealthRecords = async (req, res) => {
  try {
    const healthRecords = await HealthRecord.find().populate("animal_id");

    res.json(healthRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get by id
exports.getHealthRecordById = async (req, res) => {
  try {
    const healthRecordId = req.params.id;
    const healthRecord = await HealthRecord.findById(healthRecordId).populate(
      "animal_id"
    );

    if (!healthRecord) {
      return res.status(404).json({ message: "Health record not found" });
    }

    res.json(healthRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Put
exports.updateHealthRecord = async (req, res) => {
  try {
    const healthRecordId = req.params.id;
    const healthRecord = await HealthRecord.findById(healthRecordId);

    if (!healthRecord) {
      return res.status(404).json({ message: "Health record not found" });
    }

    healthRecord.checkup_date =
      req.body.checkup_date || healthRecord.checkup_date;
    healthRecord.diagnosis = req.body.diagnosis || healthRecord.diagnosis;
    healthRecord.treatment = req.body.treatment || healthRecord.treatment;
    healthRecord.notes = req.body.notes || healthRecord.notes;

    const updatedHealthRecord = await healthRecord.save();
    res.json(updatedHealthRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Delete
exports.deleteHealthRecord = async (req, res) => {
  try {
    const healthRecord = await HealthRecord.findByIdAndDelete(req.params.id);

    if (!healthRecord)
      return res.status(404).json({ message: "Health record not found" });

    res.json({ message: "Health record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
