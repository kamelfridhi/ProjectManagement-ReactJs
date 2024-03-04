// UpdateProject.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as ProjectService from '../../_services/ProjectService.jsx';

const UpdateProject = ({ project, updateProject }) => {
    const [projectData, setProjectData] = useState({

        projectName: '',
        projectDescription: '',
        startDate: '',
        endDate: '',
    });

    const handleChange = (e, fieldName) => {
        const { value } = e.target;
        setProjectData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    };

    const handleUpdateProject = async () => {
        try {
            console.log('Before updating project:', projectData);

            // Log the project object
            console.log('Project:', project);

            // Check if any of the required fields are empty before sending the request
            // Add additional checks as needed based on your validation logic

            await ProjectService.updateProject(project.projectName, projectData);
            // Notify the parent component to update its state
            updateProject(projectData);

            console.log('After updating project:', projectData);
        } catch (error) {
            console.error('Error updating project:', error);
        }
    };







    return (
        <div>

            <button type="button" className="btn btn-primary" onClick={handleUpdateProject}>
                Update
            </button>
        </div>
    );
};

UpdateProject.propTypes = {
    project: PropTypes.object.isRequired,
    updateProject: PropTypes.func.isRequired,
};

export default UpdateProject;
