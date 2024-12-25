import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    host:process.env.SMTP_PROVIDER,
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });