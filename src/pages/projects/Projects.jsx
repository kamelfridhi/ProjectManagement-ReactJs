import React, {useEffect, useState} from "react";
import * as ProjectService from "../../_services/ProjectService";
import addProject from "./addProject.jsx";
import updateProject from "./updateProject.jsx";
import project from "../../_models/Project.jsx";
import * as userservice from "../../_services/UserService.jsx";
import {Link} from "react-router-dom";
import * as TeamService from "../../_services/TeamService.jsx";
//import {affectTeamToProject} from "../../_services/ProjectService";

export default function Project() {

    const [projects, setProjects] = useState([]);
    const [projectIdToDelete, setProjectIdToDelete] = useState(null);
    const [projectData, setProjectData] = useState({});
    const [start, setStart]=useState('');
    const [end, setEnd]=useState('');
    const[teams,SetTeams]= useState([]);
    const [weeksInPeriod, setWeeksInPeriod]=useState(0);
    const [selectedTeam, setSelectedTeam] = useState('');
    const [selectedProject, setSelectedProject] = useState('');
    const fetchProjects = async () => {
        try {
            const data = await ProjectService.getAllProject();
            setProjects(data);


        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    useEffect(() => {


        fetchProjects();
    }, [projects]);

    const handleAffectTeamToProject = async () => {
        try {
            await affectTeamToProject(selectedTeam, selectedProject);
            // Optionally, you can update the state or perform other actions after affecting the team to the project
            console.log('Team affected to project successfully!');
        } catch (error) {
            console.error('Error affecting team to project:', error);
        }
    };

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const data = await TeamService.getAllteam();
                SetTeams(data);


            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        };

        fetchTeams();
    }, []);




    const handleUpdateProject = async (projectId) => {
        try {
            console.log('Before updating project:', projectData);

            // Log the project object
            console.log('Project:', project);

            // Check if any of the required fields are empty before sending the request
            // Add additional checks as needed based on your validation logic

            await ProjectService.updateProject(projectId, projectData);
            // Notify the parent component to update its state
            updateProject(projectData);

            console.log('After updating project:', projectData);
        } catch (error) {
            console.error('Error updating project:', error);
        }
    };







    const handleAddProject = async () => {
        try {
            console.log('Before adding project:', projectData);

            // Check if any of the required fields are empty before sending the request


            await ProjectService.createProject(projectData);
            // Notify the parent component to update its state
            addProject(projectData);
            await fetchProjects()
            console.log('After adding project:', projectData);
        } catch (error) {
            console.error('Error creating project:', error);
        }

    };

    const handleChange = (e, fieldName) => {
        const {value} = e.target;
        setProjectData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    };

    const handleDelete = async (projectId) => {
        try {
            // Delete project on the server
            await ProjectService.deleteProject(projectId);

            // Remove the deleted project from the state
            setProjects((prevProjects) =>
                prevProjects.filter((project) => project.projectName !== projectId)
            );
        } catch (error) {
            console.error('Error deleting project:', error);
        }

    };


    return (

        <div className="main px-lg-4 px-md-4">
            {/* Body: Body */}
            <div className="body d-flex py-lg-3 py-md-2">
                <div className="container-xxl">
                    <div className="row align-items-center">
                        <div className="border-0 mb-4">
                            <div
                                className="card-header p-0 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                                <h3 className="fw-bold py-3 mb-0">Projects</h3>
                                <div className="d-flex py-2 project-tab flex-wrap w-sm-100">
                                    <button
                                    type="button"
                                    className="btn btn-dark w-sm-100"
                                    data-bs-toggle="modal"
                                    data-bs-target="#createproject"

                                    style={{backgroundColor: '#4c3575'}}
                                >
                                    <i className="icofont-plus-circle me-2 fs-6" />
                                    Create Project
                                </button>


                                    <ul
                                        className="nav nav-tabs tab-body-header rounded ms-3 prtab-set w-sm-100"
                                        role="tablist"
                                    >
                                        <li className="nav-item">
                                            <a
                                                className="nav-link active"
                                                data-bs-toggle="tab"
                                                href="#All-list"
                                                role="tab"
                                            >
                                                All
                                            </a>
                                        </li>


                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    {" "}
                    {/* Row end  */}
                    <div className="row g-3 mb-3 row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-2 row-cols-xl-4 row-cols-xxl-4">
                        <div className="col">
                            <div className="card bg-primary">
                                <div className="card-body text-black d-flex align-items-center">
                                    <i className="icofont-data fs-3" />
                                    <div className="d-flex flex-column ms-3">
                                        <h6 className="mb-0">Total Projects</h6>
                                        <span className="text-black">550</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card bg-primary">
                                <div className="card-body text-black d-flex align-items-center">
                                    <i className="icofont-chart-flow fs-3" />
                                    <div className="d-flex flex-column ms-3">
                                        <h6 className="mb-0">Coming Projects</h6>
                                        <span className="text-black">210</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card bg-primary">
                                <div className="card-body text-black d-flex align-items-center">
                                    <i className="icofont-chart-flow-2 fs-3" />
                                    <div className="d-flex flex-column ms-3">
                                        <h6 className="mb-0">Progress Projects</h6>
                                        <span className="text-black">8456 Files</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card bg-primary">
                                <div className="card-body text-black d-flex align-items-center">
                                    <i className="icofont-tasks fs-3" />
                                    <div className="d-flex flex-column ms-3">
                                        <h6 className="mb-0">Finished Projects</h6>
                                        <span className="text-black">88 Files</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-lg-12 col-md-12 flex-column">
                            <div className="tab-content mt-4">
                                <div className="tab-pane fade show active" id="All-list">
                                    <div className="row g-3 gy-5 py-3 row-deck">


                                        {projects.map(project => (
                                            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6"
                                                 key={project._id}>
                                                <div className="card">
                                                    <div
                                                        className="btn-group"
                                                        role="group"
                                                        aria-label="Basic outlined example"

                                                    >
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-secondary"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#editproject"
                                                            onClick={() => setProjectIdToDelete(project.projectName)}
                                                        >
                                                            <i className="icofont-edit text-success"/>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-secondary"
                                                            data-bs-toggle="modal"
                                                            data-bs-target={`#deleteproject`}
                                                            onClick={() => setProjectIdToDelete(project.projectName)}

                                                        >
                                                            <i className="icofont-ui-delete text-danger"/>
                                                        </button>
                                                    </div>
                                                    <div className="card-body">

                                                        <div
                                                            className="d-flex align-items-center justify-content-between mt-5">
                                                            <div className="lesson_name">
                                                                <Link to={`/Home/project-dashboard/${project._id}`}>
                                                                <div className="project-block " style={{backgroundColor: '#4c3575'}}>

                                                                    <i className="icofont-tasks" style={{color: '#ffffff'}} />
                                                                </div>
                                                                <span className="small text-muted project_name fw-bold">
                                                            {" "}

                                                                    <li key={project._id}>

                            {project.projectName}
                        </li>


                                                        </span>
                                                                </Link>

                                                            </div>

                                                        </div>

                                                        <div className="row g-2 pt-4">

                                                            <div className="col-6">
                                                                <div className="d-flex align-items-center">

                                                                    {(() => {
                                                                        const projectStart = new Date(project.startDate);
                                                                        const projectEnd = new Date(project.endDate);
                                                                        console.log("Project Start Date:", projectStart);
                                                                        console.log("Project End Date:", projectEnd);

                                                                        const timeDifference = projectEnd.getTime() - projectStart.getTime();
                                                                        console.log("Time Difference:", timeDifference);

                                                                        const daysInPeriod = Math.floor(timeDifference / (1000 * 3600 * 24));
                                                                        console.log("Days in Period:", daysInPeriod);

                                                                        const weeksInPeriod = Math.floor(daysInPeriod / 7);
                                                                        console.log("Weeks in period:", weeksInPeriod);

                                                                        return (
                                                                            <p>
                                                                                <i className="icofont-sand-clock"/>  {weeksInPeriod} Weeks and {daysInPeriod} days
                                                                            </p>
                                                                        );
                                                                    })()}
                                                                </div>
                                                            </div>
                                                            <div className="col-6">
                                                                <div className="d-flex align-items-center">
                                                                    <i className="icofont-group-students "/>
                                                                    <span className="ms-2">5 Members</span>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="dividers-block"/>
                                                        <div
                                                            className="d-flex align-items-center justify-content-between mb-2">
                                                            <h4 className="small fw-bold mb-0">Progress</h4>
                                                            <span className="small light-danger-bg  p-1 rounded">

                                                               {(() => {
                                                                   const end = new Date(project.endDate);
                                                                   const currentDate = new Date();
                                                                   const remainingDays = Math.floor((end.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));

                                                                   console.log("test weeks", weeksInPeriod);
                                                                   console.log("remaining days", remainingDays);

                                                                   return (
                                                                       <div>
                                                                           <p>
                                                                               <i className="icofont-ui-clock" />
                                                                               {remainingDays} Days left
                                                                           </p>
                                                                       </div>
                                                                   );
                                                               })()}

                                                    </span>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>

                                        ))}


                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal Members*/}

            <div className="modal fade" id="addUser" tabIndex={-1} aria-labelledby="addUserLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold" id="addUserLabel">
                                Employee Invitation
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <div className="inviteby_email">
                                <div className="input-group mb-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Email address"
                                        id="exampleInputEmail1"
                                        aria-describedby="exampleInputEmail1"
                                    />
                                    <button className="btn btn-dark" type="button" id="button-addon2">
                                        Sent
                                    </button>
                                </div>
                            </div>
                            <div className="members_list">
                                <h6 className="fw-bold">Teams</h6>
                                <ul className="list-unstyled list-group list-group-custom list-group-flush mb-0">
                                    {teams.map((team) => (
                                        <li key={team.id} className="list-group-item py-3 text-center text-md-start">
                                            <div className="d-flex align-items-center flex-column flex-sm-column flex-md-column flex-lg-row">
                                                <div className="no-thumbnail mb-2 mb-md-0">
                                                    <img className="avatar lg rounded-circle" src={team.avatar} alt={team.name} />
                                                </div>
                                                <div className="flex-fill ms-3 text-truncate">
                                                    <h6 className="mb-0 fw-bold">{team.name}</h6>
                                                    <span className="text-muted">{team.email}</span>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Create Project*/}
            <div
                className="modal fade"
                id="createproject"
                tabIndex={-1}
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title  fw-bold" id="createprojectlLabel">
                                {" "}
                                Create Project
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput77" className="form-label">
                                    Project Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleFormControlInput77"
                                    placeholder="Explain what the Project Name"

                                    onChange={(e) => handleChange(e, 'projectName')}
                                />
                            </div>


                            <div className="deadline-form">
                                <form>
                                    <div className="row g-3 mb-3">
                                        <div className="col">
                                            <label htmlFor="datepickerded" className="form-label">
                                                Project Start Date
                                            </label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="datepickerded"

                                                onChange={(e) => handleChange(e, 'startDate')}

                                            />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="datepickerdedone" className="form-label">
                                                Project End Date
                                            </label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="datepickerdedone"
                                                onChange={(e) => handleChange(e, 'endDate')}
                                            />
                                        </div>
                                    </div>
                                    <div className="row g-3 mb-3">
                                        <div className="col-sm-12">
                                            <label className="form-label">Project Category</label>
                                            <select
                                                className="form-select"
                                                aria-label="Default select example"
                                            >
                                                <option selected="">UI/UX Design</option>
                                                <option value={1}>Team Leader Only</option>
                                                <option value={2}>Team Member Only</option>
                                            </select>
                                        </div>

                                    </div>
                                </form>
                            </div>

                            <div className="mb-3">
                                <label
                                    htmlFor="exampleFormControlTextarea78"
                                    className="form-label"
                                >
                                    Description (optional)
                                </label>
                                <textarea
                                    className="form-control"
                                    id="exampleFormControlTextarea78"
                                    rows={3}
                                    placeholder="Add any extra details about the request"
                                    defaultValue={""}
                                    onChange={(e) => handleChange(e, 'projectDescription')}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">

                            <button
                                data-bs-dismiss="modal"
                                type="button"
                                className="btn btn-primary"
                                onClick={handleAddProject}
                                style={{ backgroundColor: '#007bff' }}
                            >
                                Create
                            </button>

                        </div>
                    </div>
                </div>
            </div>
            {/* Edit Project*/}
            <div className="modal fade" id="editproject" tabIndex={-1} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title  fw-bold" id="editprojectLabel">
                                {" "}
                                Edit Project
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput78" className="form-label">
                                    Project Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleFormControlInput78"
                                    value={projectData.projectName}
                                    onChange={(e) => handleChange(e, 'projectName')}
                                />
                            </div>


                            <div className="deadline-form">
                                <form>
                                    <div className="row g-3 mb-3">
                                        <div className="col">
                                            <label htmlFor="datepickerded123" className="form-label">
                                                Project Start Date
                                            </label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="datepickerded123"
                                                value={projectData.startDate}
                                                onChange={(e) => handleChange(e, 'startDate')}
                                            />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="datepickerded456" className="form-label">
                                                Project End Date
                                            </label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="datepickerded456"
                                                value={projectData.endDate}
                                                onChange={(e) => handleChange(e, 'endDate')}
                                            />
                                        </div>
                                    </div>
                                    <div className="row g-3 mb-3">
                                        <div className="col-sm-12">
                                            <label className="form-label">Project Category</label>
                                            <select
                                                className="form-select"
                                                aria-label="Default select example"
                                            >
                                                <option selected="">All</option>
                                                <option value={1}>Team Leader Only</option>
                                                <option value={2}>Team Member Only</option>
                                            </select>
                                        </div>

                                    </div>
                                </form>
                            </div>

                            <div className="mb-3">
                                <label
                                    htmlFor="exampleFormControlTextarea786"
                                    className="form-label"
                                >
                                    Description (optional)
                                </label>
                                <textarea
                                    className="form-control"
                                    id="exampleFormControlTextarea786"
                                    rows={3}
                                    value={projectData.projectDescription}
                                    onChange={(e) => handleChange(e, 'projectDescription')}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">

                            <button type="button" className="btn btn-primary"                                data-bs-dismiss="modal"

                                    onClick={() => handleUpdateProject(projectIdToDelete)}
                                    style={{ backgroundColor: '#007bff' }}>
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal Delete Folder/ File*/}

            <div className="modal fade" id={`deleteproject`} tabIndex={-1} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold" id="deleteprojectLabel">
                                {" "}
                                Delete item Permanently?
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body justify-content-center flex-column d-flex">
                            <i className="icofont-ui-delete text-danger display-2 text-center mt-2"/>
                            <p className="mt-4 fs-5 text-center">
                                You can only delete this item Permanently
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger color-fff"
                                onClick={() => handleDelete(projectIdToDelete)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )

}