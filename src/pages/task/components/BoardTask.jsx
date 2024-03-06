import React, {useEffect, useState} from "react";
import * as TaskService from "../../../_services/TaskService.jsx";




export default function BoardTask() {

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


            <div className="row taskboard g-3 py-xxl-4">

                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-12 mt-xxl-4 mt-xl-4 mt-lg-4 mt-md-4 mt-sm-4 mt-4">
                    <h6 className="fw-bold py-3 mb-0">To do</h6>
                    <div className="progress_task">
                        <div className="dd" data-plugin="nestable">
                            <ol className="dd-list">

                                {tasks.map(task => (

                                    task.status[task.status.length - 1].status === "TODO" &&


                                    <li className="dd-item" key={task._id} data-id={1}>
                                        <div className="dd-handle">
                                            <div
                                                className="task-info d-flex align-items-center justify-content-between">
                                                <h6 className="light-info-bg py-1 px-2 rounded-1 d-inline-block fw-bold small-14 mb-0">
                                                    {task.category}
                                                </h6>
                                                <div
                                                    className="task-priority d-flex flex-column align-items-center justify-content-center">
                                                    <div className="avatar-list avatar-list-stacked m-0">
                                                        <img
                                                            className="avatar rounded-circle small-avt"
                                                            src="../../../../public/assets/images/xs/avatar2.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            className="avatar rounded-circle small-avt"
                                                            src="../../../../public/assets/images/xs/avatar1.jpg"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <span className="badge bg-success text-end mt-2">
                                                                                {task.priority}
                                                                            </span>
                                                </div>
                                            </div>
                                            <p className="py-2 mb-0">
                                                {task.description}
                                            </p>
                                            <div className="tikit-info row g-3 align-items-center">
                                                <div className="col-sm">
                                                    <ul className="d-flex list-unstyled align-items-center flex-wrap">
                                                        <li className="me-2">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-flag"/>
                                                                <span className="ms-1">{task.creationDate.split("T")[0].split("-").reverse().join("-")}</span>
                                                            </div>
                                                        </li>
                                                        <li className="me-2">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-ui-text-chat"/>
                                                                <span className="ms-1">5</span>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-paper-clip"/>
                                                                <span className="ms-1">5</span>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="col-sm text-end">
                                                    <div
                                                        className="small text-truncate light-danger-bg py-1 px-2 rounded-1 d-inline-block fw-bold small">
                                                        {" "}
                                                        Box of Crayons{" "}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>


                                ))}


                            </ol>
                        </div>
                    </div>
                </div>
                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-12 mt-xxl-4 mt-xl-4 mt-lg-4 mt-md-0 mt-sm-0 mt-0">
                    <h6 className="fw-bold py-3 mb-0">In Progres</h6>
                    <div className="review_task">
                        <div className="dd" data-plugin="nestable">
                            <ol className="dd-list">
                                {tasks.map(task => (

                                    task.status[task.status.length - 1].status === "INPROGRESS" &&


                                    <li className="dd-item" key={task._id} data-id={1}>
                                        <div className="dd-handle">
                                            <div
                                                className="task-info d-flex align-items-center justify-content-between">
                                                <h6 className="light-info-bg py-1 px-2 rounded-1 d-inline-block fw-bold small-14 mb-0">
                                                    {task.category}
                                                </h6>
                                                <div
                                                    className="task-priority d-flex flex-column align-items-center justify-content-center">
                                                    <div className="avatar-list avatar-list-stacked m-0">
                                                        <img
                                                            className="avatar rounded-circle small-avt"
                                                            src="../../../../public/assets/images/xs/avatar2.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            className="avatar rounded-circle small-avt"
                                                            src="../../../../public/assets/images/xs/avatar1.jpg"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <span className="badge bg-success text-end mt-2">
                                                                                {task.priority}
                                                                            </span>
                                                </div>
                                            </div>
                                            <p className="py-2 mb-0">
                                                {task.description}
                                            </p>
                                            <div className="tikit-info row g-3 align-items-center">
                                                <div className="col-sm">
                                                    <ul className="d-flex list-unstyled align-items-center flex-wrap">
                                                        <li className="me-2">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-flag"/>
                                                                <span className="ms-1">{task.creationDate.split("T")[0].split("-").reverse().join("-")}</span>
                                                            </div>
                                                        </li>
                                                        <li className="me-2">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-ui-text-chat"/>
                                                                <span className="ms-1">5</span>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-paper-clip"/>
                                                                <span className="ms-1">5</span>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="col-sm text-end">
                                                    <div
                                                        className="small text-truncate light-danger-bg py-1 px-2 rounded-1 d-inline-block fw-bold small">
                                                        {" "}
                                                        Box of Crayons{" "}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>


                                ))}

                            </ol>
                        </div>
                    </div>
                </div>
                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-12 mt-xxl-4 mt-xl-4 mt-lg-4 mt-md-0 mt-sm-0 mt-0">
                    <h6 className="fw-bold py-3 mb-0">done</h6>
                    <div className="completed_task">
                        <div className="dd" data-plugin="nestable">
                            <ol className="dd-list">

                                {tasks.map(task => (

                                    task.status[task.status.length - 1].status === "DONE" &&


                                    <li className="dd-item" key={task._id} data-id={1}>
                                        <div className="dd-handle">
                                            <div
                                                className="task-info d-flex align-items-center justify-content-between">
                                                <h6 className="light-info-bg py-1 px-2 rounded-1 d-inline-block fw-bold small-14 mb-0">
                                                    {task.category}
                                                </h6>
                                                <div
                                                    className="task-priority d-flex flex-column align-items-center justify-content-center">
                                                    <div className="avatar-list avatar-list-stacked m-0">
                                                        <img
                                                            className="avatar rounded-circle small-avt"
                                                            src="../../../../public/assets/images/xs/avatar2.jpg"
                                                            alt=""
                                                        />
                                                        <img
                                                            className="avatar rounded-circle small-avt"
                                                            src="../../../../public/assets/images/xs/avatar1.jpg"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <span className="badge bg-success text-end mt-2">
                                                                                {task.priority}
                                                                            </span>
                                                </div>
                                            </div>
                                            <p className="py-2 mb-0">
                                                {task.description}
                                            </p>
                                            <div className="tikit-info row g-3 align-items-center">
                                                <div className="col-sm">
                                                    <ul className="d-flex list-unstyled align-items-center flex-wrap">
                                                        <li className="me-2">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-flag"/>
                                                                <span className="ms-1">{task.creationDate.split("T")[0].split("-").reverse().join("-")}</span>
                                                            </div>
                                                        </li>
                                                        <li className="me-2">
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-ui-text-chat"/>
                                                                <span className="ms-1">5</span>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="d-flex align-items-center">
                                                                <i className="icofont-paper-clip"/>
                                                                <span className="ms-1">5</span>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="col-sm text-end">
                                                    <div
                                                        className="small text-truncate light-danger-bg py-1 px-2 rounded-1 d-inline-block fw-bold small">
                                                        {" "}
                                                        Box of Crayons{" "}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>


                                ))}

                            </ol>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}