const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { 
        type: String, 
        enum: ['To Do', 'In Progress', 'Done'],
        default: 'To Do' 
    },
    assignedTo: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    priority: { 
        type: String, 
        enum: ['Low', 'Medium', 'High'], 
        default: 'Low' 
    },    
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
