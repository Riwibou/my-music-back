const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendDownloadLink = async (email, downloadLink) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Music Download Link',
    text: `Thank you for your purchase! Here is your download link: ${downloadLink}`,
  };

  await transporter.sendMail(mailOptions);
};
