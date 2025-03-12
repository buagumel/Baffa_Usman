import express from "express";
import bodyParser from "body-parser";
import { createTransport } from "nodemailer";
import env from "dotenv";



const app = express();
const port = process.env.PORT || 3000 || 4000;
env.config();




  app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get("/", (req, res)=>{

    res.render("index.html");

});


app.post("/contact-me", async (req, res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;

   

    const transporter = createTransport({
        service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: process.env.G_USER,
        pass: process.env.G_PASSWORD,
      },
    });
    
    
    const mailOptions = {
        from: `"${name}" <${email}>`, 
        to: process.env.USER_MAIL,
        subject: subject,
        html: `<h3> ${message} \n Clients Email: ${email}</h3>` 
        
    };
    
    
    const sendMail = async (transporter, mailOptions)=>{
        try {
    
            await transporter.sendMail(mailOptions);

            console.log("Mail sent successfully!");
            res.status(200).send('Form submission successful');
      
           
        } catch (error) {
    
        console.error(error);
        res.status(200).send(console.log('Form submission unsuccessful'));
       
        }
    }
    
    sendMail(transporter, mailOptions);
            
   


    
})







app.listen(port, ()=>{
    console.log(`Server running at ${port}...`);
});