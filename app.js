// To create a project
// 1. Create basic setup
// 2. Install mongoose - to work seamlessly with Mongo Atlas DB
// use mongoose library to work with  mongo DB
// create schema 



const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
require('dotenv').config();


//middleware
app.use(express.static('./public'));
app.use(express.json()); //express.json() -> It is a method inbuilt in express to recognize the incoming Request Object as a JSON Object.

//routes
app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

//app.get('/api/v1/tasks')         - get all the tasks
//app.post('/api/v1/tasks')        - create a task
//app.get('/api/v1/tasks/:id')     - get single task
//app.patch('/api/v1/tasks/:id')   - update single task
//app.delete('/api/v1/tasks/:id')  - delete single task

const port = process.env.PORT || 3000;    //process.env.PORT for heroku


const start = async() => {
    try {
        //process.env is used to get the secret variables set in .env file after importing that file using
        //require('dotenv').config();
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`server is listening on port ${port}`));       
    } catch (error) {
        console.log(error);
    }
}

start();