const express = require("express"); // Import Express for creating the router
const bcrypt = require("bcrypt"); // Import bcrypt for hashing passwords
const db = require("../../config/db"); // Import the database configuration
const router = express.Router(); // Create an Express router

// Define a POST endpoint for changing the password
router.post("/change-password", (req, res) => {
    const { userId, newPassword } = req.body; // Extract user ID and new password from the request body
    const saltRounds = 10; // Define the number of salt rounds for hashing
    const password = newPassword.password // Get the actual new password
  
    // First, retrieve the user's current password
    const selectQuery = "SELECT password_hash FROM users WHERE user_id = ?";
    db.query(selectQuery, [userId], (err, results) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error al obtener la contraseña actual", // Error message for fetching current password
        });
      }
  
      if (results.length === 0) {
        return res.send({ success: false, message: "Usuario no encontrado" }); // User not found
      }
  
      const currentHashedPassword = results[0].password_hash; // Get the hashed current password
  
      // Compare the new password with the current one
      bcrypt.compare(password, currentHashedPassword, (err, isMatch) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error al comparar las contraseñas", // Error message for password comparison
          });
        }
  
        if (isMatch) {
          return res.send({
            success: false,
            message: "La nueva contraseña no puede ser igual a la actual", // New password cannot be the same as current
          });
        }
  
        // If the new password is different, hash it and update
        bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
          if (err) {
            return res.send({
              success: false,
              message: "Error al hashear la contraseña", // Error message for hashing the password
            });
          }
  
          const updateQuery =
            "UPDATE users SET password_hash = ? WHERE user_id = ?"; // Prepare the update query
          db.query(updateQuery, [hashedPassword, userId], (err, result) => {
            if (err) {
              return res.send({
                success: false,
                message: "Error al actualizar la contraseña", // Error message for updating the password
              });
            }
  
            if (result.affectedRows > 0) {
              return res.send({
                success: true,
                message: "Contraseña actualizada correctamente", // Password updated successfully
              });
            } else {
              return res.send({
                success: false,
                message: "Usuario no encontrado", // User not found
              });
            }
          });
        });
      });
    });
  });
  

  // Export the router
module.exports = router;
