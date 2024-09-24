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

exports.getFilteredAnimalDetails = async (req, res) => {
  
  try {
    // ดึงข้อมูล HealthRecord และ populate ข้อมูลสัตว์ที่เกี่ยวข้อง
    const healthRecords = await HealthRecord.find().populate("animal_id");

    // สร้างเซ็ตเพื่อเก็บ ID ของสัตว์ที่มีอยู่ใน HealthRecord
    const animalIds = new Set(healthRecords.map(record => record.animal_id._id));

    // สร้างเงื่อนไขการค้นหา
    const filter = { _id: { $in: Array.from(animalIds) } };
    
    if (req.params.species) {
      filter.species = req.params.species;
    }

    if (req.params.gender) {
      filter.gender = req.params.gender;
    }

    if (req.params.age) {
      const range = req.params.age.split("-");
      filter.age = { $gte: parseInt(range[0]), $lte: parseInt(range[1]) };
    }


    // ดึงข้อมูลสัตว์ที่มี ID อยู่ใน HealthRecord ตามเงื่อนไขที่กำหนด
    const animals = await Animal.find(filter);

    // กรองข้อมูลเพื่อให้ได้เฉพาะอายุ เพศ และประเภท
    const animalDetails = animals.map(animal => ({
      ...animal.toObject() // ใช้ toObject() เพื่อแปลง Mongoose Document เป็น JavaScript Object
    }));

    res.json(animalDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

