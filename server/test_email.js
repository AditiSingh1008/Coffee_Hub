// test-email.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create the Nodemailer transporter using Gmail and App Password
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your Gmail App Password
  },
});

// Email options
const mailOptions = {
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_USER, // You can change this to test with other addresses
  subject: 'Test Email from Node.js',
  text: '🎉 This is a test email sent using Nodemailer and Gmail App Password!',
};

// Send the test email
transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.error('❌ Error sending email:', err.message);
  } else {
    console.log('✅ Email sent successfully:', info.response);
  }
});
