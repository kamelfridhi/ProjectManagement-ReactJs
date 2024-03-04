import React, { useEffect, useState } from "react";
import * as TaskService from "../../../_services/TaskService.jsx";
import task from "../../../_models/Task.jsx";

export default function ShowTasks() {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState('');


    // const [tasks, setTasks] = useState([]);


    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await TaskService.getAllTasks();
                setTasks(data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTasks();
    }, []);

    useEffect(() => {
        if (selectedTask) {
            // Attendre que le composant soit monté dans le DOM avant d'initialiser le modal
            window.$(`#edittickit-${selectedTask._id}`).modal('show');

        }

    }, [selectedTask]);
    const HandeDelete = async (_id) => {
        try {
            await TaskService.deleteTask(_id);
            // Mettre à jour la liste des tâches après la suppression
            const updatedTasks = tasks.filter(task => task._id !== _id);
            setTasks(updatedTasks);
        } catch (error) {
            console.error(error);
        }
    };



    const handleEditClick = async (_id) => {
        try {
            const task = await TaskService.getTaskById(_id);
            setSelectedTask(task);
            console.log("errrrrrrrrrrrrrrrr" + selectedTask.name)
        } catch (error) {
            console.error(error);
        }
    };


    const handleUpdate1 = async () => {
        try {
            await TaskService.updateTask(selectedTask, selectedTask._id);
            console.log("Task updated successfully");
            // Mettre à jour la liste des tâches après la modification
            const updatedTasks = tasks.map(task => {
                if (task._id === selectedTask._id) {
                    return selectedTask;
                }
                return task;
            });
            setTasks(updatedTasks);
            window.location.reload();
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };


    // Fonction pour mettre à jour les données de la tâche

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            await TaskService.changeTaskStatus(taskId, newStatus);
            // Mettre à jour localement le statut de la tâche modifiée
            const updatedTasks = tasks.map(task => {
                if (task._id === taskId) {
                    return {
                        ...task,
                        status: [{ status: newStatus }] // Mettre à jour le statut de la tâche
                    };
                }
                return task;
            });
            setTasks(updatedTasks);
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };




    return (
        <>
            {/* main body area */}
            <div className="main px-lg-4 px-md-4" >
                {/* Body: Body */}
                <div className="body d-flex py-lg-3 py-md-2">
                    <div className="container-xxl">
                        <div className="row align-items-center">
                            <div className="border-0 mb-4">
                                <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                                    <h3 className="fw-bold mb-0">Tasks</h3>
                                    <div className="col-auto d-flex w-sm-100">
                                        <button
                                            type="button"
                                            className="btn btn-dark btn-set-task w-sm-100"
                                            data-bs-toggle="modal"
                                            data-bs-target="#tickadd"
                                        >
                                            <i className="icofont-plus-circle me-2 fs-6" />
                                            Add Tasks
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>{" "}
                        {/* Row end  */}
                        <div className="row clearfix g-3">
                            <div className="col-sm-12">
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <table
                                            id="myProjectTable"
                                            className="table table-hover align-middle mb-0"
                                            style={{ width: "100%" }}
                                        >
                                            <thead>
                                                <tr>
                                                    <th>Task Name</th>
                                                    <th>Description</th>
                                                    <th>Priority</th>
                                                    <th>Assigned</th>
                                                    <th>Created Date</th>

                                                    <th>Status</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {tasks.map(task => (






                                                    <tr key={task._id}>
                                                        <td>
                                                            <a
                                                                href="ticket-detail.html"
                                                                className="fw-bold text-secondary"
                                                            >
                                                                {task.name}
                                                            </a>



                                                        </td>
                                                        <td style={{ width: "20%" }}>{task.description}</td>
                                                        <td >{task.priority}</td>
                                                        <td >
                                                            <img
                                                                className="avatar rounded-circle"
                                                                src="../../../../public/assets/images/xs/avatar1.jpg"
                                                                alt=""
                                                            />
                                                            <span className="fw-bold ms-1">Joan Dyer</span>
                                                        </td>

                                                        <td style={{ width: "15%" }} >{task.creationDate.split("T")[0].split("-").reverse().join("-")}</td>


                                                        <td>
                                                            <select
                                                                className="form-select bg-warning"
                                                                value={task.status.length > 0 ? task.status[task.status.length - 1].status : 'Aucun statut'}
                                                                onChange={(e) => handleStatusChange(task._id, e.target.value)} // Appeler handleStatusChange avec l'ID de la tâche et le nouveau statut sélectionné
                                                            >

                                                                <option selected="">{task.status.length > 0 ? task.status[task.status.length - 1].status : 'Aucun statut'}</option>
                                                                <option value="65e32059108ea868f1285327">To Do</option>
                                                                <option value="65e32181108ea868f1285329">In Progress</option>
                                                                <option value="65e321a5108ea868f128532a">done</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <div
                                                                className="btn-group"
                                                                role="group"
                                                                aria-label="Basic outlined example"
                                                            >
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-outline-secondary"
                                                                    data-bs-toggle="modal"
                                                                    onClick={() => {
                                                                        handleEditClick(task._id); // Appeler handleEditClick avec l'ID de la tâche sélectionnée

                                                                    }}
                                                                >

                                                                    <i className="icofont-edit text-success" />
                                                                </button>



                                                                <button
                                                                    type="button"
                                                                    onClick={() => HandeDelete(task._id)}
                                                                    className="btn btn-outline-secondary deleterow"
                                                                >
                                                                    <i className="icofont-ui-delete text-danger" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>


                                                ))}






                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Row End */}
                    </div>
                </div>
            </div>

            <div
                key={selectedTask._id}
                className={`modal fade show' : ''}`}
                id={`edittickit-${selectedTask._id}`}
                tabIndex={-1}
                aria-hidden="true"

            >
                <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title  fw-bold" id="createprojectlLabel" style={{ color: '#4c3575' }}>
                                {" "}
                                {selectedTask.name + " Edit"}

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
                                <label className="form-label" key={selectedTask._id}>Task Name</label>
                                <input type="text" className="form-control" value={selectedTask.name}
                                    onChange={(e) => setSelectedTask({ ...selectedTask, name: e.target.value })} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label" key={selectedTask._id}>Task Category</label>

                                <select className="form-select" aria-label="Default select Project Category" value={selectedTask.category} onChange={(e) => setSelectedTask({ ...selectedTask, category: e.target.value })}>
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
                                            <label htmlFor="datepickerded" className="form-label" key={selectedTask._id}>Task Start Date</label>
                                            <input type="datetime" className="form-control" id="datepickerded" value={selectedTask.startDate} onChange={(e) => setSelectedTask({ ...selectedTask, startDate: e.target.value })} />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="datepickerdedone" className="form-label" key={selectedTask._id}>Task End Date</label>
                                            <input type="datetime" className="form-control" id="datepickerdedone" value={selectedTask.endDate} onChange={(e) => setSelectedTask({ ...selectedTask, endDate: e.target.value })} />
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
                                    <label className="form-label" key={selectedTask._id}>Task Priority</label>
                                    <select className="form-select" aria-label="Default select Priority" value={selectedTask.priority} onChange={(e) => setSelectedTask({ ...selectedTask, priority: e.target.value })}>
                                        <option value="High">Highest</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Low">Low</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlTextarea786" className="form-label" key={selectedTask._id}>Description (optional)</label>
                                <textarea className="form-control" id="exampleFormControlTextarea78116" rows={3} value={selectedTask.description} onChange={(e) => setSelectedTask({ ...selectedTask, description: e.target.value })} placeholder="Add any extra details about the request" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleUpdate1} style={{ backgroundColor: '#4c3575' }}>Update Task</button>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}