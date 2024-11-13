const express = require("express"); // Import the express module
const db = require("../../config/db"); // Import the database configuration

const router = express.Router(); // Create a new router object

// Define a POST route to fetch active campaigns
router.post("/fetchActiveCampaigns", (req, res) => {
    // Get the current date and time in the format 'YYYY-MM-DD HH:MM:SS'
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')}`;
  
    // Query to get only the campaigns that are currently active
    db.query(
      "SELECT * FROM campaigns WHERE start_date <= ? AND end_date >= ?",
      [formattedDate, formattedDate],
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
