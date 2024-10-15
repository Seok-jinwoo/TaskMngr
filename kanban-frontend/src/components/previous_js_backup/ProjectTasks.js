import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Projects'
import './styles/ProjectTasks.css';

const ProjectTasks = () => {
    const { projectId } = useParams(); // Get project ID from the URL
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/projects/${projectId}/tasks`);
                setTasks(response.data);
            } catch (err) {
                console.error('Error fetching tasks:', err);
            }
        };
        fetchTasks();
    }, [projectId]);

    return (
        <div className="task-container">
            <h1 className="page-title">Tasks for Project {projectId}</h1>
            <div className="task-card-container">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <div className="task-card" key={task._id}>
                            <h2>{task.title}</h2>
                            <p>{task.description}</p>
                            <p>Status: {task.status}</p>
                            <p>Priority: {task.priority}</p>
                        </div>
                    ))
                ) : (
                    <p>No tasks available for this project</p>
                )}
            </div>
        </div>
    );
};

export default ProjectTasks;
