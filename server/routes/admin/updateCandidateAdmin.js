const express = require("express");
const db = require("../../config/db");
const router = express.Router();

router.post("/updateCandidate", (req, res) => {
    // Extract approved and unapproved candidates from the request body
    const { approvedCandidates, unapprovedCandidates } = req.body;
  
    // Check if neither approved nor unapproved candidates were provided
    if (!approvedCandidates && !unapprovedCandidates) {
      return res.send({
        success: false,
        message: "No approved or unapproved candidates were provided.",
      });
    }
  
    // Update approved candidates
    if (approvedCandidates && approvedCandidates.length > 0) {
      const approvedQuery = `
        UPDATE candidates 
        SET is_approved = 'true' 
        WHERE candidate_id = ? AND campaign_id = ?
      `;
  
      approvedCandidates.forEach((candidate) => {
        const params = [candidate.candidate_id, candidate.campaign_id];
        // Execute database query to approve candidates
        db.query(approvedQuery, params, (err, results) => {
          if (err) {
            return res.send({
              success: false,
              message: "Error updating approved candidates.",
              error: err,
            });
          }
        });
      });
    }
  
    // Update unapproved candidates
    if (unapprovedCandidates && unapprovedCandidates.length > 0) {
      const unapprovedQuery = `
        UPDATE candidates 
        SET is_approved = 'false' 
        WHERE candidate_id = ? AND campaign_id = ?
      `;
  
      unapprovedCandidates.forEach((candidate) => {
        const params = [candidate.candidate_id, candidate.campaign_id];
        // Execute database query to unapprove candidates
        db.query(unapprovedQuery, params, (err, results) => {
          if (err) {
            return res.send({
              success: false,
              message: "Error updating unapproved candidates.",
              error: err,
            });
          }
        });
      });
    }
  
    // Send success response after updating both approved and unapproved candidates
    return res.send({
      success: true,
      message: "Candidates' approval status has been successfully updated.",
    });
});

// Export the router
module.exports = router;
