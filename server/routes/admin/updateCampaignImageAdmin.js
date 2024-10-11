const express = require("express");
const db = require("../../config/db");
const router = express.Router();

router.post('/updateCampaignImage', (req, res) => {
    const { imageUrl, campaignId } = req.body;

    // Query to update the `image_url` field in the database
    const updateQuery = `
      UPDATE campaigns
      SET image_url = ?
      WHERE campaign_id = ?
    `;

    db.query(updateQuery, [imageUrl, campaignId], (err, results) => {
        if (err) {
            // Error handling
            return res.status(500).send({
                success: false,
                message: 'Error updating campaign image.',
                error: err,
            });
        }

        // Success response
        return res.send({
            success: true,
            message: 'Image updated successfully.',
            imageUrl: imageUrl // Return the updated image URL
        });
    });
});

// Export the router
module.exports = router;
