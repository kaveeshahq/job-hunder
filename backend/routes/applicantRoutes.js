// routes/applicantRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../utils/fileUpload.js");
const { uploadApplicant, getApplicants } = require("../controllers/applicationController.js");

router.post("/upload", upload.single("cv"), uploadApplicant);
router.get("/applicants", getApplicants);

module.exports = router;