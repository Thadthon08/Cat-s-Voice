const HealthRecord = require("../models/schema.js").HealthRecord;

//Post
exports.createHealthRecord = async (req, res) => {
  try {
    const healthRecord = new HealthRecord({
      animalId: req.body.animalId,
      veterinarianName: req.body.veterinarianName,
      veterinarySpecialization: req.body.veterinarySpecialization,
      diagnosis: req.body.diagnosis,
      treatmentPlan: req.body.treatmentPlan,
      medications: req.body.medications,
      nextAppointment: req.body.nextAppointment,
      notes: req.body.notes,
    });

    const newHealthRecord = await healthRecord.save();
    res.status(201).json(newHealthRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Get
exports.getHealthRecords = async (req, res) => {
  try {
    const healthRecords = await HealthRecord.find();
    res.json(healthRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get by id
exports.getHealthRecordById = async (req, res) => {
  try {
    const healthRecord = await HealthRecord.findById(req.params.id);

    if (!healthRecord) return res.status(404).json({ message: "Health record not found" });

    res.json(healthRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Delete
exports.deleteHealthRecord = async (req, res) => {
  try {
    const healthRecord = await HealthRecord.findByIdAndDelete(req.params.id);

    if (!healthRecord) return res.status(404).json({ message: "Health record not found" });

    res.json({ message: "Health record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
