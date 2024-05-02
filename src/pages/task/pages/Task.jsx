import React, { useEffect, useState } from "react";
import * as TaskService from "../../../_services/TaskService.jsx";
import { addTask } from "../../../_services/TaskService.jsx";
import TaskManagement from "../components/TaskManagement.jsx";
import BoardTask from "../components/BoardTask.jsx";
import RecentActivity from "../components/RecentActivity.jsx";
import AllocatedTaskMembers from "../components/AllocatedTaskMembers.jsx";
import DragAndDrop from "../components/StatusBoard.jsx";
import StatusBoard from "../components/StatusBoard.jsx";
import Swal from 'sweetalert2';

import * as userservice from "../../../_services/UserService.jsx";
import user from "../../../_models/User.jsx";
import data from "bootstrap/js/src/dom/data.js";
import {useSelector} from "react-redux";
import {selectUserObject} from "../../../redux/user/userSelector.js";
export default function Task() {

    const [tasks, setTasks] = useState([]);
    const [taskName, setTaskName] = useState('');
    const [taskCategory, setTaskCategory] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskpriority, setTaskPriority] = useState('');
    const [taskcomplexity, setTaskcomplexity] = useState('');
    const [taskStartDate, setTaskStartDate] = useState('');
    const [taskEndDate, setTaskEndDate] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [taskNameError, setTaskNameError] = useState('');
    const currentUser = useSelector(selectUserObject);

    // Autres états pour les autres champs du formulaire
    const handlePriorityChange = (e) => {
        setTaskPriority(e.target.value);
    };
    const handleComplexityChange = (e) => {
        setTaskcomplexity(e.target.value);
    };
    const handleCategorieChange = (e) => {
        setTaskCategory(e.target.value);
    };

    useEffect(() => {
        const fetchTasks = async () => {
            const data = await TaskService.getAllTasks();
            console.log(data);
            setTasks(data);
        };




        const fetchUsers = async () => {
            const data = await userservice.getAllUsers();
            setUsers(data);
        };




        fetchTasks();
        fetchUsers();
    }, []);



    const handleAddTask = async () => {
        try {
            // Vérifiez si le champ "Task Name" est vide lors de la soumission du formulaire
            if (taskName.trim() === '') {
                setTaskNameError('Task Name is required');
                return;
            }

            const newTaskData = {
                name: taskName,
                category: taskCategory,
                description: taskDescription,
                priority: taskpriority,
                taskcomplexity:taskcomplexity,
                startDate: taskStartDate,
                endDate: taskEndDate,
                assignPerson: selectedUserId,
            };

            const createdTask = await TaskService.addTask(newTaskData);
            resetForm();

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your Task has been saved",
                showConfirmButton: false,
                timer: 1500,
                width: 200,
                height: 50,
            });

            console.log('Task created successfully:', createdTask);
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };



    // Fonction pour réinitialiser le formulaire
    const resetForm = () => {
        setTaskName('');
        setTaskCategory('');
        setTaskDescription('');
        setTaskPriority('');
        setTaskStartDate('');
        setTaskEndDate('');
        setTaskcomplexity('');
        setSelectedUserId('');
        setTaskNameError('');
    };




    const handleUserChange = (e) => {
        setSelectedUserId(e.target.value);
    };

    const handleRefresh = () => {
        setRefresh(!refresh); // Inversez simplement la valeur de refresh pour forcer le rendu à se mettre à jour
    };


    return (

        <>


            {/* Mirrored from pixelwibes.com/template/my-pages/html/dist/pages.html by HTTrack Website Copier/3.x [XR&CO'2014], Mon, 12 Feb 2024 11:38:38 GMT */}
            <meta charSet="utf-8"/>
            <meta httpEquiv="X-UA-Compatible" content="IE=Edge"/>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <title>:: My-Task:: Task </title>
            <link rel="icon" href="favicon.ico" type="image/x-icon"/>
            {/* Favicon*/}
            {/* plugin css file  */}
            <link rel="stylesheet" href="../../../../public/assets/plugin/nestable/jquery-nestable.css"/>
            {/* project css file  */}


            {/* main body area */}
            <div id="mytask-layout" className="main px-lg-6  px-md-4">
                {/* Body: Header */}

                {/* Body: Body */}
                <div className="body py-lg-5 py-md-2">
                    <div className="container-xxl">

                        <div className="border-0 mb-4">
                            <div
                                className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                                <h3 className="fw-bold mb-0">Task Management of {currentUser.firstName}</h3>
                                <div className="col-auto">
                                    <button
                                        type="button"
                                        className="btn btn-dark btn-set-task"
                                        data-bs-toggle="modal"
                                        data-bs-target="#createtask"
                                        style={{backgroundColor: '#4c3575'}}
                                    >
                                        <i className="icofont-plus-circle me-2 fs-6"/>
                                        Create Task
                                    </button>
                                </div>

                            </div>
                        </div>
                        {" "}
                        {/* Row end  */}
                        <div className="row clearfix  g-3">
                            <div className="col-lg-12 col-md-12 flex-column">
                                <div className="row g-3 row-deck" onMouseEnter={handleRefresh}>
                                    <TaskManagement refresh={refresh}/>


                                    <RecentActivity/>
                                    <AllocatedTaskMembers/>
                                </div>
                                <StatusBoard refresh={refresh}/>
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
                                    <input type="text" className="form-control" value={taskName}
                                           onChange={(e) => setTaskName(e.target.value)} placeholder="Task Name"

                                           onBlur={() => {
                                               // Vérifiez si le champ "Task Name" est vide lorsqu'il perd le focus
                                               if (taskName.trim() === '') {
                                                   setTaskNameError('Task Name is required');
                                               } else {
                                                   setTaskNameError('');
                                               }
                                           }}


                                    />
                                    {taskNameError && <div className="text-danger">{taskNameError}</div>}


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
                                                    value={taskStartDate}
                                                    onChange={(e) => setTaskStartDate(e.target.value)}
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

                                <div className="row g-3 mb-3">
                                    <div className="col-sm">
                                        <label className="form-label">Task Assign Person</label>
                                        <select
                                            className="form-select"
                                            onChange={handleUserChange}
                                            value={selectedUserId}
                                            aria-label="Default select Priority"
                                        >
                                            <option selected="">Select Person</option>
                                            {users.map((user) => (

                                                <option key={user._id} value={user._id}>{user.username}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="row g-3 mb-3">
                                    <div className="col-sm">
                                        <label className="form-label">Task Priority</label>
                                        <select
                                            className="form-select"
                                            aria-label="Default select Priority"
                                            value={taskpriority}
                                            onChange={handlePriorityChange}
                                        >
                                            <option selected="">Select Priority</option>
                                            <option value="High">Highest</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Low">Low</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row g-3 mb-3">
                                    <div className="col-sm">
                                        <label className="form-label">Task Complexity</label>
                                        <select
                                            className="form-select"
                                            aria-label="Default select Priority"
                                            value={taskcomplexity}
                                            onChange={handleComplexityChange}
                                        >
                                            <option selected="">Select Complexity</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="5">5</option>
                                            <option value="8">8</option>
                                            <option value="13">13</option>
                                            <option value="21">21</option>
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
                                    style={{backgroundColor: '#4c3575'}}
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                    onClick={handleAddTask}
                                >
                                    Create
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-12">
                <div className="card ">
                    <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                        <h6 className="mb-0 fw-bold ">Top Perfrormers</h6>
                    </div>
                    <div className="card-body">
                        <div className="row g-3 align-items-center">
                            <div className="col-md-12 col-lg-4 col-xl-4 col-xxl-2">
                                <p>
                                    You have 140 <span className="fw-bold">influencers </span>{" "}
                                    in your company.
                                </p>
                                <div className="d-flex  justify-content-between text-center">
                                    <div className="">
                                        <h3 className="fw-bold">350</h3>
                                        <span className="small">New Task</span>
                                    </div>
                                    <div className="">
                                        <h3 className="fw-bold">130</h3>
                                        <span className="small">Task Completed</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 col-lg-12 col-xl-12 col-xxl-10">
                                <div
                                    className="row g-3 row-cols-2 row-cols-sm-3 row-cols-md-3 row-cols-lg-3 row-cols-xl-3 row-cols-xxl-6 row-deck top-perfomer">
                                    <div className="col">
                                        <div className="card shadow">
                                            <div
                                                className="card-body text-center d-flex flex-column justify-content-center">
                                                <img
                                                    className="avatar lg rounded-circle img-thumbnail mx-auto"
                                                    src="/assets/images/lg/avatar2.jpg"
                                                    alt="profile"
                                                />
                                                <h6 className="fw-bold my-2 small-14">Luke Short</h6>
                                                <span className="text-muted mb-2">@Short</span>
                                                <h4 className="fw-bold text-primary fs-3">80%</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="card shadow">
                                            <div
                                                className="card-body text-center d-flex flex-column justify-content-center">
                                                <img
                                                    className="avatar lg rounded-circle img-thumbnail mx-auto"
                                                    src="/assets/images/lg/avatar5.jpg"
                                                    alt="profile"
                                                />
                                                <h6 className="fw-bold my-2 small-14">John Hard</h6>
                                                <span className="text-muted mb-2">@rdacre</span>
                                                <h4 className="fw-bold text-primary fs-3">70%</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="card shadow">
                                            <div
                                                className="card-body text-center d-flex flex-column justify-content-center">
                                                <img
                                                    className="avatar lg rounded-circle img-thumbnail mx-auto"
                                                    src="/assets/images/lg/avatar8.jpg"
                                                    alt="profile"
                                                />
                                                <h6 className="fw-bold my-2 small-14">Paul Rees</h6>
                                                <span className="text-muted mb-2">@Rees</span>
                                                <h4 className="fw-bold text-primary fs-3">77%</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="card shadow">
                                            <div
                                                className="card-body text-center d-flex flex-column justify-content-center">
                                                <img
                                                    className="avatar lg rounded-circle img-thumbnail mx-auto"
                                                    src="/assets/images/lg/avatar9.jpg"
                                                    alt="profile"
                                                />
                                                <h6 className="fw-bold my-2 small-14">Rachel Parr</h6>
                                                <span className="text-muted mb-2">@Parr</span>
                                                <h4 className="fw-bold text-primary fs-3">85%</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="card shadow">
                                            <div
                                                className="card-body text-center d-flex flex-column justify-content-center">
                                                <img
                                                    className="avatar lg rounded-circle img-thumbnail mx-auto"
                                                    src="/assets/images/lg/avatar12.jpg"
                                                    alt="profile"
                                                />
                                                <h6 className="fw-bold my-2 small-14">Eric Reid</h6>
                                                <span className="text-muted mb-2">@Eric</span>
                                                <h4 className="fw-bold text-primary fs-3">95%</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="card shadow">
                                            <div
                                                className="card-body text-center d-flex flex-column justify-content-center">
                                                <img
                                                    className="avatar lg rounded-circle img-thumbnail mx-auto"
                                                    src="/assets/images/lg/avatar3.jpg"
                                                    alt="profile"
                                                />
                                                <h6 className="fw-bold my-2 small-14">Jan Ince</h6>
                                                <span className="text-muted mb-2">@Ince</span>
                                                <h4 className="fw-bold text-primary fs-3">97%</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>

    );

}