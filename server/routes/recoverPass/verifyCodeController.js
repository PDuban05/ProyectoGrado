const express = require("express"); // Importing the express framework
const db = require("../../config/db"); // Importing the database configuration
const router = express.Router(); // Creating an Express router

// POST endpoint for verifying the verification code
router.post("/verify-code", (req, res) => {
    const { code } = req.body; // Destructuring the code from the request body
  
    // Check if the code is provided
    if (!code) {
      return res
        .status(400) // Sending a 400 Bad Request response
        .send({ success: false, message: "El código es requerido" }); // Message indicating code is required
    }
  
    // SQL query to find the user by verification code
    db.query(
      "SELECT * FROM users WHERE verification_code = ?",
      [code.code], // Using the provided verification code
      (err, results) => {
        if (err) {
          return res
            .status(500) // Sending a 500 Internal Server Error response
            .send({ success: false, message: "Error en el servidor" }); // Server error message
        }
  
        // Check if the code is invalid (user not found)
        if (results.length === 0) {
          return res
            .status(400) // Sending a 400 Bad Request response
            .send({ success: false, message: "El código no es válido" }); // Message indicating invalid code
        }
  
        // The code is valid, obtaining user information
        const user = results[0]; // Getting the user from the query result
  
        // Update the user: remove the verification code, mark as verified, and set the verification date
        const verificationDate = new Date(); // Current date
        db.query(
          "UPDATE users SET verification_code = null, is_verified = 1, verification_date = ? WHERE user_id = ?",
          [verificationDate, user.user_id], // Updating with the current date and user ID
          (err) => {
            if (err) {
              return res
                .status(500) // Sending a 500 Internal Server Error response
                .send({ success: false, message: "Error al actualizar el estado del usuario" }); // Update error message
            }
  
            // Sending updated user information without the verification code
            return res.send({ success: true, message: "Cuenta verificada correctamente", user }); // Successful verification message
          }
        );
      }
    );
  });

// Export the router
module.exports = router; // Exporting the router for use in other parts of the application
