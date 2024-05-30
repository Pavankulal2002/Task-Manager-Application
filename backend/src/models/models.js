// Importing required modules
const mongoose = require("mongoose");

// Creating the schema for Tasks
const taskSchema = new mongoose.Schema({
    Title: String,
    Description: String,
    Status: String,
    Duedate: Date
});

// Createing schema for Users
const userSchema = new mongoose.Schema({
    Email: String,
    Tasks: [ taskSchema ]
})

const UserTask = mongoose.model("usertasks" , userSchema);

module.exports = UserTask;