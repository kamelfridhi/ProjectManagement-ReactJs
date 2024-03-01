import React, {useEffect, useState} from "react";
import * as TaskService from "../../../_services/TaskService.jsx";

export default function ShowTasks() {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [taskName, setTaskName] = useState('');
    const [taskCategory, setTaskCategory] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskpriority, setTaskPriority] = useState('');
    const [taskStartDate, setTaskStartDate] = useState('');
    const [taskEndDate, setTaskEndDate] = useState('');
   // const [tasks, setTasks] = useState([]);


    useEffect(() => {
        const fetchTasks = async () => {
            const data = await TaskService.getAllTasks();
            setTasks(data);
        };
        fetchTasks();
    }, []);

    const HandeDelete = async (_id) =>{
        try{
            await TaskService.deleteTask(_id);
        }catch (error) {
            console.error(error);
            throw error;
        }

    }


    const handleEditClick = async (_id) => {
        try {
            const task = await TaskService.getTaskById(_id);
            setSelectedTask(task);
        } catch (error) {
            console.error(error);
        }
    };




// Fonction pour mettre à jour les données de la tâche
    const handleUpdateTask = async () => {
        try {
            // Vérifiez si une tâche est sélectionnée
            if (!selectedTask || !selectedTask.id) {
                console.error("No task selected for update");
                return;
            }

            // Créez un objet de données pour la tâche mise à jour
            const updatedTaskData = {
                name: taskName,
                category: taskCategory,
                description: taskDescription,
                priority: taskpriority,
                startDate: taskStartDate,
                endDate: taskEndDate,
                // Ajoutez d'autres propriétés de tâche nécessaires
            };

            // Envoyez la requête PUT ou PATCH pour mettre à jour la tâche sélectionnée
            const updatedTask = await TaskService.updateTask(updatedTaskData, selectedTask.__id__);

            // Réinitialisez les champs du formulaire après la mise à jour de la tâche
            setTaskName('');
            setTaskCategory('');
            setTaskDescription('');
            setTaskPriority('');
            setTaskStartDate('');
            setTaskEndDate('');
            // Réinitialisez d'autres champs du formulaire si nécessaire

            // Faites quelque chose avec la tâche mise à jour, par exemple, affichez un message de succès
            console.log('Task updated successfully:', updatedTask);

            // Désélectionnez la tâche après la mise à jour
            setSelectedTask(null);
        } catch (error) {
            // Gérez les erreurs lors de la mise à jour de la tâche, par exemple, affichez un message d'erreur
            console.error('Error updating task:', error);
        }
    };



    return(
        <>
            {/* main body area */}
            <div className="main px-lg-4 px-md-4">
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






                                            <tr  key={task._id}>
                                                <td>
                                                    <a
                                                        href="ticket-detail.html"
                                                        className="fw-bold text-secondary"
                                                    >
                                                        {task.name}
                                                    </a>



                                                </td>
                                                <td  style={{ width: "25%" }}>{task.description}</td>
                                                <td >{task.priority}</td>
                                                <td >
                                                    <img
                                                        className="avatar rounded-circle"
                                                        src="assets/images/xs/avatar1.jpg"
                                                        alt=""
                                                    />
                                                    <span className="fw-bold ms-1">Joan Dyer</span>
                                                </td>

                                                <td >{task.creationDate}</td>
                                                <td >
                                                    <span className="badge bg-warning">{task.status.length > 0 ? task.status[task.status.length - 1].status: 'Aucun statut'}</span>
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
                                                            data-bs-target={`#edittickit-${task.id}`}
                                                            onClick={() => handleEditClick(task.id)} // Appeler handleEditClick avec l'ID de la tâche sélectionnée
                                                        >
                                                            <i className="icofont-edit text-success" />
                                                        </button>


                                                        <button
                                                            type="button"
                                                            onClick={()=> HandeDelete(task._id)}
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

            {tasks.map(task => (
                <div
                    key={task.__id__}
                    className={`modal fade ${selectedTask === task ? 'show' : ''}`}
                    id={`edittickit-${task.__id__}`}
                    tabIndex={-1}
                    aria-hidden="true"

                >
                    <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title  fw-bold" id="createprojectlLabel">
                                    {" "}
                                    Task Edit
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
                                    <label className="form-label" key={task._id}>Task Name</label>
                                    <input type="text" className="form-control" value={taskName} onChange={(e) => setTaskName(e.target.value)} placeholder="Task Name" />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label" key={task._id}>Task Category</label>

                                    <select className="form-select" aria-label="Default select Project Category" value={taskCategory} onChange={(e) => setTaskCategory(e.target.value)}>
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
                                                <label htmlFor="datepickerded" className="form-label" key={task._id}>Task Start Date</label>
                                                <input type="date" className="form-control" id="datepickerded" value={taskStartDate} onChange={(e) => setTaskStartDate(e.target.value)} />
                                            </div>
                                            <div className="col">
                                                <label htmlFor="datepickerdedone" className="form-label" key={task._id}>Task End Date</label>
                                                <input type="date" className="form-control" id="datepickerdedone" value={taskEndDate} onChange={(e) => setTaskEndDate(e.target.value)} />
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
                                        <label className="form-label" key={task._id}>Task Priority</label>
                                        <select className="form-select" aria-label="Default select Priority" value={taskpriority} onChange={(e) => setTaskPriority(e.target.value)}>
                                            <option value="High">Highest</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Low">Low</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlTextarea786" className="form-label" key={task._id}>Description (optional)</label>
                                    <textarea className="form-control" id="exampleFormControlTextarea786" rows={3} value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} placeholder="Add any extra details about the request" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleUpdateTask}>Update Task</button>
                            </div>
                        </div>
                    </div>
                </div>

            ))}
        </>

    )
}