const express = require("express"); // Import the Express framework
const db = require("../../config/db"); // Import the database configuration
const { decryptId } = require("../../utils/helper");
const router = express.Router(); // Create a new router object

// Define a POST endpoint to get the result of votes for a specific campaign
router.post('/resultVotes', (req, res) => {
    const { idCampaign } = req.body; // Extract the campaign ID from the request body
    	 
    // Verify that the campaign ID is provided
    if (!idCampaign) {
      return res.status(400).send({
        success: false,
        message: 'Falta el ID de la campaña.', // Message indicating the missing campaign ID
      });
    }
  
    // Query to get the private_key from the campaigns table
    const privateKeyQuery = `
      SELECT private_key 
      FROM campaigns
      WHERE campaign_id = ?
    `;
  
    // Execute the query to get the private key for the given campaign ID
    db.query(privateKeyQuery, [idCampaign], (err, campaignResults) => {
      if (err) {
        return res.status(500).send({
          success: false,
          message: 'Error al obtener la private_key de la campaña.', // Error message if there is an issue with the query
          error: err,
        });
      }
  
      // Check if the campaign was found
      if (campaignResults.length === 0) {
        return res.status(404).send({
          success: false,
          message: 'No se encontró ninguna campaña con el ID proporcionado.', // Message if the campaign is not found
        });
      }
  
      // Get the private key for the campaign
      const privateKey = campaignResults[0].private_key;

      
  
      // Query to get the votes for the specific campaign
      const votesQuery = `
        SELECT digital_signature
        FROM votes
        WHERE campaign_id = ?
      `;
  
      // Execute the query to get the votes
      db.query(votesQuery, [idCampaign], (err, voteResults) => {
        if (err) {
          return res.status(500).send({
            success: false,
            message: 'Error al obtener los votos de la campaña.', // Error message for vote retrieval
            error: err,
          });
        }
  
        // If there are no votes, return a message indicating the situation
        if (voteResults.length === 0) {
          return res.status(404).send({
            success: false,
            message: 'No se encontraron votos para esta campaña.', // Message if no votes are found
          });
        }
  
        // Counter to store the vote counts for each candidate
        const voteCount = {};
        let isValidKey = true; // Flag to check if the private key is valid
    
        // Decrypt digital signatures and count votes for each candidate
        voteResults.forEach(vote => {
          try {
            // Decrypt the candidate ID from the digital signature
            const decryptedCandidateId = decryptId(vote.digital_signature, privateKey);
            
  
            // If the candidate ID already exists in the counter, increment its count
            if (voteCount[decryptedCandidateId]) {
              voteCount[decryptedCandidateId]++;
            } else {
              // If the ID does not exist, initialize its count to 1
              voteCount[decryptedCandidateId] = 1;
            }
          } catch (error) {
            // Handle decryption error if it occurs
            // console.error(`Error desencriptando el voto: ${vote.digital_signature}. Error: ${error.message}`);
            // Continue with the next vote
          }
        });
  
        // If the private key is invalid, set the vote count for all candidates to zero
        if (!isValidKey) {
          // This may require another query to get the list of candidates and then set the count to zero
          
          // For simplicity, assume a function to get all candidates
          const allCandidatesQuery = `
            SELECT candidate_id
            FROM candidates
            WHERE campaign_id = ?
          `;
          
          // Execute the query to get all candidates for the campaign
          db.query(allCandidatesQuery, [idCampaign], (err, candidateResults) => {
            if (err) {
              return res.status(500).send({
                success: false,
                message: 'Error al obtener los candidatos de la campaña.', // Error message for candidate retrieval
                error: err,
              });
            }
  
            // Initialize the vote count to zero for all candidates
            const zeroVoteCount = candidateResults.reduce((acc, candidate) => {
              acc[candidate.candidate_id] = 0; // Set count to zero
              return acc;
            }, {});
  
            return res.send({
              success: true,
              message: 'Error con la clave privada. Todos los votos se han puesto a cero.', // Message indicating key error
              voteCount: zeroVoteCount, // Return zero count for all candidates
            });
          });
        } else {
          // Return the successful response with the counted votes
          return res.send({
            success: true,
            message: 'Votos obtenidos y contados correctamente.', // Message indicating successful vote count
            voteCount, // Return the vote count by candidate
          });
        }
      });
    });
  });

// Export the router for use in other parts of the application
module.exports = router;
