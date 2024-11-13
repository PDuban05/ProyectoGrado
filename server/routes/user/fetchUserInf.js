const express = require("express"); // Importing the Express framework
const db = require("../../config/db"); // Importing the database configuration
const router = express.Router(); // Creating a new router instance

// Defining a POST endpoint to fetch user information and populate dropdowns
router.post("/fetchUserInf", (req, res) => {
    const { user_id } = req.body; // Extracting the user ID from the request body
console.log(user_id)
    if (!user_id) { // Checking if the user ID is provided
        return res.send({
            success: false,
            message: "ID no proporcionado o inválido.", // Returning an error if ID is missing
        });
    }

    // Query to find the person_id using the provided user_id
    db.query(
        "SELECT person_id FROM users WHERE user_id = ?",
        [user_id],
        (err, userResults) => {
            if (err) { // Handling any database errors
                return res.send({ success: false, message: "Error en el servidor" });
            }

            if (userResults.length === 0) { // Checking if no user is found
                return res.send({
                    success: false,
                    message: "Usuario no registrado", // Returning an error if the user is not found
                });
            }

            const person_id = userResults[0].person_id; // Getting the person_id from the user record

            // Querying the person table to get user information using person_id
            db.query(
                "SELECT * FROM person WHERE person_id = ?",
                [person_id],
                (err, personResults) => {
                    if (err) { // Handling any database errors
                        return res.send({ success: false, message: "Error al obtener los datos del usuario" });
                    }

                    if (personResults.length === 0) { // Checking if no person record is found
                        return res.send({
                            success: false,
                            message: "Información de la persona no encontrada", // Returning an error if person data is not found
                        });
                    }

                    // Query to get the list of occupations
                    db.query("SELECT occupation_id, occupation_name FROM occupation", (err, occupationResults) => {
                        if (err) {
                            return res.send({
                                success: false,
                                message: "Error al obtener ocupaciones",
                            });
                        }

                        // Query to get the list of marital statuses
                        db.query("SELECT marital_status_id, status_name FROM marital_status", (err, maritalStatusResults) => {
                            if (err) {
                                return res.send({
                                    success: false,
                                    message: "Error al obtener el estado civil",
                                });
                            }

                            // Query to get the list of genders
                            db.query("SELECT gender_id, gender FROM gender", (err, genderResults) => {
                                if (err) {
                                    return res.send({
                                        success: false,
                                        message: "Error al obtener los géneros",
                                    });
                                }

                                // Query to get the list of education levels
                                db.query("SELECT education_level_id, level FROM education_level", (err, educationLevelResults) => {
                                    if (err) {
                                        return res.send({
                                            success: false,
                                            message: "Error al obtener los niveles educativos",
                                        });
                                    }

                                    // Returning success with the user information and dropdown data
                                    return res.send({
                                        success: true,
                                        message: "Success",
                                        user: personResults, // User information from the person table
                                        occupations: occupationResults, // Occupation list
                                        maritalStatus: maritalStatusResults, // Marital status list
                                        genders: genderResults, // Gender list
                                        educationLevels: educationLevelResults, // Education levels list
                                    });
                                });
                            });
                        });
                    });
                }
            );
        }
    );
});

// Export the router for use in other parts of the application
module.exports = router;
