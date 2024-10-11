const multer = require("multer");
const express = require("express");
const { storage } = require("./helper");
const router = express.Router();




const upload = multer({ storage: storage });
// Ruta para subir archivos con el tipo dinámico
router.post("/upload/:user_id/:type", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ success: false, message: "No file uploaded" });
  }

  const userId = req.params.user_id;
  const type = req.params.type;

  // Ruta relativa del archivo subido
  const filePath = `/uploads/${userId}_${type}/${req.file.filename}`;

  res.send({
    success: true,
    imageUrl: filePath,
  });
});

  // Export the router
  module.exports = router;