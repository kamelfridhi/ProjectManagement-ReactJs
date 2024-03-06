import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import * as TeamService from "../../_services/TeamService.jsx";
import {removeMember} from "../../_services/TeamService.jsx";

export default function TeamMembers() {
    const { id } = useParams();
    const [team, setTeam] = useState({});
    const [usersInfo, setUsersInfo] = useState([]);

    useEffect(() => {
        // Fetch team and user information when the component mounts
        getData();
    }, [id]);

    const getData = async () => {
        try {
            const fetchedTeam = await TeamService.getOneTeam(id);
             setTeam(fetchedTeam);
            if (fetchedTeam.users && fetchedTeam.users.length > 0) {
                fetchUsersInfo(fetchedTeam.users);
            }
        } catch (error) {
            console.error("Error fetching team details:", error);
        }
    };

    const fetchUsersInfo = async (userIds) => {
        try {
            const usersDetails = await Promise.all(
                userIds.map((userId) => TeamService.getOneUser(userId))
            );
            setUsersInfo(usersDetails); // Update usersInfo state
            console.log("Teams:", team); // Log fetched user details

        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    const kickMember = async (teamId, userId) => {
        try {
            await removeMember(teamId, userId);
             await getData(); // Fetch updated team data
            console.log("Teams:", team); // Log fetched user details

        } catch (error) {
            console.error("Error kicking member:", error);
            // Handle error if needed
        }
    };


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
                                    <div className="card-header py-3 px-0 d-sm-flex align-items-center  justify-content-between border-bottom">
                                        <h3 className=" fw-bold flex-fill mb-0 mt-sm-0">members</h3>
                                        <button
                                            type="button"
                                            className="btn btn-dark me-1 mt-1 w-sm-100"
                                            data-bs-toggle="modal"
                                            data-bs-target="#createemp"
                                        >
                                            <i className="icofont-plus-circle me-2 fs-6" />
                                            Add Employee
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Row End */}
                        <div className="row g-3 row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2 row-cols-xxl-2 row-deck py-1 pb-4">
                             {team.users && team.users.length > 0 && usersInfo.length > 0 && usersInfo.map((user, index) => (
                                <div className="col" key={index}>
                                    <div className="card teacher-card">
                                        <div className="card-body d-flex">
                                            <div className="profile-av pe-xl-4 pe-md-2 pe-sm-4 pe-4 text-center w220">
                                                <img
                                                    src="/assets/images/lg/avatar3.jpg"
                                                    alt=""
                                                    className="avatar xl rounded-circle img-thumbnail shadow-sm"
                                                />
                                                <div className="about-info d-flex align-items-center mt-3 justify-content-center">
                                                    <div className="followers me-2">
                                                        <i className="icofont-tasks color-careys-pink fs-4" />
                                                        <span className="">04</span>
                                                    </div>
                                                    <div className="star me-2">
                                                        <i className="icofont-star text-warning fs-4" />
                                                        <span className="">4.5</span>
                                                    </div>
                                                    <div className="own-video">
                                                        <i className="icofont-data color-light-orange fs-4" />
                                                        <span className="">04</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="teacher-info border-start ps-xl-4 ps-md-3 ps-sm-4 ps-4 w-100">
                                                <h6 className="mb-0 mt-2 fw-bold d-block fs-6">
                                                    {user.username}
                                                </h6>
                                                <span className="light-info-bg py-1 px-2 rounded-1 d-inline-block fw-bold small-11 mb-0 mt-1">
                            {user.role}
                        </span>
                                                <div className="video-setting-icon mt-3 pt-3 border-top">
                                                    <p>
                                                        {user.email}
                                                    </p>
                                                </div>
                                                <div className="button-container mt-3">
                                                    <button className="btn btn-danger btn-sm" onClick={() => kickMember(team._id, user._id)}>
                                                        Remove
                                                    </button>
                                                </div>
                                                <a href="task.html" className="btn btn-dark btn-sm mt-1">
                                                    <i className="icofont-plus-circle me-2 fs-6" />
                                                    Add Task
                                                </a>
                                                <a href="employee-profile.html" className="btn btn-dark btn-sm mt-1">
                                                    <i className="icofont-invisible me-2 fs-6" />
                                                    Profile
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
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
                {/* Create Employee*/}
                <div className="modal fade" id="createemp" tabIndex={-1} aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title  fw-bold" id="createprojectlLabel">
                                    {" "}
                                    Add Employee
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
                                        Employee Name
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
                                        Employee Company
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
                                        Employee Profile
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
                                            <div className="col-sm-6">
                                                <label
                                                    htmlFor="exampleFormControlInput1778"
                                                    className="form-label"
                                                >
                                                    Employee ID
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="exampleFormControlInput1778"
                                                    placeholder="User Name"
                                                />
                                            </div>
                                            <div className="col-sm-6">
                                                <label
                                                    htmlFor="exampleFormControlInput2778"
                                                    className="form-label"
                                                >
                                                    Joining Date
                                                </label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    id="exampleFormControlInput2778"
                                                />
                                            </div>
                                        </div>
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
                                        <div className="row g-3 mb-3">
                                            <div className="col">
                                                <label className="form-label">Department</label>
                                                <select
                                                    className="form-select"
                                                    aria-label="Default select Project Category"
                                                >
                                                    <option selected="">Web Development</option>
                                                    <option value={1}>It Management</option>
                                                    <option value={2}>Marketing</option>
                                                </select>
                                            </div>
                                            <div className="col">
                                                <label className="form-label">Designation</label>
                                                <select
                                                    className="form-select"
                                                    aria-label="Default select Project Category"
                                                >
                                                    <option selected="">UI/UX Design</option>
                                                    <option value={1}>Website Design</option>
                                                    <option value={2}>App Development</option>
                                                    <option value={3}>Quality Assurance</option>
                                                    <option value={4}>Development</option>
                                                    <option value={5}>Backend Development</option>
                                                    <option value={6}>Software Testing</option>
                                                    <option value={7}>Website Design</option>
                                                    <option value={8}>Marketing</option>
                                                    <option value={9}>SEO</option>
                                                    <option value={10}>Other</option>
                                                </select>
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
            </div>
        </>


    )
}