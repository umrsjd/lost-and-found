const express = require('express');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    "https://lost-and-found-drab-phi.vercel.app",
    process.env.FRONTEND_URL,
    "http://localhost:5173",
    "http://localhost:5000"
  ],
  credentials: true
}));
app.use(express.json());

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Store OTPs temporarily (in production, use a database)
const otpStore = new Map();

// Generate OTP endpoint
app.post('/api/generate-otp', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store OTP with 5 minutes expiry
    otpStore.set(email, {
      otp,
      expiry: Date.now() + 300000 // 5 minutes
    });

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP for Lost & Found App',
      text: `Your OTP is: ${otp}. This OTP will expire in 5 minutes.`
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

// Verify OTP endpoint
app.post('/api/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  
  const storedData = otpStore.get(email);
  if (!storedData) {
    return res.status(400).json({ error: 'No OTP found for this email' });
  }

  if (Date.now() > storedData.expiry) {
    otpStore.delete(email);
    return res.status(400).json({ error: 'OTP expired' });
  }

  if (storedData.otp !== otp) {
    return res.status(400).json({ error: 'Invalid OTP' });
  }

  // Clear OTP after successful verification
  otpStore.delete(email);

  // Generate JWT token
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '24h' });
  
  res.json({ token });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});