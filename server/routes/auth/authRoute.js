


const express = require("express"); // Import Express framework
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing
const db = require("../../config/db"); // Import database configuration
const { isValidTokenStructure } = require("../../utils/helper"); // Import utility function to validate token structure
require('dotenv').config();
const router = express.Router(); // Create a new router object
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY; // Get secret key from environment variables

// Route to authenticate user
router.post("/authUser", (req, res) => {
  const { email, password, rememberMe, userType } = req.body; // Destructure request body to get email, password, rememberMe, and userType

  // Verify that email and password have been provided
  if (!email || !password) {
    return res.status(400).send({
      success: false,
      message: "Email y contraseña son requeridos", // Error message for missing email/password
    });
  }

  // SQL query to find the user by email and retrieve their hashed password
  db.query(
    `SELECT users.*, person.first_name, person.last_name, person.profile_picture_url
    FROM users
    JOIN person ON users.person_id = person.person_id
    WHERE users.email = ?`,
    [email],
    (err, results) => {
      if (err) {
        return res.send({
          success: false,
          message: "El email no fue encontrado", // Error message for server issues
        });
      }

      if (results.length === 0) {
        // If no user is found
        return res.send({
          success: false,
          message: "Email o contraseña incorrectos", // Error message for incorrect email/password
        });
      }

      const user = results[0]; // Get the first user from results

      // Compare the provided password with the stored hash
      bcrypt.compare(password, user.password_hash, (err, isMatch) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error al comparar contraseñas", // Error message for password comparison issues
          });
        }

        if (!isMatch) {
          // If passwords do not match
          return res.send({
            success: false,
            message: "Email o contraseña incorrectos", // Error message for incorrect email/password
          });
        }

        // Get the role from user_roles and roles tables
        db.query(
          "SELECT roles.role FROM user_roles JOIN roles ON user_roles.role_id = roles.role_id WHERE user_roles.user_id = ?",
          [user.user_id],
          (err, roleResult) => {
            if (err) {
              return res.send({
                success: false,
                message: "Error al obtener el rol", // Error message for role retrieval issues
              });
            }

            if (roleResult.length === 0) {
              return res.send({
                success: false,
                message: "Rol no encontrado", // Error message for missing role
              });
            }

            // Get the role name
            const role = roleResult[0].role;

            // Update last login time
            db.query(
              "UPDATE users SET last_login = NOW() WHERE user_id = ?",
              [user.user_id],
              (err) => {
                if (err) {
                  return res.send({
                    success: false,
                    message: "Error al actualizar la fecha de último inicio de sesión", // Error message for updating last login time
                  });
                }
              }
            );

            // Check if the user already has a token
            if (user.token && isValidTokenStructure(user.token)) {
              // If a valid token exists, return it along with user information
              return res.send({
                success: true,
                message: "Autenticación exitosa", // Success message for authentication
                user: {
                  id: user.user_id,
                  firstName: user.first_name,
                  lastName: user.last_name,
                  email: user.email,
                  token: user.token,
                  remember: rememberMe,
                  role: role,
                  profilePicture: user.profile_picture_url,
                  isVerified: user.is_verified,
                },
              });
            } else {
              // If no valid token exists, generate a new one
              const token = jwt.sign(
                { id: user.id, email: user.email }, // Payload with user information for the token
                SECRET_KEY,
                { expiresIn: rememberMe ? "10000d" : "0.15h" } // Token expiration based on rememberMe flag
              );

              // Update the 'token' field in the database
              db.query(
                "UPDATE users SET token = ? WHERE user_id = ?",
                [token, user.user_id],
                (err, result) => {
                  if (err) {
                    return res.send({
                      success: false,
                      message: "Error al actualizar el token", // Error message for updating token
                    });
                  }

                  // Return the response with the token and user information
                  res.send({
                    success: true,
                    message: "Autenticación exitosa", // Success message for authentication
                    user: {
                      id: user.user_id,
                      firstName: user.first_name,
                      lastName: user.last_name,
                      email: user.email,
                      token: token,
                      remember: rememberMe,
                      role: role,
                      profilePicture: user.profile_picture_url,
                      isVerified: user.is_verified,
                    },
                  });
                }
              );
            }
          }
        );
      });
    }
  );
});

// Export the router
module.exports = router; // Export the router for use in other files
