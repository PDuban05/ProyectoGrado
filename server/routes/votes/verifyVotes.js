const express = require("express"); // Import Express
const db = require("../../config/db"); // Import the database configuration
const router = express.Router(); // Create a new router instance

// Route to get detailed information based on a digital signature
router.post('/verifyVotes', (req, res) => {
  const { digitalSignature } = req.body; // Extract digital signature from the request body
  
  // Verify that the digital signature is provided
  if (!digitalSignature) {
    return res.send({
      success: false,
      message: 'Digital signature is missing.', // Error message if the digital signature is missing
    });
  }

  // Query to get the vote information using the digital signature
  const voteQuery = `
    SELECT * 
    FROM votes 
    WHERE digital_signature = ?
  `;

  // Execute the vote query
  db.query(voteQuery, [digitalSignature], (err, voteResults) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Error retrieving vote details.', // Error message if the query fails
        error: err,
      });
    }

    // Check if the vote with the provided signature was found
    if (voteResults.length === 0) {
      return res.send({
        success: false,
        message: 'No vote found with the provided digital signature.', // Message if no vote is found
      });
    }

    // Retrieve vote information
    const vote = voteResults[0]; // Vote details
    const { campaign_id, user_id } = vote; // Extract campaign_id and user_id from the vote

    // Query to get only the campaign name using the campaign_id
    const campaignQuery = `
      SELECT name 
      FROM campaigns 
      WHERE campaign_id = ?
    `;

    // Execute the campaign query
    db.query(campaignQuery, [campaign_id], (err, campaignResults) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error retrieving campaign details.', // Error message if the query fails
          error: err,
        });
      }

      // Check if the campaign was found
      if (campaignResults.length === 0) {
        return res.send({
          success: false,
          message: 'No campaign found with the provided ID.', // Message if no campaign is found
        });
      }

      // Retrieve campaign name
      const campaign = campaignResults[0]; // Campaign name

      // Query to get user information using the user_id
      const userQuery = `
        SELECT email, person_id 
        FROM users 
        WHERE user_id = ?
      `;

      // Execute the user query
      db.query(userQuery, [user_id], (err, userResults) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error retrieving user details.', // Error message if the query fails
            error: err,
          });
        }

        // Check if the user was found
        if (userResults.length === 0) {
          return res.send({
            success: false,
            message: 'No user found with the provided ID.', // Message if no user is found
          });
        }

        // Retrieve user information
        const user = userResults[0]; // User details
        const { email, person_id } = user; // Extract email and person_id from the user

        // Query to get the person's information using the person_id
        const personQuery = `
          SELECT * 
          FROM person 
          WHERE person_id = ?
        `;

        // Execute the person query
        db.query(personQuery, [person_id], (err, personResults) => {
          if (err) {
            return res.send({
              success: false,
              message: 'Error retrieving person details.', // Error message if the query fails
              error: err,
            });
          }

          // Check if the person was found
          if (personResults.length === 0) {
            return res.send({
              success: false,
              message: 'No person found with the provided ID.', // Message if no person is found
            });
          }

          // Retrieve person information
          const person = personResults[0]; // Person details

          // Return all organized information
          const result = {
            vote: {
              ...vote, // Vote details
            },
            campaign: {
              name: campaign.name, // Only the campaign name
            },
            user: {
              email, // User email
              ...person, // Person details
            },
          };

          return res.send({
            success: true,
            message: 'Vote information retrieved successfully.',
            result: result, // Return the organized information
          });
        });
      });
    });
  });
});

// Export the router to be used in other parts of the application
module.exports = router;
