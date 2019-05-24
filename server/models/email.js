const nodemailer = require('nodemailer');

async function sendEmail(to, subject, text, html) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        auth: {
            user: 'tlweb2f5@gmail.com',
            pass: 'trangkhunghaha',
        },
    });

    const info = await transporter.sendMail({
        from: 'tlweb2f5@gmail.com',
        to,
        subject,
        text,
        html,
    });

    return info;
}

module.exports = sendEmail;