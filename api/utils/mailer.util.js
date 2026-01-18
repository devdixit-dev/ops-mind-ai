import 'dotenv/config';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_URI,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const sendEmail = async (to, subject, html) => {
  try{
    await transporter.sendMail({
      to, subject, html
    });
  }
  catch(error) {
    console.error(`Error in sending email util: ${error}`);
    return null;
  }
}

export default sendEmail;