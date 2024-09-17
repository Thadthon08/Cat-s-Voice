const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

// Admin Schema
const AdminSchema = new mongoose.Schema({
  admin_id: { type: Number, required: false, unique: true },
  username: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  created_at: { type: Date, default: Date.now },
  last_login: { type: Date },
});

AdminSchema.plugin(AutoIncrement, { inc_field: "admin_id" });

const Admin = mongoose.model("Admin", AdminSchema);

// Animal Species Schema
const AnimalSpeciesSchema = new mongoose.Schema({
  species_id: { type: Number, required: true, unique: true },
  species_name: { type: String, enum: ["Dog", "Cat"], required: true },
});

const AnimalSpecies = mongoose.model("AnimalSpecies", AnimalSpeciesSchema);

// Animal Schema
const AnimalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: {
    type: mongoose.Schema.Types.Number,
    ref: "AnimalSpecies",
    required: true,
  },
  age: { type: Number, required: true },
  gender: {
    type: String,
    enum: ["Male", "Female", "Unknown"],
    required: true,
  },
  size: {
    type: String,
    enum: ["Small", "Medium", "Large"],
    required: false,
  },
  color: { type: String, required: false },
  personality: { type: String, required: false },
  image_url: { type: String, required: false },
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

AnimalSchema.plugin(AutoIncrement, { inc_field: "animal_id" });
AnimalSchema.pre("findOneAndDelete", async function (next) {
  try {
    const animalId = this.getQuery()._id;
    await HealthRecord.deleteMany({ animal_id: animalId }); // ลบเอกสาร HealthRecord ที่เชื่อมกับ animal_id
    next();
  } catch (error) {
    next(error);
  }
});

const Animal = mongoose.model("Animal", AnimalSchema);

// Health Records Schema
const HealthRecordSchema = new mongoose.Schema({
  animal_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Animal",
    required: true,
    unique: true,
  },
  checkup_date: { type: Date, required: true },
  diagnosis: { type: String, default: "none" },
  treatment: { type: String, default: "" },
  notes: { type: String, default: "" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const HealthRecord = mongoose.model("HealthRecord", HealthRecordSchema);

// Adoption Schema
const AdoptionSchema = new mongoose.Schema({
  animal_id: {
    type: mongoose.Schema.Types.ObjectId,
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
  donation_slip: { type: String },
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
