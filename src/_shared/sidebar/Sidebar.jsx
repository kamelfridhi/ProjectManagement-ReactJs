import React, {Component, useEffect, useState} from 'react';
import Dashboard from "../../pages/Dashboard/Dashboard.jsx"; // Import Link and withRouter from react-router-dom
import {Link, Outlet, useNavigate} from 'react-router-dom';
import logoImage from '/public/assets/images/logots.png';
import {useDispatch, useSelector} from "react-redux";
import { selectUserObject } from '../../redux/user/userSelector.js';
import { signOut }  from "../../redux/user/userSlice.js";
import {ToastContainer} from "react-toastify";

import * as TeamService from "../../_services/TeamService.jsx";
import {acceptInvitation, getAllnotif, reject} from "../../_services/TeamService.jsx";

import * as UserService from "../../_services/UserService.jsx";
import io from 'socket.io-client';
let socket= io('ws://nestpiteamsphere-production.up.railway.app');



export default function Sidebar() {
    const [notifications, setNotifications] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector(selectUserObject);
    const [imageData, setImageData] = useState(null);
    const [emailPic, setEmailPic] = useState(null);

    const handleSignOut = async () => {
           await UserService.handleSignOut(currentUser._id,dispatch,navigate);

    };
    useEffect(() => {


        fetchNotifications();
    }, [currentUser._id]); // Add currentUser._id to the dependency array
    const fetchNotifications = async () => {
        try {
            const notificationsData = await getAllnotif(currentUser._id);
            console.log('Fetched Notifications:', notificationsData);

            setNotifications(notificationsData);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };
    const handleAcceptClick = async (userId, notificationId) => {
        try {
            await acceptInvitation(userId, notificationId);
             fetchNotifications();
            // Optionally, you can update the notifications state or perform any other actions after accepting the invitation
        } catch (error) {
            console.error('Error accepting team invitation:', error);
            // Optionally, you can display an error message or handle the error in some other way
        }
    };
    const handlerejectClick = async (notificationId) => {
        try {
            await reject(notificationId);
             fetchNotifications();
            // Optionally, you can update the notifications state or perform any other actions after accepting the invitation
        } catch (error) {
            console.error('Error accepting team invitation:', error);
            // Optionally, you can display an error message or handle the error in some other way
        }
    };

    useEffect(() => {
        const fetchImageData = async () => {
            try {
                const response = await fetch(`https://nestpiteamsphere-production.up.railway.app/user/image/${currentUser._id}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch user image');
                }
                if(currentUser.settings.emailPhoto===true){
                    const data = await response.json();
                    setEmailPic(data.userEmailPic);
                }else{
                    const blob = await response.blob();
                    const reader = new FileReader();
                    reader.onload = () => {
                        setImageData(reader.result);
                    };
                    reader.readAsDataURL(blob);
                }

            } catch (error) {
                console.error('Error fetching user image:', error);
            }
        };

        fetchImageData();
    });
    useEffect(() => {
        socket.on('connect',(data)=>{
            socket.emit('Connect',{
                id: currentUser._id,
                socketid:null,
                name: currentUser.firstName,
                statusAccount: currentUser.settings.statusAccount,
                verified: currentUser.settings.verifiedAccount
            })
        })
        socket.on('userAccepted',(data)=>{
            console.log('socket data accept ',data)
        })
        socket.on('userRejected',(data)=>{
            console.log('socket data reject ',data)
        })
    }, []);



    return (


        <div>
            <ToastContainer />


            <div id="mytask-layout">
                {/* sidebar */}
                <div className="sidebar px-4 py-4 py-md-5 me-0" style={{backgroundColor: '#4c3575'}}>
                    <div className="d-flex flex-column h-100">
                        <a href="index.html" className="mb-0 brand-icon">
        <span className="logo-icon">
            <img src= {logoImage}  style={{width: '50px', height: '50px', marginLeft: '5px'}} />
          <svg
              width={35}
              height={35}
              fill="currentColor"
              className="bi bi-clipboard-check"
              viewBox="0 0 16 16"
          >

                                </svg>
                            </span>
                            <span className="logo-text">My-Task</span>
                        </a>
                        {/* Menu: main ul */}
                        <ul className="menu-list flex-grow-1 mt-3">
                            <li className="collapsed">
                                <a
                                    className="m-link active"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#dashboard-Components"
                                    href="#"
                                >
                                    <i className="icofont-home fs-5" /> <span>Dashboard</span>{" "}
                                    <span className="arrow icofont-dotted-down ms-auto text-end fs-5" />
                                </a>
                                {/* Menu: Sub menu ul */}
                                <ul className="sub-menu collapse show" id="dashboard-Components">
                                    <li>
                                        <Link className="ms-link" to="/Home/dashboard">
                                            <span>Dashboard</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="collapsed">
                                <a
                                    className="m-link"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#project-Components"
                                    href="#"
                                >
                                    <i className="icofont-briefcase" />
                                    <span>Projects</span>{" "}
                                    <span className="arrow icofont-dotted-down ms-auto text-end fs-5" />
                                </a>
                                {/* Menu: Sub menu ul */}
                                <ul className="sub-menu collapse" id="project-Components">
                                    <li>
                                        <Link className="ms-link" to="/Home/project">
                                            <span>Projects</span>
                                        </Link>
                                    </li>
                                    { /* <li>
                                        <Link className="ms-link" to="/Home/task">
                                            <span>Tasks</span>
                                        </Link>
                                    </li>*/}

                                </ul>
                            </li>
                            <li className="collapsed">
                                <a
                                    className="m-link"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#tikit-Components"
                                    href="#"
                                >
                                    <i className="icofont-ticket" /> <span>Tickets</span>{" "}
                                    <span className="arrow icofont-dotted-down ms-auto text-end fs-5" />
                                </a>
                                {/* Menu: Sub menu ul */}
                                <ul className="sub-menu collapse" id="tikit-Components">
                                    <li>
                                        <Link className="ms-link" to="/Home/ticket">
                                            {" "}
                                            <span>Tickets View</span>
                                        </Link>
                                    </li>

                                </ul>
                            </li>
                             <li className="collapsed">
                                <a
                                    className="m-link"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#emp-Components"
                                    href="#"
                                >
                                    <i className="icofont-users-alt-5" /> <span>Teams</span>{" "}
                                    <span className="arrow icofont-dotted-down ms-auto text-end fs-5" />
                                </a>
                                {/* Menu: Sub menu ul */}
                                <ul className="sub-menu collapse" id="emp-Components">
                                    {currentUser.role.role === 'admin' ? (
                                        <li>
                                            <Link className="ms-link" to="our-teams">
                                                <span>Teams</span>
                                            </Link>
                                        </li>
                                    ) : (
                                        <li>
                                            <Link className="ms-link" to="userteams">
                                                <span>MyTeams</span>
                                            </Link>
                                        </li>
                                    )}
                                </ul>

                            </li>
                        </ul>
                        {/* Menu: menu collepce btn */}
                        <button
                            type="button"
                            className="btn btn-link sidebar-mini-btn text-light"
                        >
                            <span className="ms-2">
                                <i className="icofont-bubble-right" />
                            </span>
                        </button>
                    </div>
                </div>
                {/* main body area */}
                <div className="main px-lg-4 px-md-4">
                    {/* Body: Sidebar */}
                    <div className="header">
                        <nav className="navbar py-4">
                            <div className="container-xxl">
                                {/* header rightbar icon */}
                                <div className="h-right d-flex align-items-center mr-5 mr-lg-0 order-1">

                                    <div className="dropdown notifications">
                                        <a
                                            className="nav-link dropdown-toggle pulse"
                                            href="#"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                        >
                                            <i className="icofont-alarm fs-5" />
                                            <span className="pulse-ring" />
                                        </a>
                                        <div
                                            id="NotificationsDiv"
                                            className="dropdown-menu rounded-lg shadow border-0 dropdown-animation dropdown-menu-sm-end p-0 m-0"
                                        >
                                            <div className="card border-0 w380">
                                                <div className="card-header border-0 p-3">
                                                    <h5 className="mb-0 font-weight-light d-flex justify-content-between">
                                                        <span>Notifications</span>
                                                        <span className="badge text-white">11</span>
                                                    </h5>
                                                </div>
                                                <div className="tab-content card-body">
                                                    <div className="tab-pane fade show active">
                                                        <ul className="list-unstyled list mb-0">

                                                            {notifications.map(notification => (
                                                                <li key={notification._id} className="py-2 mb-1 border-bottom">
                                                                    <div className="d-flex align-items-center">
                                                                        <img
                                                                            className="avatar rounded-circle"
                                                                            src="/assets/images/xs/avatar1.jpg"
                                                                            alt=""
                                                                        />
                                                                        <div className="flex-fill ms-2">

                                                                            <span className="">
                                                                            {notification.message}
                                                                                <span className="badge bg-success">Review</span>
                </span>
                                                                        </div>
                                                                        <div className="ms-auto">
                                                                            <button className="btn btn-success me-2" onClick={() => handleAcceptClick(currentUser._id, notification._id)}>Accept</button>
                                                                            <button className="btn btn-danger" onClick={() => handlerejectClick(notification._id)}>Reject</button>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        
                                                        </ul>
                                                    </div>
                                                </div>
                                                <a className="card-footer text-center border-top-0" href="#">
                                                    {" "}
                                                    View all notifications
                                                </a>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="dropdown user-profile ml-2 ml-sm-3 d-flex align-items-center">
                                        <div className="u-info me-2">
                                            <p className="mb-0 text-end line-height-sm ">
                                                <span className="font-weight-bold">{currentUser ? currentUser.email : null}</span>
                                            </p>
                                            <small>{currentUser.role.role} Profile
                                            </small>

                                        </div>
                                        <a
                                            className="nav-link dropdown-toggle pulse p-0"
                                            href="#"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            data-bs-display="static"
                                        >
                                            <div>
                                                { emailPic ?  (
                                                    <img className="rounded-5" width={100} height={100} src={emailPic}
                                                         alt="User"/>
                                                ) : (
                                                    <img className="rounded-5" width={100} height={100}
                                                         src={imageData}
                                                         alt="User"/>
                                                )}
                                            </div>

                                        </a>
                                        <div
                                            className="dropdown-menu rounded-lg shadow border-0 dropdown-animation dropdown-menu-end p-0 m-0">
                                            <div className="card border-0 w280">
                                                <div className="card-body pb-0">
                                                    <div className="d-flex py-1">
                                                        <img
                                                            className="avatar rounded-circle"
                                                            src="/assets/images/profile_av.png"
                                                            alt="profile"
                                                        />
                                                        <div className="flex-fill ms-3">
                                                            <p className="mb-0">
                                                                <span className="font-weight-bold">Dylan Hunter</span>
                                                            </p>
                                                            <small className="">Dylan.hunter@gmail.com</small>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <hr className="dropdown-divider border-dark" />
                                                    </div>
                                                </div>
                                                <div className="list-group m-2 ">
                                                    <Link
                                                        to="profile"
                                                        className="list-group-item list-group-item-action border-0 "
                                                    >
                                                        <i className="icofont-tasks fs-5 me-3"/>
                                                        My Profile
                                                    </Link>

                                                    <a
                                                        href="task.html"
                                                        className="list-group-item list-group-item-action border-0 "
                                                    >
                                                        <i className="icofont-tasks fs-5 me-3"/>
                                                        My Task
                                                    </a>
                                                    <a
                                                        href="members.html"
                                                        className="list-group-item list-group-item-action border-0 "
                                                    >
                                                        <i className="icofont-ui-user-group fs-6 me-3"/>
                                                        members
                                                    </a>
                                                    <button
                                                        onClick={handleSignOut}

                                                        className="list-group-item list-group-item-action border-0 "
                                                    >
                                                        <i className="icofont-logout fs-6 me-3"/>
                                                        Signout
                                                    </button>
                                                    <div>
                                                        <hr className="dropdown-divider border-dark"/>
                                                    </div>

                                                    <a
                                                        href="ui-elements/auth-signup.html"
                                                        className="list-group-item list-group-item-action border-0 "
                                                    >
                                                        <i className="icofont-contact-add fs-5 me-3" />
                                                        Add personal account
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-md-1">
                                        <a
                                            href="#offcanvas_setting"
                                            data-bs-toggle="offcanvas"
                                            aria-expanded="false"
                                            title="template setting"
                                        >
                                            <svg
                                                className="svg-stroke"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={22}
                                                height={22}
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                                                <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                                {/* menu toggler */}
                                <button
                                    className="navbar-toggler p-0 border-0 menu-toggle order-3"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#mainHeader"
                                >
                                    <span className="fa fa-bars" />
                                </button>
                                {/* main menu Search*/}
                                <div className="order-0 col-lg-4 col-md-4 col-sm-12 col-12 mb-3 mb-md-0 ">
                                    <div className="input-group flex-nowrap input-group-lg">


                                        <button
                                            type="button"
                                            className="input-group-text add-member-top"
                                            id="addon-wrappingone"
                                            data-bs-toggle="modal"
                                            data-bs-target="#addUser"
                                        >
                                            <i className="fa fa-plus" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                    {/* Body: Body */}
                    <div className="body d-flex py-3">
                        <div className="container-xxl">
                            <div>

                                <Outlet />

                            </div>
                        </div>
                    </div>

                </div>
            </div>



        </div>
    );
}