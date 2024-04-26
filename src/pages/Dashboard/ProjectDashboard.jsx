
import project from "../../_models/Project.jsx";
import {useEffect, useRef, useState} from "react";
import * as ProjectService from "../../_services/ProjectService.jsx";
import {useParams} from "react-router-dom";
import Project from "../projects/Projects.jsx";
import showProjects from "../projects/showProjects.jsx";
import Chart from 'chart.js/auto'
import 'chartjs-adapter-date-fns';
import enUS from 'date-fns/locale/en-US';
import 'chartjs-plugin-zoom';
import log from "eslint-plugin-react/lib/util/log.js";
import Sprints from "../sprints/Sprints.jsx";

const ProjectDashboard= () =>{

    const [projects, setProjects] = useState([]);
    const { projectName } = useParams();
    const [projectDescription , setProjectDescription] = useState(null); // Use 'let' instead of 'const'
    const chartRef = useRef(null);
        const [project, setProject] = useState([]);

        useEffect(() => {
            const fetchProject = async () => {
                console.log('Fetching project...');
                try {
                    const data = await ProjectService.getProjectByName(projectName);
                    console.log('Data received:', data);
                    setProject(data);
                    setProjectDescription(data.projectDescription);
                } catch (error) {
                    console.error('Error fetching project:', error);
                }
            };


           fetchProject();

        }, [projectName]);

    useEffect(() => {
        if (chartRef.current && chartRef.current.chartInstance) {
            // Check if chartRef.current exists and has a destroy method before calling it
            chartRef.current.chartInstance.destroy();
        }

        if (project.startDate && project.endDate) {
            const ctx = document.getElementById('ganttChart').getContext('2d');
            const chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Task 1', 'Task 2', 'Task 3'],
                    datasets: [
                        {
                            label: 'Start Date',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                            data: [
                                { x: new Date('2024-01-01'), y: new Date('2024-01-15') },
                                { x: new Date('2024-02-01'), y: new Date('2024-02-10') },
                                // Other data points...
                            ],
                        },
                    ],
                },
                options: {
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'month',
                                displayFormats: {
                                    month: 'MMM yyyy', // Use lowercase 'month' for the abbreviated month name
                                },
                                tooltipFormat: 'MMM yyyy',
                            },
                            adapters: {
                                date: {
                                    locale: enUS,
                                },
                            },
                            min: new Date('2024-01-01'), // Set the minimum date to January 1st, 2024
                            max: new Date('2025-12-31'), // Set the maximum date to December 31st, 2024
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Tasks',
                            },
                        },
                    },
                    plugins: {
                        annotation: {
                            annotations: [
                                {
                                    type: 'line',
                                    mode: 'vertical',
                                    scaleID: 'x',
                                    value: project.startDate,
                                    borderColor: 'red',
                                    borderWidth: 2,
                                    label: {
                                        content: 'Start Date',
                                        enabled: true,
                                        position: 'top',
                                    },
                                },
                            ],
                        },
                    },
                },
            });

            // Save the chart instance to the ref
            chartRef.current = { chartInstance: chart };
            chartRef.current.chartInstance.update();
        }
    }, [project]);
