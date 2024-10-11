const express = require("express"); // Importing the Express framework
const db = require("../../config/db"); // Importing the database configuration
const router = express.Router(); // Creating a new router instance

// Defining a POST endpoint to fetch user information
router.post("/fetchUserInf", (req, res) => {
    const { id } = req.body; // Extracting the user ID from the request body
    if (!id) { // Checking if the ID is provided
      return res.send({
        success: false,
        mensage: "ID no proporcionado o inválido.", // Returning an error if ID is missing
      });
    }
    // Querying the database to find the user with the provided ID
    db.query(
      "SELECT * FROM person WHERE  person_id =  ?",
      [id],
      (err, results) => {
        if (err) { // Handling any database errors
          return res.send({ success: false, message: "Error en el servidor" });
        }
  
        if (results.length === 0) { // Checking if no results were found
          return res.send({
            success: false,
            message: "usuario no registrado", // Returning an error if user is not registered
          });
        }
  
        // Returning success with the fetched user information
        return res.send({
          success: true,
          message: "success",
          results,
        });
      }
    );
});

// Export the router for use in other parts of the application
module.exports = router;
