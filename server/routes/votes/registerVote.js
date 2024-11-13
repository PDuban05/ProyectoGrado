

const express = require("express"); // Import the express library
const db = require("../../config/db"); // Import the database configuration
const { encryptId } = require("../../utils/helper"); // Import the encryption helper function
const sendSignatureEmail = require("./sendSignature");

const router = express.Router(); // Create a new router instance

// Define a POST endpoint for registering a vote
router.post("/registervote", (req, res) => {
  const { infVote, user } = req.body;

  // Validate that infVote and candidate_id are provided in the request
  if (!infVote || !infVote.campaign_id || !infVote.candidate_id) {
    return res.status(400).json({ error: "Campaign ID and Candidate ID are required" });
  }

  try {
    // Query to obtain the public_key and private_key for the campaign
    const keysQuery = `
      SELECT public_key, private_key
      FROM campaign_keys
      WHERE campaign_id = ?
    `;

    // Execute the query to get the public_key and private_key
    db.query(keysQuery, [infVote.campaign_id], (err, keyResults) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error obtaining the campaign keys.",
          error: err,
        });
      }

      if (keyResults.length === 0) {
        return res.send({
          success: false,
          message: "No campaign found with the provided ID.",
        });
      }

      const publicKey = keyResults[0].public_key;

      // Encrypt the current date or time (as an example, encrypting the current time)
      const currentTimeString = new Date().toLocaleTimeString();
      const encryptedTime = encryptId(currentTimeString, publicKey);

      const ipAddress = req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;
      const userAgent = req.headers["user-agent"];

    

      // Insert the vote into the votes table without encrypting candidate_id
      db.query(
        "INSERT INTO votes (user_id, campaign_id, ip_address, user_agent, digital_signature) VALUES (?, ?, ?, ?, ?)",
        [user.id, infVote.campaign_id, ipAddress, userAgent, encryptedTime],
        async (err) => {
          if (err) {
            return res.send({
              success: false,
              message: "Error registering the vote.",
              error: err,
            });
          }
          console.log(user.email, encryptedTime)
          try {
            // Send the digital signature to the user's email along with campaign name, vote date, and time
            await sendSignatureEmail(user.email, encryptedTime );

            // Encrypt the candidate_id and store it in encrypted_votes
            const encryptedCandidateId = encryptId(String(infVote.candidate_id), publicKey);
            db.query(
              "INSERT INTO encrypted_votes (campaign_id, encrypted_vote) VALUES (?, ?)",
              [infVote.campaign_id, encryptedCandidateId],
              (err) => {
                if (err) {
                  return res.send({
                    success: false,
                    message: "Error storing encrypted candidate ID.",
                    error: err,
                  });
                }

                // Successful response after storing the encrypted vote
                return res.send({
                  success: true,
                  message: "Vote registered successfully, signature sent to your email, and encrypted vote stored.",
                  user, // Return user information
                });
              }
            );
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
