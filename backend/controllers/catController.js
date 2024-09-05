const Cat = require("../models/catModel");

const getAllCats = async (req, res) => {
  try {
    const cats = await Cat.find();
    res.json(cats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addCat = async (req, res) => {
  const { name, age, breed, description } = req.body;
  const newCat = new Cat({ name, age, breed, description });

  try {
    const savedCat = await newCat.save();
    res.status(201).json(savedCat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAllCats, addCat };
