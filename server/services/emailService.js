const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text, attachments) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to,
    subject,
    text,
    attachments,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
