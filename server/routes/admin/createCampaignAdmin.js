const express = require("express");
const db = require("../../config/db");
const { getKeys } = require("../../utils/helper");
const router = express.Router();

// Define the CreateCampaign route
router.post("/CreateCampaign", (req, res) => {
    const { Data } = req.body;

    console.log(Data.name);
  
    // Check if required fields are present in the request body
    if (!Data.name || !Data.startDate || !Data.endDate) {
      return res.send({
        success: false,
        message: "Faltan campos obligatorios.",
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
        image_url
      ) VALUES (?, ?, ?, ?, ?)`;
  
    // Prepare the campaign parameters to insert
    const campaignParams = [
      Data.name,
      Data.description || null,
      Data.startDate,
      Data.endDate,
      Data.image_url || null
    ];
  
    // Execute the query to insert the campaign into the database
    db.query(insertCampaignQuery, campaignParams, (err, results) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error en el servidor al insertar la campaña.",
          error: err,
        });
      }
  
      const campaignId = results.insertId; // Retrieve the ID of the newly created campaign

      // SQL query to insert the campaign keys into 'campaign_keys' table
      const insertKeysQuery = `
        INSERT INTO campaign_keys (
          campaign_id, 
          public_key, 
          private_key
        ) VALUES (?, ?, ?)`;
      
      // Prepare the parameters for the keys
      const keysParams = [campaignId, publicKey, privateKey];

      // Insert the keys for the campaign
      db.query(insertKeysQuery, keysParams, (err) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error al insertar las claves de la campaña.",
            error: err,
          });
        }

        // SQL query to insert the default "voto en blanco" candidate
        const insertCandidateQuery = `
          INSERT INTO candidates (
            person_id, 
            campaign_id, 
            political_party, 
            campaign_slogan, 
            biography, 
            social_media_links, 
            is_approved
          ) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        
        // Prepare the parameters for the default candidate
        const candidateParams = [
          48, // Use 48 as person_id
          campaignId,
          "Voto en Blanco", // Default political party
          "Voto en Blanco", // Default campaign slogan
          "Opción de voto en blanco para la campaña.",
          null, // No social media links
          "true" // Candidate is approved by default
        ];

        // Execute the query to insert the default candidate
        db.query(insertCandidateQuery, candidateParams, (err) => {
          if (err) {
            return res.send({
              success: false,
              message: "Error al insertar el candidato de voto en blanco.",
              error: err,
            });
          }

          // Send a success response with the created campaign ID
          return res.send({
            success: true,
            message: "Campaña, claves y candidato de voto en blanco creados correctamente.",
            campaignId: campaignId,
          });
        });
      });
    });
});

// Export the router
module.exports = router;
