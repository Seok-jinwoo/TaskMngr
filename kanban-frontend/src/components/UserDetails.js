import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/UserDetail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const UserDetails = ({ user, onBack }) => {
    const [assignedTasks, setAssignedTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);

    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:5000/api/users/${user._id}/assigned-tasks`)
                .then(response => {
                    setAssignedTasks(response.data);
                })
                .catch(err => {
                    console.error('Error fetching assigned tasks:', err);
                });

            axios.get(`http://localhost:5000/api/users/${user._id}/completed-tasks`)
                .then(response => {
                    setCompletedTasks(response.data);
                })
                .catch(err => {
                    console.error('Error fetching completed tasks:', err);
                });
        }
    }, [user]);

    return (
        <div className="user-detail">
            <div className="header">
                <h1>User Details</h1>
                <span 
                    className="back-icon" 
                    onClick={onBack} // Back button to return to UserList
                    role="button"
                    aria-label="Go back to user list" 
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                </span>
            </div>
            <p><strong>Name:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Bio:</strong> {user.bio || 'No bio available'}</p>

            <div className="tasks-container">
                <div className="assigned-tasks">
                    <h2>Assigned Tasks</h2>
                    <ul>
                        {assignedTasks.length > 0 ? (
                            assignedTasks.map(task => (
                                <li key={task._id}>{task.title}</li>
                            ))
                        ) : (
                            <li>No assigned tasks</li>
                        )}
                    </ul>
                </div>

                <div className="completed-tasks">
                    <h2>Completed Tasks</h2>
                    <ul>
                        {completedTasks.length > 0 ? (
                            completedTasks.map(task => (
                                <li key={task._id}>{task.title}</li>
                            ))
                        ) : (
                            <li>No completed tasks</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
