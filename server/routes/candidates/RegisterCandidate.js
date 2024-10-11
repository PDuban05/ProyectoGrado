const express = require("express"); // Import the express library
const db = require("../../config/db"); // Import the database configuration
const router = express.Router(); // Create a new router object

// Define a POST route for registering a candidate
router.post("/RegisterCandidate", (req, res) => {
    const {
      person_id, // Candidate's unique identifier
      political_party, // Candidate's political party
      campaign_slogan, // Slogan for the campaign
      biography, // Candidate's biography
      social_media_links, // Candidate's social media links
      campaign_id // Campaign identifier
    } = req.body; // Extract the request body

    // Validate that the person_id is provided
    if (!person_id) {
      return res.send({
        success: false,
        message: "ID no proporcionado o inválido.", // Message for invalid ID
      });
    }
  
    // Query to check if the candidate is already registered for the campaign
    const checkCandidateQuery = `
      SELECT * FROM candidates 
      WHERE person_id = ? AND campaign_id = ?`;
  
    // Execute the query to check if the candidate is already registered
    db.query(checkCandidateQuery, [person_id, campaign_id], (err, results) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error en el servidor al verificar el candidato.", // Message for server error
          error: err,
        });
      }
  
      // If a record is found, the candidate is already registered
      if (results.length > 0) {
        return res.send({
          success: false,
          message: "Ya has aplicado para ser candidato para esta campaña.", // Message for already registered
        });
      }
  
      // If not registered, proceed with insertion
      const insertCandidateQuery = `
        INSERT INTO candidates (
          person_id, 
          campaign_id, 
          political_party, 
          campaign_slogan, 
          biography, 
          social_media_links
        ) VALUES (?, ?, ?, ?, ?, ?)`;
  
      // Serialize social media links to a JSON string
      const socialMediaLinks = JSON.stringify(social_media_links);
  
      const candidateParams = [
        person_id,
        campaign_id,
        political_party,
        campaign_slogan,
        biography,
        socialMediaLinks
      ]; // Prepare the parameters for the insertion
  
      // Execute the query to insert the candidate data into the 'candidates' table
      db.query(insertCandidateQuery, candidateParams, (err, results) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error en el servidor al insertar el candidato.", // Message for insertion error
            error: err,
          });
        }
  
        return res.send({
          success: true,
          message: "Candidato insertado correctamente.", // Message for successful insertion
        });
      });
    });
  });

// Export the router for use in other parts of the application
module.exports = router;
