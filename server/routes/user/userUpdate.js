// Importing necessary modules
const express = require("express"); // Importing express framework for handling HTTP requests
const db = require("../../config/db"); // Importing the database configuration for querying the database
const router = express.Router(); // Creating an instance of the express router

// Route to update user information
router.post("/UpdateUserInf", (req, res) => {
    // Destructuring the request body to get user information
    const {
        person_id, 
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
        program
    } = req.body;

    // Check if the person_id is provided and valid
    if (!person_id) {
        return res.send({
            success: false,
            message: "ID not provided or invalid.",
        });
    }

    // Step 1: Check if the location already exists
    const locationQuery = `
      SELECT location_id FROM locations 
      WHERE country = ? AND state = ? AND city = ?
    `;
    
    db.query(locationQuery, [country, state, city], (err, locationResults) => {
        if (err) {
            return res.send({
                success: false,
                message: "Error checking location.",
                error: err,
            });
        }

        let locationId;

        if (locationResults.length > 0) {
            // Location exists, retrieve location_id
            locationId = locationResults[0].location_id;
            updateUserInfo(locationId); // Proceed to update user information
        } else {
            // Location doesn't exist, insert new location
            const insertLocationQuery = `
              INSERT INTO locations (country, state, city) 
              VALUES (?, ?, ?)
            `;
            
            db.query(insertLocationQuery, [country, state, city], (err, insertResults) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: "Error inserting new location.",
                        error: err,
                    });
                }

                // New location created, retrieve the new location_id
                locationId = insertResults.insertId;
                updateUserInfo(locationId); // Proceed to update user information
            });
        }
    });

    // Step 2: Update user information in the 'person' table with the location_id
    function updateUserInfo(locationId) {
        const query = `
          UPDATE person 
          SET national_id_number = ?, 
              first_name = ?, 
              last_name = ?, 
              date_of_birth = ?, 
              gender_id = ?, 
              phone_number = ?, 
              address = ?, 
              location_id = ?,  
              profile_picture_url = ?, 
              occupation_id = ?, 
              education_level_id = ?, 
              marital_status_id = ?, 
              program_id = ?
          WHERE person_id = ?
        `;

        const params = [
            national_id_number,
            first_name,
            last_name,
            date_of_birth,
            gender,
            phone_number,
            address,
            locationId, // Using the location_id from either existing or new location
            profile_picture_url,
            occupation,
            education_level,
            marital_status,
            program,
            person_id,
        ];

        db.query(query, params, (err, results) => {
            if (err) {
                return res.send({
                    success: false,
                    message: "Server error while updating user.",
                    error: err,
                });
            }

            if (results.affectedRows === 0) {
                return res.send({
                    success: false,
                    message: "User does not exist or could not be updated.",
                });
            }

            return res.send({
                success: true,
                message: "User data updated successfully.",
            });
        });
    }
});

// Exporting the router for use in other parts of the application
module.exports = router;
