import React, { useEffect, useState } from "react";
import * as TaskService from "../../../_services/TaskService.jsx";
import { addTask } from "../../../_services/TaskService.jsx";
import TaskManagement from "../components/TaskManagement.jsx";
import BoardTask from "../components/BoardTask.jsx";
import RecentActivity from "../components/RecentActivity.jsx";
import AllocatedTaskMembers from "../components/AllocatedTaskMembers.jsx";
import DragAndDrop from "../components/StatusBoard.jsx";
import StatusBoard from "../components/StatusBoard.jsx";

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
            setTaskDescription('');
            setTaskPriority('');
            setTaskStartDate('');
            setTaskEndDate('');
            // Réinitialiser d'autres champs du formulaire si nécessaire
            window.location.reload();
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
                <div className="main px-lg-6  px-md-4">
                    {/* Body: Header */}

                    {/* Body: Body */}
                    <div className="body d-flex py-lg-5 py-md-2">
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
                                                style={{ backgroundColor: '#4c3575' }}
                                            >
                                                <i className="icofont-plus-circle me-2 fs-6" />
                                                Create Task
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>{" "}
                            {/* Row end  */}
                            <div className="row clearfix  g-3">
                                <div className="col-lg-12 col-md-12 flex-column">
                                    <div className="row g-3 row-deck">
                                        <TaskManagement />
                                        <RecentActivity />
                                        <AllocatedTaskMembers />
                                    </div>
                                    <StatusBoard/>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Modal Members*/}


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
                                        Create
                                    </button>
                                    <button type="button" className="btn btn-primary">
                                        Create
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>

    );

}