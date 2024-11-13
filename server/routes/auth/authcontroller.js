const express = require("express"); // Import the express framework
const db = require("../../config/db"); // Import the database configuration

const router = express.Router(); // Create a new router instance

// Route to authenticate user
router.post("/ValidarToken", (req, res) => {
    const { token } = req.body; // Extract token from the request body
    // Check if the token is empty or null
    if (!token) {
        return res.send({
            success: false, // Send a response indicating failure
          
        });
    }

    // First query: Get the user and their personal information using the token
    db.query(
        `SELECT users.*, 
                person.first_name, 
                person.last_name, 
                person.profile_picture_url 
        FROM users
        JOIN person ON users.person_id = person.person_id
        WHERE users.token = ?`, // Query to fetch user data based on the token
        [token],
        (err, results) => {
            if (err) {
                return res.send({
                    success: false,
                    message: "Error en el servidor", // Send a server error message
                });
            }

            if (results.length === 0) {
                // If no user is found or the token is invalid
                return res.send({
                    success: false,
                    message: "Token no válido", // Send an invalid token message
                });
            }

            const user = results[0]; // Get the user data from results

            // Second query: Get the role_id of the user from user_roles table
            db.query(
                `SELECT role_id 
                FROM user_roles
                WHERE user_id = ?`, // Query to fetch the role_id based on the user_id
                [user.user_id],
                (err, roleResults) => {
                    if (err) {
                        return res.send({
                            success: false,
                            message: "Error al obtener el rol", // Error while fetching the role_id
                        });
                    }

                    if (roleResults.length === 0) {
                        return res.send({
                            success: false,
                            message: "Rol no encontrado", // If no role is found
                        });
                    }

                    const roleId = roleResults[0].role_id; // Get the role_id

                    // Third query: Get the role name from the roles table using role_id
                    db.query(
                        `SELECT role 
                        FROM roles
                        WHERE role_id = ?`, // Query to fetch the role based on role_id
                        [roleId],
                        (err, roleNameResults) => {
                            if (err) {
                                return res.send({
                                    success: false,
                                    message: "Error al obtener el nombre del rol", // Error while fetching the role name
                                });
                            }

                            if (roleNameResults.length === 0) {
                                return res.send({
                                    success: false,
                                    message: "Rol no encontrado en la tabla de roles", // If role is not found in the roles table
                                });
                            }

                            const userRole = roleNameResults[0].role; // Get the user's role from the results

                            // Send the authenticated user data along with the role
                            return res.send({
                                success: true,
                                message: "Autenticación exitosa", // Send a success message
                                user: {
                                    id: user.user_id,
                                    firstName: user.first_name,
                                    lastName: user.last_name,
                                    email: user.email,
                                    token: user.token,
                                    role: userRole, // Return the role fetched from the third query
                                    profilePicture: user.profile_picture_url,
                                    isVerified: user.is_verified
                                },
                            });
                        }
                    );
                }
            );
        }
    );
});

// Export the router
module.exports = router; // Make the router available for use in other parts of the application
