const nodemailer = require('nodemailer');
const AppError = require('./appError');

// Create a transporter object using SMTP transport
// const transporter = nodemailer.createTransport({
//   host: process.env.MAILER_SEND_SMTP_SERVER,
//   port: process.env.MAILER_SEND_SMTP_PORT,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: process.env.MAILER_SEND_SMTP_USERNAME,
//     pass: process.env.MAILER_SEND_SMTP_PASSWORD,
//   },
// });

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  // port: 465,
  secure: true,
  type: 'SMTP',
  service: 'gmail',
  auth: {
    user: `${process.env.SMTP_GMAIL_MAIL}`,
    pass: `${process.env.SMTP_GMAIL_MAIL_APP_PASSWORD}`,
    // pass: 'ntfnbgiaarysplbz',
  },
});

module.exports = class NewMail {
  constructor(userName, userEmailAddr, verificationCode) {
    this.recipientName = userName;
    this.recipietEmailAddress = userEmailAddr;
    this.verificationCode = verificationCode;
    this.mailOptions = {};
  }

  verificationEmail() {
    this.mailOptions = {
      from: `"Whats-the-pay" <${process.env.SMTP_GMAIL_MAIL}>`, // sender address
      to: this.recipietEmailAddress, // list of receivers
      subject: 'Verfiy your Email Address', // Subject line
      //   text: `Thanks for signup with us!. To complete your Whats-The-Pay account setup, you need to verify your email address. Your verification code is ${552244}.`, // plain text body
      html: `
          <p>Thanks for signing up with us!</p>
          <p>To complete your Whats-The-Pay account setup, you need to verify your email address.</p>
          <h3> Your verification code is ${this.verificationCode}.</h3>
          <h4>This verification code expires in 10 minutes.</h4>

          <p>Wishing you the best </p>
          <h4>Whats-the-pay Team </h4>

          <strong>NOTE: This email might be listed in spam, Since it is used for development purpose</strong>
        `, // html body
    };

    return this;
  }

  async send() {
    return await transporter.sendMail(this.mailOptions);
  }
};
