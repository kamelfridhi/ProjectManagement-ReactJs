import React, {useEffect, useState} from "react";
import * as TaskService from "../../../_services/TaskService.jsx";



export default function TaskManagement() {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const data = await TaskService.getAllTasks();
            setTasks(data);
        };
        fetchTasks();
    }, []);

    // Fonction pour compter le nombre de tâches avec le statut "To Do"
    const countToDoTasks = () => {
        return tasks.filter(task => task.status.length > 0 && task.status[task.status.length - 1].status === 'TODO').length;
    };

    // Fonction pour compter le nombre de tâches avec le statut "In Progress"
    const countInProgressTasks = () => {
        return tasks.filter(task => task.status.length > 0 && task.status[task.status.length - 1].status === 'INPROGRESS').length;
    };

    // Fonction pour compter le nombre de tâches avec le statut "Done"
    const countDoneTasks = () => {
        return tasks.filter(task => task.status.length > 0 && task.status[task.status.length - 1].status === 'DONE').length;
    };



    // Calcul du pourcentage de tâches "To Do" par rapport au nombre total de tâches
    const todoTasksCount = countToDoTasks();
    const totalTasksCount = tasks.length;
    const todoTasksPercentage = totalTasksCount > 0 ? (todoTasksCount / totalTasksCount) * 100 : 0;
    const inProgressTasksCount = countInProgressTasks();
    const inProgressTasksPercentage = tasks.length > 0 ? (inProgressTasksCount / tasks.length) * 100 : 0;

    // Calcul du pourcentage de tâches "Done" par rapport au nombre total de tâches
    const doneTasksCount = countDoneTasks();
    const doneTasksPercentage = tasks.length > 0 ? (doneTasksCount / tasks.length) * 100 : 0;

    return (

        <>


            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                <div className="card">
                    <div className="card-header py-3">
                        <h6 className="mb-0 fw-bold ">Status Progress</h6>
                    </div>
                    <div className="card-body mem-list">
                        <div className="progress-count mb-4">
                            <div className="d-flex justify-content-between align-items-center mb-1">
                                <h6 className="mb-0 fw-bold d-flex align-items-center">
                                    To Do
                                </h6>
                                <span className="small text-muted">{`${todoTasksCount}/${totalTasksCount}`}</span>
                            </div>
                            <div className="progress" style={{ height: 10 }}>
                                <div
                                    className="progress-bar danger-info-bg"
                                    role="progressbar"
                                    style={{ width: `${todoTasksPercentage}%` , backgroundColor: '#4c3575'}}
                                    aria-valuenow={todoTasksPercentage}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                />
                            </div>
                        </div>

                        <div className="progress-count mb-4">
                            <div className="d-flex justify-content-between align-items-center mb-1">
                                <h6 className="mb-0 fw-bold d-flex align-items-center">
                                    In Progress
                                </h6>
                                <span className="small text-muted">{`${inProgressTasksCount}/${totalTasksCount}`}</span>
                            </div>
                            <div className="progress" style={{ height: 10 }}>
                                <div
                                    className="progress-bar danger-info-bg"
                                    role="progressbar"
                                    style={{ width: `${inProgressTasksPercentage}%` , backgroundColor: '#4c3575'}}
                                    aria-valuenow={inProgressTasksPercentage}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                />
                            </div>
                        </div>


                        <div className="progress-count mb-4">
                            <div className="d-flex justify-content-between align-items-center mb-1">
                                <h6 className="mb-0 fw-bold d-flex align-items-center">
                                    Done
                                </h6>
                                <span className="small text-muted">{`${doneTasksCount}/${totalTasksCount}`}</span>
                            </div>
                            <div className="progress" style={{ height: 10 }}>
                                <div
                                    className="progress-bar danger-info-bg"
                                    role="progressbar"
                                    style={{ width: `${doneTasksPercentage}%` , backgroundColor: '#4c3575'}}
                                    aria-valuenow={doneTasksPercentage}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}