// Progress Pie Chart Initialization
    useEffect(() => {
        const progressCtx = document.getElementById('progressPieChart').getContext('2d');
        const progressData = {
            labels: ['Completed', 'Remaining','in progress'],
            datasets: [{
                data: [30, 50,20], // Example data, replace with actual completion percentages
                backgroundColor: ['#36A2EB', '#ff7856',"#"],
            }],
        };
        new Chart(progressCtx, {
            type: 'doughnut',
            data: progressData,
            options: {
                cutout: '80%',
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            },
        });
    }, []);

    return (

        <>

            <div >
                <h1>Project Name: {projectName}</h1>
                <p>Project Details:{projectDescription} </p>
                {/* Include additional details as needed */}
            </div>
            {/* main body area */}
            <div className="main px-lg-4 px-md-4">
                {/* Body: Body */}
                <div className="body d-flex py-3">
                    <div className="container-xxl">
                        <div className="row g-3 mb-3 row-deck">
                            <div className="col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                                <div className="card ">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center">
                                            <div className="avatar lg  rounded-1 no-thumbnail bg-lightyellow color-defult">
                                                <i className="bi bi-journal-check fs-4" />
                                            </div>
                                            <div className="flex-fill ms-4">
                                                <div className="">Total Task</div>
                                                <h5 className="mb-0 ">122</h5>
                                            </div>
                                            <a
                                                href="task.html"
                                                title="view-members"
                                                className="btn btn-link text-decoration-none  rounded-1"
                                            >
                                                <i className="icofont-hand-drawn-right fs-2 " />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                                <div className="card ">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center">
                                            <div className="avatar lg  rounded-1 no-thumbnail bg-lightblue color-defult">
                                                <i className="bi bi-list-check fs-4" />
                                            </div>
                                            <div className="flex-fill ms-4">
                                                <div className="">Completed Task</div>
                                                <h5 className="mb-0 ">376</h5>
                                            </div>
                                            <a
                                                href="task.html"
                                                title="space-used"
                                                className="btn btn-link text-decoration-none  rounded-1"
                                            >
                                                <i className="icofont-hand-drawn-right fs-2 " />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                                <div className="card ">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center">
                                            <div className="avatar lg  rounded-1 no-thumbnail bg-lightgreen color-defult">
                                                <i className="bi bi-clipboard-data fs-4" />
                                            </div>
                                            <div className="flex-fill ms-4">
                                                <div className="">Progress Task</div>
                                                <h5 className="mb-0 ">74</h5>
                                            </div>
                                            <a
                                                href="task.html"
                                                title="renewal-date"
                                                className="btn btn-link text-decoration-none  rounded-1"
                                            >
                                                <i className="icofont-hand-drawn-right fs-2 " />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Row End */}
                        <div className="row g-3 mb-3 row-deck">
                            <div className="col-md-7">
                                <div className="card">
                                    <div className="card-body">
                                        <h2>Gantt Chart</h2>
                                        <canvas id="ganttChart" width="400" height="200"></canvas>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="text-center p-4">
                                            <h2>Progress Pie Chart</h2>
                                            <canvas id="progressPieChart" width="200" height="200"></canvas>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Row End */}
                        <div className="row g-3 mb-3 row-deck">
                            <div className="col-md-12 col-lg-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h6 className="mb-3 fw-bold ">Income Analytics</h6>
                                        <div className="d-flex justify-content-end text-center">
                                            <div className="p-2">
                                                <h6 className="mb-0 fw-bold">$5,318</h6>
                                                <small className="text-muted">Income</small>
                                            </div>
                                            <div className="p-2 ms-4">
                                                <h6 className="mb-0 fw-bold">$2,840</h6>
                                                <small className="text-muted">Expense</small>
                                            </div>
                                        </div>
                                        <div className="mt-3" id="incomeanalytics" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 col-lg-8">
                                <div className="card">
                                    <div className="card-header py-3 d-flex justify-content-between align-items-center">
                                        <div className="info-header">
                                            <h6 className="mb-0 fw-bold ">Important Tasks</h6>
                                        </div>
                                        <button
                                            className="btn btn-sm btn-link  dropdown-toggle"
                                            type="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        />
                                        <ul className="dropdown-menu border-0 shadow dropdown-menu-end">
                                            <li>
                                                <a className="dropdown-item py-2 rounded" href="#">
                                                    Last 7 days
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item py-2 rounded" href="#">
                                                    Last 30 days
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item py-2 rounded" href="#">
                                                    Last 60 days
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="card-body">
                                        <div id="apex-timeline" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Row End */}
                        <div className="row g-3 mb-3 row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-2 row-cols-xl-4 row-cols-xxl-4">
                            <div className="col">
                                <div className="card bg-primary">
                                    <div className="card-body text-white d-flex align-items-center">
                                        <i className="icofont-data fs-3" />
                                        <div className="d-flex flex-column ms-3">
                                            <h6 className="mb-0">Total Projects</h6>
                                            <span className="text-white">550</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card bg-primary">
                                    <div className="card-body text-white d-flex align-items-center">
                                        <i className="icofont-chart-flow fs-3" />
                                        <div className="d-flex flex-column ms-3">
                                            <h6 className="mb-0">Coming Projects</h6>
                                            <span className="text-white">210</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card bg-primary">
                                    <div className="card-body text-white d-flex align-items-center">
                                        <i className="icofont-chart-flow-2 fs-3" />
                                        <div className="d-flex flex-column ms-3">
                                            <h6 className="mb-0">Progress Projects</h6>
                                            <span className="text-white">8456 Files</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card bg-primary">
                                    <div className="card-body text-white d-flex align-items-center">
                                        <i className="icofont-tasks fs-3" />
                                        <div className="d-flex flex-column ms-3">
                                            <h6 className="mb-0">Finished Projects</h6>
                                            <span className="text-white">88 Files</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Sprints/>


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
                                        <button
                                            className="btn btn-dark"
                                            type="button"
                                            id="button-addon2"
                                        >
                                            Sent
                                        </button>
                                    </div>
                                </div>
                                <div className="members_list">
                                    <h6 className="fw-bold ">Employee </h6>
                                    <ul className="list-unstyled list-group list-group-custom list-group-flush mb-0">
                                        <li className="list-group-item py-3 text-center text-md-start">
                                            <div className="d-flex align-items-center flex-column flex-sm-column flex-md-column flex-lg-row">
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
                                                            <i className="icofont-ui-settings  fs-6" />
                                                        </button>
                                                        <ul className="dropdown-menu dropdown-menu-end">
                                                            <li>
                                                                <a className="dropdown-item" href="#">
                                                                    <i className="icofont-ui-password fs-6 me-2" />
                                                                    ResetPassword
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a className="dropdown-item" href="#">
                                                                    <i className="icofont-chart-line fs-6 me-2" />
                                                                    ActivityReport
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item py-3 text-center text-md-start">
                                            <div className="d-flex align-items-center flex-column flex-sm-column flex-md-column flex-lg-row">
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
                                                                    <i className="icofont-check-circled" />
                                                                    <span>All operations permission</span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a className="dropdown-item" href="#">
                                                                    <i className="fs-6 p-2 me-1" />
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
                                                            <i className="icofont-ui-settings  fs-6" />
                                                        </button>
                                                        <ul className="dropdown-menu dropdown-menu-end">
                                                            <li>
                                                                <a className="dropdown-item" href="#">
                                                                    <i className="icofont-delete-alt fs-6 me-2" />
                                                                    Delete Member
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item py-3 text-center text-md-start">
                                            <div className="d-flex align-items-center flex-column flex-sm-column flex-md-column flex-lg-row">
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
                                                                    <i className="icofont-check-circled" />
                                                                    <span>All operations permission</span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a className="dropdown-item" href="#">
                                                                    <i className="fs-6 p-2 me-1" />
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
                                                                <i className="icofont-ui-settings  fs-6" />
                                                            </button>
                                                            <ul className="dropdown-menu dropdown-menu-end">
                                                                <li>
                                                                    <a className="dropdown-item" href="#">
                                                                        <i className="icofont-ui-password fs-6 me-2" />
                                                                        ResetPassword
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a className="dropdown-item" href="#">
                                                                        <i className="icofont-chart-line fs-6 me-2" />
                                                                        ActivityReport
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a className="dropdown-item" href="#">
                                                                        <i className="icofont-delete-alt fs-6 me-2" />
                                                                        Suspend member
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a className="dropdown-item" href="#">
                                                                        <i className="icofont-not-allowed fs-6 me-2" />
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
            </div>
        </>

    )
}


export default ProjectDashboard;