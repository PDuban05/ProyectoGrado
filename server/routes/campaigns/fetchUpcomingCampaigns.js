const express = require("express"); // Import the express library
const db = require("../../config/db"); // Import the database configuration

const router = express.Router(); // Create a new router object

// Define a POST route to fetch upcoming campaigns
router.post("/fetchUpcomingCampaigns", (req, res) => {
    // Get the current date and time in the format 'YYYY-MM-DD HH:MM:SS'
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')}`;
  
    // Query to fetch only the campaigns that have not started yet
    db.query(
      "SELECT * FROM campaigns WHERE start_date > ?", // SQL query to select campaigns with a start date greater than the current date and time
      [formattedDate], // Current date and time as a parameter for the query
      (err, results) => { // Callback function to handle the query result
        if (err) {
          return res.send({ success: false, message: "Server error" }); // Send an error response if there's a database error
        }
  
        if (results.length === 0) {
          return res.send({
            success: false,
            message: "No upcoming campaigns to display", // Send a message if there are no upcoming campaigns
          });
        }
  
        return res.send({
          success: true,
          message: "fetchUpcomingCampaigns success", // Send a success message along with the results
          results,
        });
      }
    );
});

// Export the router for use in other parts of the application
module.exports = router;
