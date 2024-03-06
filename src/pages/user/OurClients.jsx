import { useEffect, useState } from "react";
import UserCard from "../user/userCard"
import * as UserService from "./../../_services/UserService";

export default function OurClients() {
    const [users, setUsers] = useState([])
    const fetchUsers = async () => {
        setUsers(await UserService.getAllUsers());
    };
    useEffect(() => {

        fetchUsers();
    }, []);

    return (
        <>
            {/* main body area */}
            <div className="main px-lg-4 px-md-4">
                {/* Body: Body */}
                <div className="body d-flex py-lg-3 py-md-2">
                    <div className="container-xxl">
                        <div className="row clearfix">
                            <div className="col-md-12">
                                <div className="card border-0 mb-4 no-bg">
                                    <div className="card-header py-3 px-0 d-flex align-items-center  justify-content-between border-bottom">
                                        <h3 className=" fw-bold flex-fill mb-0">Clients</h3>
                                        <div className="col-auto d-flex">
                                            <div className="dropdown ">
                                                <button
                                                    className="btn btn-primary dropdown-toggle  "
                                                    type="button"
                                                    id="dropdownMenuButton2"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    Status
                                                </button>
                                                <ul
                                                    className="dropdown-menu  dropdown-menu-end"
                                                    aria-labelledby="dropdownMenuButton2"
                                                >
                                                    <li>
                                                        <a className="dropdown-item" href="#">
                                                            Company
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item" href="#">
                                                            AgilSoft Tech
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item" href="#">
                                                            Macrosoft
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item" href="#">
                                                            Google
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item" href="#">
                                                            Pixelwibes
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item" href="#">
                                                            Deltasoft Tech
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item" href="#">
                                                            Design Tech
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <button
                                                type="button"
                                                className="btn btn-dark ms-1 "
                                                data-bs-toggle="modal"
                                                data-bs-target="#createproject"
                                            >
                                                <i className="icofont-plus-circle me-2 fs-6" />
                                                Add Client
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Row End */}
                        <div className="row g-3 row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2 row-cols-xxl-2 row-deck py-1 pb-4">

                            {
                                users.length > 0 ? (
                                    users.map(user => <UserCard key={user.id} user={user} fetchUsers={fetchUsers} />)
                                ) : (
                                    <p>No users found</p>
                                )
                            }

                        </div>
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
                                            <div className="d-flex align-items-center flex-column flex-sm-column flex-md-row">
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
                                            <div className="d-flex align-items-center flex-column flex-sm-column flex-md-row">
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
                                                                    Member
                                                                    <span>
                                                                        Can view, edit, delete, comment on and save
                                                                        files
                                                                    </span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a className="dropdown-item" href="#">
                                                                    <i className="fs-6 p-2 me-1" />
                                                                    Admin
                                                                    <span>
                                                                        Member, but can invite and manage team members
                                                                    </span>
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
                                            <div className="d-flex align-items-center flex-column flex-sm-column flex-md-row">
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
                                                                    Member
                                                                    <span>
                                                                        Can view, edit, delete, comment on and save
                                                                        files
                                                                    </span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a className="dropdown-item" href="#">
                                                                    <i className="fs-6 p-2 me-1" />
                                                                    Admin
                                                                    <span>
                                                                        Member, but can invite and manage team members
                                                                    </span>
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
                {/* Create Client*/}
                <div
                    className="modal fade"
                    id="createproject"
                    tabIndex={-1}
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title  fw-bold" id="createprojectlLabel">
                                    {" "}
                                    Add Client
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
                                    <label
                                        htmlFor="exampleFormControlInput877"
                                        className="form-label"
                                    >
                                        Client Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="exampleFormControlInput877"
                                        placeholder="Explain what the Project Name"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="exampleFormControlInput977"
                                        className="form-label"
                                    >
                                        Company Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="exampleFormControlInput977"
                                        placeholder="Explain what the Project Name"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="formFileMultipleoneone" className="form-label">
                                        Profile Image
                                    </label>
                                    <input
                                        className="form-control"
                                        type="file"
                                        id="formFileMultipleoneone"
                                    />
                                </div>
                                <div className="deadline-form">
                                    <form>
                                        <div className="row g-3 mb-3">
                                            <div className="col">
                                                <label
                                                    htmlFor="exampleFormControlInput177"
                                                    className="form-label"
                                                >
                                                    User Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="exampleFormControlInput177"
                                                    placeholder="User Name"
                                                />
                                            </div>
                                            <div className="col">
                                                <label
                                                    htmlFor="exampleFormControlInput277"
                                                    className="form-label"
                                                >
                                                    Password
                                                </label>
                                                <input
                                                    type="Password"
                                                    className="form-control"
                                                    id="exampleFormControlInput277"
                                                    placeholder="Password"
                                                />
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col">
                                                <label
                                                    htmlFor="exampleFormControlInput477"
                                                    className="form-label"
                                                >
                                                    Email ID
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="exampleFormControlInput477"
                                                    placeholder="User Name"
                                                />
                                            </div>
                                            <div className="col">
                                                <label
                                                    htmlFor="exampleFormControlInput777"
                                                    className="form-label"
                                                >
                                                    Phone
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="exampleFormControlInput777"
                                                    placeholder="User Name"
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="exampleFormControlTextarea78"
                                        className="form-label"
                                    >
                                        Description (optional)
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="exampleFormControlTextarea78"
                                        rows={3}
                                        placeholder="Add any extra details about the request"
                                        defaultValue={""}
                                    />
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-striped custom-table">
                                        <thead>
                                            <tr>
                                                <th>Project Permission</th>
                                                <th className="text-center">Read</th>
                                                <th className="text-center">Write</th>
                                                <th className="text-center">Create</th>
                                                <th className="text-center">Delete</th>
                                                <th className="text-center">Import</th>
                                                <th className="text-center">Export</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="fw-bold">Projects</td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault1"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault2"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault3"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault4"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault5"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault6"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="fw-bold">Tasks</td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault7"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault8"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault9"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault10"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault11"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault12"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="fw-bold">Chat</td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault13"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault14"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault15"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault16"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault17"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault18"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="fw-bold">Estimates</td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault19"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault20"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault21"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault22"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault23"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault24"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="fw-bold">Invoices</td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault25"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault26"
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault27"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault28"
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault29"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault30"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="fw-bold">Timing Sheets</td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault31"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault32"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault33"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault34"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault35"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault36"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
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
                                <button type="button" className="btn btn-primary">
                                    Create
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Edit Client*/}
                <div
                    className="modal fade"
                    id="editproject"
                    tabIndex={-1}
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title  fw-bold" id="createprojectlLabelone">
                                    {" "}
                                    Edit Client
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
                                    <label
                                        htmlFor="exampleFormControlInput8777"
                                        className="form-label"
                                    >
                                        Client Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="exampleFormControlInput8777"
                                        defaultValue="Ryan Ogden"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="exampleFormControlInput9777"
                                        className="form-label"
                                    >
                                        Company Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="exampleFormControlInput9777"
                                        defaultValue="AgilSoft Tech"
                                    />
                                </div>
                                <div className="deadline-form">
                                    <form>
                                        <div className="row g-3 mb-3">
                                            <div className="col">
                                                <label
                                                    htmlFor="exampleFormControlInput1777"
                                                    className="form-label"
                                                >
                                                    User Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="exampleFormControlInput1777"
                                                    defaultValue="User123"
                                                />
                                            </div>
                                            <div className="col">
                                                <label
                                                    htmlFor="exampleFormControlInput2777"
                                                    className="form-label"
                                                >
                                                    Password
                                                </label>
                                                <input
                                                    type="Password"
                                                    className="form-control"
                                                    id="exampleFormControlInput2777"
                                                    defaultValue="********"
                                                />
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col">
                                                <label
                                                    htmlFor="exampleFormControlInput4777"
                                                    className="form-label"
                                                >
                                                    Email ID
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="exampleFormControlInput4777"
                                                    placeholder="ryanogden@gmail.com"
                                                />
                                            </div>
                                            <div className="col">
                                                <label
                                                    htmlFor="exampleFormControlInput7777"
                                                    className="form-label"
                                                >
                                                    Phone
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="exampleFormControlInput7777"
                                                    defaultValue="202-555-0174"
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="exampleFormControlTextarea787"
                                        className="form-label"
                                    >
                                        Description (optional)
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="exampleFormControlTextarea787"
                                        rows={3}
                                        defaultValue={
                                            "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices"
                                        }
                                    />
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-striped custom-table">
                                        <thead>
                                            <tr>
                                                <th>Project Permission</th>
                                                <th className="text-center">Read</th>
                                                <th className="text-center">Write</th>
                                                <th className="text-center">Create</th>
                                                <th className="text-center">Delete</th>
                                                <th className="text-center">Import</th>
                                                <th className="text-center">Export</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="fw-bold">Projects</td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault117"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault127"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault37"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault47"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault57"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault67"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="fw-bold">Tasks</td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault77"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault87"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault97"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault107"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault1179"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault1279"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="fw-bold">Chat</td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault137"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault147"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault157"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault167"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault177"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault187"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="fw-bold">Estimates</td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault197"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault207"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault217"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault227"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault237"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault247"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="fw-bold">Invoices</td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault257"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault267"
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault277"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault287"
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault297"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault307"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="fw-bold">Timing Sheets</td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault317"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault327"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault337"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault347"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault357"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault367"
                                                        defaultChecked=""
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
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
                                <button type="button" className="btn btn-primary">
                                    Create
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Modal  Delete Folder/ File*/}
                <div
                    className="modal fade"
                    id="deleteproject"
                    tabIndex={-1}
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title  fw-bold" id="deleteprojectLabel">
                                    {" "}
                                    Delete item Permanently?
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                />
                            </div>
                            <div className="modal-body justify-content-center flex-column d-flex">
                                <i className="icofont-ui-delete text-danger display-2 text-center mt-2" />
                                <p className="mt-4 fs-5 text-center">
                                    You can only delete this item Permanently
                                </p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-danger color-fff">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}