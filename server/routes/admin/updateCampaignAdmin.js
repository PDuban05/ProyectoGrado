const express = require("express");
const db = require("../../config/db");
const router = express.Router();

// Define the POST route to update a campaign
router.post("/updateCampaign", (req, res) => {
    const {
      campaignId,   // Campaign ID to identify which campaign to update
      name,         // New name of the campaign
      description,  // New description for the campaign
      startDate,    // New start date of the campaign
      endDate,      // New end date of the campaign
      imageUrl      // New image URL for the campaign
    } = req.body;
  
    // Validate that the campaignId is provided
    if (!campaignId) {
      return res.send({
        success: false,
        message: "ID de campaña no proporcionado o inválido.", // Error if no ID
      });
    }
  
    // SQL query to update the campaign information in the database
    const query = `
      UPDATE campaigns 
      SET name = ?, 
          description = ?, 
          start_date = ?, 
          end_date = ?, 
          image_url = ?
      WHERE campaign_id = ?`;
  
    // Parameters to be passed into the SQL query
    const params = [
      name,
      description,
      startDate,
      endDate,
      imageUrl,
      campaignId,  
    ];
  
    // Execute the database query
    db.query(query, params, (err, results) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error en el servidor al actualizar la campaña.", // Server error
          error: err,
        });
      }
  
      // If no rows were affected, the campaign was not found
      if (results.affectedRows === 0) {
        return res.send({
          success: false,
          message: "La campaña no existe o no se pudo actualizar.", // Campaign not found
        });
      }
  
      // Success response when the campaign is updated
      return res.send({
        success: true,
        message: "Datos de la campaña actualizados correctamente.", // Success message
      });
    });
  });

// Export the router for use in other parts of the application
module.exports = router;
