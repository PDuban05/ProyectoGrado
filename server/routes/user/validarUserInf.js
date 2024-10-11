// Importing necessary modules
const express = require("express"); // Importing express framework
const db = require("../../config/db"); // Importing database configuration
const router = express.Router(); // Creating an instance of the express router

// Route to validate user information
router.post("/validarUserInf", (req, res) => {
    // Destructuring the request body to get person_id
    const {
      person_id,
    } = req.body;
  
    // Check if person_id is provided and valid
    if (!person_id) {
      return res.send({
        success: false,
        message: "ID not provided or invalid.", // Error message if ID is missing
      });
    }
  
    // SQL query to get current user data based on person_id
    const selectQuery = "SELECT * FROM person WHERE person_id = ?";
  
    // Executing the SQL query
    db.query(selectQuery, [person_id], (err, results) => {
      if (err) {
        // Sending error response if there is a server error while fetching user data
        return res.send({
          success: false,
          message: "Server error while fetching user data.",
          error: err, // Including error details
        });
      }
  
      // Check if any user data is found
      if (results.length === 0) {
        return res.send({
          success: false,
          message: "User not found.", // Error message if user does not exist
        });
      }
  
      const currentData = results[0]; // Storing the retrieved user data
  
      // Validating existing data in the database
      if (
        !currentData.national_id_number ||
        !currentData.first_name ||
        !currentData.last_name ||
        !currentData.gender ||
        !currentData.phone_number ||
        !currentData.address ||
        !currentData.city ||
        !currentData.state ||
        !currentData.country ||
        !currentData.occupation ||
        !currentData.education_level ||
        !currentData.marital_status ||
        !currentData.citizenship_status
      ) {
        return res.send({
          success: false,
          message: "Existing data in the database is not valid.", // Error message for invalid data
        });
      }
  
      // Sending success response if all validations pass
      return res.send({
        success: true,
        message: "Data is valid.",
      });
    });
  });

// Export the router for use in other parts of the application
module.exports = router;
