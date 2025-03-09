// services/cvService.js
const fs = require("fs");
const pdf = require("pdf-parse");
const mammoth = require("mammoth");

const extractCVData = async (filePath, fileType) => {
  try {
    console.log(`🔥 Processing ${fileType} file...`);
    let extractedText = "";

    if (fileType === "application/pdf") {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdf(dataBuffer);
      extractedText = data.text;
    } else if (
      fileType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const result = await mammoth.extractRawText({ path: filePath });
      extractedText = result.value;
    } else {
      throw new Error(`Unsupported file type: ${fileType}`);
    }

    console.log("🔥 Text extraction completed");
    return extractedText;
  } catch (error) {
    console.error("❌ Text Extraction Failed:", error);
    return "";
  }
};

const parseCVText = (text) => {
  console.log("🔥 Starting CV parsing");

  const namePattern = /(?:^|\n)([A-Z][a-z]+(?: [A-Z][a-z]+)+)(?:\n|$)/;
  const emailPattern = /[\w.+-]+@[\w-]+\.[\w.-]+/;
  const phonePattern =
    /(?:(?:\+\d{1,3}[ -]?)?(?:\(\d{1,4}\)|\d{1,4})[ -]?\d{1,4}[ -]?\d{1,4}[ -]?\d{1,4})/;

  const educationSection =
    text.match(
      /(?:EDUCATION|Education|ACADEMIC|Academic)(?:[\s\S]*?)(?:EXPERIENCE|Experience|SKILLS|Skills|PROJECTS|Projects|QUALIFICATIONS|Qualifications|$)/i
    )?.[0] || "";
  const educationEntries =
    educationSection.match(
      /(?:University|College|School|Institute|Bachelor|Master|Ph\.?D|Degree|B\.Tech|M\.Tech|B\.Sc|M\.Sc)[^,\n]*(?:,|\.|\n|$)/gi
    ) || [];

  const qualificationsSection =
    text.match(
      /(?:QUALIFICATIONS|Qualifications|SKILLS|Skills|CERTIFICATIONS|Certifications)(?:[\s\S]*?)(?:EXPERIENCE|Experience|PROJECTS|Projects|EDUCATION|Education|$)/i
    )?.[0] || "";
  const qualificationEntries =
    qualificationsSection.match(/(?:•|\*|-)[ ]?[^\n,.]+(,|\.|\n|$)/g) ||
    qualificationsSection.match(
      /[A-Z][a-z]+(?:[ ][A-Za-z]+){1,3}(?:,|\.|\n|$)/g
    ) ||
    [];

  const projectsSection =
    text.match(
      /(?:PROJECTS|Projects|PROJECT EXPERIENCE|Project Experience)(?:[\s\S]*?)(?:EDUCATION|Education|EXPERIENCE|Experience|SKILLS|Skills|QUALIFICATIONS|Qualifications|$)/i
    )?.[0] || "";
  const projectEntries =
    projectsSection.match(/(?:•|\*|-)[ ]?[^\n,.]+(?:[\s\S]*?)(?:•|\*|-|$)/g) ||
    projectsSection.match(
      /(?:^|\n)([A-Z][a-z]+(?: [A-Za-z]+)+)(?::|-)(?:[\s\S]*?)(?:\n\n|$)/g
    ) ||
    [];

  const cleanEntries = (entries) => {
    return entries
      .map((entry) => entry.replace(/(?:•|\*|-)/g, "").trim())
      .filter((entry) => entry.length > 3);
  };

  const personalInfo = {
    name: text.match(namePattern)?.[1] || "Not Found",
    email: text.match(emailPattern)?.[0] || "Not Found",
    phone: text.match(phonePattern)?.[0] || "Not Found",
  };

  return {
    personalInfo,
    education: cleanEntries(educationEntries),
    qualifications: cleanEntries(qualificationEntries),
    projects: cleanEntries(projectEntries),
  };
};

module.exports = { extractCVData, parseCVText };