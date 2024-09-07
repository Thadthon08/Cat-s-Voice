const mongoose = require("mongoose");

// Admin Schema
const AdminSchema = new mongoose.Schema({
  admin_id: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  created_at: { type: Date, default: Date.now },
  last_login: { type: Date },
});

const Admin = mongoose.model("Admin", AdminSchema);

// Animal Species Schema
const AnimalSpeciesSchema = new mongoose.Schema({
  species_id: { type: Number, required: true, unique: true },
  species_name: { type: String, required: true },
});

const AnimalSpecies = mongoose.model("AnimalSpecies", AnimalSpeciesSchema);

// Animal Schema
const AnimalSchema = new mongoose.Schema({
  animal_id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  species_id: {
    type: mongoose.Schema.Types.Number,
    ref: "AnimalSpecies",
    required: true,
  },
  age: { type: Number },
  gender: { type: String, enum: ["Male", "Female", "Unknown"], required: true },
  size: {
    type: String,
    enum: ["Small", "Medium", "Large", "Extra Large"],
    required: true,
  },
  color: { type: String },
  weight: { type: mongoose.Types.Decimal128 },
  health_status: { type: String },
  vaccination_status: { type: String },
  personality: { type: String },
  arrival_date: { type: Date },
  image_url: { type: String },
  status: {
    type: String,
    enum: ["available", "adopted", "pending", "unavailable"],
    required: true,
  },
  added_by_admin_id: {
    type: mongoose.Schema.Types.Number,
    ref: "Admin",
    required: true,
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Animal = mongoose.model("Animal", AnimalSchema);

// Health Records Schema
const HealthRecordSchema = new mongoose.Schema({
  record_id: { type: Number, required: true, unique: true },
  animal_id: {
    type: mongoose.Schema.Types.Number,
    ref: "Animal",
    required: true,
  },
  checkup_date: { type: Date, required: true },
  diagnosis: { type: String },
  treatment: { type: String },
  notes: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const HealthRecord = mongoose.model("HealthRecord", HealthRecordSchema);

// Adoption Schema
const AdoptionSchema = new mongoose.Schema({
  adoption_id: { type: Number, required: true, unique: true },
  animal_id: {
    type: mongoose.Schema.Types.Number,
    ref: "Animal",
    required: true,
  },
  adopter_name: { type: String, required: true },
  adopter_email: { type: String, required: true },
  adopter_phone: { type: String, required: true },
  adopter_salary: { type: Number },
  adoption_reason: { type: String },
  adoption_date: { type: Date, required: true },
  status: {
    type: String,
    enum: ["completed", "pending", "cancelled"],
    required: true,
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Adoption = mongoose.model("Adoption", AdoptionSchema);

// Donation Schema
const DonationSchema = new mongoose.Schema({
  donation_id: { type: Number, required: true, unique: true },
  donor_name: { type: String, required: true },
  donor_email: { type: String, required: true },
  donor_phone: { type: String, required: true },
  donation_date: { type: Date, required: true },
  donation_slip : { type: String },
  additional_message: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Donation = mongoose.model("Donation", DonationSchema);

module.exports = {
  Admin,
  AnimalSpecies,
  Animal,
  HealthRecord,
  Adoption,
  Donation,
};