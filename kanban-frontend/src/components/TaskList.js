import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCircleCheck, faCirclePlay, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Modal, Select, message } from 'antd'; // Import Modal and message from antd
import './styles/TaskList.css';
import TaskForm from './Taskform';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [statusFilter, setStatusFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false); // State to handle delete modal
    const [taskToDelete, setTaskToDelete] = useState(null); // Task selected for deletion

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await axios.get('http://localhost:5000/api/tasks');
            setTasks(response.data);
        };

        const fetchUsers = async () => {
            const response = await axios.get('http://localhost:5000/api/users');
            setUsers(response.data);
        };

        fetchTasks();
        fetchUsers();
    }, []);

    const handleTaskAdded = async () => {
        const response = await axios.get('http://localhost:5000/api/tasks');
        setTasks(response.data);
        setIsModalOpen(false);
    };

    const updateTaskStatus = async (taskId, newStatus, newPriority, newAssignedUser) => {
        await axios.put(`http://localhost:5000/api/tasks/${taskId}`, {
            status: newStatus,
            priority: newPriority,
            assignedTo: newAssignedUser?._id
        });
        setTasks(tasks.map(task =>
            (task._id === taskId ? { ...task, status: newStatus, priority: newPriority, assignedTo: newAssignedUser } : task)
        ));
    };

    const showDeleteModal = (task) => {
        setTaskToDelete(task);
        setDeleteModalOpen(true); // Open delete confirmation modal
    };

    const handleDeleteCancel = () => {
        setDeleteModalOpen(false); // Close the modal without deleting
        setTaskToDelete(null); // Reset selected task for deletion
        message.error('Andhe Laude Nigga click kyu kiya phir?');
    };

    const confirmDeleteTask = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${taskToDelete._id}`);
            setTasks(tasks.filter(task => task._id !== taskToDelete._id));
            message.success('Task deleted'); // Show success message
        } catch (error) {
            console.error('Error deleting task:', error);
            message.error('Error deleting task'); // Show error message if failed
        }
        setDeleteModalOpen(false); // Close the modal after deletion
    };

    const handleCardClick = (task) => {
        setSelectedTask(task);
    };

    const closeDetailView = () => {
        setSelectedTask(null);
    };

    const handleUpdateClick = () => {
        if (selectedTask) {
            updateTaskStatus(
                selectedTask._id,
                selectedTask.status,
                selectedTask.priority,
                selectedTask.assignedTo
            );
            closeDetailView();
        }
    };

    const filteredTasks = tasks.filter(task => {
        return (!statusFilter || task.status === statusFilter) &&
               (!priorityFilter || task.priority === priorityFilter);
    });

    return (
        <div>
            <div className="task-header">
                <h1>Task List</h1>

                <Select 
                    className='dropdown'
                    defaultValue=""  
                    style={{ width: 150, height: 60 }}  
                    onChange={setStatusFilter}
                    options={[
                        { value: '', label: 'All' },
                        { value: 'To Do', label: 'To Do' },
                        { value: 'In Progress', label: 'In Progress' },
                        { value: 'Done', label: 'Done' },
                    ]}
                />

                <Select 
                    className='dropdown'
                    defaultValue=""  
                    style={{ width: 150, height: 60, marginLeft: 10 }}  
                    onChange={setPriorityFilter}
                    options={[
                        { value: '', label: 'All Priorities' },
                        { value: 'Low', label: 'Low' },
                        { value: 'Medium', label: 'Medium' },
                        { value: 'High', label: 'High' },
                    ]}
                />

                <button className="create-task-button" onClick={() => setIsModalOpen(true)}>Create New Task</button>
            </div>
            
            <ul className='Tasklist-ul'>
                {filteredTasks.length > 0 ? (
                    filteredTasks.map(task => (
                        <li 
                            key={task._id} 
                            className="task-card" 
                            onClick={() => handleCardClick(task)}
                        >
                            <div className='task-anim'>
                            <div className="task-content">
                                <h2>{task.title}</h2>
                                <div className='task-details-desc'><p>{task.description}</p></div>
                                <div className="task-details">
                                    <strong><p className='task-details-status'>{task.status}</p></strong>
                                    <strong><p className='task-details-priority'>{task.priority}</p></strong>
                                </div>
                            </div>
                            <div className="task-buttons">
                                <div className='task-button-start'>
                                    <button 
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            updateTaskStatus(task._id, 'In Progress', task.priority, task.assignedTo);
                                        }}>
                                        <FontAwesomeIcon icon={faCirclePlay} />
                                    </button>
                                </div>
                                <div className='task-button-done'>
                                    <button 
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            updateTaskStatus(task._id, 'Done', task.priority, task.assignedTo);
                                        }}>
                                        <FontAwesomeIcon icon={faCircleCheck} />
                                    </button>
                                </div>
                                <div className='task-button-delete'>
                                    <button 
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            showDeleteModal(task); // Show delete confirmation modal
                                        }}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </div>
                            </div>
                        </li>

                    ))
                ) : (
                    <li className="task-card">
                        <div className="task-content">
                            <h2>No tasks available.</h2>
                        </div>
                    </li>
                )}
            </ul>

            {/* Delete Confirmation Modal */}
            <Modal
                title="Delete Task"
                open={deleteModalOpen}
                onCancel={handleDeleteCancel}
                footer={[
                    <button key="no" onClick={handleDeleteCancel} className="no-button">No</button>,
                    <button key="delete" onClick={confirmDeleteTask} className="delete-button">Delete</button>
                ]}
            >
                <p>Are you sure you want to delete this task?</p>
            </Modal>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span 
                            className="close" 
                            onClick={() => setIsModalOpen(false)} 
                            role="button" 
                            aria-label="Close modal"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} className="back-icon" />
                        </span>
                        <h2>Create New Task</h2>
                        <TaskForm onTaskAdded={handleTaskAdded} />
                    </div>
                </div>
            )}

            {selectedTask && (
                <div className="modal">
                    <div className="modal-content">
                        <span 
                            className="close" 
                            onClick={closeDetailView} 
                            role="button" 
                            aria-label="Close detail view"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} className="back-icon" />
                        </span>
                        <h2>{selectedTask.title}</h2>
                        <p>Description: {selectedTask.description}</p>
                        <p>Status: {selectedTask.status}</p>
                        <p>Priority: {selectedTask.priority}</p>
                        <p>Assigned to: {selectedTask.assignedTo?.username || 'Unassigned'}</p>

                        <div className="task-detail-actions">
                            <select 
                                value={selectedTask.status} 
                                onChange={(e) => setSelectedTask(prev => ({ ...prev, status: e.target.value }))} 
                            >
                                <option value="To Do">To Do</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Done">Done</option>
                            </select>

                            <select 
                                value={selectedTask.priority} 
                                onChange={(e) => setSelectedTask(prev => ({ ...prev, priority: e.target.value }))} 
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>

                            <select 
                                value={selectedTask.assignedTo?._id || ''} 
                                onChange={(e) => setSelectedTask(prev => ({ ...prev, assignedTo: users.find(u => u._id === e.target.value) }))} 
                            >
                                <option value="">Unassigned</option>
                                {users.map(user => (
                                    <option key={user._id} value={user._id}>{user.username}</option>
                                ))}
                            </select>

                            <button onClick={handleUpdateClick}>Update Task</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskList;
