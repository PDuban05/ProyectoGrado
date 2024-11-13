const nodemailer = require("nodemailer"); // Import Nodemailer for sending emails
const db = require("../../config/db"); // Import the database configuration

// Function to send a digital signature via email
const sendSignatureEmail = (email, firmaDigital, campaignName, voteDate, voteTime) => {

  // console.log(email,firmaDigital)
  
  return new Promise((resolve, reject) => {
    if (!email || !firmaDigital) {
      return reject({ success: false, message: "Email y firma digital son requeridos" }); // Check if email and digital signature are provided
    }

    // SQL query to find the user by email
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
      // if (err) {
      //   return reject({ success: false, message: "Error en el servidor" }); // Handle server errors
      // }

      // if (results.length === 0) {
      //   // If the user is not found
      //   return reject({
      //     success: false,
      //     message: "Correo electrónico no registrado", // Return error if email is not registered
      //   });
      // }

      // Create a transporter for sending the email
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // Use secure connection
        auth: {
          user: "pedroduban15@gmail.com", // Sender's email
          pass: "noui extw xilf voaz", // Sender's email password
        },
      });

      // HTML content for the signature email
      const signatureEmailHtml =  `
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
          .signature-code {
            display: inline-block;
            font-size: 18px;
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
            <h1>Firma digital de tu voto</h1>
            <p>La firma digital de tu voto es:</p>
            <div class="signature-code">${firmaDigital}</div>
            <p>Gracias por participar en las elecciones. Esta firma garantiza la autenticidad de tu voto.</p>
          </div>
          <div class="footer">
            <p>Si no has ejercido este voto, por favor contacta al soporte.</p>
            <p>&copy; 2024 VotaOnline. Todos los derechos reservados.</p>
          </div>
        </div>
      </body>
      </html>
    `;


      // Send the email with the digital signature
      transporter.sendMail(
        {
          from: '"Soporte 👻" <dominicode.xyz@gmail.com>', // Sender
          to: email, // Recipient (the email provided by the user)
          subject: "Firma digital de tu voto", // Subject of the email
          text: `La firma digital de tu voto es: ${firmaDigital}`, // Plain text of the email
          html: signatureEmailHtml, // HTML body of the email
        },
        (error, info) => {
          if (error) {
            return reject({
              success: false,
              message: "Error enviando el correo electrónico", // Handle email sending error
            });
          }

           // Update the votes table to set email_notification to "SENT"
           db.query("UPDATE votes SET email_notification = ? WHERE digital_signature = ?", ["SENT", firmaDigital], (updateError) => {
            if (updateError) {
              console.error("Error updating vote notification status:", updateError);
              // Handle the error if the update fails, but still resolve the promise as success
            }
          });

          return resolve({
            success: true,
            message: "Firma digital enviada exitosamente", // Success message after sending the email
          });
        }
      );
    });
  });
};

// Export the function
module.exports = sendSignatureEmail;
