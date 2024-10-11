const express = require("express"); // Import the express module
const db = require("../../config/db"); // Import the database configuration

const router = express.Router(); // Create a new router object

// Define a POST route to fetch active campaigns
router.post("/fetchActiveCampaigns", (req, res) => {
    // Get the current date in a format compatible with SQL
    const currentDate = new Date().toISOString().split("T")[0]; // Format 'YYYY-MM-DD'
  
    // Query to get only the campaigns that are currently active
    db.query(
      "SELECT * FROM campaigns WHERE start_date <= ? AND end_date >= ?",
      [currentDate, currentDate],
      (err, results) => {
        if (err) {
          // If there's an error, send a response indicating a server error
          return res.send({ success: false, message: "Error en el servidor" });
        }
  
        if (results.length === 0) {
          // If no active campaigns are found, send a response indicating so
          return res.send({
            success: false,
            message: "No hay campañas activas actualmente",
          });
        }
  
        // If active campaigns are found, send them in the response
        return res.send({
          success: true,
          message: "fetchActiveCampaigns success",
          results,
        });
      }
    );
});

// Export the router
module.exports = router;
