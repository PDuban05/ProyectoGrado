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

    // Query to get the public_key and private_key from the campaign_keys table
    const keysQuery = `
        SELECT public_key, private_key 
        FROM campaign_keys
        WHERE campaign_id = ?
    `;

    // Execute the query to get the keys for the given campaign ID
    db.query(keysQuery, [idCampaign], (err, campaignKeysResults) => {
        if (err) {
            return res.status(500).send({
                success: false,
                message: 'Error al obtener las claves de la campaña.', // Error message if there is an issue with the query
                error: err,
            });
        }

        // Check if the campaign keys were found
        if (campaignKeysResults.length === 0) {
            return res.status(404).send({
                success: false,
                message: 'No se encontraron claves para la campaña con el ID proporcionado.', // Message if no keys are found
            });
        }

        // Get the public and private keys for the campaign
        const { public_key, private_key } = campaignKeysResults[0];

        // Query to get the encrypted votes from the encrypted_votes table
        const encryptedVotesQuery = `
            SELECT encrypted_vote
            FROM encrypted_votes
            WHERE campaign_id = ?
        `;

        // Execute the query to get the encrypted votes for the specific campaign
        db.query(encryptedVotesQuery, [idCampaign], (err, encryptedVoteResults) => {
            if (err) {
                return res.status(500).send({
                    success: false,
                    message: 'Error al obtener los votos encriptados de la campaña.', // Error message for encrypted vote retrieval
                    error: err,
                });
            }

            // If there are no votes, return a message indicating the situation
            if (encryptedVoteResults.length === 0) {
                return res.status(404).send({
                    success: false,
                    message: 'No se encontraron votos encriptados para esta campaña.', // Message if no encrypted votes are found
                });
            }

            // Counter to store the vote counts for each candidate
            const voteCount = {};

            // Decrypt encrypted votes and count votes for each candidate
            encryptedVoteResults.forEach(vote => {
                try {
                    // Decrypt the candidate ID from the encrypted vote
                    const decryptedCandidateId = decryptId(vote.encrypted_vote, private_key);

                    // If the candidate ID already exists in the counter, increment its count
                    if (voteCount[decryptedCandidateId]) {
                        voteCount[decryptedCandidateId]++;
                    } else {
                        // If the ID does not exist, initialize its count to 1
                        voteCount[decryptedCandidateId] = 1;
                    }
                } catch (error) {
                    // Handle decryption error if it occurs
                    // console.error(`Error desencriptando el voto: ${vote.encrypted_vote}. Error: ${error.message}`);
                    // Continue with the next vote
                }
            });

            // Return the successful response with the counted votes
            return res.send({
                success: true,
                message: 'Votos obtenidos y contados correctamente.', // Message indicating successful vote count
                voteCount, // Return the vote count by candidate
            });
        });
    });
});

// Export the router for use in other parts of the application
module.exports = router;
