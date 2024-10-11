// Importing necessary modules
const express = require("express"); // Importing express framework for handling HTTP requests
const db = require("../../config/db"); // Importing the database configuration for querying the database
const router = express.Router(); // Creating an instance of the express router

// Route to update user information
router.post("/UpdateUserInf", (req, res) => {
    // Destructuring the request body to get user information
    const {
        person_id, // Unique identifier for the person
        national_id_number, // National ID number of the user
        first_name, // First name of the user
        last_name, // Last name of the user
        date_of_birth, // User's date of birth
        gender, // User's gender
        phone_number, // User's phone number
        address, // User's address
        city, // City where the user resides
        state, // State where the user resides
        country, // Country where the user resides
        profile_picture_url, // URL for the user's profile picture
        occupation, // User's occupation
        education_level, // User's education level
        marital_status, // User's marital status
        citizenship_status, // User's citizenship status
    } = req.body;

    // Check if the person_id is provided and valid
    if (!person_id) {
        return res.send({
            success: false, // Indicating failure
            message: "ID not provided or invalid.", // Message for the client
        });
    }

    // Building the SQL query to update user information
    const query = `
      UPDATE person 
      SET national_id_number = ?, 
          first_name = ?, 
          last_name = ?, 
          date_of_birth = ?, 
          gender = ?, 
          phone_number = ?, 
          address = ?, 
          city = ?, 
          state = ?, 
          country = ?, 
          profile_picture_url = ?, 
          occupation = ?, 
          education_level = ?, 
          marital_status = ?, 
          citizenship_status = ?
      WHERE person_id = ?`; // Specifying the condition for which user to update

    // Parameters to be sent to the query
    const params = [
        national_id_number,
        first_name,
        last_name,
        date_of_birth,
        gender,
        phone_number,
        address,
        city,
        state,
        country,
        profile_picture_url,
        occupation,
        education_level,
        marital_status,
        citizenship_status,
        person_id, // The ID of the person to update
    ];

    // Executing the query to update the user information in the database
    db.query(query, params, (err, results) => {
        if (err) {
            return res.send({
                success: false, // Indicating failure
                message: "Server error while updating user.", // Message for the client
                error: err, // Sending the error details
            });
        }

        // Checking if any rows were affected (i.e., the user exists)
        if (results.affectedRows === 0) {
            return res.send({
                success: false, // Indicating failure
                message: "User does not exist or could not be updated.", // Message for the client
            });
        }

        // Sending success response if the update was successful
        return res.send({
            success: true, // Indicating success
            message: "User data updated successfully.", // Message for the client
        });
    });
});

// Exporting the router for use in other parts of the application
module.exports = router;
