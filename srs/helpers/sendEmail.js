const sgMail = require("@sendgrid/mail");

require("dotenv").config();

const { SENDGRID_API_KEY, IRYNA_MAIL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: IRYNA_MAIL };
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;
