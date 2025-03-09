// services/emailService.js
const transporter = require("../config/email.js");

const sendImmediateEmail = async (applicantName, applicantEmail) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: applicantEmail,
      subject: "Thank You for Submitting Your Application",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
          <h2 style="color: #4a69bd;">Application Received</h2>
          <p>Dear ${applicantName},</p>
          <p>Thank you for submitting your application. We have successfully received your CV and it is now being processed by our team.</p>
          <p>We appreciate your interest in joining our company and will get back to you as soon as possible with updates on your application status.</p>
          <p>If you have any questions in the meantime, please don't hesitate to contact us.</p>
          <p>Best regards,<br>The Recruitment Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`🔥 Immediate email sent to ${applicantEmail}`);
    return true;
  } catch (error) {
    console.error("❌ Error sending immediate email:", error);
    return false;
  }
};

const sendFollowUpEmail = async (applicantName, applicantEmail) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: applicantEmail,
      subject: "Your Application is Under Review",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
          <h2 style="color: #4a69bd;">Application Update</h2>
          <p>Dear ${applicantName},</p>
          <p>Thank you for submitting your application. We wanted to let you know that your CV is currently under review by our team.</p>
          <p>We appreciate your interest in joining our company and will get back to you as soon as possible with updates on your application status.</p>
          <p>If you have any questions in the meantime, please don't hesitate to contact us.</p>
          <p>Best regards,<br>The Recruitment Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`🔥 Follow-up email sent to ${applicantEmail}`);
  } catch (error) {
    console.error("❌ Error sending follow-up email:", error);
  }
};

module.exports = { sendImmediateEmail, sendFollowUpEmail };