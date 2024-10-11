const express = require("express");
const db = require("../../config/db");
const { getKeys } = require("../../utils/helper");
const router = express.Router();

// Define the CreateCampaign route
router.post("/CreateCampaign", (req, res) => {
    const { Data } = req.body;
  
    // Check if required fields are present in the request body
    if (!Data.name || !Data.startDate || !Data.endDate) {
      return res.send({
        success: false,
        message: "Faltan campos obligatorios.", // Missing required fields
      });
    }
  
    // Generate public and private keys for the campaign
    const { publicKey, privateKey } = getKeys();
  
    // SQL query to insert a new campaign into the 'campaigns' table
    const insertCampaignQuery = `
      INSERT INTO campaigns (
        name, 
        description, 
        start_date, 
        end_date, 
        voting_method, 
        image_url,
        public_key, 
        private_key
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  
    // Prepare the campaign parameters to insert
    const campaignParams = [
      Data.name,
      Data.description || null, // Optional description field
      Data.startDate,
      Data.endDate,
      Data.voting_method || "online", // Default voting method is 'online'
      Data.image_url || null, // Optional image URL, default is null
      publicKey,
      privateKey
    ];
  
    // Execute the query to insert the campaign into the database
    db.query(insertCampaignQuery, campaignParams, (err, results) => {
      if (err) {
        // Send an error response if there's a problem with the database query
        return res.send({
          success: false,
          message: "Error en el servidor al insertar la campaña.", // Server error while inserting the campaign
          error: err,
        });
      }
  
      const campaignId = results.insertId; // Retrieve the ID of the newly created campaign
   
      // Send a success response with the created campaign ID
      return res.send({
        success: true,
        message: "Campaña creada correctamente.", // Campaign created successfully
        campaignId: campaignId,
      });
    });
});

// Export the router
module.exports = router;
