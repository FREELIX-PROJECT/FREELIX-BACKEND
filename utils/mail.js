import { createTransport } from "nodemailer";

export const mailTransporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "freelix.inc@gmail.com",
        pass: process.env.MAIL_PASS_KEY
    },
    from: "freelix.inc@gmail.com"
})