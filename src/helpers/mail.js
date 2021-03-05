const nodemailer = require("nodemailer");

class SendMail {
  constructor() {
    this.transport = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: `${process.env.NODEMAILER_EMAIL}`,
        pass: `${process.env.NODEMAILER_PASSWORD}`,
      },
    });
  }
  async sendEmailForVerification(user) {
    const verificationLink = `${process.env.DOMAIN_ADDRESS}/auth/verify/${user.verificationToken}`;
    return this.transport.sendMail({
      from: "peter.ivanovskij@gmail.com",
      to: `${user.email}`,
      subject: "nodemailer",
      html: `<h1> Перейдите по ссылке <a href="${verificationLink}">link</a> для подтверждения e-mail </p>`,
    });
  }
}
exports.mail = new SendMail();
