// config/config.js
module.exports = {
    mail: {
        host: 'smtp.gmail.com',
        port: 587,
        user: process.env.SPRING_MAIL_USERNAME,
        pass: process.env.SPRING_MAIL_PASSWORD,
    },
    recipientEmail: process.env.CONTACT_EMAIL_RECIPIENT,
    encryptorPassword: process.env.JASYPT_ENCRYPTOR_PASSWORD
};
