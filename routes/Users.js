const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Task = require('../models/Task'); // Import the Task model

// Create a new user
router.post('/', async (req, res) => {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });

    try {
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get tasks assigned to a user by their ID
router.get('/:id/assigned-tasks', async (req, res) => {
    const { id } = req.params;

    try {
        const assignedTasks = await Task.find({ assignedTo: id }).populate('assignedTo', 'username');
        res.status(200).json(assignedTasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get tasks completed by a user by their ID
router.get('/:id/completed-tasks', async (req, res) => {
    const { id } = req.params;

    try {
        const completedTasks = await Task.find({ assignedTo: id, status: 'Done' }).populate('assignedTo', 'username');
        res.status(200).json(completedTasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
