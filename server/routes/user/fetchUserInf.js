// Importing necessary modules
const express = require("express");
const db = require("../../config/db");
const router = express.Router();

// Defining a POST endpoint to fetch user information and populate dropdowns
router.post("/fetchUserInf", (req, res) => {
    const { user_id } = req.body;
    console.log(user_id);
    if (!user_id) {
        return res.send({
            success: false,
            message: "ID no proporcionado o inválido.",
        });
    }

    // Query to find the person_id using the provided user_id
    db.query(
        "SELECT person_id FROM users WHERE user_id = ?",
        [user_id],
        (err, userResults) => {
            if (err) {
                console.error(err);
                return res.send({ success: false, message: "Error en el servidor" });
            }

            if (userResults.length === 0) {
                return res.send({
                    success: false,
                    message: "Usuario no registrado",
                });
            }

            const person_id = userResults[0].person_id;

            // Querying the person table to get user information using person_id
            db.query(
                "SELECT * FROM person WHERE person_id = ?",
                [person_id],
                (err, personResults) => {
                    if (err) {
                        console.error(err);
                        return res.send({ success: false, message: "Error al obtener los datos del usuario" });
                    }

                    if (personResults.length === 0) {
                        return res.send({
                            success: false,
                            message: "Información de la persona no encontrada",
                        });
                    }

                    const location_id = personResults[0].location_id;

                    // Si location_id es null, establece location en null y continúa el proceso
                    if (!location_id) {
                        personResults[0].location = null;
                        fetchDropdownData(personResults[0]);
                    } else {
                        // Query to get location details using location_id
                        db.query(
                            "SELECT country, state, city FROM locations WHERE location_id = ?",
                            [location_id],
                            (err, locationResults) => {
                                if (err) {
                                    console.error(err);
                                    return res.send({
                                        success: false,
                                        message: "Error al obtener los datos de ubicación",
                                    });
                                }

                                personResults[0].location = locationResults.length > 0 ? locationResults[0] : null;
                                fetchDropdownData(personResults[0]);
                            }
                        );
                    }
                }
            );
        }
    );

    // Función para obtener datos de las listas desplegables y devolver la respuesta
    function fetchDropdownData(user) {
        // Query to get the list of occupations
        db.query("SELECT occupation_id, occupation_name FROM occupation", (err, occupationResults) => {
            if (err) {
                console.error(err);
                return res.send({
                    success: false,
                    message: "Error al obtener ocupaciones",
                });
            }

            // Query to get the list of marital statuses
            db.query("SELECT marital_status_id, status_name FROM marital_status", (err, maritalStatusResults) => {
                if (err) {
                    console.error(err);
                    return res.send({
                        success: false,
                        message: "Error al obtener el estado civil",
                    });
                }

                // Query to get the list of genders
                db.query("SELECT gender_id, gender FROM gender", (err, genderResults) => {
                    if (err) {
                        console.error(err);
                        return res.send({
                            success: false,
                            message: "Error al obtener los géneros",
                        });
                    }

                    // Query to get the list of education levels
                    db.query("SELECT education_level_id, level FROM education_level", (err, educationLevelResults) => {
                        if (err) {
                            console.error(err);
                            return res.send({
                                success: false,
                                message: "Error al obtener los niveles educativos",
                            });
                        }

                        // Query to get the list of programs
                        db.query("SELECT program_id, program FROM program", (err, programResults) => {
                            if (err) {
                                console.error(err);
                                return res.send({
                                    success: false,
                                    message: "Error al obtener los programas",
                                });
                            }

                            // Returning success with the user information and dropdown data
                            return res.send({
                                success: true,
                                message: "Success",
                                user: user, // Información del usuario con datos de ubicación (null si no existe)
                                occupations: occupationResults,
                                maritalStatus: maritalStatusResults,
                                genders: genderResults,
                                educationLevels: educationLevelResults,
                                programs: programResults,
                            });
                        });
                    });
                });
            });
        });
    }
});

// Export the router for use in other parts of the application
module.exports = router;
