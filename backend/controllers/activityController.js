const Activity = require("../models/schema.js").Activity;

// GET -All
exports.getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find();
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET - by ID
exports.getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) return res.status(404).json({ message: "Activity not found" });
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST - create new activity
exports.createActivity = async (req, res) => {
  const newActivity = new Activity(req.body);
  try {
    const savedActivity = await newActivity.save();
    res.status(201).json(savedActivity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT - update existing activity
exports.updateActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!activity) return res.status(404).json({ message: "Activity not found" });

    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE - delete an activity by ID
exports.deleteActivityById = async (req, res) => {
  try {
    const deletedActivity = await Activity.findByIdAndDelete(req.params.id);
    if (!deletedActivity)
      return res.status(404).json({ message: "Activity not found" });
    res.status(200).json({ message: "Activity deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.uploadactivity = async (req, res) => {
    try {
      const {
        name,
        details,
        date,
        location,
        time,
        notes,
      } = req.body;
  
      // สร้าง animal ใหม่พร้อม URL ของรูปภาพ
      const activity = new activity({
        name,
        details,
        date,
        location,
        time,
        notes,
        image: req.file ? `/uploads/${req.file.filename}` : undefined, // เก็บ URL รูปภาพ
      });
  
      await activity.save();
      res.status(201).json({ message: "activity added successfully", activity });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to add animal", error: error.message });
    }
  };