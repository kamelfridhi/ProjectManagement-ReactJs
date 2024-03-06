import React, {useEffect, useState} from "react";
import * as TaskService from "../../../_services/TaskService.jsx";


export default function AllocatedTaskMembers() {

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


            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-12">
                <div className="card">
                    <div className="card-header py-3">
                        <h6 className="mb-0 fw-bold ">Allocated Task Members</h6>
                    </div>
                    <div className="card-body">
                        <div className="flex-grow-1 mem-list">
                            <div className="py-2 d-flex align-items-center border-bottom">
                                <div className="d-flex ms-2 align-items-center flex-fill">
                                    <img
                                        src="assets/images/xs/avatar6.jpg"
                                        className="avatar lg rounded-circle img-thumbnail"
                                        alt="avatar"
                                    />
                                    <div className="d-flex flex-column ps-2">
                                        <h6 className="fw-bold mb-0">Lucinda Massey</h6>
                                        <span className="small text-muted">
                                                                            Ui/UX Designer
                                                                        </span>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="btn light-danger-bg text-end"
                                    data-bs-toggle="modal"
                                    data-bs-target="#dremovetask"
                                >
                                    Remove
                                </button>
                            </div>
                            <div className="py-2 d-flex align-items-center border-bottom">
                                <div className="d-flex ms-2 align-items-center flex-fill">
                                    <img
                                        src="assets/images/xs/avatar4.jpg"
                                        className="avatar lg rounded-circle img-thumbnail"
                                        alt="avatar"
                                    />
                                    <div className="d-flex flex-column ps-2">
                                        <h6 className="fw-bold mb-0">Ryan Nolan</h6>
                                        <span className="small text-muted">
                                                                            Website Designer
                                                                        </span>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="btn light-danger-bg text-end"
                                    data-bs-toggle="modal"
                                    data-bs-target="#dremovetask"
                                >
                                    Remove
                                </button>
                            </div>
                            <div className="py-2 d-flex align-items-center border-bottom">
                                <div className="d-flex ms-2 align-items-center flex-fill">
                                    <img
                                        src="assets/images/xs/avatar9.jpg"
                                        className="avatar lg rounded-circle img-thumbnail"
                                        alt="avatar"
                                    />
                                    <div className="d-flex flex-column ps-2">
                                        <h6 className="fw-bold mb-0">Oliver Black</h6>
                                        <span className="small text-muted">
                                                                            App Developer
                                                                        </span>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="btn light-danger-bg text-end"
                                    data-bs-toggle="modal"
                                    data-bs-target="#dremovetask"
                                >
                                    Remove
                                </button>
                            </div>
                            <div className="py-2 d-flex align-items-center border-bottom">
                                <div className="d-flex ms-2 align-items-center flex-fill">
                                    <img
                                        src="assets/images/xs/avatar10.jpg"
                                        className="avatar lg rounded-circle img-thumbnail"
                                        alt="avatar"
                                    />
                                    <div className="d-flex flex-column ps-2">
                                        <h6 className="fw-bold mb-0">Adam Walker</h6>
                                        <span className="small text-muted">
                                                                            Quality Checker
                                                                        </span>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="btn light-danger-bg text-end"
                                >
                                    Remove
                                </button>
                            </div>
                            <div className="py-2 d-flex align-items-center border-bottom">
                                <div className="d-flex ms-2 align-items-center flex-fill">
                                    <img
                                        src="assets/images/xs/avatar4.jpg"
                                        className="avatar lg rounded-circle img-thumbnail"
                                        alt="avatar"
                                    />
                                    <div className="d-flex flex-column ps-2">
                                        <h6 className="fw-bold mb-0">Brian Skinner</h6>
                                        <span className="small text-muted">
                                                                            Quality Checker
                                                                        </span>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="btn light-danger-bg text-end"
                                    data-bs-toggle="modal"
                                    data-bs-target="#dremovetask"
                                >
                                    Remove
                                </button>
                            </div>
                            <div className="py-2 d-flex align-items-center border-bottom">
                                <div className="d-flex ms-2 align-items-center flex-fill">
                                    <img
                                        src="assets/images/xs/avatar11.jpg"
                                        className="avatar lg rounded-circle img-thumbnail"
                                        alt="avatar"
                                    />
                                    <div className="d-flex flex-column ps-2">
                                        <h6 className="fw-bold mb-0">Dan Short</h6>
                                        <span className="small text-muted">
                                                                            App Developer
                                                                        </span>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="btn light-danger-bg text-end"
                                    data-bs-toggle="modal"
                                    data-bs-target="#dremovetask"
                                >
                                    Remove
                                </button>
                            </div>
                            <div className="py-2 d-flex align-items-center border-bottom">
                                <div className="d-flex ms-2 align-items-center flex-fill">
                                    <img
                                        src="assets/images/xs/avatar3.jpg"
                                        className="avatar lg rounded-circle img-thumbnail"
                                        alt="avatar"
                                    />
                                    <div className="d-flex flex-column ps-2">
                                        <h6 className="fw-bold mb-0">Jack Glover</h6>
                                        <span className="small text-muted">
                                                                            Ui/UX Designer
                                                                        </span>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="btn light-danger-bg text-end"
                                    data-bs-toggle="modal"
                                    data-bs-target="#dremovetask"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                </div>{" "}
                {/* .card: My Timeline */}
            </div>



        </>
    )
}