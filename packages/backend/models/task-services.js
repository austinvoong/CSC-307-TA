import mongoose from 'mongoose';
import Task from './task.js'; // Assuming the task model is defined in './task.js'
import 'dotenv/config';

mongoose.set('debug', true);

mongoose
    .connect(
        'mongodb+srv://csc-307-ta:csc307ta@csc-307-ta.j0i3u.mongodb.net/hashPassword?retryWrites=true&w=majority&appName=CSC-307-TA',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .catch((error) =>
        console.log('cant connect to mongodb\nERROR say:\n', error)
    )

// **Task Services**

// Get all tasks for a specific user
function getTasksByUser(userId) {
    return Task.find({ userId });
}

// Get a single task by ID
function getTaskById(taskId) {
    return Task.findById(taskId);
}

// Add a new task
function addTask(task) {
    const newTask = new Task(task);
    console.log('adding task: ', task)
    const promise = newTask.save()
    return promise;
}

// Update an existing task
function updateTask(taskId, updates) {
    return Task.findByIdAndUpdate(taskId, updates, { new: true });
}

// Delete a task
function deleteTask(taskId) {
    return Task.findByIdAndDelete(taskId);
}

export default {
    getTasksByUser,
    getTaskById,
    addTask,
    updateTask,
    deleteTask,
};