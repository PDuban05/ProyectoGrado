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
 
    // SQL query to find the user by verification code in the verification table
    db.query(
      "SELECT user_id FROM verification WHERE verification_code = ?",
      [code.code], // Using the provided verification code
      (err, results) => {
        if (err) {
          return res
            .status(500) // Sending a 500 Internal Server Error response
            .send({ success: false, message: "Error en el servidor" }); // Server error message
        }
  
        // Check if the code is invalid (no match found)
        if (results.length === 0) {
          return res
            .status(400) // Sending a 400 Bad Request response
            .send({ success: false, message: "El código no es válido" }); // Message indicating invalid code
        }
  
        // The code is valid, obtaining the user_id from the verification table
        const user_id = results[0].user_id;
  
        // Now, use the user_id to find the user details in the users table
        db.query(
          "SELECT * FROM users WHERE user_id = ?",
          [user_id], // Using the user_id obtained from the verification table
          (err, userResults) => {
            if (err) {
              return res
                .status(500) // Sending a 500 Internal Server Error response
                .send({ success: false, message: "Error al obtener los datos del usuario" }); // Error fetching user data
            }
  
            // Check if the user exists (should always be true if the user_id is valid)
            if (userResults.length === 0) {
              return res
                .status(400) // Sending a 400 Bad Request response
                .send({ success: false, message: "Usuario no encontrado" }); // Message indicating user not found
            }
  
            // The user exists, proceed to update the user's status in the users table
            const user = userResults[0]; // Getting the user from the query result
            const verificationDate = new Date(); // Current date for verification
  
            // Update the user: mark as verified in the users table
            db.query(
              "UPDATE users SET is_verified = 1 WHERE user_id = ?",
              [user.user_id], // Updating the user verification status in the users table
              (err) => {
                if (err) {
                  return res
                    .status(500) // Sending a 500 Internal Server Error response
                    .send({ success: false, message: "Error al actualizar el estado de verificación del usuario" }); // Update error message
                }
  
                // Update the verification table: remove the verification code and set the verification date
                db.query(
                  "UPDATE verification SET verification_code = null, verification_date = ? WHERE user_id = ?",
                  [verificationDate, user.user_id], // Updating the verification table with the current date and user_id
                  (err) => {
                    if (err) {
                      return res
                        .status(500) // Sending a 500 Internal Server Error response
                        .send({ success: false, message: "Error al actualizar la verificación en la tabla de verificación" }); // Verification table update error message
                    }
  
                    // Sending updated user information without the verification code
                    return res.send({ success: true, message: "Cuenta verificada correctamente", user }); // Successful verification message
                  }
                );
              }
            );
          }
        );
      }
    );
  });

// Export the router
module.exports = router; // Exporting the router for use in other parts of the application
