const express = require("express"); // Import the Express framework
const db = require("../../config/db"); // Import the database configuration
const router = express.Router(); // Create a new router instance

// Define a POST route to fetch finished campaigns
router.post("/fetchFinishedCampaigns", (req, res) => {
    // Get the current date and time in the format 'YYYY-MM-DD HH:MM:SS'
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')} ${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')}`;
  
    // Query to fetch only campaigns that have already ended
    db.query(
      "SELECT * FROM campaigns WHERE end_date < ?", // SQL query to select campaigns where end_date is less than the current date and time
      [formattedDate], // Pass the current date and time as a parameter to prevent SQL injection
      (err, results) => {
        if (err) {
          return res.send({ success: false, message: "Error en el servidor" }); // Handle error response
        }
  
        if (results.length === 0) {
          return res.send({
            success: false,
            message: "No hay campañas finalizadas", // Respond if no finished campaigns are found
          });
        }
  
        return res.send({
          success: true,
          message: "fetchFinishedCampaigns success", // Successful response with results
          results,
        });
      }
    );
});

// Export the router
module.exports = router; // Make the router available for use in other files
