const express = require("express"); // Import Express framework
const db = require("../../config/db"); // Import the database connection
const router = express.Router(); // Create a router object

// Define a POST route to fetch all campaigns for admin
router.post("/fetchCampaignsAdmin", (req, res) => {
    // Query to fetch all campaigns from the 'campaigns' table
    const campaignQuery = "SELECT * FROM campaigns";
  
    db.query(campaignQuery, (err, campaignResults) => {
      if (err) {
        // Send error response if there's a server issue with fetching campaigns
        return res.send({
          success: false,
          message: "Error en el servidor al obtener las campañas",
        });
      }
  
      if (campaignResults.length === 0) {
        // Send a message if no campaigns are found
        return res.send({
          success: false,
          message: "No se encontraron campañas",
        });
      }
  
      // Extract campaign IDs to use in the next query
      const campaignIds = campaignResults.map(campaign => campaign.campaign_id);
  
      // Query to fetch all candidates and associated person info from 'candidates' and 'person' tables
      const candidatesQuery = `
        SELECT 
          c.*,  -- Fetch all fields from the 'candidates' table
          p.*   -- Fetch all fields from the 'person' table
        FROM candidates c
        JOIN person p ON c.person_id = p.person_id
        WHERE c.campaign_id IN (?);  -- Filter candidates by campaign IDs
      `;
  
      db.query(candidatesQuery, [campaignIds], (err, candidatesResults) => {
        if (err) {
          // Send error response if there's a server issue with fetching candidates
          return res.send({
            success: false,
            message: "Error en el servidor al obtener los candidatos",
          });
        }
  
        // Query to fetch votes associated with the campaigns
        const votesQuery = "SELECT * FROM votes WHERE campaign_id IN (?)";
        db.query(votesQuery, [campaignIds], (err, votesResults) => {
          if (err) {
            // Send error response if there's a server issue with fetching votes
            return res.send({
              success: false,
              message: "Error en el servidor al obtener los votos",
            });
          }
  
          // Combine campaign, candidate, and vote data
          const campaignsWithDetails = campaignResults.map(campaign => {
            // Filter candidates by campaign ID
            const campaignCandidates = candidatesResults.filter(
              candidate => candidate.campaign_id === campaign.campaign_id
            );
  
            // Filter votes by campaign ID
            const campaignVoters = votesResults.filter(
              vote => vote.campaign_id === campaign.campaign_id
            );
  
            // Return campaign data with candidates and voters attached
            return {
              ...campaign,
              candidates: campaignCandidates,  // Add candidates and related person info
              voters: campaignVoters,  // Add voter details
            };
          });
  
          // Send the final response with all campaign details
          return res.send({
            success: true,
            message: "fetchCampaignsAdmin success",
            campaigns: campaignsWithDetails,
          });
        });
      });
    });
  });

// Export the router so it can be used in other parts of the app
module.exports = router;
