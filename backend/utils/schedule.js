// utils/schedule.js
const schedule = require("node-schedule");
const { sendFollowUpEmail } = require("../services/emailService.js");

const scheduleFollowUpEmail = (applicantName, applicantEmail, timezone = "UTC") => {
  try {
    const tz = timezone || "UTC";
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const job = schedule.scheduleJob(
      {
        hour: 10,
        minute: 0,
        second: 0,
        tz: tz,
        date: tomorrow,
      },
      async function () {
        await sendFollowUpEmail(applicantName, applicantEmail);
      }
    );

    console.log(`🔥 Follow-up email scheduled for ${applicantName} at 10 AM ${tz} tomorrow`);
    return true;
  } catch (error) {
    console.error("❌ Error scheduling follow-up email:", error);
    return false;
  }
};

module.exports = { scheduleFollowUpEmail };