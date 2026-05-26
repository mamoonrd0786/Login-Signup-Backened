const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN
    }
})

transporter.verify((error, success) => {
    if (error) {
        console.error('Error connecting to email server:', error);
    } else {
        console.log('Email server is ready to send messages', success);
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
    const subject = `Your registration is successfull ${userEmail}`;
    const text = `Hello ${name} welcome to our website. Your registration is successful. Thank you for joining us! We are excited to have you on board.`;
    const html = `</p><p>If you have any questions or need assistance, feel free to reach out to our support team.</p><p>Best regards,<br>The Signup Login Team.</p> <p style="font-size: 12px; color: gray;">This is an automated message, please do not reply.</p>`;

    await sendEmail(userEmail, subject, text, html);
}

async function sendIssueBookDetails(name, bookName, issueDate, returnDate, userEmail) {
    const subject = `Book issue successfull ${name}`;
    const text = `Hello ${name}
Your book issue is successful. Here are the details of your issued book:\n\nBook Name: ${bookName}\nIssue Date: ${issueDate}\nReturn Date: ${returnDate}\n\nPlease make sure to return the book by the return date to avoid any late fees. If you have any questions or need assistance, feel free to reach out to our support team.\n\nBest regards,\nThe Library Team.`;
const html = `<p>Hello ${name},</p><p>Your book issue is successful. Here are the details of your issued book:</p><ul><li><strong>Book Name:</strong> ${bookName}</li><li><strong>Issue Date:</strong> ${issueDate}</li><li><strong>Return Date:</strong> ${returnDate}</li></ul><p>Please make sure to return the book by the return date to avoid any late fees. If you have any questions or need assistance, feel free to reach out to our support team.</p><p>Best regards,<br>The Library Team.</p> <p style="font-size: 12px; color: gray;">This is an automated message, please do not reply.</p>`;

await sendEmail(userEmail, subject, text, html);
}

module.exports = { sendRegistrationEmail, sendIssueBookDetails };