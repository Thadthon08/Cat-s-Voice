const Donation = require("../models/schema.js").Donation;

exports.createDonation = async (req, res) => {
    try {
      const { 
        donor_name, 
        donor_email, 
        donor_phone, 
        donation_date, 
        donation_slip, 
        additional_message 
      } = req.body;
  
      const newDonation = new Donation({
        donor_name,
        donor_email,
        donor_phone,
        donation_date,
        donation_slip,
        additional_message,
      });
  
      await newDonation.save();
      res.status(201).json(newDonation);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };