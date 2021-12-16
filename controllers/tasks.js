const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const {createCustomError} = require('../errors/custom-error');

// Mongoose queries are not promises. They have a .then() function for co and async/await as a convenience

const getAllTasks = asyncWrapper( async (req, res) => {

    const allTasks = await Task.find({});
    res.status(200).json({tasks : allTasks});
})

const createTask = asyncWrapper ( async (req, res) => {

    const task = await Task.create(req.body);
    res.status(201).json({task});   
})

const getTask = asyncWrapper ( async (req, res, next) => {

    const {id:taskId} = req.params;
    const task = await Task.findOne({_id:taskId});  // _id means this is the variable that will match with the database variable 
                                                    // -> it simply means we have a variale named "id" in our database
    if(!task) {
        return new createCustomError(`task with id : ${taskId} does not exist`, 404);
    }
    res.status(200).json({task});
})

const deleteTask = asyncWrapper (async (req, res) => {
    
    const {id:taskId} = req.params;
    const task = await Task.findOneAndDelete({_id:taskId});

    if(!task) {
        return new createCustomError(`task with id : ${taskId} does not exist`, 404);
    }
    res.status(200).json({task});
})

const updateTask = asyncWrapper (async (req, res) => {
    
    const {id:taskId} = req.params;
    const task = await Task.findOneAndUpdate({_id:taskId}, req.body, {
        new:true,            // it will return the updated task in variable "task"
        runValidators:true   // it will run the validators while the user is sending the task to get updated
    });
    
    if(!task) {
        return new createCustomError(`task with id : ${taskId} does not exist`, 404);
    }
    res.status(200).json({task});
})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
}