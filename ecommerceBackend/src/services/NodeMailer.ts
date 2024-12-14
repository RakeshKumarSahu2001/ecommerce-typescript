import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: "81c3bb001@smtp-brevo.com",
      pass: "V0XR714FIGhyOBfA",
    },
  });

