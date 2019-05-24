const nodemailer = require('nodemailer');

async function sendEmail(to, subject, text, html) {

     // Create a SMTP transporter object
     let transporter = nodemailer.createTransport({
        sendmail: true,
        newline: 'windows',
        logger: false,
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

    console.log('Message sent successfully as %s', info.messageId);

    return info;
}

module.exports = sendEmail;
