// models/Applicant.js
const mongoose = require("mongoose");

const applicantSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  cvUrl: String,
  extractedData: {
    education: [String],
    qualifications: [String],
    projects: [String],
  },
  status: String,
  processedAt: Date,
});

module.exports = mongoose.model("Applicant", applicantSchema);