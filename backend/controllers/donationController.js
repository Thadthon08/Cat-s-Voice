const Donation = require("../models/schema.js").Donation;

exports.createDonation = async (req, res) => {
    try {
      const { 
        donor_firstname,
        donor_lastname, 
        donor_email, 
        donor_phone, 
        donation_date, 
        donation_amount,
        donation_method,
        additional_message 
      } = req.body;
  
      const newDonation = new Donation({
        donor_firstname,
        donor_lastname, 
        donor_email, 
        donor_phone, 
        donation_date, 
        donation_amount,
        donation_method,
        additional_message 
      });
  
      await newDonation.save();
      res.status(201).json(newDonation);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };