// Importing necessary modules
const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../../config/db");

// Creating an instance of the express router
const router = express.Router();

// Route to add user
router.post("/addUser", (req, res) => {
  // Destructuring the request body to get user information
  const { firstName, lastName, email, dni, password } = req.body;

  // Check if the email is already registered
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      // Sending error response if there is a server error
      return res.send({ success: false, message: "Server error" });
    }

    // If the email already exists, send a message indicating the user already exists
    if (results.length > 0) {
      return res.send({ success: false, message: "User already exists" });
    }

    // Hash the password before storing it
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
      if (err) {
        // Sending error response if there is an error during password hashing
        return res.send({ success: false, message: "Error hashing password" });
      }

      // Insert user data into the person table
      db.query(
        "INSERT INTO person (first_name, last_name, national_id_number) VALUES (?, ?, ?)",
        [firstName, lastName, dni],
        (err, result) => {
          if (err) {
            // Sending error response if there is an error during user registration
            return res.send({ success: false, message: "Error registering user" });
          }

          // Getting the ID of the newly created person
          const personId = result.insertId;

          // Insert user data into the users table
          db.query(
            "INSERT INTO users (person_id, email, password_hash) VALUES (?, ?, ?)",
            [personId, email, hashedPassword],
            (err) => {
              if (err) {
                // Sending error response if there is an error during user registration
                return res.send({ success: false, message: "Error registering user" });
              }

              // Sending a success response if registration is successful
              res.send({ success: true, message: "Registration successful" });
            }
          );
        }
      );
    });
  });
});

// Export the router for use in other parts of the application
module.exports = router;