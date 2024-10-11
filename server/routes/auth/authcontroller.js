const express = require("express"); // Import the express framework
const db = require("../../config/db"); // Import the database configuration

const router = express.Router(); // Create a new router instance

// Route to authenticate user
router.post("/ValidarToken", (req, res) => {
    const { token } = req.body; // Extract token from the request body
    // Check if the token is empty or null
    if (!token) {
      return res.send({
        success: false, // Send a response indicating failure
      });
    }
    // SQL query to get the user and their personal information using the token
    db.query(
      `SELECT users.*, person.first_name, person.last_name, person.profile_picture_url
       FROM users
       JOIN person ON users.person_id = person.person_id
       WHERE users.token = ?`, // Query to fetch user data based on the token
      [token],
      (err, results) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error en el servidor", // Send a server error message
          });
        }
  
        if (results.length === 0) {
          // If no user is found or the token is invalid
          return res.send({
            success: false,
            message: "Token no válido", // Send an invalid token message
          });
        }
  
        const user = results[0]; // Get the user data from results
  
        return res.send({
          success: true,
          message: "Autenticación exitosa", // Send a success message
          user: {
            id: user.user_id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            token: user.token,
            role: user.role,
            profilePicture: user.profile_picture_url,
            isVerified: user.is_verified
          },
        }); // Send the authenticated user data in the response
      }
    );
  });

// Export the router
module.exports = router; // Make the router available for use in other parts of the application
