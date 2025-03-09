// services/googleSheetsService.js
const sheets = require("../config/googleSheets.js");

const checkAndAddHeaders = async (spreadsheetId) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Sheet1!A1:H1",
    });

    if (!response.data.values || response.data.values.length === 0) {
      const headers = [
        "Name",
        "Email",
        "Phone",
        "CV Link",
        "Education",
        "Qualifications",
        "Projects",
        "Submission Date",
      ];

      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: "Sheet1!A1",
        valueInputOption: "RAW",
        resource: { values: [headers] },
      });
      console.log("🔥 Added headers to Google Sheet");
    }
  } catch (error) {
    console.error("❌ Error checking/adding headers:", error);
  }
};

const addApplicantToSheet = async (spreadsheetId, applicantData) => {
  try {
    const values = [
      [
        applicantData.name,
        applicantData.email,
        applicantData.phone,
        applicantData.cvUrl,
        applicantData.education.join(", "),
        applicantData.qualifications.join(", "),
        applicantData.projects.join(", "),
        new Date().toISOString(),
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A2",
      valueInputOption: "RAW",
      resource: { values },
    });

    console.log("🔥 Applicant data added to Google Sheet");
  } catch (error) {
    console.error("❌ Error adding applicant to Google Sheet:", error);
  }
};

module.exports = { checkAndAddHeaders, addApplicantToSheet };