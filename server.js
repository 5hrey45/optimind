const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const { mail, recipientEmail } = require('./config');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public')); // Serve static files

// Create a transporter using environment variables from Vercel
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

app.post('/send-email', (req, res) => {
    const { name, email, phone, message } = req.body;

    const mailOptions = {
        from: mail.user,
        to: recipientEmail,
        subject: `Contact Form Submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ success: false, error: 'Error sending email.' });
        }
        console.log('Email sent:', info.response);
        res.status(200).json({ success: true });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
