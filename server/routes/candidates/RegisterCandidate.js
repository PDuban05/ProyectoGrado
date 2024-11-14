const express = require("express");
const db = require("../../config/db");
const router = express.Router();

router.post("/RegisterCandidate", (req, res) => {
    const {
      user_id,  // Se recibe el user_id
      political_party,
      campaign_slogan,
      biography,
      social_media_links,
      campaign_id
    } = req.body;

    if (!user_id) {
      return res.send({
        success: false,
        message: "ID de usuario no proporcionado o inválido.",
      });
    }

    // Primero obtenemos el person_id desde la tabla users
    const getPersonIdQuery = `SELECT person_id FROM users WHERE user_id = ?`;

    db.query(getPersonIdQuery, [user_id], (err, results) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error en el servidor al verificar el usuario.",
          error: err,
        });
      }

      // Verificamos si encontramos el person_id
      if (results.length === 0) {
        return res.send({
          success: false,
          message: "No se encontró un person_id asociado al usuario.",
        });
      }

      const person_id = results[0].person_id;

      // Comprobamos si el candidato ya está registrado en la campaña
      const checkCandidateQuery = `
        SELECT * FROM candidates 
        WHERE person_id = ? AND campaign_id = ?`;

      db.query(checkCandidateQuery, [person_id, campaign_id], (err, results) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error en el servidor al verificar el candidato.",
            error: err,
          });
        }

        if (results.length > 0) {
          return res.send({
            success: false,
            message: "Ya has aplicado para ser candidato para esta campaña.",
          });
        }

        // Insertamos el nuevo candidato en caso de que no esté registrado
        const insertCandidateQuery = `
          INSERT INTO candidates (
            person_id, 
            campaign_id, 
            political_party, 
            campaign_slogan, 
            biography, 
            social_media_links
          ) VALUES (?, ?, ?, ?, ?, ?)`;

        const socialMediaLinks = JSON.stringify(social_media_links);

        const candidateParams = [
          person_id,
          campaign_id,
          political_party,
          campaign_slogan,
          biography,
          socialMediaLinks
        ];

        db.query(insertCandidateQuery, candidateParams, (err, results) => {
          if (err) {
            return res.send({
              success: false,
              message: "Error en el servidor al insertar el candidato.",
              error: err,
            });
          }

          return res.send({
            success: true,
            message: "Candidato insertado correctamente.",
          });
        });
      });
    });
  });

module.exports = router;
