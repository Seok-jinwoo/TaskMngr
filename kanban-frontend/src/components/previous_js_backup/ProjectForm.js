import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './styles/ProjectForm.css'; // Add styles for your modal

const ProjectForm = ({ closeModal }) => {
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');

    const handleCreateProject = async () => {
        try {
            const newProject = {
                name: projectName,
                description: projectDescription
            };
            await axios.post('http://localhost:5000/api/projects', newProject); // Adjust the endpoint if needed
            closeModal(); // Close the modal after creating the project
        } catch (error) {
            console.error("Error creating project:", error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
            <span className="close" onClick={closeModal}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </span>                                         {/* Close button */}
                <h2>Create New Project</h2>
                <input 
                    type="text" 
                    placeholder="Project Name" 
                    value={projectName} 
                    onChange={(e) => setProjectName(e.target.value)} 
                />
                <textarea 
                    placeholder="Project Description" 
                    value={projectDescription} 
                    onChange={(e) => setProjectDescription(e.target.value)} 
                />
                <button onClick={handleCreateProject}>Add Project</button>
            </div>
        </div>
    );
};

export default ProjectForm;
