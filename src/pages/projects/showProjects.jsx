import React, {useEffect, useState} from 'react';
import * as ProjectService from "../../_services/ProjectService.jsx";
import project from "../../_models/Project.jsx";

const ProjectList = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const data = await ProjectService.getAllProject();
            setProjects(data);
        };
        fetchProjects();
    }, []);

    return (
        <div>
            <h1>Projects: </h1>
            <ul>
                {projects.map(project => (
                    <li key={project._id}>name {project.projectName}</li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectList;