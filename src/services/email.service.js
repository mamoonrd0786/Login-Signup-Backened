const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN
    }
})

transporter.verify((error, success) => {
    if (error) {
        console.error('Error connecting to email server:', error);
    } else {
        console.log('Email server is ready to send messages');
    }
});

const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: `"Signup Login" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html,
        });
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

async function sendRegistrationEmail(userEmail, name) {
    const subject = "Your registration is successful";
    const text = `Hello ${name} welcome to our website. Your registration is successful. Thank you for joining us! We are excited to have you on board.`;
    const html = `<p>Hello ${name},</p><p>Welcome to our website. Your registration is successful. Thank you for joining us! We are excited to have you on board.</p><p>If you have any questions or need assistance, feel free to reach out to our support team.</p><p>Best regards,<br>The Signup Login Team.</p> <p style="font-size: 12px; color: gray;">This is an automated message, please do not reply.</p>`;

    await sendEmail(userEmail, subject, text, html);
}

module.exports = { sendRegistrationEmail };