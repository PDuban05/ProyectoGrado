// Importing necessary modules
const express = require("express"); // Importing express framework
const db = require("../config/db"); // Importing database configuration
const router = express.Router(); // Creating an instance of the express router

// Route to get the list of courses from the 'program' table
router.get("/course", (req, res) => {
    // SQL query to get both program_id and program from 'program' table
    const selectQuery = "SELECT program_id, program FROM program"; // Selecting both 'program_id' and 'program'

    // Executing the SQL query
    db.query(selectQuery, (err, results) => {
        if (err) {
            // Sending error response if there is a server error while fetching courses
            return res.send({
                success: false,
                message: "Server error while fetching courses.",
                error: err, // Including error details
            });
        }

        // Mapping results to return an array of objects with id and program name
        const courses = results.map(row => ({
            id: row.program_id,
            name: row.program,
        }));

        // Sending success response with the list of courses
        return res.send({
            success: true,
            courses, // Returning the list of courses with their ids
        });
    });
});

// Export the router for use in other parts of the application
module.exports = router;
