import { useEffect, useState } from "react";
import * as UserService from "../../../_services/UserService.jsx";
import UserCard from "../userCard.jsx";
import LineOfTable from "./lineOfTable.jsx";

export default function UsersTable({ etat }) {
    const [users, setUsers] = useState([])
    const [blockedUsers, setBlockedUsers] = useState([])
    const fetchUsers = async () => {
        //setBlockedUsers(await UserService.getBlockedUsers());
        setUsers(await UserService.getUsersWithEtat(etat));
    };
    useEffect(() => {

        fetchUsers()
    }, []);

    return (<>
        {/* main body area */}
        <div className=" px-lg-4 px-md-4">
            {/* Body: Body */}
            <div className="body d-flex py-lg-3 py-md-2">
                <div className="container-xxl">
                    <div className="row align-items-center">
                        <div className="border-0 mb-4">
                            <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                                {
                                    etat == 1 && <h3 className="fw-bold mb-0">accepted users</h3>
                                }
                                {
                                    etat == 0 && <h3 className="fw-bold mb-0">new users</h3>
                                }

                                {
                                    etat == -1 && <h3 className="fw-bold mb-0">declined/blocked users</h3>
                                }


                                <div className="col-auto d-flex w-sm-100">
                                    <button
                                        type="button"
                                        className="btn btn-dark btn-set-task w-sm-100"
                                        data-bs-toggle="modal"
                                        data-bs-target="#tickadd"
                                    >
                                        <i className="icofont-plus-circle me-2 fs-6" />
                                        Add Tickets
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
                                                <th>Email</th>
                                                <th>Name</th>
                                                <th>Date</th>
                                                <th>Role</th>
                                                <th>Status</th>
                                                {etat != -1 && <th>Actions</th>}

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                users.length > 0 ? (
                                                    users.map(user => <LineOfTable key={user.id} user={user} etat={etat} />)
                                                ) : (
                                                    <p>No users found</p>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Row End */}
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
                                                    src="assets/images/xs/avatar2.jpg"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="flex-fill ms-3 text-truncate">
                                                <h6 className="mb-0  fw-bold">Rachel Carr(you)</h6>
                                                <span className="text-muted">rachel.carr@gmail.com</span>
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
                                                    src="assets/images/xs/avatar3.jpg"
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
                                                <span className="text-muted">lucas.baker@gmail.com</span>
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
                                                    src="assets/images/xs/avatar8.jpg"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="flex-fill ms-3 text-truncate">
                                                <h6 className="mb-0  fw-bold">Una Coleman</h6>
                                                <span className="text-muted">una.coleman@gmail.com</span>
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
            {/* Add Tickit*/}
            <div className="modal fade" id="tickadd" tabIndex={-1} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title  fw-bold" id="leaveaddLabel">
                                {" "}
                                Tickit Add
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="sub" className="form-label">
                                    Subject
                                </label>
                                <input type="text" className="form-control" id="sub" />
                            </div>
                            <div className="deadline-form">
                                <form>
                                    <div className="row g-3 mb-3">
                                        <div className="col">
                                            <label htmlFor="depone" className="form-label">
                                                Assign Name
                                            </label>
                                            <input type="text" className="form-control" id="depone" />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="deptwo" className="form-label">
                                                Creted Date
                                            </label>
                                            <input type="date" className="form-control" id="deptwo" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Status</label>
                                <select className="form-select">
                                    <option selected="">In Progress</option>
                                    <option value={1}>Completed</option>
                                    <option value={2}>Wating</option>
                                    <option value={3}>Decline</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Done
                            </button>
                            <button type="submit" className="btn btn-primary">
                                sent
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Edit Tickit*/}
            <div
                className="modal fade"
                id="edittickit"
                tabIndex={-1}
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title  fw-bold" id="edittickitLabel">
                                {" "}
                                Tickit Edit
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="sub1" className="form-label">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="sub1"
                                    defaultValue="punching time not proper"
                                />
                            </div>
                            <div className="deadline-form">
                                <form>
                                    <div className="row g-3 mb-3">
                                        <div className="col">
                                            <label htmlFor="depone11" className="form-label">
                                                Assign Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="depone11"
                                                defaultValue="Victor Rampling"
                                            />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="deptwo56" className="form-label">
                                                Creted Date
                                            </label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="deptwo56"
                                                defaultValue="2021-02-25"
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Status</label>
                                <select className="form-select">
                                    <option selected="">Completed</option>
                                    <option value={1}>In Progress</option>
                                    <option value={2}>Wating</option>
                                    <option value={3}>Decline</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Done
                            </button>
                            <button type="submit" className="btn btn-primary">
                                sent
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}