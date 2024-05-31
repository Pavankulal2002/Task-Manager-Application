// Importing required modules
const express = require("express");
const csrf = require("csurf");
const {
    getTasks,
    postTasks,
    patchTasks,
    deleteTasks,
    getCSRFToken
} = require("../controllers/controllers")

// Creating route
const taskRoute = express.Router();

const csrfProtect = csrf({ cookie: true});

// Routes for CRUD operations
taskRoute.get('/get/:Email', getTasks);
taskRoute.post('/post/:Email', postTasks);
taskRoute.patch('/patch/:Email', patchTasks);
taskRoute.delete('/delete/:Email', deleteTasks);

// Route for csrf token generation
taskRoute.get('/getCSRF', csrfProtect, getCSRFToken);

// Exporting the router
module.exports = taskRoute;