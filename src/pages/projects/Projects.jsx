import React, {useEffect, useState} from "react";
import * as ProjectService from "../../_services/ProjectService";
import addProject from "./addProject.jsx";
import updateProject from "./updateProject.jsx";
import project from "../../_models/Project.jsx";


export default function Project() {
    const [projects, setProjects] = useState([]);
    const [projectIdToDelete, setProjectIdToDelete] = useState(null);
    const [projectData, setProjectData] = useState({});

    useEffect(() => {
        const fetchProjects = async () => {
            const data = await ProjectService.getAllProject();
            setProjects(data);

        };
        fetchProjects();
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

                                    >
                                        <i className="icofont-plus-circle me-2 fs-6"/>
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
                                        <li className="nav-item">
                                            <a
                                                className="nav-link"
                                                data-bs-toggle="tab"
                                                href="#Started-list"
                                                role="tab"
                                            >
                                                Started
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className="nav-link"
                                                data-bs-toggle="tab"
                                                href="#Approval-list"
                                                role="tab"
                                            >
                                                Approval
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className="nav-link"
                                                data-bs-toggle="tab"
                                                href="#Completed-list"
                                                role="tab"
                                            >
                                                Completed
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    {" "}
                    {/* Row end  */}
                    <div className="row align-items-center">
                        <div className="col-lg-12 col-md-12 flex-column">
                            <div className="tab-content mt-4">
                                <div className="tab-pane fade show active" id="All-list">
                                    <div className="row g-3 gy-5 py-3 row-deck">


                                        {projects.map(project => (
                                            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6"
                                                 key={project._id}>
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div
                                                            className="d-flex align-items-center justify-content-between mt-5">
                                                            <div className="lesson_name">
                                                                <div className="project-block light-info-bg">
                                                                    <i className="icofont-paint"/>
                                                                </div>
                                                                <span className="small text-muted project_name fw-bold">
                                                            {" "}

                                                                    {project.projectName}

                                                        </span>
                                                                <h6 className="mb-0 fw-bold  fs-6  mb-2">
                                                                    UI/UX Design
                                                                </h6>
                                                            </div>
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
                                                        </div>
                                                        <div className="d-flex align-items-center">
                                                            <div className="avatar-list avatar-list-stacked pt-2">
                                                                <img
                                                                    className="avatar rounded-circle sm"
                                                                    src="assets/images/xs/avatar2.jpg"
                                                                    alt=""
                                                                />
                                                                <img
                                                                    className="avatar rounded-circle sm"
                                                                    src="assets/images/xs/avatar1.jpg"
                                                                    alt=""
                                                                />
                                                                <img
                                                                    className="avatar rounded-circle sm"
                                                                    src="assets/images/xs/avatar3.jpg"
                                                                    alt=""
                                                                />
                                                                <img
                                                                    className="avatar rounded-circle sm"
                                                                    src="assets/images/xs/avatar4.jpg"
                                                                    alt=""
                                                                />
                                                                <img
                                                                    className="avatar rounded-circle sm"
                                                                    src="assets/images/xs/avatar8.jpg"
                                                                    alt=""
                                                                />
                                                                <span
                                                                    className="avatar rounded-circle text-center pointer sm"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#addUser"
                                                                >
                                                            <i className="icofont-ui-add"/>
                                                        </span>
                                                            </div>
                                                        </div>
                                                        <div className="row g-2 pt-4">
                                                            <div className="col-6">
                                                                <div className="d-flex align-items-center">
                                                                    <i className="icofont-paper-clip"/>
                                                                    <span className="ms-2">5 Attach</span>
                                                                </div>
                                                            </div>
                                                            <div className="col-6">
                                                                <div className="d-flex align-items-center">
                                                                    <i className="icofont-sand-clock"/>
                                                                    <span className="ms-2">4 Month</span>
                                                                </div>
                                                            </div>
                                                            <div className="col-6">
                                                                <div className="d-flex align-items-center">
                                                                    <i className="icofont-group-students "/>
                                                                    <span className="ms-2">5 Members</span>
                                                                </div>
                                                            </div>
                                                            <div className="col-6">
                                                                <div className="d-flex align-items-center">
                                                                    <i className="icofont-ui-text-chat"/>
                                                                    <span className="ms-2">10</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="dividers-block"/>
                                                        <div
                                                            className="d-flex align-items-center justify-content-between mb-2">
                                                            <h4 className="small fw-bold mb-0">Progress</h4>
                                                            <span className="small light-danger-bg  p-1 rounded">
                                                        <i className="icofont-ui-clock"/> 35 Days Left
                                                    </span>
                                                        </div>
                                                        <div className="progress" style={{height: 8}}>
                                                            <div
                                                                className="progress-bar bg-secondary"
                                                                role="progressbar"
                                                                style={{width: "25%"}}
                                                                aria-valuenow={15}
                                                                aria-valuemin={0}
                                                                aria-valuemax={100}
                                                            />
                                                            <div
                                                                className="progress-bar bg-secondary ms-1"
                                                                role="progressbar"
                                                                style={{width: "25%"}}
                                                                aria-valuenow={30}
                                                                aria-valuemin={0}
                                                                aria-valuemax={100}
                                                            />
                                                            <div
                                                                className="progress-bar bg-secondary ms-1"
                                                                role="progressbar"
                                                                style={{width: "10%"}}
                                                                aria-valuenow={10}
                                                                aria-valuemin={0}
                                                                aria-valuemax={100}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        ))}


                                    </div>
                                </div>
                                <div className="tab-pane fade" id="Started-list">
                                    <div className="row g-3 gy-5 py-3 row-deck">
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mt-5">
                                                        <div className="lesson_name">
                                                            <div className="project-block light-info-bg">
                                                                <i className="icofont-paint"/>
                                                            </div>
                                                            <span className="small text-muted project_name fw-bold">
                                                            {" "}
                                                                Social Geek Made{" "}
                                                        </span>
                                                            <h6 className="mb-0 fw-bold  fs-6  mb-2">
                                                                UI/UX Design
                                                            </h6>
                                                        </div>
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
                                                            >
                                                                <i className="icofont-edit text-success"/>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-secondary"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#deleteproject"
                                                            >
                                                                <i className="icofont-ui-delete text-danger"/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="avatar-list avatar-list-stacked pt-2">
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar2.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar1.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar3.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar4.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar8.jpg"
                                                                alt=""
                                                            />
                                                            <span
                                                                className="avatar rounded-circle text-center pointer sm"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#addUser"
                                                            >
                                                            <i className="icofont-ui-add"/>
                                                        </span>
                                                        </div>
                                                    </div>
                                                    <div className="row g-2 pt-4">
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-paper-clip"/>
                                                                <span className="ms-2">5 Attach</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-sand-clock"/>
                                                                <span className="ms-2">4 Month</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-group-students "/>
                                                                <span className="ms-2">5 Members</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-ui-text-chat"/>
                                                                <span className="ms-2">10</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="dividers-block"/>
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mb-2">
                                                        <h4 className="small fw-bold mb-0">Progress</h4>
                                                        <span className="small light-danger-bg  p-1 rounded">
                                                        <i className="icofont-ui-clock"/> 35 Days Left
                                                    </span>
                                                    </div>
                                                    <div className="progress" style={{height: 8}}>
                                                        <div
                                                            className="progress-bar bg-secondary"
                                                            role="progressbar"
                                                            style={{width: "25%"}}
                                                            aria-valuenow={15}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "25%"}}
                                                            aria-valuenow={30}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "10%"}}
                                                            aria-valuenow={10}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mt-5">
                                                        <div className="lesson_name">
                                                            <div className="project-block bg-lightgreen">
                                                                <i className="icofont-vector-path"/>
                                                            </div>
                                                            <span className="small text-muted project_name fw-bold">
                                                            {" "}
                                                                Practice to Perfect{" "}
                                                        </span>
                                                            <h6 className="mb-0 fw-bold  fs-6  mb-2">
                                                                Website Design
                                                            </h6>
                                                        </div>
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
                                                            >
                                                                <i className="icofont-edit text-success"/>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-secondary"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#deleteproject"
                                                            >
                                                                <i className="icofont-ui-delete text-danger"/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="avatar-list avatar-list-stacked pt-2">
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar2.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar1.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar3.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar4.jpg"
                                                                alt=""
                                                            />
                                                            <span
                                                                className="avatar rounded-circle text-center pointer sm"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#addUser"
                                                            >
                                                            <i className="icofont-ui-add"/>
                                                        </span>
                                                        </div>
                                                    </div>
                                                    <div className="row g-2 pt-4">
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-paper-clip"/>
                                                                <span className="ms-2">4 Attach</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-sand-clock"/>
                                                                <span className="ms-2">1 Month</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-group-students "/>
                                                                <span className="ms-2">4 Members</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-ui-text-chat"/>
                                                                <span className="ms-2">3</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="dividers-block"/>
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mb-2">
                                                        <h4 className="small fw-bold mb-0">Progress</h4>
                                                        <span className="small light-danger-bg  p-1 rounded">
                                                        <i className="icofont-ui-clock"/> 15 Days Left
                                                    </span>
                                                    </div>
                                                    <div className="progress" style={{height: 8}}>
                                                        <div
                                                            className="progress-bar bg-secondary"
                                                            role="progressbar"
                                                            style={{width: "25%"}}
                                                            aria-valuenow={15}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "25%"}}
                                                            aria-valuenow={30}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "39%"}}
                                                            aria-valuenow={39}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mt-5">
                                                        <div className="lesson_name">
                                                            <div className="project-block bg-lightyellow">
                                                                <i className="icofont-ui-touch-phone"/>
                                                            </div>
                                                            <span className="small text-muted project_name fw-bold">
                                                            {" "}
                                                                Rhinestone{" "}
                                                        </span>
                                                            <h6 className="mb-0 fw-bold  fs-6  mb-2">
                                                                App Development
                                                            </h6>
                                                        </div>
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
                                                            >
                                                                <i className="icofont-edit text-success"/>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-secondary"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#deleteproject"
                                                            >
                                                                <i className="icofont-ui-delete text-danger"/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="avatar-list avatar-list-stacked pt-2">
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar2.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar1.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar3.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar4.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar7.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar8.jpg"
                                                                alt=""
                                                            />
                                                            <span
                                                                className="avatar rounded-circle text-center pointer sm"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#addUser"
                                                            >
                                                            <i className="icofont-ui-add"/>
                                                        </span>
                                                        </div>
                                                    </div>
                                                    <div className="row g-2 pt-4">
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-paper-clip"/>
                                                                <span className="ms-2">7 Attach</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-sand-clock"/>
                                                                <span className="ms-2">2 Month</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-group-students "/>
                                                                <span className="ms-2">6 Members</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-ui-text-chat"/>
                                                                <span className="ms-2">5</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="dividers-block"/>
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mb-2">
                                                        <h4 className="small fw-bold mb-0">Progress</h4>
                                                        <span className="small light-danger-bg  p-1 rounded">
                                                        <i className="icofont-ui-clock"/> 25 Days Left
                                                    </span>
                                                    </div>
                                                    <div className="progress" style={{height: 8}}>
                                                        <div
                                                            className="progress-bar bg-secondary"
                                                            role="progressbar"
                                                            style={{width: "25%"}}
                                                            aria-valuenow={15}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "25%"}}
                                                            aria-valuenow={30}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "28%"}}
                                                            aria-valuenow={20}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mt-5">
                                                        <div className="lesson_name">
                                                            <div className="project-block light-success-bg">
                                                                <i className="icofont-tick-boxed"/>
                                                            </div>
                                                            <span className="small text-muted project_name fw-bold">
                                                            {" "}
                                                                Box of Crayons{" "}
                                                        </span>
                                                            <h6 className="mb-0 fw-bold  fs-6  mb-2">
                                                                Quality Assurance
                                                            </h6>
                                                        </div>
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
                                                            >
                                                                <i className="icofont-edit text-success"/>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-secondary"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#deleteproject"
                                                            >
                                                                <i className="icofont-ui-delete text-danger"/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="avatar-list avatar-list-stacked pt-2">
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar2.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar1.jpg"
                                                                alt=""
                                                            />
                                                            <span
                                                                className="avatar rounded-circle text-center pointer sm"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#addUser"
                                                            >
                                                            <i className="icofont-ui-add"/>
                                                        </span>
                                                        </div>
                                                    </div>
                                                    <div className="row g-2 pt-4">
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-paper-clip"/>
                                                                <span className="ms-2">1 Attach</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-sand-clock"/>
                                                                <span className="ms-2">1 Month</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-group-students "/>
                                                                <span className="ms-2">2 Members</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-ui-text-chat"/>
                                                                <span className="ms-2">15</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="dividers-block"/>
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mb-2">
                                                        <h4 className="small fw-bold mb-0">Progress</h4>
                                                        <span className="small light-danger-bg  p-1 rounded">
                                                        <i className="icofont-ui-clock"/> 2 Days Left
                                                    </span>
                                                    </div>
                                                    <div className="progress" style={{height: 8}}>
                                                        <div
                                                            className="progress-bar bg-secondary"
                                                            role="progressbar"
                                                            style={{width: "25%"}}
                                                            aria-valuenow={15}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "25%"}}
                                                            aria-valuenow={30}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "40%"}}
                                                            aria-valuenow={80}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mt-5">
                                                        <div className="lesson_name">
                                                            <div className="project-block light-orange-bg">
                                                                <i className="icofont-dashboard-web"/>
                                                            </div>
                                                            <span className="small text-muted project_name fw-bold">
                                                            {" "}
                                                                Gob Geeklords{" "}
                                                        </span>
                                                            <h6 className="mb-0 fw-bold  fs-6  mb-2">
                                                                Development
                                                            </h6>
                                                        </div>
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
                                                            >
                                                                <i className="icofont-edit text-success"/>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-secondary"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#deleteproject"
                                                            >
                                                                <i className="icofont-ui-delete text-danger"/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="avatar-list avatar-list-stacked pt-2">
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar2.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar1.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar3.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar9.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar7.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar10.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar11.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar6.jpg"
                                                                alt=""
                                                            />
                                                            <span
                                                                className="avatar rounded-circle text-center pointer sm"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#addUser"
                                                            >
                                                            <i className="icofont-ui-add"/>
                                                        </span>
                                                        </div>
                                                    </div>
                                                    <div className="row g-2 pt-4">
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-paper-clip"/>
                                                                <span className="ms-2">10 Attach</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-sand-clock"/>
                                                                <span className="ms-2">10 Month</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-group-students "/>
                                                                <span className="ms-2">8 Members</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-ui-text-chat"/>
                                                                <span className="ms-2">45</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="dividers-block"/>
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mb-2">
                                                        <h4 className="small fw-bold mb-0">Progress</h4>
                                                        <span className="small light-danger-bg  p-1 rounded">
                                                        <i className="icofont-ui-clock"/> 20 Days Left
                                                    </span>
                                                    </div>
                                                    <div className="progress" style={{height: 8}}>
                                                        <div
                                                            className="progress-bar bg-secondary"
                                                            role="progressbar"
                                                            style={{width: "25%"}}
                                                            aria-valuenow={15}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "25%"}}
                                                            aria-valuenow={30}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "20%"}}
                                                            aria-valuenow={20}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mt-5">
                                                        <div className="lesson_name">
                                                            <div className="project-block bg-careys-pink">
                                                                <i className="icofont-site-map"/>
                                                            </div>
                                                            <span className="small text-muted project_name fw-bold">
                                                            {" "}
                                                                Java Dalia{" "}
                                                        </span>
                                                            <h6 className="mb-0 fw-bold  fs-6  mb-2">
                                                                Backend Development
                                                            </h6>
                                                        </div>
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
                                                            >
                                                                <i className="icofont-edit text-success"/>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-secondary"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#deleteproject"
                                                            >
                                                                <i className="icofont-ui-delete text-danger"/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="avatar-list avatar-list-stacked pt-2">
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar2.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar1.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar3.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar4.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar7.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar10.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar11.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar6.jpg"
                                                                alt=""
                                                            />
                                                            <span
                                                                className="avatar rounded-circle text-center pointer sm"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#addUser"
                                                            >
                                                            <i className="icofont-ui-add"/>
                                                        </span>
                                                        </div>
                                                    </div>
                                                    <div className="row g-2 pt-4">
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-paper-clip"/>
                                                                <span className="ms-2">8 Attach</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-sand-clock"/>
                                                                <span className="ms-2">8Month</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-group-students "/>
                                                                <span className="ms-2">8 Members</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-ui-text-chat"/>
                                                                <span className="ms-2">7</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="dividers-block"/>
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mb-2">
                                                        <h4 className="small fw-bold mb-0">Progress</h4>
                                                        <span className="small light-danger-bg  p-1 rounded">
                                                        <i className="icofont-ui-clock"/> 10 Days Left
                                                    </span>
                                                    </div>
                                                    <div className="progress" style={{height: 8}}>
                                                        <div
                                                            className="progress-bar bg-secondary"
                                                            role="progressbar"
                                                            style={{width: "25%"}}
                                                            aria-valuenow={15}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "25%"}}
                                                            aria-valuenow={30}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "23%"}}
                                                            aria-valuenow={23}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mt-5">
                                                        <div className="lesson_name">
                                                            <div className="project-block bg-lightblue">
                                                                <i className="icofont-tasks"/>
                                                            </div>
                                                            <span className="small text-muted project_name fw-bold">
                                                            {" "}
                                                                Fast Cad
                                                        </span>
                                                            <h6 className="mb-0 fw-bold  fs-6  mb-2">
                                                                Software Testing
                                                            </h6>
                                                        </div>
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
                                                            >
                                                                <i className="icofont-edit text-success"/>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-secondary"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#deleteproject"
                                                            >
                                                                <i className="icofont-ui-delete text-danger"/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="avatar-list avatar-list-stacked pt-2">
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar2.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar1.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar3.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar4.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar7.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar8.jpg"
                                                                alt=""
                                                            />
                                                            <span
                                                                className="avatar rounded-circle text-center pointer sm"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#addUser"
                                                            >
                                                            <i className="icofont-ui-add"/>
                                                        </span>
                                                        </div>
                                                    </div>
                                                    <div className="row g-2 pt-4">
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-paper-clip"/>
                                                                <span className="ms-2">7 Attach</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-sand-clock"/>
                                                                <span className="ms-2">2 Month</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-group-students "/>
                                                                <span className="ms-2">6 Members</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-ui-text-chat"/>
                                                                <span className="ms-2">5</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="dividers-block"/>
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mb-2">
                                                        <h4 className="small fw-bold mb-0">Progress</h4>
                                                        <span className="small light-danger-bg  p-1 rounded">
                                                        <i className="icofont-ui-clock"/> 25 Days Left
                                                    </span>
                                                    </div>
                                                    <div className="progress" style={{height: 8}}>
                                                        <div
                                                            className="progress-bar bg-secondary"
                                                            role="progressbar"
                                                            style={{width: "25%"}}
                                                            aria-valuenow={15}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "25%"}}
                                                            aria-valuenow={30}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "28%"}}
                                                            aria-valuenow={20}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mt-5">
                                                        <div className="lesson_name">
                                                            <div className="project-block bg-lightgreen">
                                                                <i className="icofont-vector-path"/>
                                                            </div>
                                                            <span className="small text-muted project_name fw-bold">
                                                            {" "}
                                                                Practice to Perfect{" "}
                                                        </span>
                                                            <h6 className="mb-0 fw-bold  fs-6  mb-2">
                                                                Website Design
                                                            </h6>
                                                        </div>
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
                                                            >
                                                                <i className="icofont-edit text-success"/>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-secondary"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#deleteproject"
                                                            >
                                                                <i className="icofont-ui-delete text-danger"/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="avatar-list avatar-list-stacked pt-2">
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar2.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar1.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar3.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar4.jpg"
                                                                alt=""
                                                            />
                                                            <span
                                                                className="avatar rounded-circle text-center pointer sm"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#addUser"
                                                            >
                                                            <i className="icofont-ui-add"/>
                                                        </span>
                                                        </div>
                                                    </div>
                                                    <div className="row g-2 pt-4">
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-paper-clip"/>
                                                                <span className="ms-2">4 Attach</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-sand-clock"/>
                                                                <span className="ms-2">1 Month</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-group-students "/>
                                                                <span className="ms-2">4 Members</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-ui-text-chat"/>
                                                                <span className="ms-2">3</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="dividers-block"/>
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mb-2">
                                                        <h4 className="small fw-bold mb-0">Progress</h4>
                                                        <span className="small light-danger-bg  p-1 rounded">
                                                        <i className="icofont-ui-clock"/> 15 Days Left
                                                    </span>
                                                    </div>
                                                    <div className="progress" style={{height: 8}}>
                                                        <div
                                                            className="progress-bar bg-secondary"
                                                            role="progressbar"
                                                            style={{width: "25%"}}
                                                            aria-valuenow={15}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "25%"}}
                                                            aria-valuenow={30}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "39%"}}
                                                            aria-valuenow={39}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="Approval-list">
                                    <div className="row g-3 gy-5 py-3 row-deck">
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mt-5">
                                                        <div className="lesson_name">
                                                            <div className="project-block light-info-bg">
                                                                <i className="icofont-paint"/>
                                                            </div>
                                                            <span className="small text-muted project_name fw-bold">
                                                            {" "}
                                                                Software Chasers{" "}
                                                        </span>
                                                            <h6 className="mb-0 fw-bold  fs-6  mb-2">
                                                                UI/UX Design
                                                            </h6>
                                                        </div>
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
                                                            >
                                                                <i className="icofont-edit text-success"/>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-secondary"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#deleteproject"
                                                            >
                                                                <i className="icofont-ui-delete text-danger"/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="avatar-list avatar-list-stacked pt-2">
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar2.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar1.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar3.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar4.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar8.jpg"
                                                                alt=""
                                                            />
                                                            <span
                                                                className="avatar rounded-circle text-center pointer sm"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#addUser"
                                                            >
                                                            <i className="icofont-ui-add"/>
                                                        </span>
                                                        </div>
                                                    </div>
                                                    <div className="row g-2 pt-4">
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-paper-clip"/>
                                                                <span className="ms-2">5 Attach</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-sand-clock"/>
                                                                <span className="ms-2">4 Month</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-group-students "/>
                                                                <span className="ms-2">5 Members</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-ui-text-chat"/>
                                                                <span className="ms-2">10</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="dividers-block"/>
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mb-2">
                                                        <h4 className="small fw-bold mb-0">Progress</h4>
                                                        <span className="small light-warning-bg  p-1 rounded">
                                                        <i className="icofont-ui-clock"/> Approval
                                                    </span>
                                                    </div>
                                                    <div className="progress" style={{height: 8}}>
                                                        <div
                                                            className="progress-bar bg-secondary"
                                                            role="progressbar"
                                                            style={{width: "0%"}}
                                                            aria-valuenow={15}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "0%"}}
                                                            aria-valuenow={30}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "0%"}}
                                                            aria-valuenow={80}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mt-5">
                                                        <div className="lesson_name">
                                                            <div className="project-block bg-lightgreen">
                                                                <i className="icofont-vector-path"/>
                                                            </div>
                                                            <span className="small text-muted project_name fw-bold">
                                                            {" "}
                                                                Navy Hurdle{" "}
                                                        </span>
                                                            <h6 className="mb-0 fw-bold  fs-6  mb-2">
                                                                Website Design
                                                            </h6>
                                                        </div>
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
                                                            >
                                                                <i className="icofont-edit text-success"/>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-secondary"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#deleteproject"
                                                            >
                                                                <i className="icofont-ui-delete text-danger"/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="avatar-list avatar-list-stacked pt-2">
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar2.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar1.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar3.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar4.jpg"
                                                                alt=""
                                                            />
                                                            <span
                                                                className="avatar rounded-circle text-center pointer sm"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#addUser"
                                                            >
                                                            <i className="icofont-ui-add"/>
                                                        </span>
                                                        </div>
                                                    </div>
                                                    <div className="row g-2 pt-4">
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-paper-clip"/>
                                                                <span className="ms-2">4 Attach</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-sand-clock"/>
                                                                <span className="ms-2">1 Month</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-group-students "/>
                                                                <span className="ms-2">4 Members</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-ui-text-chat"/>
                                                                <span className="ms-2">3</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="dividers-block"/>
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mb-2">
                                                        <h4 className="small fw-bold mb-0">Progress</h4>
                                                        <span className="small light-warning-bg  p-1 rounded">
                                                        <i className="icofont-ui-clock"/> Approval
                                                    </span>
                                                    </div>
                                                    <div className="progress" style={{height: 8}}>
                                                        <div
                                                            className="progress-bar bg-secondary"
                                                            role="progressbar"
                                                            style={{width: "0%"}}
                                                            aria-valuenow={15}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "0%"}}
                                                            aria-valuenow={30}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "0%"}}
                                                            aria-valuenow={80}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mt-5">
                                                        <div className="lesson_name">
                                                            <div className="project-block light-orange-bg">
                                                                <i className="icofont-dashboard-web"/>
                                                            </div>
                                                            <span className="small text-muted project_name fw-bold">
                                                            {" "}
                                                                Barcelona{" "}
                                                        </span>
                                                            <h6 className="mb-0 fw-bold  fs-6  mb-2">
                                                                Development
                                                            </h6>
                                                        </div>
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
                                                            >
                                                                <i className="icofont-edit text-success"/>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-secondary"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#deleteproject"
                                                            >
                                                                <i className="icofont-ui-delete text-danger"/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="avatar-list avatar-list-stacked pt-2">
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar2.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar1.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar3.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar4.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar8.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar9.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar7.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar10.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar11.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar6.jpg"
                                                                alt=""
                                                            />
                                                            <span
                                                                className="avatar rounded-circle text-center pointer sm"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#addUser"
                                                            >
                                                            <i className="icofont-ui-add"/>
                                                        </span>
                                                        </div>
                                                    </div>
                                                    <div className="row g-2 pt-4">
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-paper-clip"/>
                                                                <span className="ms-2">10 Attach</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-sand-clock"/>
                                                                <span className="ms-2">10 Month</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-group-students "/>
                                                                <span className="ms-2">10 Members</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-ui-text-chat"/>
                                                                <span className="ms-2">45</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="dividers-block"/>
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mb-2">
                                                        <h4 className="small fw-bold mb-0">Progress</h4>
                                                        <span className="small light-warning-bg  p-1 rounded">
                                                        <i className="icofont-ui-clock"/> Approval
                                                    </span>
                                                    </div>
                                                    <div className="progress" style={{height: 8}}>
                                                        <div
                                                            className="progress-bar bg-secondary"
                                                            role="progressbar"
                                                            style={{width: "0%"}}
                                                            aria-valuenow={15}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "0%"}}
                                                            aria-valuenow={30}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "0%"}}
                                                            aria-valuenow={80}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mt-5">
                                                        <div className="lesson_name">
                                                            <div className="project-block bg-careys-pink">
                                                                <i className="icofont-site-map"/>
                                                            </div>
                                                            <span className="small text-muted project_name fw-bold">
                                                            {" "}
                                                                phoenix{" "}
                                                        </span>
                                                            <h6 className="mb-0 fw-bold  fs-6  mb-2">
                                                                Backend Development
                                                            </h6>
                                                        </div>
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
                                                            >
                                                                <i className="icofont-edit text-success"/>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-secondary"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#deleteproject"
                                                            >
                                                                <i className="icofont-ui-delete text-danger"/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="avatar-list avatar-list-stacked pt-2">
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar2.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar1.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar3.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar4.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar7.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar10.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar11.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar6.jpg"
                                                                alt=""
                                                            />
                                                            <span
                                                                className="avatar rounded-circle text-center pointer sm"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#addUser"
                                                            >
                                                            <i className="icofont-ui-add"/>
                                                        </span>
                                                        </div>
                                                    </div>
                                                    <div className="row g-2 pt-4">
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-paper-clip"/>
                                                                <span className="ms-2">8 Attach</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-sand-clock"/>
                                                                <span className="ms-2">8Month</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-group-students "/>
                                                                <span className="ms-2">8 Members</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-ui-text-chat"/>
                                                                <span className="ms-2">7</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="dividers-block"/>
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mb-2">
                                                        <h4 className="small fw-bold mb-0">Progress</h4>
                                                        <span className="small light-warning-bg  p-1 rounded">
                                                        <i className="icofont-ui-clock"/> Approval
                                                    </span>
                                                    </div>
                                                    <div className="progress" style={{height: 8}}>
                                                        <div
                                                            className="progress-bar bg-secondary"
                                                            role="progressbar"
                                                            style={{width: "0%"}}
                                                            aria-valuenow={15}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "0%"}}
                                                            aria-valuenow={30}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "0%"}}
                                                            aria-valuenow={80}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mt-5">
                                                        <div className="lesson_name">
                                                            <div className="project-block bg-lightblue">
                                                                <i className="icofont-tasks"/>
                                                            </div>
                                                            <span className="small text-muted project_name fw-bold">
                                                            {" "}
                                                                Roadrunner
                                                        </span>
                                                            <h6 className="mb-0 fw-bold  fs-6  mb-2">
                                                                Software Testing
                                                            </h6>
                                                        </div>
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
                                                            >
                                                                <i className="icofont-edit text-success"/>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-secondary"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#deleteproject"
                                                            >
                                                                <i className="icofont-ui-delete text-danger"/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="avatar-list avatar-list-stacked pt-2">
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar2.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar1.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar3.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar4.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar7.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar8.jpg"
                                                                alt=""
                                                            />
                                                            <span
                                                                className="avatar rounded-circle text-center pointer sm"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#addUser"
                                                            >
                                                            <i className="icofont-ui-add"/>
                                                        </span>
                                                        </div>
                                                    </div>
                                                    <div className="row g-2 pt-4">
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-paper-clip"/>
                                                                <span className="ms-2">7 Attach</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-sand-clock"/>
                                                                <span className="ms-2">2 Month</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-group-students "/>
                                                                <span className="ms-2">6 Members</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-ui-text-chat"/>
                                                                <span className="ms-2">5</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="dividers-block"/>
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mb-2">
                                                        <h4 className="small fw-bold mb-0">Progress</h4>
                                                        <span className="small light-warning-bg  p-1 rounded">
                                                        <i className="icofont-ui-clock"/> Approval
                                                    </span>
                                                    </div>
                                                    <div className="progress" style={{height: 8}}>
                                                        <div
                                                            className="progress-bar bg-secondary"
                                                            role="progressbar"
                                                            style={{width: "0%"}}
                                                            aria-valuenow={15}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "0%"}}
                                                            aria-valuenow={30}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "0%"}}
                                                            aria-valuenow={80}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mt-5">
                                                        <div className="lesson_name">
                                                            <div className="project-block light-success-bg">
                                                                <i className="icofont-tick-boxed"/>
                                                            </div>
                                                            <span className="small text-muted project_name fw-bold">
                                                            {" "}
                                                                Bladerunner
                                                        </span>
                                                            <h6 className="mb-0 fw-bold  fs-6  mb-2">
                                                                Quality Assurance
                                                            </h6>
                                                        </div>
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
                                                            >
                                                                <i className="icofont-edit text-success"/>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-secondary"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#deleteproject"
                                                            >
                                                                <i className="icofont-ui-delete text-danger"/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="avatar-list avatar-list-stacked pt-2">
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar2.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar1.jpg"
                                                                alt=""
                                                            />
                                                            <span
                                                                className="avatar rounded-circle text-center pointer sm"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#addUser"
                                                            >
                                                            <i className="icofont-ui-add"/>
                                                        </span>
                                                        </div>
                                                    </div>
                                                    <div className="row g-2 pt-4">
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-paper-clip"/>
                                                                <span className="ms-2">1 Attach</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-sand-clock"/>
                                                                <span className="ms-2">1 Month</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-group-students "/>
                                                                <span className="ms-2">2 Members</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-ui-text-chat"/>
                                                                <span className="ms-2">0</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="dividers-block"/>
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mb-2">
                                                        <h4 className="small fw-bold mb-0">Progress</h4>
                                                        <span className="small light-warning-bg  p-1 rounded">
                                                        <i className="icofont-ui-clock"/> Approval
                                                    </span>
                                                    </div>
                                                    <div className="progress" style={{height: 8}}>
                                                        <div
                                                            className="progress-bar bg-secondary"
                                                            role="progressbar"
                                                            style={{width: "0%"}}
                                                            aria-valuenow={15}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "0%"}}
                                                            aria-valuenow={30}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "0%"}}
                                                            aria-valuenow={80}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mt-5">
                                                        <div className="lesson_name">
                                                            <div className="project-block bg-lightgreen">
                                                                <i className="icofont-vector-path"/>
                                                            </div>
                                                            <span className="small text-muted project_name fw-bold">
                                                            {" "}
                                                                Navy Hurdle{" "}
                                                        </span>
                                                            <h6 className="mb-0 fw-bold  fs-6  mb-2">
                                                                Website Design
                                                            </h6>
                                                        </div>
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
                                                            >
                                                                <i className="icofont-edit text-success"/>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-secondary"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#deleteproject"
                                                            >
                                                                <i className="icofont-ui-delete text-danger"/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="avatar-list avatar-list-stacked pt-2">
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar2.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar1.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar3.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar4.jpg"
                                                                alt=""
                                                            />
                                                            <span
                                                                className="avatar rounded-circle text-center pointer sm"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#addUser"
                                                            >
                                                            <i className="icofont-ui-add"/>
                                                        </span>
                                                        </div>
                                                    </div>
                                                    <div className="row g-2 pt-4">
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-paper-clip"/>
                                                                <span className="ms-2">4 Attach</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-sand-clock"/>
                                                                <span className="ms-2">1 Month</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-group-students "/>
                                                                <span className="ms-2">4 Members</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-ui-text-chat"/>
                                                                <span className="ms-2">3</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="dividers-block"/>
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mb-2">
                                                        <h4 className="small fw-bold mb-0">Progress</h4>
                                                        <span className="small light-warning-bg  p-1 rounded">
                                                        <i className="icofont-ui-clock"/> Approval
                                                    </span>
                                                    </div>
                                                    <div className="progress" style={{height: 8}}>
                                                        <div
                                                            className="progress-bar bg-secondary"
                                                            role="progressbar"
                                                            style={{width: "0%"}}
                                                            aria-valuenow={15}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "0%"}}
                                                            aria-valuenow={30}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "0%"}}
                                                            aria-valuenow={80}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mt-5">
                                                        <div className="lesson_name">
                                                            <div className="project-block light-orange-bg">
                                                                <i className="icofont-dashboard-web"/>
                                                            </div>
                                                            <span className="small text-muted project_name fw-bold">
                                                            {" "}
                                                                Barcelona{" "}
                                                        </span>
                                                            <h6 className="mb-0 fw-bold  fs-6  mb-2">
                                                                Development
                                                            </h6>
                                                        </div>
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
                                                            >
                                                                <i className="icofont-edit text-success"/>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-secondary"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#deleteproject"
                                                            >
                                                                <i className="icofont-ui-delete text-danger"/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="avatar-list avatar-list-stacked pt-2">
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar2.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar1.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar3.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar4.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar8.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar9.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar7.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar10.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar11.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar6.jpg"
                                                                alt=""
                                                            />
                                                            <span
                                                                className="avatar rounded-circle text-center pointer sm"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#addUser"
                                                            >
                                                            <i className="icofont-ui-add"/>
                                                        </span>
                                                        </div>
                                                    </div>
                                                    <div className="row g-2 pt-4">
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-paper-clip"/>
                                                                <span className="ms-2">10 Attach</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-sand-clock"/>
                                                                <span className="ms-2">10 Month</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-group-students "/>
                                                                <span className="ms-2">10 Members</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-ui-text-chat"/>
                                                                <span className="ms-2">45</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="dividers-block"/>
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mb-2">
                                                        <h4 className="small fw-bold mb-0">Progress</h4>
                                                        <span className="small light-warning-bg  p-1 rounded">
                                                        <i className="icofont-ui-clock"/> Approval
                                                    </span>
                                                    </div>
                                                    <div className="progress" style={{height: 8}}>
                                                        <div
                                                            className="progress-bar bg-secondary"
                                                            role="progressbar"
                                                            style={{width: "0%"}}
                                                            aria-valuenow={15}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "0%"}}
                                                            aria-valuenow={30}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "0%"}}
                                                            aria-valuenow={80}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="Completed-list">
                                    <div className="row g-3 gy-5 py-3 row-deck">
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mt-5">
                                                        <div className="lesson_name">
                                                            <div className="project-block light-info-bg">
                                                                <i className="icofont-paint"/>
                                                            </div>
                                                            <span className="small text-muted project_name fw-bold">
                                                            {" "}
                                                                Sunburst{" "}
                                                        </span>
                                                            <h6 className="mb-0 fw-bold  fs-6  mb-2">
                                                                UI/UX Design
                                                            </h6>
                                                        </div>
                                                        <div
                                                            className="btn-group"
                                                            role="group"
                                                            aria-label="Basic outlined example"
                                                        >
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-secondary"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#deleteproject"
                                                            >
                                                                <i className="icofont-ui-delete text-danger"/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="avatar-list avatar-list-stacked pt-2">
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar2.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar1.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar3.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar4.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar8.jpg"
                                                                alt=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row g-2 pt-4">
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-paper-clip"/>
                                                                <span className="ms-2">5 Attach</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-sand-clock"/>
                                                                <span className="ms-2 text-success">Completed</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-group-students "/>
                                                                <span className="ms-2">5 Members</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-ui-text-chat"/>
                                                                <span className="ms-2">10</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="dividers-block"/>
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mb-2">
                                                        <h4 className="small fw-bold mb-0">Progress</h4>
                                                        <span className="small light-success-bg  p-1 rounded">
                                                        <i className="icofont-ui-clock"/> Completed
                                                    </span>
                                                    </div>
                                                    <div className="progress" style={{height: 8}}>
                                                        <div
                                                            className="progress-bar bg-secondary"
                                                            role="progressbar"
                                                            style={{width: "25%"}}
                                                            aria-valuenow={15}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "25%"}}
                                                            aria-valuenow={30}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "50%"}}
                                                            aria-valuenow={39}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mt-5">
                                                        <div className="lesson_name">
                                                            <div className="project-block bg-lightgreen">
                                                                <i className="icofont-vector-path"/>
                                                            </div>
                                                            <span className="small text-muted project_name fw-bold">
                                                            {" "}
                                                                X mind{" "}
                                                        </span>
                                                            <h6 className="mb-0 fw-bold  fs-6  mb-2">
                                                                Website Design
                                                            </h6>
                                                        </div>
                                                        <div
                                                            className="btn-group"
                                                            role="group"
                                                            aria-label="Basic outlined example"
                                                        >
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-secondary"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#deleteproject"
                                                            >
                                                                <i className="icofont-ui-delete text-danger"/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="avatar-list avatar-list-stacked pt-2">
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar2.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar1.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar3.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar4.jpg"
                                                                alt=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row g-2 pt-4">
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-paper-clip"/>
                                                                <span className="ms-2">4 Attach</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-sand-clock"/>
                                                                <span className="ms-2 text-success">Completed</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-group-students "/>
                                                                <span className="ms-2">4 Members</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-ui-text-chat"/>
                                                                <span className="ms-2">3</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="dividers-block"/>
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mb-2">
                                                        <h4 className="small fw-bold mb-0">Progress</h4>
                                                        <span className="small light-success-bg  p-1 rounded">
                                                        <i className="icofont-ui-clock"/> Completed
                                                    </span>
                                                    </div>
                                                    <div className="progress" style={{height: 8}}>
                                                        <div
                                                            className="progress-bar bg-secondary"
                                                            role="progressbar"
                                                            style={{width: "25%"}}
                                                            aria-valuenow={15}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "25%"}}
                                                            aria-valuenow={30}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "50%"}}
                                                            aria-valuenow={39}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mt-5">
                                                        <div className="lesson_name">
                                                            <div className="project-block bg-lightyellow">
                                                                <i className="icofont-ui-touch-phone"/>
                                                            </div>
                                                            <span className="small text-muted project_name fw-bold">
                                                            {" "}
                                                                Edison{" "}
                                                        </span>
                                                            <h6 className="mb-0 fw-bold  fs-6  mb-2">
                                                                App Development
                                                            </h6>
                                                        </div>
                                                        <div
                                                            className="btn-group"
                                                            role="group"
                                                            aria-label="Basic outlined example"
                                                        >
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-secondary"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#deleteproject"
                                                            >
                                                                <i className="icofont-ui-delete text-danger"/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="avatar-list avatar-list-stacked pt-2">
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar2.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar1.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar3.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar4.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar7.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar8.jpg"
                                                                alt=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row g-2 pt-4">
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-paper-clip"/>
                                                                <span className="ms-2">7 Attach</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-sand-clock"/>
                                                                <span className="ms-2 text-success">Completed</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-group-students "/>
                                                                <span className="ms-2">6 Members</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-ui-text-chat"/>
                                                                <span className="ms-2">5</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="dividers-block"/>
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mb-2">
                                                        <h4 className="small fw-bold mb-0">Progress</h4>
                                                        <span className="small light-success-bg  p-1 rounded">
                                                        <i className="icofont-ui-clock"/> Completed
                                                    </span>
                                                    </div>
                                                    <div className="progress" style={{height: 8}}>
                                                        <div
                                                            className="progress-bar bg-secondary"
                                                            role="progressbar"
                                                            style={{width: "25%"}}
                                                            aria-valuenow={15}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "25%"}}
                                                            aria-valuenow={30}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "50%"}}
                                                            aria-valuenow={39}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mt-5">
                                                        <div className="lesson_name">
                                                            <div className="project-block light-success-bg">
                                                                <i className="icofont-tick-boxed"/>
                                                            </div>
                                                            <span className="small text-muted project_name fw-bold">
                                                            {" "}
                                                                Fireball{" "}
                                                        </span>
                                                            <h6 className="mb-0 fw-bold  fs-6  mb-2">
                                                                Quality Assurance
                                                            </h6>
                                                        </div>
                                                        <div
                                                            className="btn-group"
                                                            role="group"
                                                            aria-label="Basic outlined example"
                                                        >
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-secondary"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#deleteproject"
                                                            >
                                                                <i className="icofont-ui-delete text-danger"/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="avatar-list avatar-list-stacked pt-2">
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar2.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar1.jpg"
                                                                alt=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row g-2 pt-4">
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-paper-clip"/>
                                                                <span className="ms-2">1 Attach</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-sand-clock"/>
                                                                <span className="ms-2 text-success">Completed</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-group-students "/>
                                                                <span className="ms-2">2 Members</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-ui-text-chat"/>
                                                                <span className="ms-2">15</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="dividers-block"/>
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mb-2">
                                                        <h4 className="small fw-bold mb-0">Progress</h4>
                                                        <span className="small light-success-bg  p-1 rounded">
                                                        <i className="icofont-ui-clock"/> Completed
                                                    </span>
                                                    </div>
                                                    <div className="progress" style={{height: 8}}>
                                                        <div
                                                            className="progress-bar bg-secondary"
                                                            role="progressbar"
                                                            style={{width: "25%"}}
                                                            aria-valuenow={15}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "25%"}}
                                                            aria-valuenow={30}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "50%"}}
                                                            aria-valuenow={39}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mt-5">
                                                        <div className="lesson_name">
                                                            <div className="project-block light-orange-bg">
                                                                <i className="icofont-dashboard-web"/>
                                                            </div>
                                                            <span className="small text-muted project_name fw-bold">
                                                            {" "}
                                                                Firestorm{" "}
                                                        </span>
                                                            <h6 className="mb-0 fw-bold  fs-6  mb-2">
                                                                Development
                                                            </h6>
                                                        </div>
                                                        <div
                                                            className="btn-group"
                                                            role="group"
                                                            aria-label="Basic outlined example"
                                                        >
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-secondary"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#deleteproject"
                                                            >
                                                                <i className="icofont-ui-delete text-danger"/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="avatar-list avatar-list-stacked pt-2">
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar2.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar1.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar3.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar4.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar8.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar9.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar11.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar6.jpg"
                                                                alt=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row g-2 pt-4">
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-paper-clip"/>
                                                                <span className="ms-2">10 Attach</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-sand-clock"/>
                                                                <span className="ms-2 text-success">Completed</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-group-students "/>
                                                                <span className="ms-2">8 Members</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-ui-text-chat"/>
                                                                <span className="ms-2">45</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="dividers-block"/>
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mb-2">
                                                        <h4 className="small fw-bold mb-0">Progress</h4>
                                                        <span className="small light-success-bg  p-1 rounded">
                                                        <i className="icofont-ui-clock"/> Completed
                                                    </span>
                                                    </div>
                                                    <div className="progress" style={{height: 8}}>
                                                        <div
                                                            className="progress-bar bg-secondary"
                                                            role="progressbar"
                                                            style={{width: "25%"}}
                                                            aria-valuenow={15}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "25%"}}
                                                            aria-valuenow={30}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "50%"}}
                                                            aria-valuenow={39}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mt-5">
                                                        <div className="lesson_name">
                                                            <div className="project-block bg-careys-pink">
                                                                <i className="icofont-site-map"/>
                                                            </div>
                                                            <span className="small text-muted project_name fw-bold">
                                                            {" "}
                                                                Irongate{" "}
                                                        </span>
                                                            <h6 className="mb-0 fw-bold  fs-6  mb-2">
                                                                Backend Development
                                                            </h6>
                                                        </div>
                                                        <div
                                                            className="btn-group"
                                                            role="group"
                                                            aria-label="Basic outlined example"
                                                        >
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-secondary"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#deleteproject"
                                                            >
                                                                <i className="icofont-ui-delete text-danger"/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="avatar-list avatar-list-stacked pt-2">
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar2.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar1.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar3.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar4.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar7.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar10.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar11.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar6.jpg"
                                                                alt=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row g-2 pt-4">
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-paper-clip"/>
                                                                <span className="ms-2">8 Attach</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-sand-clock"/>
                                                                <span className="ms-2 text-success">Completed</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-group-students "/>
                                                                <span className="ms-2">8 Members</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-ui-text-chat"/>
                                                                <span className="ms-2">7</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="dividers-block"/>
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mb-2">
                                                        <h4 className="small fw-bold mb-0">Progress</h4>
                                                        <span className="small light-success-bg  p-1 rounded">
                                                        <i className="icofont-ui-clock"/> Completed
                                                    </span>
                                                    </div>
                                                    <div className="progress" style={{height: 8}}>
                                                        <div
                                                            className="progress-bar bg-secondary"
                                                            role="progressbar"
                                                            style={{width: "25%"}}
                                                            aria-valuenow={15}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "25%"}}
                                                            aria-valuenow={30}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "50%"}}
                                                            aria-valuenow={39}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mt-5">
                                                        <div className="lesson_name">
                                                            <div className="project-block bg-lightblue">
                                                                <i className="icofont-tasks"/>
                                                            </div>
                                                            <span className="small text-muted project_name fw-bold">
                                                            {" "}
                                                                Kryptonite
                                                        </span>
                                                            <h6 className="mb-0 fw-bold  fs-6  mb-2">
                                                                Software Testing
                                                            </h6>
                                                        </div>
                                                        <div
                                                            className="btn-group"
                                                            role="group"
                                                            aria-label="Basic outlined example"
                                                        >
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-secondary"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#deleteproject"
                                                            >
                                                                <i className="icofont-ui-delete text-danger"/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="avatar-list avatar-list-stacked pt-2">
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar2.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar1.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar3.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar4.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar7.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar8.jpg"
                                                                alt=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row g-2 pt-4">
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-paper-clip"/>
                                                                <span className="ms-2">7 Attach</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-sand-clock"/>
                                                                <span className="ms-2 text-success">Completed</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-group-students "/>
                                                                <span className="ms-2">6 Members</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-ui-text-chat"/>
                                                                <span className="ms-2">5</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="dividers-block"/>
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mb-2">
                                                        <h4 className="small fw-bold mb-0">Progress</h4>
                                                        <span className="small light-success-bg  p-1 rounded">
                                                        <i className="icofont-ui-clock"/> Completed
                                                    </span>
                                                    </div>
                                                    <div className="progress" style={{height: 8}}>
                                                        <div
                                                            className="progress-bar bg-secondary"
                                                            role="progressbar"
                                                            style={{width: "25%"}}
                                                            aria-valuenow={15}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "25%"}}
                                                            aria-valuenow={30}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "50%"}}
                                                            aria-valuenow={39}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mt-5">
                                                        <div className="lesson_name">
                                                            <div className="project-block bg-lightgreen">
                                                                <i className="icofont-vector-path"/>
                                                            </div>
                                                            <span className="small text-muted project_name fw-bold">
                                                            {" "}
                                                                Moonshine{" "}
                                                        </span>
                                                            <h6 className="mb-0 fw-bold  fs-6  mb-2">
                                                                Website Design
                                                            </h6>
                                                        </div>
                                                        <div
                                                            className="btn-group"
                                                            role="group"
                                                            aria-label="Basic outlined example"
                                                        >
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-secondary"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#deleteproject"
                                                            >
                                                                <i className="icofont-ui-delete text-danger"/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="avatar-list avatar-list-stacked pt-2">
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar2.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar1.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar3.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar4.jpg"
                                                                alt=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row g-2 pt-4">
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-paper-clip"/>
                                                                <span className="ms-2">4 Attach</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-sand-clock"/>
                                                                <span className="ms-2 text-success">Completed</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-group-students "/>
                                                                <span className="ms-2">4 Members</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-ui-text-chat"/>
                                                                <span className="ms-2">3</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="dividers-block"/>
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mb-2">
                                                        <h4 className="small fw-bold mb-0">Progress</h4>
                                                        <span className="small light-success-bg  p-1 rounded">
                                                        <i className="icofont-ui-clock"/> Completed
                                                    </span>
                                                    </div>
                                                    <div className="progress" style={{height: 8}}>
                                                        <div
                                                            className="progress-bar bg-secondary"
                                                            role="progressbar"
                                                            style={{width: "25%"}}
                                                            aria-valuenow={15}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "25%"}}
                                                            aria-valuenow={30}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "50%"}}
                                                            aria-valuenow={39}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mt-5">
                                                        <div className="lesson_name">
                                                            <div className="project-block light-success-bg">
                                                                <i className="icofont-tick-boxed"/>
                                                            </div>
                                                            <span className="small text-muted project_name fw-bold">
                                                            {" "}
                                                                Oyster{" "}
                                                        </span>
                                                            <h6 className="mb-0 fw-bold  fs-6  mb-2">
                                                                Quality Assurance
                                                            </h6>
                                                        </div>
                                                        <div
                                                            className="btn-group"
                                                            role="group"
                                                            aria-label="Basic outlined example"
                                                        >
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-secondary"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#deleteproject"
                                                            >
                                                                <i className="icofont-ui-delete text-danger"/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="avatar-list avatar-list-stacked pt-2">
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar2.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar1.jpg"
                                                                alt=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row g-2 pt-4">
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-paper-clip"/>
                                                                <span className="ms-2">1 Attach</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-sand-clock"/>
                                                                <span className="ms-2 text-success">Completed</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-group-students "/>
                                                                <span className="ms-2">2 Members</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-ui-text-chat"/>
                                                                <span className="ms-2">0</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="dividers-block"/>
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mb-2">
                                                        <h4 className="small fw-bold mb-0">Progress</h4>
                                                        <span className="small light-success-bg  p-1 rounded">
                                                        <i className="icofont-ui-clock"/> Completed
                                                    </span>
                                                    </div>
                                                    <div className="progress" style={{height: 8}}>
                                                        <div
                                                            className="progress-bar bg-secondary"
                                                            role="progressbar"
                                                            style={{width: "25%"}}
                                                            aria-valuenow={15}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "25%"}}
                                                            aria-valuenow={30}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "50%"}}
                                                            aria-valuenow={39}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mt-5">
                                                        <div className="lesson_name">
                                                            <div className="project-block bg-lightgreen">
                                                                <i className="icofont-vector-path"/>
                                                            </div>
                                                            <span className="small text-muted project_name fw-bold">
                                                            {" "}
                                                                X mind{" "}
                                                        </span>
                                                            <h6 className="mb-0 fw-bold  fs-6  mb-2">
                                                                Website Design
                                                            </h6>
                                                        </div>
                                                        <div
                                                            className="btn-group"
                                                            role="group"
                                                            aria-label="Basic outlined example"
                                                        >
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-secondary"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#deleteproject"
                                                            >
                                                                <i className="icofont-ui-delete text-danger"/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="avatar-list avatar-list-stacked pt-2">
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar2.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar1.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar3.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar4.jpg"
                                                                alt=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row g-2 pt-4">
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-paper-clip"/>
                                                                <span className="ms-2">4 Attach</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-sand-clock"/>
                                                                <span className="ms-2 text-success">Completed</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-group-students "/>
                                                                <span className="ms-2">4 Members</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-ui-text-chat"/>
                                                                <span className="ms-2">3</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="dividers-block"/>
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mb-2">
                                                        <h4 className="small fw-bold mb-0">Progress</h4>
                                                        <span className="small light-success-bg  p-1 rounded">
                                                        <i className="icofont-ui-clock"/> Completed
                                                    </span>
                                                    </div>
                                                    <div className="progress" style={{height: 8}}>
                                                        <div
                                                            className="progress-bar bg-secondary"
                                                            role="progressbar"
                                                            style={{width: "25%"}}
                                                            aria-valuenow={15}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "25%"}}
                                                            aria-valuenow={30}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "50%"}}
                                                            aria-valuenow={39}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mt-5">
                                                        <div className="lesson_name">
                                                            <div className="project-block light-orange-bg">
                                                                <i className="icofont-dashboard-web"/>
                                                            </div>
                                                            <span className="small text-muted project_name fw-bold">
                                                            {" "}
                                                                Firestorm{" "}
                                                        </span>
                                                            <h6 className="mb-0 fw-bold  fs-6  mb-2">
                                                                Development
                                                            </h6>
                                                        </div>
                                                        <div
                                                            className="btn-group"
                                                            role="group"
                                                            aria-label="Basic outlined example"
                                                        >
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-secondary"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#deleteproject"
                                                            >
                                                                <i className="icofont-ui-delete text-danger"/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="avatar-list avatar-list-stacked pt-2">
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar2.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar1.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar3.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar4.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar8.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar9.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar11.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar6.jpg"
                                                                alt=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row g-2 pt-4">
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-paper-clip"/>
                                                                <span className="ms-2">10 Attach</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-sand-clock"/>
                                                                <span className="ms-2 text-success">Completed</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-group-students "/>
                                                                <span className="ms-2">8 Members</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-ui-text-chat"/>
                                                                <span className="ms-2">45</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="dividers-block"/>
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mb-2">
                                                        <h4 className="small fw-bold mb-0">Progress</h4>
                                                        <span className="small light-success-bg  p-1 rounded">
                                                        <i className="icofont-ui-clock"/> Completed
                                                    </span>
                                                    </div>
                                                    <div className="progress" style={{height: 8}}>
                                                        <div
                                                            className="progress-bar bg-secondary"
                                                            role="progressbar"
                                                            style={{width: "25%"}}
                                                            aria-valuenow={15}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "25%"}}
                                                            aria-valuenow={30}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "50%"}}
                                                            aria-valuenow={39}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mt-5">
                                                        <div className="lesson_name">
                                                            <div className="project-block light-info-bg">
                                                                <i className="icofont-paint"/>
                                                            </div>
                                                            <span className="small text-muted project_name fw-bold">
                                                            {" "}
                                                                Sunburst{" "}
                                                        </span>
                                                            <h6 className="mb-0 fw-bold  fs-6  mb-2">
                                                                UI/UX Design
                                                            </h6>
                                                        </div>
                                                        <div
                                                            className="btn-group"
                                                            role="group"
                                                            aria-label="Basic outlined example"
                                                        >
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-secondary"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#deleteproject"
                                                            >
                                                                <i className="icofont-ui-delete text-danger"/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="avatar-list avatar-list-stacked pt-2">
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar2.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar1.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar3.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar4.jpg"
                                                                alt=""
                                                            />
                                                            <img
                                                                className="avatar rounded-circle sm"
                                                                src="assets/images/xs/avatar8.jpg"
                                                                alt=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row g-2 pt-4">
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-paper-clip"/>
                                                                <span className="ms-2">5 Attach</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-sand-clock"/>
                                                                <span className="ms-2 text-success">Completed</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-group-students "/>
                                                                <span className="ms-2">5 Members</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-ui-text-chat"/>
                                                                <span className="ms-2">10</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="dividers-block"/>
                                                    <div
                                                        className="d-flex align-items-center justify-content-between mb-2">
                                                        <h4 className="small fw-bold mb-0">Progress</h4>
                                                        <span className="small light-success-bg  p-1 rounded">
                                                        <i className="icofont-ui-clock"/> Completed
                                                    </span>
                                                    </div>
                                                    <div className="progress" style={{height: 8}}>
                                                        <div
                                                            className="progress-bar bg-secondary"
                                                            role="progressbar"
                                                            style={{width: "25%"}}
                                                            aria-valuenow={15}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "25%"}}
                                                            aria-valuenow={30}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                        <div
                                                            className="progress-bar bg-secondary ms-1"
                                                            role="progressbar"
                                                            style={{width: "50%"}}
                                                            aria-valuenow={39}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal Members*/}
            <div
                className="modal fade"
                id="addUser"
                tabIndex={-1}
                aria-labelledby="addUserLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title  fw-bold" id="addUserLabel">
                                Employee Invitation
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
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
                                <h6 className="fw-bold ">Employee </h6>
                                <ul className="list-unstyled list-group list-group-custom list-group-flush mb-0">
                                    <li className="list-group-item py-3 text-center text-md-start">
                                        <div
                                            className="d-flex align-items-center flex-column flex-sm-column flex-md-column flex-lg-row">
                                            <div className="no-thumbnail mb-2 mb-md-0">
                                                <img
                                                    className="avatar lg rounded-circle"
                                                    src="assets/images/xs/avatar2.jpg"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="flex-fill ms-3 text-truncate">
                                                <h6 className="mb-0  fw-bold">Rachel Carr(you)</h6>
                                                <span className="text-muted">rachel.carr@gmail.com</span>
                                            </div>
                                            <div className="members-action">
                                                <span className="members-role ">Admin</span>
                                                <div className="btn-group">
                                                    <button
                                                        type="button"
                                                        className="btn bg-transparent dropdown-toggle"
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                    >
                                                        <i className="icofont-ui-settings  fs-6"/>
                                                    </button>
                                                    <ul className="dropdown-menu dropdown-menu-end">
                                                        <li>
                                                            <a className="dropdown-item" href="#">
                                                                <i className="icofont-ui-password fs-6 me-2"/>
                                                                ResetPassword
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a className="dropdown-item" href="#">
                                                                <i className="icofont-chart-line fs-6 me-2"/>
                                                                ActivityReport
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-group-item py-3 text-center text-md-start">
                                        <div
                                            className="d-flex align-items-center flex-column flex-sm-column flex-md-column flex-lg-row">
                                            <div className="no-thumbnail mb-2 mb-md-0">
                                                <img
                                                    className="avatar lg rounded-circle"
                                                    src="assets/images/xs/avatar3.jpg"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="flex-fill ms-3 text-truncate">
                                                <h6 className="mb-0  fw-bold">
                                                    Lucas Baker
                                                    <a href="#" className="link-secondary ms-2">
                                                        (Resend invitation)
                                                    </a>
                                                </h6>
                                                <span className="text-muted">lucas.baker@gmail.com</span>
                                            </div>
                                            <div className="members-action">
                                                <div className="btn-group">
                                                    <button
                                                        type="button"
                                                        className="btn bg-transparent dropdown-toggle"
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                    >
                                                        Members
                                                    </button>
                                                    <ul className="dropdown-menu dropdown-menu-end">
                                                        <li>
                                                            <a className="dropdown-item" href="#">
                                                                <i className="icofont-check-circled"/>
                                                                <span>All operations permission</span>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a className="dropdown-item" href="#">
                                                                <i className="fs-6 p-2 me-1"/>
                                                                <span>Only Invite &amp; manage team</span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="btn-group">
                                                    <button
                                                        type="button"
                                                        className="btn bg-transparent dropdown-toggle"
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                    >
                                                        <i className="icofont-ui-settings  fs-6"/>
                                                    </button>
                                                    <ul className="dropdown-menu dropdown-menu-end">
                                                        <li>
                                                            <a className="dropdown-item" href="#">
                                                                <i className="icofont-delete-alt fs-6 me-2"/>
                                                                Delete Member
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-group-item py-3 text-center text-md-start">
                                        <div
                                            className="d-flex align-items-center flex-column flex-sm-column flex-md-column flex-lg-row">
                                            <div className="no-thumbnail mb-2 mb-md-0">
                                                <img
                                                    className="avatar lg rounded-circle"
                                                    src="assets/images/xs/avatar8.jpg"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="flex-fill ms-3 text-truncate">
                                                <h6 className="mb-0  fw-bold">Una Coleman</h6>
                                                <span className="text-muted">una.coleman@gmail.com</span>
                                            </div>
                                            <div className="members-action">
                                                <div className="btn-group">
                                                    <button
                                                        type="button"
                                                        className="btn bg-transparent dropdown-toggle"
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                    >
                                                        Members
                                                    </button>
                                                    <ul className="dropdown-menu dropdown-menu-end">
                                                        <li>
                                                            <a className="dropdown-item" href="#">
                                                                <i className="icofont-check-circled"/>
                                                                <span>All operations permission</span>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a className="dropdown-item" href="#">
                                                                <i className="fs-6 p-2 me-1"/>
                                                                <span>Only Invite &amp; manage team</span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="btn-group">
                                                    <div className="btn-group">
                                                        <button
                                                            type="button"
                                                            className="btn bg-transparent dropdown-toggle"
                                                            data-bs-toggle="dropdown"
                                                            aria-expanded="false"
                                                        >
                                                            <i className="icofont-ui-settings  fs-6"/>
                                                        </button>
                                                        <ul className="dropdown-menu dropdown-menu-end">
                                                            <li>
                                                                <a className="dropdown-item" href="#">
                                                                    <i className="icofont-ui-password fs-6 me-2"/>
                                                                    ResetPassword
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a className="dropdown-item" href="#">
                                                                    <i className="icofont-chart-line fs-6 me-2"/>
                                                                    ActivityReport
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a className="dropdown-item" href="#">
                                                                    <i className="icofont-delete-alt fs-6 me-2"/>
                                                                    Suspend member
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a className="dropdown-item" href="#">
                                                                    <i className="icofont-not-allowed fs-6 me-2"/>
                                                                    Delete Member
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
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
                                            <label className="form-label">Teams</label>
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
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Done
                            </button>
                            <button type="button" className="btn btn-primary"
                                    onClick={handleAddProject}
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
                                            <label className="form-label">Notifation Sent</label>
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
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Done
                            </button>
                            <button type="button" className="btn btn-primary"
                                    onClick={() => handleUpdateProject(projectIdToDelete)}>
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

};