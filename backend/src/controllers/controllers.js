// Importing required modules
const redis = require("redis")
const { isDate } = require("util/types");
const {
    insertTask,
    fetchTasks,
    updateTask,
    removeTask
} = require("../services/DBservices");

// Connecting to the Redis server
const redisClient = redis.createClient();
redisClient.on('error', err => console.log('Redis Client Error', err));
redisClient.connect();

// Validating user session
function getSession(request){
    return request.session.userEmail;
}

function validateTask(task){
    return (task.Title==null || task.Description==null || task.Status==null || !(isDate(task.Duedate)))
}

// Handling GET request
async function getTasks(request, response){
    console.log("##### HTTP REQUEST: GET #####");
    const userEmail = request.params.Email;
    console.log(userEmail);
    if(userEmail==null){
        console.log("User not logged in");
        return response.status(401).json({
            status: "Failed",
            message: "User not logged in"
        })
    }
    try{
        var tasks;
        var dataOut = await redisClient.get("Tasks");
        if(dataOut==null){
            tasks = await fetchTasks(userEmail);
            const serializedArray = JSON.stringify(tasks);
            await redisClient.setEx('Tasks', 1, serializedArray);
        }
        else{
            tasks = JSON.parse(dataOut);
        }
        console.log(tasks);
        console.log("Data retreived successfully");
        return response.status(200).json({
            status: "Success",
            message: "Data retreived successfully",
            data: tasks
        })
    }catch(err){
        console.log("ERROR: "+err);
        return response.status(500).json({
            status: "Failed",
            message: "Failed to retreive data"
        })
    }
}

// Handling POST request
async function postTasks(request, response){
    console.log("##### HTTP REQUEST: POST #####");

    // Checking whether the user is logged in
    const userEmail = request.params.Email;
    if(userEmail==null){
        console.log("User not logged in");
        return response.status(401).json({
            status: "Failed",
            message: "User not logged in"
        })
    }

    const task = request.body;
    delete task._csrf;
    task.Duedate = new Date(task.Duedate);
    console.log(task);

    // Validating the data 
    if(validateTask(task)){
        console.log("Data validation failed");
        return response.status(400).json({
            status: "Failed",
            message: "Data validation failed"
        })
    }

    // Performing insert operation
    try{
        const result = await insertTask(userEmail, task);
        console.log("Data insertion successful",);
        return response.status(200).json({
            status: "Success",
            message: "Data insertion successful",
            data: result
        })
    }catch(err){
        console.log("ERROR: "+err);
        return response.status(500).json({
            status: "Failed",
            message: "Data insertion failed"
        })
    }
}

// Handling PATCH request
async function patchTasks(request, response){
    console.log("##### HTTP REQUEST: PATCH #####");
    const userEmail = request.params.Email;
    if(userEmail==null){
        console.log("User not logged in");
        return response.status(401).json({
            status: "Failed",
            message: "User not logged in"
        })
    }
    const id = request.query.id;
    const task = request.body;
    var newTask = {};
    try{
        for (let key in task) {
            newTask[`Tasks.$.${key}`] = task[key];
        }
        const result = await updateTask(userEmail, id, newTask);
        console.log("Data updation successful");
        return response.status(200).json({
            status: "Success",
            message: "Data updation successful",
            data: result
        })
    }catch(err){
        console.log("ERROR: "+err);
        return response.status(500).json({
            status: "Failed",
            message: "Data updation failed"
        })
    }
}

// Handling PUT request
async function putTasks(request, response){
    console.log("##### HTTP REQUEST: PUT #####");
    const userEmail = request.params.Email;
    if(userEmail==null){
        console.log("User not logged in");
        return response.status(401).json({
            status: "Failed",
            message: "User not logged in"
        })
    }
    const id = request.query.id;
    const task = request.body;

    console.log(id);
    console.log(task);
}

// Handling DELETE request
async function deleteTasks(request, response){
    console.log("##### HTTP REQUEST: DELETE #####");
    const userEmail = request.params.Email;
    if(userEmail==null){
        console.log("User not logged in");
        return response.status(401).json({
            status: "Failed",
            message: "User not logged in"
        })
    }
    const id = request.query.id;
    try{
        const result = await removeTask(userEmail, id);
        console.log("Data deletion successful");
        return response.status(200).json({
            status: "Success",
            message: "Data deletion successful",
            data: result
        })
    }catch(err){
        console.log("ERROR: "+err);
        return response.status(500).json({
            status: "Failed",
            message: "Data daletion failed"
        })
    }
}

// Generates CSRF token for validation
async function getCSRFToken(request, response){
    try{
        return response.status(200).json({
            status: "Success",
            message: "Data deletion successful",
            data: {
                csrfToken: request.csrfToken()
            }
        })
    }catch(err){
        console.log("ERROR: "+err);
        return response.status(500).json({
            status: "Failed",
            message: "Failed to generate CSRF Token"
        });
    }
}

// Creates a session after successful login
async function userLogin(request, response){
    const { Email } = request.params;
    console.log(Email);
    try{
        request.session.userEmail = Email;
        console.log("Login success");
        return response.status(200).json({
            status: "Success",
            message: "Login attempt successful"
        })
    }catch(err){
        console.log("Login failed");
        return response.status(500).json({
            status: "Failed",
            message: "Login attempt failed"
        })
    }
}

// Destroys the session after logout
async function userLogout(request, response){
    const userEmail = getSession(request);
    console.log(userEmail);
    if(userEmail==null){
        console.log("User not logged in");
        return response.status(401).json({
            status: "Failed",
            message: "User not logged in"
        })
    }
    request.session.destroy((err) => {
        if(err) {
            console.log(err);
            return response.status(500).json({
                status: "Failed",
                message: "Logout attempt failed"
            })
        } else {
            console.log("Logout successful");
            return response.status(200).json({
                status: "Success",
                message: "Logout successful"
            })
        }
    });
}

// Exporting the functions 
module.exports = {
    getTasks,
    postTasks,
    patchTasks,
    putTasks,
    deleteTasks,
    getCSRFToken,
    userLogin,
    userLogout
};