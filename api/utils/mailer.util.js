import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.MAILJET_URI,
  port: Number(process.env.MAILJET_PORT),
  auth: {
    user: process.env.MAILJET_USER,
    pass: process.env.MAILJET_PASS
  }
});

const sendEmail = async (to, subject, html) => {
  try{
    console.log(process.env.MAILJET_URI, process.env.MAILJET_PORT, process.env.MAILJET_USER, process.env.MAILJET_PASS);

    await transporter.sendMail({
      from: process.env.AUTHOR_EMAIL,
      to, subject, html
    });
  }
  catch(error) {
    console.error(`Error in sending email util: ${error}`);
    return null;
  }
}

export default sendEmail;