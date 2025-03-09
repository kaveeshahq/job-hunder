// controllers/applicantController.js
const Applicant = require("../models/Applicant.js");
const { bucket } = require("../config/firebase.js");
const { extractCVData, parseCVText } = require("../services/cvService.js");
// controllers/applicationController.js
const { sendImmediateEmail } = require("../services/emailService.js");
const { scheduleFollowUpEmail } = require("../utils/schedule.js");

// Rest of your code...


const {
  checkAndAddHeaders,
  addApplicantToSheet,
} = require("../services/googleSheetsService.js");
const fs = require("fs");
const axios = require("axios");

const uploadApplicant = async (req, res) => {
  try {
    console.log("🔥 File Received:", req.file);
    console.log("🔥 Form Data:", req.body);

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded!" });
    }

    const { name, email, phone } = req.body;
    const filePath = req.file.path;
    const fileType = req.file.mimetype;

    // Extract text from CV
    const text = await extractCVData(filePath, fileType);
    const extractedData = parseCVText(text);

    // Fallback to form data if extraction fails
    if (extractedData.personalInfo.name === "Not Found") {
      extractedData.personalInfo.name = name;
    }
    if (extractedData.personalInfo.email === "Not Found") {
      extractedData.personalInfo.email = email;
    }
    if (extractedData.personalInfo.phone === "Not Found") {
      extractedData.personalInfo.phone = phone;
    }

    console.log("Extracted Data:", extractedData);

    // Store CV in Firebase
    const fileName = `cv_${Date.now()}_${req.file.originalname.replace(
      / /g,
      "_"
    )}`;
    const file = bucket.file(fileName);

    await bucket.upload(filePath, {
      destination: fileName,
      metadata: { contentType: req.file.mimetype },
    });

    await file.makePublic();
    const cvUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

    // Store data in MongoDB
    const applicant = new Applicant({
      name,
      email,
      phone,
      cvUrl,
      extractedData: {
        education: extractedData.education,
        qualifications: extractedData.qualifications,
        projects: extractedData.projects,
      },
      status: process.env.NODE_ENV === "development" ? "testing" : "prod",
      processedAt: new Date(),
    });
    await applicant.save();

    // Prepare Google Sheets
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
    if (!spreadsheetId) {
      throw new Error(
        "Google Sheet ID is missing. Please set GOOGLE_SHEETS_ID in your environment variables."
      );
    }

    await checkAndAddHeaders(spreadsheetId);
    await addApplicantToSheet(spreadsheetId, {
      name,
      email,
      phone,
      cvUrl,
      education: extractedData.education,
      qualifications: extractedData.qualifications,
      projects: extractedData.projects,
    });

    // Send HTTP Request (Webhook)
    const webhookUrl = "https://rnd-assignment.automations-3d6.workers.dev/";
    const payload = {
      cv_data: {
        personal_info: extractedData.personalInfo,
        education: extractedData.education,
        qualifications: extractedData.qualifications,
        projects: extractedData.projects,
        cv_public_link: cvUrl,
      },
      metadata: {
        applicant_name: name,
        email: email,
        status: process.env.NODE_ENV === "development" ? "testing" : "prod",
        cv_processed: true,
        processed_timestamp: new Date().toISOString(),
      },
    };

    const webhookResponse = await axios.post(webhookUrl, payload, {
      headers: {
        "X-Candidate-Email": email,
        "Content-Type": "application/json",
      },
    });

    console.log("🔥  response:", webhookResponse.status);

    // Send immediate email
    const immediateEmailSent = await sendImmediateEmail(name, email);
    if (immediateEmailSent) {
      console.log(`🔥 Immediate email sent to ${email}`);
    } else {
      console.error(`❌ Failed to send immediate email to ${email}`);
    }

    // Schedule follow-up email
    const timezone = "UTC";
    const followUpEmailScheduled = scheduleFollowUpEmail(name, email, timezone);
    if (followUpEmailScheduled) {
      console.log(`🔥 Follow-up email scheduled for ${email}`);
    } else {
      console.error(`❌ Failed to schedule follow-up email for ${email}`);
    }

    // Clean up the uploaded file
    fs.unlinkSync(filePath);

    res.json({
      success: true,
      message: "Uploaded Successfully!",
      extractedData,
    });
  } catch (error) {
    console.error("❌ Error in /api/upload:", error);
    res.status(500).json({ success: false, message: "Upload failed!" });
  }
};

const getApplicants = async (req, res) => {
  try {
    const applicants = await Applicant.find();
    res.json({ success: true, applicants });
  } catch (error) {
    console.error("❌ Error fetching applicants:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch applicants" });
  }
};

module.exports = { uploadApplicant, getApplicants };
