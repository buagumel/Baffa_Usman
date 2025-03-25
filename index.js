import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import env from "dotenv";


 
const app = express();
const port = process.env.PORT || 3000 || 4000;
env.config();

 

app.use(express.json());
  app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get("/", (req, res)=>{

    res.render("index.html");

});



app.post("/contact-me", async (req, res) => {
  const { name, email, subject, message } = req.body;

  console.log(req.body);

  if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required." });
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
      html: `<h4>Name:</h3> ${name} <h4>Message:</h4> <p>${message}</p> <h4>Email:</h4> ${email}`,
  };

  try {
      await transporter.sendMail(mailOptions);
      console.log("Mail sent successfully!");

      return res.status(200).json({ success: true, message: "Your message has been sent successfully!" });
  } catch (error) {
      console.error("Error sending email:", error);

      return res.status(500).json({ success: false, message: "Failed to send email. Please try again later." });
  }
});

     


app.listen(port, ()=>{
    console.log(`Server running at ${port}...`);
});





