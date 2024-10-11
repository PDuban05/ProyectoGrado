const express = require("express"); // Importing the Express framework
const db = require("../../config/db"); // Importing the database configuration
const router = express.Router(); // Creating a new router instance

// Route to handle POST requests for fetching campaign information
router.post("/fetchCampaigns", (req, res) => {
    const { campaignId, userId } = req.body; // Destructuring campaignId and userId from the request body
  
    // SQL query to retrieve specific campaign information, excluding public_key and private_key
    const campaignQuery = `
      SELECT campaign_id, name, description, start_date, end_date, image_url 
      FROM campaigns 
      WHERE campaign_id = ?`;
  
    db.query(campaignQuery, [campaignId], (err, campaignResults) => { // Executing the campaign query
      if (err) {
        return res.send({
          success: false,
          message: "Error en el servidor al obtener la campaña", // Error response for campaign retrieval failure
        });
      }
  
      if (campaignResults.length === 0) {
        return res.send({ success: false, message: "No se encontró la campaña" }); // No campaign found
      }
  
      // SQL query to retrieve approved candidates related to the campaign
      const candidatesQuery = `
        SELECT * FROM candidates 
        WHERE campaign_id = ? 
        AND is_approved = 'true'`;
  
      db.query(candidatesQuery, [campaignId], (err, candidatesResults) => { // Executing the candidates query
        if (err) {
          return res.send({
            success: false,
            message: "Error en el servidor al obtener los candidatos", // Error response for candidates retrieval failure
          });
        }
  
        // Extracting person_id from approved candidates
        const personIds = candidatesResults.map(
          (candidate) => candidate.person_id
        );
  
        if (personIds.length === 0) {
          return res.send({
            success: true,
            message: "fetchCampaign success", // Successful fetch without candidates
            campaign: campaignResults[0],
            candidates: [],
            hasVoted: false,
            totalVotes: 0, // No votes if there are no candidates
          });
        }
  
        // SQL query to get person information based on person_ids
        const personQuery = "SELECT * FROM person WHERE person_id IN (?)";
  
        db.query(personQuery, [personIds], (err, personsResults) => { // Executing the person query
          if (err) {
            return res.send({
              success: false,
              message:
                "Error en el servidor al obtener la información de las personas", // Error response for person information retrieval failure
            });
          }
  
          // SQL query to check if the user has voted in this campaign
          const userVoteQuery =
            "SELECT * FROM votes WHERE campaign_id = ? AND user_id = ?";
  
          db.query(userVoteQuery, [campaignId, userId], (err, userVoteResults) => { // Executing the user vote query
            if (err) {
              return res.send({
                success: false,
                message:
                  "Error en el servidor al verificar el voto del usuario", // Error response for user vote verification failure
              });
            }
  
            const hasVoted = userVoteResults.length > 0; // Determining if the user has voted
  
            // SQL query to count total votes for the campaign
            const totalVotesQuery = `
              SELECT COUNT(*) AS totalVotes 
              FROM votes 
              WHERE campaign_id = ?`;
  
            db.query(totalVotesQuery, [campaignId], (err, totalVotesResult) => { // Executing the total votes query
              if (err) {
                return res.send({
                  success: false,
                  message: "Error en el servidor al contar los votos", // Error response for vote counting failure
                });
              }
  
              const totalVotes = totalVotesResult[0].totalVotes; // Total number of votes
  
              // Combining approved candidates' information with person data
              const candidatesWithPersonData = candidatesResults.map((candidate) => {
                const person = personsResults.find(
                  (person) => person.person_id === candidate.person_id
                );
                return { ...candidate, ...person }; // Merging candidate and person data
              });
  
              return res.send({
                success: true,
                message: "fetchCampaign success", // Successful fetch with all relevant data
                campaign: campaignResults[0], // Returning campaign information without public_key or private_key
                candidates: candidatesWithPersonData, // Returning list of approved candidates with person information
                hasVoted, // Returning whether the user has voted or not
                totalVotes, // Returning the total number of votes
              });
            });
          });
        });
      });
    });
  });
        // Export the router
module.exports = router; // Exporting the router for use in the application
