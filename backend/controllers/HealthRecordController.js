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
    // ดึงข้อมูล HealthRecord และ populate ข้อมูลสัตว์ที่เกี่ยวข้อง
    const healthRecords = await HealthRecord.find().populate("animal_id");

    // กรองเฉพาะสัตว์ที่มี status เป็น available หรือ pending
    const filteredHealthRecords = healthRecords.filter((record) => {
      return (
        record.animal_id &&
        (record.animal_id.status === "available" ||
          record.animal_id.status === "pending")
      );
    });

    res.json(filteredHealthRecords);
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

exports.getBySpecieGenderAge = async (req, res) => {
  try {
    const query = {};

    if (req.params.species) {
      query.species = req.params.species;
    }

    if (req.params.gender) {
      query.gender = req.params.gender;
    }

    if (req.params.age) {
      const range = req.params.age.split("-");
      query.age = { $gte: parseInt(range[0]), $lte: parseInt(range[1]) };
    }

    const animals = await Animal.find(query);

    if (animals.length === 0)
      return res.status(404).json({ message: "ไม่พบข้อมูลสัตว์" });

    res.status(200).json(animals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
