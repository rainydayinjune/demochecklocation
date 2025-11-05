const nodemailer = require('nodemailer');
const ejs = require('ejs');

module.exports.sendEmail = (mailAddressee, subject, emailTemplate, templateData) => {
    let from = `Sample <${process.env.MAIL_ADDRESS}>`;

    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.MAIL_ADDRESS,
            pass: process.env.APP_PASSWORD
        },
        from: from
    });

    const html = ejs.render(emailTemplate, templateData);
    let mailOptions = {
        from: from,
        to: mailAddressee,
        subject: subject,
        html: html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred:', error.message);
            return;
        }
        console.log('Email sent successfully!');
    });
}
