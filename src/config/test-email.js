const nodemailer = require("nodemailer");
const { EMAIL } = require('./credentials');
const logger = require('./logger');
const router = require('express').Router();

router.get('/test-email', async (req, res, next) => {
    if (process.env.NODE_ENV === "development") {
        let transporter = await nodemailer.createTransport({
            host: EMAIL.HOST,
            port: EMAIL.PORT,
            secureConnection: EMAIL.SECURE,
            // requireTLS: true,
            auth: {
                user: EMAIL.USERNAME,
                pass: EMAIL.PASSWORD
            },
            tls: {
                ciphers: 'SSLv3'
            }
        });
        const mailOptions = {
            from: EMAIL.USERNAME,
            to: EMAIL.TEST,
            subject: "Test Email - ORR",
            html: `
            <strong>This is a test email. Please, delete the mail after receiving it
                `
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                logger.error(error);
                res.send("Unsuccessful!!");
            } else {
                res.send("Successful! Check your email!!!");
            }
        });
    } else {
        res.send("Cannot test email during production!")
    }
});

module.exports = router;