import React from 'react';
import PropTypes from 'prop-types';
import * as ProjectService from '../../_services/ProjectService.jsx';

const ProjectDelete = ({ projectId, onDelete }) => {
    const handleDelete = async () => {
        try {
            await ProjectService.deleteProject(projectId);
            onDelete(projectId); // Notify the parent component to update its state
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    return (
        <button onClick={handleDelete} style={{ color: 'red' }}>
            Delete
        </button>
    );
};

ProjectDelete.propTypes = {
    projectId: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default ProjectDelete;
