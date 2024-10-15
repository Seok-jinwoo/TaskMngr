import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './styles/Projects.css'; 
import ProjectForm from './ProjectForm'; // Import the ProjectForm modal component

const Project = () => {
    const [projects, setProjects] = useState([]);
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await axios.get(`http://localhost:5000/api/projects`); 
            setProjects(response.data);
        };

        fetchProjects();
    }, []);

    const createProject = () => {
        setShowModal(true); // Show the modal when the button is clicked
    };

    const closeModal = () => {
        setShowModal(false); // Close the modal when needed
    };

    const handleCardClick = (projectId) => {
        navigate(`/tasks/project/${projectId}`);
    };

    return (
        <div>
            <div className="project-header">
                <h1>Projects</h1>
                <button className="create-project-button" onClick={createProject}>
                    <FontAwesomeIcon icon={faPlus} /> Create Project
                </button>
            </div>

            <div className="project-list">
                {projects.map(project => (
                    <div 
                        key={project._id} 
                        className="project-card" 
                        onClick={() => handleCardClick(project._id)}
                    >
                        <h2>{project.name}</h2>
                        <p>{project.description}</p>
                    </div>
                ))}
            </div>

            {/* Conditionally render the ProjectForm modal */}
            {showModal && <ProjectForm closeModal={closeModal} />}
        </div>
    );
};

export default Project;
