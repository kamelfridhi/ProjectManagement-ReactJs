import React, {useEffect, useState} from "react";
import * as TaskService from "../../../_services/TaskService.jsx";
import {addTask} from "../../../_services/TaskService.jsx";
import TaskManagement from "../components/TaskManagement.jsx";
import BoardTask from "../components/BoardTask.jsx";
import RecentActivity from "../components/RecentActivity.jsx";
import AllocatedTaskMembers from "../components/AllocatedTaskMembers.jsx";

export default function Task() {

    const [tasks, setTasks] = useState([]);
    const [taskName, setTaskName] = useState('');
    const [taskCategory, setTaskCategory] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskpriority, setTaskPriority] = useState('');
    const [taskStartDate, setTaskStartDate] = useState('');
    const [taskEndDate, setTaskEndDate] = useState('');
    // Autres états pour les autres champs du formulaire
    const handlePriorityChange = (e) => {
        setTaskPriority(e.target.value);
    };
    const handleCategorieChange = (e) => {
        setTaskCategory(e.target.value);
    };

    useEffect(() => {
        const fetchTasks = async () => {
            const data = await TaskService.getAllTasks();
            setTasks(data);
        };
        fetchTasks();
    }, []);

    const handleAddTask = async () => {
        try {
            // Créer un objet de données pour la nouvelle tâche
            const newTaskData = {
                name: taskName,
                category: taskCategory,
                description: taskDescription,
                priority: taskpriority,
                startDate: taskStartDate,
                endDate: taskEndDate,
                // Ajoutez d'autres propriétés de tâche nécessaires
            };

            // Envoyer la requête POST pour créer une nouvelle tâche
            const createdTask = await TaskService.addTask(newTaskData);

            // Réinitialiser les champs du formulaire après la création de la tâche
            setTaskName('');
            setTaskCategory('');
            // Réinitialiser d'autres champs du formulaire si nécessaire

            // Faites quelque chose avec la tâche créée, par exemple, affichez un message de succès
            console.log('Task created successfully:', createdTask);
        } catch (error) {
            // Gérer les erreurs lors de la création de la tâche, par exemple, affichez un message d'erreur
            console.error('Error creating task:', error);
        }
    };







    return (

            <>


                {/* Mirrored from pixelwibes.com/template/my-pages/html/dist/pages.html by HTTrack Website Copier/3.x [XR&CO'2014], Mon, 12 Feb 2024 11:38:38 GMT */}
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <title>:: My-Task:: Task </title>
                <link rel="icon" href="favicon.ico" type="image/x-icon" /> {/* Favicon*/}
                {/* plugin css file  */}
                <link rel="stylesheet" href="../../../../public/assets/plugin/nestable/jquery-nestable.css" />
                {/* project css file  */}
                 <div id="mytask-layout">


                    {/* main body area */}
                    <div className="main px-lg-4 px-md-4">
                        {/* Body: Header */}

                        {/* Body: Body */}
                        <div className="body d-flex py-lg-3 py-md-2">
                            <div className="container-xxl">
                                <div className="row align-items-center">
                                    <div className="border-0 mb-4">
                                        <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                                            <h3 className="fw-bold mb-0">Task Management</h3>
                                            <div className="col-auto d-flex w-sm-100">
                                                <button
                                                    type="button"
                                                    className="btn btn-dark btn-set-task w-sm-100"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#createtask"
                                                    style={{backgroundColor: '#4c3575'}}
                                                >
                                                    <i className="icofont-plus-circle me-2 fs-6" />
                                                    Create Task
                                                </button>
                                            </div>
                                            <div className="col-auto d-flex w-sm-100">
                                                <button
                                                    type="button"
                                                    className="btn btn-dark btn-set-task w-sm-100"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#updatetask"
                                                    style={{backgroundColor: '#4c3575'}}
                                                >
                                                    <i className="icofont-plus-circle me-2 fs-6" />
                                                    Update Task
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>{" "}
                                {/* Row end  */}
                                <div className="row clearfix  g-3">
                                    <div className="col-lg-12 col-md-12 flex-column">
                                        <div className="row g-3 row-deck">
                                            <TaskManagement/>
                                            <RecentActivity/>
                                            <AllocatedTaskMembers/>
                                        </div>

                                        <BoardTask/>
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



                            {/* Modaaaaal */}
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
                                                                src="../../../../public/assets/images/xs/avatar2.jpg"
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="flex-fill ms-3 text-truncate">
                                                            <h6 className="mb-0  fw-bold">Rachel Carr(you)</h6>
                                                            <span className="text-muted">
                                                                rachel.carr@gmail.com
                                                            </span>
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
                                                                src="../../../../public/assets/images/xs/avatar3.jpg"
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
                                                            <span className="text-muted">
                                                                lucas.baker@gmail.com
                                                            </span>
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
                                                                src="../../../../public/assets/images/xs/avatar8.jpg"
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="flex-fill ms-3 text-truncate">
                                                            <h6 className="mb-0  fw-bold">Una Coleman</h6>
                                                            <span className="text-muted">
                                                                una.coleman@gmail.com
                                                            </span>
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








                        {/* Create pages*/}















                        <div
                            className="modal fade"
                            id="createtask"
                            tabIndex={-1}
                            aria-hidden="true"
                        >
                            <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title  fw-bold" id="createprojectlLabel">
                                            {" "}
                                            Create Task
                                        </h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                        />
                                    </div>
                                    <div className="modal-body">
                                        {/* <div className="mb-3">
                                            <label className="form-label">Project Name</label>
                                            <select
                                                className="form-select"
                                                aria-label="Default select Project Category"
                                            >
                                                <option selected="">Project Name Select</option>
                                                <option value={1}>Fast Cad</option>
                                                <option value={2}>Box of Crayons</option>
                                                <option value={3}>Gob Geeklords</option>
                                                <option value={4}>Java Dalia</option>
                                                <option value={5}>Practice to Perfect</option>
                                                <option value={6}>Rhinestone</option>
                                                <option value={7}>Social Geek Made</option>
                                            </select>
                                        </div>*/}
                                        <div className="mb-3">
                                            <label className="form-label">Task Name</label>
                                            <input type="text" className="form-control" value={taskName} onChange={(e) => setTaskName(e.target.value)} placeholder="Task Name" />

                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Task Category</label>

                                            <select
                                                className="form-select"
                                                aria-label="Default select Project Category"
                                                value={taskCategory}
                                                onChange={handleCategorieChange}
                                            >

                                                <option selected="">Select Category</option>
                                                <option value="App Development">App Development</option>
                                                <option value="UI/UX Design">UI/UX Design</option>
                                                <option value="MARKETING">Marketing</option>
                                                <option value="SEO">SEO</option>
                                                <option value="SOFTTEST">Soft Testing</option>
                                                <option value="QUALITY">Quality Assurance</option>
                                                <option value="WEBSITEDESIGN">Website Design</option>
                                                <option value="OTHER">Other</option>


                                            </select>

                                        </div>


                                        <div className="deadline-form mb-3">
                                            <form>
                                                <div className="row">
                                                    <div className="col">
                                                        <label htmlFor="datepickerded" className="form-label">
                                                            Task Start Date
                                                        </label>
                                                        <input
                                                            type="date"
                                                            className="form-control"
                                                            id="datepickerded"
                                                            value={taskStartDate} onChange={(e) => setTaskStartDate(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="col">
                                                        <label htmlFor="datepickerdedone" className="form-label">
                                                            Task End Date
                                                        </label>
                                                        <input
                                                            type="date"
                                                            className="form-control"
                                                            id="datepickerdedone"
                                                            value={taskEndDate} onChange={(e) => setTaskEndDate(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        {/*
                                        <div className="row g-3 mb-3">
                                            <div className="col-sm">
                                                <label className="form-label">Task Assign Person</label>
                                                <select
                                                    className="form-select"
                                                    multiple=""
                                                    aria-label="Default select Priority"
                                                >
                                                    <option selected="">Lucinda Massey</option>
                                                    <option value={1}>Ryan Nolan</option>
                                                    <option value={2}>Oliver Black</option>
                                                    <option value={3}>Adam Walker</option>
                                                    <option value={4}>Brian Skinner</option>
                                                    <option value={5}>Dan Short</option>
                                                    <option value={5}>Jack Glover</option>
                                                </select>
                                            </div>
                                        </div>
                                        */}
                                        <div className="row g-3 mb-3">
                                            <div className="col-sm">
                                                <label className="form-label">Task Priority</label>
                                                <select
                                                    className="form-select"
                                                    aria-label="Default select Priority"
                                                    value={taskpriority}
                                                    onChange={handlePriorityChange}
                                                >
                                                    <option value="High">Highest</option>
                                                    <option value="Medium">Medium</option>
                                                    <option value="Low">Low</option>
                                                </select>
                                            </div>
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
                                                placeholder="Add any extra details about the request"
                                                defaultValue={""}
                                                onChange={(e) => setTaskDescription(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            data-bs-dismiss="modal"
                                            onClick={handleAddTask}
                                        >
                                            Done
                                        </button>
                                        <button type="button" className="btn btn-primary">
                                            Create
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div
                            className="modal fade"
                            id="updatetask"
                            tabIndex={-1}
                            aria-hidden="true"
                        >
                            <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title  fw-bold" id="createprojectlLabel">
                                            {" "}
                                            Update Task
                                        </h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                        />
                                    </div>
                                    <div className="modal-body">
                                        {/* <div className="mb-3">
                                            <label className="form-label">Project Name</label>
                                            <select
                                                className="form-select"
                                                aria-label="Default select Project Category"
                                            >
                                                <option selected="">Project Name Select</option>
                                                <option value={1}>Fast Cad</option>
                                                <option value={2}>Box of Crayons</option>
                                                <option value={3}>Gob Geeklords</option>
                                                <option value={4}>Java Dalia</option>
                                                <option value={5}>Practice to Perfect</option>
                                                <option value={6}>Rhinestone</option>
                                                <option value={7}>Social Geek Made</option>
                                            </select>
                                        </div>*/}
                                        <div className="mb-3">
                                            <label className="form-label">upadte Task Name</label>
                                            <input type="text" className="form-control" value={taskName} onChange={(e) => setTaskName(e.target.value)} placeholder="Task Name" />

                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Task Category</label>

                                            <select
                                                className="form-select"
                                                aria-label="Default select Project Category"
                                                value={taskCategory}
                                                onChange={handleCategorieChange}
                                            >

                                                <option selected="">Select Category</option>
                                                <option value="App Development">App Development</option>
                                                <option value="UI/UX Design">UI/UX Design</option>
                                                <option value="MARKETING">Marketing</option>
                                                <option value="SEO">SEO</option>
                                                <option value="SOFTTEST">Soft Testing</option>
                                                <option value="QUALITY">Quality Assurance</option>
                                                <option value="WEBSITEDESIGN">Website Design</option>
                                                <option value="OTHER">Other</option>


                                            </select>

                                        </div>


                                        <div className="deadline-form mb-3">
                                            <form>
                                                <div className="row">
                                                    <div className="col">
                                                        <label htmlFor="datepickerded" className="form-label">
                                                            Task Start Date
                                                        </label>
                                                        <input
                                                            type="date"
                                                            className="form-control"
                                                            id="datepickerded"
                                                            value={taskStartDate} onChange={(e) => setTaskStartDate(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="col">
                                                        <label htmlFor="datepickerdedone" className="form-label">
                                                            Task End Date
                                                        </label>
                                                        <input
                                                            type="date"
                                                            className="form-control"
                                                            id="datepickerdedone"
                                                            value={taskEndDate} onChange={(e) => setTaskEndDate(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        {/*
                                        <div className="row g-3 mb-3">
                                            <div className="col-sm">
                                                <label className="form-label">Task Assign Person</label>
                                                <select
                                                    className="form-select"
                                                    multiple=""
                                                    aria-label="Default select Priority"
                                                >
                                                    <option selected="">Lucinda Massey</option>
                                                    <option value={1}>Ryan Nolan</option>
                                                    <option value={2}>Oliver Black</option>
                                                    <option value={3}>Adam Walker</option>
                                                    <option value={4}>Brian Skinner</option>
                                                    <option value={5}>Dan Short</option>
                                                    <option value={5}>Jack Glover</option>
                                                </select>
                                            </div>
                                        </div>
                                        */}
                                        <div className="row g-3 mb-3">
                                            <div className="col-sm">
                                                <label className="form-label">Task Priority</label>
                                                <select
                                                    className="form-select"
                                                    aria-label="Default select Priority"
                                                    value={taskpriority}
                                                    onChange={handlePriorityChange}
                                                >
                                                    <option value="High">Highest</option>
                                                    <option value="Medium">Medium</option>
                                                    <option value="Low">Low</option>
                                                </select>
                                            </div>
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
                                                placeholder="Add any extra details about the request"
                                                defaultValue={""}
                                                onChange={(e) => setTaskDescription(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            data-bs-dismiss="modal"
                                            onClick={handleAddTask}
                                        >
                                            Done
                                        </button>
                                        <button type="button" className="btn btn-primary">
                                            Create
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Modal  Remove Task*/}















                        <div
                            className="modal fade"
                            id="dremovetask"
                            tabIndex={-1}
                            aria-hidden="true"
                        >
                            <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title  fw-bold" id="dremovetaskLabel">
                                            {" "}
                                            Remove From Task?
                                        </h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                        />
                                    </div>
                                    <div className="modal-body justify-content-center flex-column d-flex">
                                        <i className="icofont-ui-rate-remove text-danger display-2 text-center mt-2" />
                                        <p className="mt-4 fs-5 text-center">
                                            You can Remove only From Task
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
                                        <button type="button" className="btn btn-danger color-fff">
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* start: template setting, and more. */}
                    <div
                        className="offcanvas offcanvas-end"
                        tabIndex={-1}
                        id="offcanvas_setting"
                        aria-labelledby="offcanvas_setting"
                    >
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title">Template Setting</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"
                            />
                        </div>
                        <div className="offcanvas-body d-flex flex-column">
                            <div className="mb-4">
                                <h6>Set Theme Color</h6>
                                <ul className="choose-skin list-unstyled mb-0"></ul>
                            </div>
                            <div className="mb-4 flex-grow-1">
                                <h6>Set Theme Light/Dark/RTL</h6>
                                {/* Theme: Switch Theme */}
                                <ul className="list-unstyled mb-0">
                                    <li>
                                        <div className="form-check form-switch theme-switch">
                                            <input
                                                className="form-check-input fs-6"
                                                type="checkbox"
                                                role="switch"
                                                id="theme-switch"
                                            />
                                            <label className="form-check-label mx-2" htmlFor="theme-switch">
                                                Enable Dark Mode!
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-check form-switch theme-rtl">
                                            <input
                                                className="form-check-input fs-6"
                                                type="checkbox"
                                                role="switch"
                                                id="theme-rtl"
                                            />
                                            <label className="form-check-label mx-2" htmlFor="theme-rtl">
                                                Enable RTL Mode!
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-check form-switch monochrome-toggle">
                                            <input
                                                className="form-check-input fs-6"
                                                type="checkbox"
                                                role="switch"
                                                id="monochrome"
                                            />
                                            <label className="form-check-label mx-2" htmlFor="monochrome">
                                                Monochrome Mode
                                            </label>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="d-flex">
                                <a
                                    href="https://themeforest.net/item/mytask-hr-project-management-admin-template/31974551"
                                    className="btn w-100 me-1 py-2 btn-primary"
                                >
                                    Buy Now
                                </a>
                                <a
                                    href="https://themeforest.net/user/pixelwibes/portfolio"
                                    className="btn w-100 ms-1 py-2 btn-dark"
                                >
                                    View Portfolio
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Jquery Core Js */}
                {/* Plugin Js*/}
                {/* Jquery Page Js */}
                {/* Mirrored from pixelwibes.com/template/my-pages/html/dist/pages.html by HTTrack Website Copier/3.x [XR&CO'2014], Mon, 12 Feb 2024 11:38:39 GMT */}
            </>





    );

}