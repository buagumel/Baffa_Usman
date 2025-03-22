import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.G_USER,
      pass: process.env.G_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.USER_MAIL,
    subject: subject,
    html: `<h4>Name:</h4> ${name} <h4>Message:</h4> <p>${message}</p> <h4>Email:</h4> ${email}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Mail sent successfully!");

    return res.status(200).json({ success: true, message: "Your message has been sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);

    return res.status(500).json({ success: false, message: "Failed to send email. Please try again later." });
  }
}
