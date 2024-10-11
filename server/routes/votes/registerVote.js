const express = require("express"); // Import the express library
const db = require("../../config/db"); // Import the database configuration
const { encryptId } = require("../../utils/helper"); // Import the encryption helper function
const sendSignatureEmail = require("./sendSignatue");


const router = express.Router(); // Create a new router instance

// Define a POST endpoint for registering a vote
router.post("/registervote", (req, res) => {
  const { infVote, user } = req.body;
  const candidateIdString = String(infVote.candidate_id); // Convert candidate_id to a string
   
  // Validate that infVote and candidate_id are provided in the request
  if (!infVote || !infVote.candidate_id) {
    return res.status(400).json({ error: "Candidate ID is required" });
  }

  try {
    // Query to obtain the public_key and campaign_name for the campaign
    const publicKeyQuery = `
      SELECT public_key, name AS campaign_name 
      FROM campaigns 
      WHERE campaign_id = ?
    `;

    // Execute the query to get the public_key and campaign_name
    db.query(publicKeyQuery, [infVote.campaign_id], (err, campaignResults) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error obtaining the public key of the campaign.",
          error: err,
        });
      }

      if (campaignResults.length === 0) {
        return res.send({
          success: false,
          message: "No campaign found with the provided ID.",
        });
      }

      const publicKey = campaignResults[0].public_key;
      const campaignName = campaignResults[0].campaign_name;
      const encryptedCandidateId = encryptId(candidateIdString, publicKey);

      const ipAddress = req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;
      const userAgent = req.headers["user-agent"];

      // Get the current date and time
      const voteDate = new Date().toLocaleDateString(); // Format the date
      const voteTime = new Date().toLocaleTimeString(); // Format the time

      // Insert the vote into the votes table
      db.query(
        "INSERT INTO votes (user_id, campaign_id, ip_address, user_agent, digital_signature) VALUES (?, ?, ?, ?, ?)",
        [user.id, infVote.campaign_id, ipAddress, userAgent, encryptedCandidateId],
        async (err) => {
          if (err) {
            return res.send({
              success: false,
              message: "Error registering the vote.",
              error: err,
            });
          }

          try {
            // Send the digital signature to the user's email along with campaign name, vote date, and time
            await sendSignatureEmail(user.email, encryptedCandidateId, campaignName, voteDate, voteTime);
            return res.send({
              success: true,
              message: "Vote registered successfully and signature sent to your email.",
              user, // Return user information
            });
          } catch (error) {
            return res.send({
              success: false,
              message: error.message,
            });
          }
        }
      );
    });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
});

// Export the router
module.exports = router;
