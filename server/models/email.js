const nodemailer = require('nodemailer');

async function sendEmail(to, subject, text, html) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'lethinghinh1966@gmail.com',
            pass: 'lethinghinh',
        },
    });

    const info = await transporter.sendMail({
        from: 'lethinghinh1966@gmail.com',
        to,
        subject,
        text,
        html,
    });

    return info;
}

module.exports = sendEmail;
