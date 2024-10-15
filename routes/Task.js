const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const mongoose = require('mongoose');

// Create a new task
router.post('/', async (req, res) => {
    const { title, description, assignedTo, status, priority } = req.body;

    // Validate required fields
    if (!title || !assignedTo) {
        return res.status(400).json({ message: 'Title and Assigned User are required.' });
    }

    const task = new Task({ title, description, assignedTo, status, priority });

    try {
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        console.error('Error saving task:', err);
        res.status(400).json({ message: 'Error saving task', error: err.message });
    }
});

// Get all tasks with filtering and sorting
router.get('/', async (req, res) => {
    const { status } = req.query; // Removed project filter

    let filter = {};
    if (status) {
        filter.status = status; // Filter by status if provided
    }

    try {
        const tasks = await Task.find(filter).populate('assignedTo', 'username');

        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update Task Status
router.put('/:id', async (req, res) => {
    const { status, priority } = req.body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid task ID format' });
    }

    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, { status, priority }, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error });
    }
});

// DELETE Task by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid task ID format' });
    }

    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
    }
});

module.exports = router;
