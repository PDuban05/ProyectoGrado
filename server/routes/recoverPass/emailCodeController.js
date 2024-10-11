const express = require("express"); // Import the Express framework
const nodemailer = require("nodemailer"); // Import Nodemailer for sending emails
const db = require("../../config/db"); // Import the database configuration
const { generateVerificationCode } = require("../../utils/helper"); // Import a helper function to generate verification codes

const router = express.Router(); // Create a new router instance

// Define a POST endpoint for sending a verification code
router.post("/send-verification-code", (req, res) => {
    const { email } = req.body; // Destructure the email from the request body
  
    if (!email) {
      return res.send({ success: false, message: "Email es requerido" }); // Return an error if no email is provided
    }
  
    // SQL query to find the user by email
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
      if (err) {
        return res.send({ success: false, message: "Error en el servidor" }); // Return an error if there is a server error
      }
  
      if (results.length === 0) {
        // If the user is not found
        return res.send({
          success: false,
          message: "Correo electrónico no registrado", // Return an error if the email is not registered
        });
      }
    });
  
    // If the user exists, generate and send the verification code
    const verificationCode = generateVerificationCode(); // Generate a verification code
  
    db.query(
      "UPDATE users SET verification_code = ? WHERE email = ?", // Update the user's verification code in the database
      [verificationCode, email],
      (err, updateResult) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error al actualizar el código de verificación", // Return an error if there is an issue updating the verification code
          });
        }
      }
    );
  
    // Create a transporter for sending the verification email
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Use secure connection
      auth: {
        user: "pedroduban15@gmail.com", // Sender's email
        pass: "noui extw xilf voaz", // Sender's email password
      },
    });
  
    // HTML content for the verification email
    const verificationEmailHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f6f6f6;
        color: #333;
        margin: 0;
        padding: 0;
        line-height: 1.6;
      }
      .container {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        padding: 10px 0;
      }
      .header img {
        max-width: 100px;
      }
      .content {
        text-align: center;
        padding: 20px;
      }
      .content h1 {
        font-size: 24px;
        margin-bottom: 10px;
        color: #333;
      }
      .content p {
        font-size: 16px;
        margin-bottom: 30px;
        color: #666;
      }
      .verification-code {
        display: inline-block;
        font-size: 32px;
        letter-spacing: 4px;
        margin-bottom: 20px;
        padding: 10px 20px;
        border-radius: 5px;
        background-color: #f1f1f1;
        border: 1px solid #ddd;
        color: #333;
      }
      .footer {
        text-align: center;
        font-size: 14px;
        color: #999;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img src="https://firebasestorage.googleapis.com/v0/b/prueba-4dd37.appspot.com/o/votayalogo.png?alt=media&token=733bf5d9-6eb6-4568-9a90-0ce9e3a018e3" alt="Company Logo">
      </div>
      <div class="content">
        <h1>Verificación de cuenta</h1>
        <p>Tu código de verificación es:</p>
        <div class="verification-code">${verificationCode}</div>
        <p>Por favor, introduce este código en la aplicación para continuar.</p>
      </div>
      <div class="footer">
        <p>Si no solicitaste este código, puedes ignorar este mensaje.</p>
        <p>&copy; 2024 VotaOnline. Todos los derechos reservados.</p>
      </div>
    </div>
  </body>
  </html>
  `;
  
    // Send the verification email
    transporter.sendMail(
      {
        from: '"Soporte 👻" <dominicode.xyz@gmail.com>', // Sender
        to: email, // Recipient (the email provided by the user)
        subject: "Código de verificación", // Subject of the email
        text: `Tu código de verificación es: ${verificationCode}`, // Plain text of the email
        html: verificationEmailHtml, // HTML body of the email
      },
      (error, info) => {
        if (error) {
          return res.status(500).send({
            success: false,
            message: "Error enviando el correo electrónico", // Return an error if there is an issue sending the email
          });
        }
  
        return res.send({
          success: true,
          message: "Código de verificación enviado", // Return success message after sending the email
        });
      }
    );
  });

// Export the router
module.exports = router;
