const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 4000;

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mightguy7.2000@gmail.com',
    pass: 'henm rvqg mynj iqjx',
  }
});

const otpStorage = new Map();

// Corrected the routes with a leading slash
app.post('/api/send-otp', async (req, res) => {
  const { email } = req.body;

  const otp = Math.floor(Math.random() * 9999);

  otpStorage.set(email, otp);

  const mailOptions = {
    from: 'mightguy7.2000@gmail.com',
    to: email,
    subject: 'Your OTP',
    text: `Your OTP is: ${otp}`, // Use backticks here
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});
