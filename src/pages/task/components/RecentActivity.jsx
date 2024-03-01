import React, {useEffect, useState} from "react";
import * as TaskService from "../../../_services/TaskService.jsx";


export default function RecentActivity() {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const data = await TaskService.getAllTasks();
            setTasks(data);
        };
        fetchTasks();
    }, []);


    return (

        <>


            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                <div className="card">
                    <div className="card-header py-3">
                        <h6 className="mb-0 fw-bold ">Recent Activity</h6>
                    </div>
                    <div className="card-body mem-list">
                        <div className="timeline-item ti-danger border-bottom ms-2">
                            <div className="d-flex">
                                                                <span
                                                                    className="avatar d-flex justify-content-center align-items-center rounded-circle light-success-bg">
                                                                    RH
                                                                </span>
                                <div className="flex-fill ms-3">
                                    <div className="mb-1">
                                        <strong>Rechard Add New Task</strong>
                                    </div>
                                    <span className="d-flex text-muted">20Min ago</span>
                                </div>
                            </div>
                        </div>
                        {" "}
                        {/* timeline item end  */}
                        <div className="timeline-item ti-info border-bottom ms-2">
                            <div className="d-flex">
                                                                <span
                                                                    className="avatar d-flex justify-content-center align-items-center rounded-circle bg-careys-pink">
                                                                    SP
                                                                </span>
                                <div className="flex-fill ms-3">
                                    <div className="mb-1">
                                        <strong>Shipa Review Completed</strong>
                                    </div>
                                    <span className="d-flex text-muted">40Min ago</span>
                                </div>
                            </div>
                        </div>
                        {" "}
                        {/* timeline item end  */}
                        <div className="timeline-item ti-info border-bottom ms-2">
                            <div className="d-flex">
                                                                <span
                                                                    className="avatar d-flex justify-content-center align-items-center rounded-circle bg-careys-pink">
                                                                    MR
                                                                </span>
                                <div className="flex-fill ms-3">
                                    <div className="mb-1">
                                        <strong>Mora Task To Completed</strong>
                                    </div>
                                    <span className="d-flex text-muted">1Hr ago</span>
                                </div>
                            </div>
                        </div>
                        <div className="timeline-item ti-success  ms-2">
                            <div className="d-flex">
                                                                <span
                                                                    className="avatar d-flex justify-content-center align-items-center rounded-circle bg-lavender-purple">
                                                                    FL
                                                                </span>
                                <div className="flex-fill ms-3">
                                    <div className="mb-1">
                                        <strong>Fila Add New Task</strong>
                                    </div>
                                    <span className="d-flex text-muted">1Day ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {" "}
                {/* .card: My Timeline */}
            </div>


        </>
    )
}