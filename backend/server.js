require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Schema
const Applicant = mongoose.model("Applicant", {
  name: String,
  email: String,
  phone: String,
  cvUrl: String,
});

// 🔥 Firebase Admin SDK Setup
const serviceAccount = require("./firebase-admin.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_BUCKET,
});
const bucket = admin.storage().bucket();

// 🔥 Multer Setup for File Uploads
const upload = multer({ dest: "uploads/" });

// 🔥 Upload API Route
app.post("/upload", upload.single("cv"), async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const file = req.file;

    // Upload file to Firebase Storage
    const storageFile = bucket.file(file.originalname);
    await storageFile.save(fs.readFileSync(file.path), {
      metadata: { contentType: file.mimetype },
    });

    // Get Public URL
    const [url] = await storageFile.getSignedUrl({
      action: "read",
      expires: "01-01-2030",
    });

    // Save to MongoDB
    const newApplicant = new Applicant({ name, email, phone, cvUrl: url });
    await newApplicant.save();

    // Send Confirmation Email
    sendEmail(email, name, url);

    res.json({ success: true, message: "Uploaded Successfully!", cvUrl: url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Upload failed!" });
  }
});

// 🔥 Nodemailer Function
const sendEmail = async (email, name, cvUrl) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Application Received",
    html: `<h2>Hello ${name},</h2><p>We've received your application!</p><p><a href="${cvUrl}">View CV</a></p>`,
  };

  await transporter.sendMail(mailOptions);
};

// 🔥 Get All Applicants API
app.get("/applicants", async (req, res) => {
  const applicants = await Applicant.find();
  res.json(applicants);
});

// 🔥 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
