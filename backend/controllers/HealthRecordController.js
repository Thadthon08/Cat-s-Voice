const HealthRecord = require("../models/schema.js").HealthRecord;

// Post
exports.createHealthRecord = async (req, res) => {
    try {
      const healthRecord = new HealthRecord({
        record_id: req.body.record_id,          // Required
        animal_id: req.body.animal_id,          // Required, must match an existing Animal document
        checkup_date: req.body.checkup_date,    // Required
        diagnosis: req.body.diagnosis,
        treatment: req.body.treatment,
        notes: req.body.notes,
        created_at: new Date(),                 // Default to current date, optional in request
        updated_at: new Date()                  // Default to current date, optional in request
      });
  
      const newHealthRecord = await healthRecord.save();
      res.status(201).json(newHealthRecord);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

//Get
exports.getAllHealthRecords = async (req, res) => {
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
