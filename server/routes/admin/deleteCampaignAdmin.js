const express = require("express");
const db = require("../../config/db");
const router = express.Router();

router.post('/deleteCampaign', (req, res) => {
    const { campaign_Id } = req.body;
  
    // Validate if campaign_Id is provided
    if (!campaign_Id) {
      return res.status(400).send({
        success: false,
        message: 'Falta el ID de la campaña.',
      });
    }
  
    // Start a transaction
    db.beginTransaction((err) => {
      if (err) {
        return res.status(500).send({
          success: false,
          message: 'Error al iniciar la transacción.',
          error: err,
        });
      }
  
      // Query to delete votes for the campaign
      const deleteVotesQuery = `
        DELETE FROM votes
        WHERE campaign_id = ?
      `;
  
      db.query(deleteVotesQuery, [campaign_Id], (err, results) => {
        if (err) {
          return db.rollback(() => {
            res.status(500).send({
              success: false,
              message: 'Error al eliminar los votos.',
              error: err,
            });
          });
        }
        
        // Query to delete from encrypted_votes for the campaign
        const deleteEncryptedVotesQuery = `
          DELETE FROM encrypted_votes
          WHERE campaign_id = ?
        `;
        
        db.query(deleteEncryptedVotesQuery, [campaign_Id], (err, results) => {
          if (err) {
            return db.rollback(() => {
              res.status(500).send({
                success: false,
                message: 'Error al eliminar los votos encriptados.',
                error: err,
              });
            });
          }

          // Query to delete from campaign_keys for the campaign
          const deleteCampaignKeysQuery = `
            DELETE FROM campaign_keys
            WHERE campaign_id = ?
          `;
          
          db.query(deleteCampaignKeysQuery, [campaign_Id], (err, results) => {
            if (err) {
              return db.rollback(() => {
                res.status(500).send({
                  success: false,
                  message: 'Error al eliminar las llaves de la campaña.',
                  error: err,
                });
              });
            }

            // Query to delete candidates for the campaign
            const deleteCandidatesQuery = `
              DELETE FROM candidates
              WHERE campaign_id = ?
            `;

            db.query(deleteCandidatesQuery, [campaign_Id], (err, results) => {
              if (err) {
                return db.rollback(() => {
                  res.status(500).send({
                    success: false,
                    message: 'Error al eliminar los candidatos.',
                    error: err,
                  });
                });
              }

              // Query to delete the campaign itself
              const deleteCampaignQuery = `
                DELETE FROM campaigns
                WHERE campaign_id = ?
              `;

              db.query(deleteCampaignQuery, [campaign_Id], (err, results) => {
                if (err) {
                  return db.rollback(() => {
                    res.status(500).send({
                      success: false,
                      message: 'Error al eliminar la campaña.',
                      error: err,
                    });
                  });
                }

                // If no campaign was found
                if (results.affectedRows === 0) {
                  return db.rollback(() => {
                    res.status(404).send({
                      success: false,
                      message: 'No se encontró ninguna campaña con el ID proporcionado.',
                    });
                  });
                }

                // Commit the transaction if all deletions were successful
                db.commit((err) => {
                  if (err) {
                    return db.rollback(() => {
                      res.status(500).send({
                        success: false,
                        message: 'Error al finalizar la transacción.',
                        error: err,
                      });
                    });
                  }

                  return res.send({
                    success: true,
                    message: 'Campaña, candidatos, votos, votos encriptados y llaves eliminados correctamente.',
                  });
                });
              });
            });
          });
        });
      });
    });
  });

// Export the router
module.exports = router;
