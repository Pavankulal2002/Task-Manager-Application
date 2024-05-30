// Importing required modules
const mongoose = require("mongoose");
const UserTasks = require("../models/models");

// Connecting to the database
mongoose.connect("mongodb://localhost:27017/TaskManager")

// Asynchronous function to fetch the records from the database
async function fetchTasks(userEmail){
    try{
        const User = await UserTasks.findOne(
            { Email: userEmail}
        );
        if(User==null){
            return [];
        }
        return User.Tasks;
    }catch(err){
        throw err;
    }
}

// Asynchronous function to insert the record to the database
async function insertTask(userEmail, taskIn){
    try{
        const result = await UserTasks.updateOne(
            {Email: userEmail},
            {$addToSet: {
                Tasks: taskIn
            }},
            {upsert: true}
        );
        return result;
    }catch(err){
        throw err;
    }
}

// Asynchronous function to update record in the database
async function updateTask(userEmail, id, newTask){
    try{
        const result = await UserTasks.findOneAndUpdate(
            { Email: userEmail, 'Tasks._id': id },  // Find the user and the specific task
            { $set: newTask },                 // Set the new values for the fields provided
            { new: true }                           // Return the updated document
        );
        return result;
    }catch(err){
        throw err;
    }
}

// Asynchronous function to delete the record from the database
async function removeTask(userEmail, id){
    try{
        const result = await UserTasks.updateOne(
            { Email: userEmail },
            { $pull: { Tasks: { _id: id } } }
        );
        return result;
    }catch(err){
        throw err;
    }
}

// Exporting the functions 
module.exports = {
    insertTask,
    fetchTasks,
    updateTask,
    removeTask
}