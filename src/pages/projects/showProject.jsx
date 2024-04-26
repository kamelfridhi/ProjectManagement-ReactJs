// ShowProject.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as ProjectService from '../../_services/ProjectService.jsx';
import ProjectDashboard from './ProjectDashboard';

const ShowProject = () => {
    const [project, setProject] = useState(null);
    const { projectName } = useParams();

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const data = await ProjectService.getProjectByName(projectName)
                setProject(data);
            } catch (error) {
                console.error('Error fetching project:', error);
            }
        };
        fetchProject();
    }, [projectName]);

    return <ProjectDashboard project={project} />;
};

export default ShowProject;
