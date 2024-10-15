import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/Taskform.css';

const TaskForm = ({ onTaskAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('To Do');
    const [priority, setPriority] = useState('Low');
    const [assignedTo, setAssignedTo] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get('http://localhost:5000/api/users');
            setUsers(response.data);
        };
        fetchUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // removed that project fuxker
            const newTask = { title, description, status, priority, assignedTo };
            console.log('New Task Data:', newTask);
            await axios.post('http://localhost:5000/api/tasks', newTask);
            console.log('N Task Data:',newTask); 
            onTaskAdded();

            // Reset form fields
            setTitle('');
            setDescription('');
            setStatus('To Do');
            setPriority('Low');
            setAssignedTo('');
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input className='task-title-input'
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Task Title" 
                required 
            />
            <textarea className='task-description-input'
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Task Description" 
                rows="10" 
                cols="40" 
                required 
            />
            <select className='status-dropdown' value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
            </select>
            <select className='priority-dropdown' value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <select className='assigned-user-dropdown' value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
                <option value="">Assign to</option>
                {users.map(user => (
                    <option key={user._id} value={user._id}>
                        {user.username}
                    </option>
                ))}
            </select>
            <button className='submit-button' type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;
