// AddProject.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as ProjectService from '../../_services/ProjectService.jsx';






const AddProject = ({ addProject }) => {
    // Ensure that useState is called directly inside the functional component
    const [projectData, setProjectData] = useState({
        projectName: '',
        projectDescription: '',
        startDate: '',
        endDate: '',
        projectCategory:''
    });

    const handleChange = (e, fieldName) => {
        const { value } = e.target;
        setProjectData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    };

    const handleAddProject = async () => {
        try {
            console.log('Before adding project:', projectData);

            // Check if any of the required fields are empty before sending the request
            if (!projectData.projectName || !projectData.startDate || !projectData.endDate) {
                console.error('Required fields are empty. Cannot create project.');
                return;
            }

            await ProjectService.createProject(projectData);
            // Notify the parent component to update its state
            addProject(projectData);

            console.log('After adding project:', projectData);
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    return (
        <div>
            {/* Your modal JSX here */}

            {/* Button to trigger handleAddProject */}
            <button type="button" className="btn btn-primary" onClick={handleAddProject}>
                Create
            </button>
        </div>
    );
};

AddProject.propTypes = {
    addProject: PropTypes.func.isRequired,
};

export default AddProject;
