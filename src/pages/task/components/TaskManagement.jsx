import React, { useEffect, useState } from "react";
import * as TaskService from "../../../_services/TaskService.jsx";
import * as StatusService from "../../../_services/StatusService.jsx"; // Import de la fonction getAllStatus
import io from 'socket.io-client';

export default function TaskManagement({ refresh }) {
    const [tasks, setTasks] = useState([]);
    const [statuses, setStatuses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const taskData = await TaskService.getAllTasks();
                setTasks(taskData);

                const statusData = await StatusService.getAllStatus();
                setStatuses(statusData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [refresh]);

    // Fonction pour compter le nombre de tâches avec un statut donné
    const countTasksByStatus = (status) => {
        return tasks.filter(task => task.status.length > 0 && task.status[task.status.length - 1].status === status).length;
    };

    // Calcul du pourcentage de tâches avec un statut donné par rapport au nombre total de tâches
    const calculatePercentage = (status) => {
        const totalCount = tasks.length;
        const count = countTasksByStatus(status);
        return totalCount > 0 ? (count / totalCount) * 100 : 0;
    };

    return (

        <>


            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">

                <div className="card">


                    <div className="card-header py-3">

                    <div className="card-body mem-list">

                        {statuses.map((status) => (
                        <div className="progress-count mb-4">
                            <div className="d-flex justify-content-between align-items-center mb-1">
                                <h6 className="mb-0 fw-bold d-flex align-items-center">
                                    {status.status}
                                </h6>
                                <span className="small text-muted">{`${countTasksByStatus(status.status)}/${tasks.length}`}</span>
                            </div>
                            <div className="progress" style={{ height: 10 }}>
                                <div
                                    className="progress-bar danger-info-bg"
                                    role="progressbar"
                                    style={{ width: `${calculatePercentage(status.status)}%`, backgroundColor: '#4c3575' }}
                                    aria-valuenow={calculatePercentage(status.status)}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                />
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>



                </div>

            </div>

        </>
    )
}