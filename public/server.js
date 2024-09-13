const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const { mail, recipientEmail } = require('./config');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public')); // Serve static files

// Create a transporter using environment variables
const transporter = nodemailer.createTransport({
    host: mail.host,
    port: mail.port,
    secure: false, // true for 465, false for other ports
    auth: {
        user: mail.user,
        pass: mail.pass
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Endpoint to handle email sending
app.post('/send-email', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        // Validate input
        if (!name || !email || !phone || !message) {
            return res.status(400).json({ success: false, error: 'All fields are required.' });
        }

        const mailOptions = {
            from: mail.user,
            to: recipientEmail,
            subject: `Contact Form Submission from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        res.status(200).json({ success: true });

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, error: 'Error sending email.' });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
