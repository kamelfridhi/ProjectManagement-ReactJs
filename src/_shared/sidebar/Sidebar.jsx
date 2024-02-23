import React, {Component} from "react";
import {Outlet} from "react-router-dom";


class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar px-4 py-4 py-md-5 me-0" style={{ backgroundColor: '#4c3575' }}>
                <div className="d-flex flex-column h-100">
                    <a href="index.html" className="mb-0 brand-icon">
                                <span className="logo-icon">
                                    <svg
                                        width={35}
                                        height={35}
                                        fill="currentColor"
                                        className="bi bi-clipboard-check"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                                        />
                                        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                                        <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
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
                                    <a className="ms-link active" href="index.html">
                                        {" "}
                                        <span>Hr Dashboard</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="ms-link" href="project-dashboard.html">
                                        {" "}
                                        <span>Project Dashboard</span>
                                    </a>
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
                                    <a className="ms-link" href="projects.html">
                                        <span>Projects</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="ms-link" href="/Task/task">

                                        <span>Tasks</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="ms-link" href="timesheet.html">
                                        <span>Timesheet</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="ms-link" href="team-leader.html">
                                        <span>Leaders</span>
                                    </a>
                                </li>
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
                                    <a className="ms-link" href="tickets.html">
                                        {" "}
                                        <span>Tickets View</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="ms-link" href="ticket-detail.html">
                                        {" "}
                                        <span>Ticket Detail</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="collapsed">
                            <a
                                className="m-link"
                                data-bs-toggle="collapse"
                                data-bs-target="#client-Components"
                                href="#"
                            >
                                <i className="icofont-user-male" /> <span>Our Clients</span>{" "}
                                <span className="arrow icofont-dotted-down ms-auto text-end fs-5" />
                            </a>
                            {/* Menu: Sub menu ul */}
                            <ul className="sub-menu collapse" id="client-Components">
                                <li>
                                    <a className="ms-link" href="ourclients.html">
                                        {" "}
                                        <span>Clients</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="ms-link" href="profile.html">
                                        {" "}
                                        <span>Client Profile</span>
                                    </a>
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
                                <i className="icofont-users-alt-5" /> <span>Employees</span>{" "}
                                <span className="arrow icofont-dotted-down ms-auto text-end fs-5" />
                            </a>
                            {/* Menu: Sub menu ul */}
                            <ul className="sub-menu collapse" id="emp-Components">
                                <li>
                                    <a className="ms-link" href="members.html">
                                        {" "}
                                        <span>Members</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="ms-link" href="employee-profile.html">
                                        {" "}
                                        <span>Members Profile</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="ms-link" href="holidays.html">
                                        {" "}
                                        <span>Holidays</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="ms-link" href="attendance-employees.html">
                                        {" "}
                                        <span>Attendance Employees</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="ms-link" href="attendance.html">
                                        {" "}
                                        <span>Attendance</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="ms-link" href="leave-request.html">
                                        {" "}
                                        <span>Leave Request</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="ms-link" href="department.html">
                                        {" "}
                                        <span>Department</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="ms-link" href="loan.html">
                                        {" "}
                                        <span>Loan</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="collapsed">
                            <a
                                className="m-link"
                                data-bs-toggle="collapse"
                                data-bs-target="#menu-Componentsone"
                                href="#"
                            >
                                <i className="icofont-ui-calculator" /> <span>Accounts</span>{" "}
                                <span className="arrow icofont-dotted-down ms-auto text-end fs-5" />
                            </a>
                            {/* Menu: Sub menu ul */}
                            <ul className="sub-menu collapse" id="menu-Componentsone">
                                <li>
                                    <a className="ms-link" href="invoices.html">
                                        <span>Invoices</span>{" "}
                                    </a>
                                </li>
                                <li>
                                    <a className="ms-link" href="payments.html">
                                        <span>Payments</span>{" "}
                                    </a>
                                </li>
                                <li>
                                    <a className="ms-link" href="expenses.html">
                                        <span>Expenses</span>{" "}
                                    </a>
                                </li>
                                <li>
                                    <a className="ms-link" href="create-invoice.html">
                                        <span>Create Invoice</span>{" "}
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="collapsed">
                            <a
                                className="m-link"
                                data-bs-toggle="collapse"
                                data-bs-target="#payroll-Components"
                                href="#"
                            >
                                <i className="icofont-users-alt-5" /> <span>Payroll</span>{" "}
                                <span className="arrow icofont-dotted-down ms-auto text-end fs-5" />
                            </a>
                            {/* Menu: Sub menu ul */}
                            <ul className="sub-menu collapse" id="payroll-Components">
                                <li>
                                    <a className="ms-link" href="salaryslip.html">
                                        <span>Employee Salary</span>{" "}
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="collapsed">
                            <a
                                className="m-link"
                                data-bs-toggle="collapse"
                                data-bs-target="#app-Components"
                                href="#"
                            >
                                <i className="icofont-contrast" /> <span>App</span>{" "}
                                <span className="arrow icofont-dotted-down ms-auto text-end fs-5" />
                            </a>
                            {/* Menu: Sub menu ul */}
                            <ul className="sub-menu collapse" id="app-Components">
                                <li>
                                    <a className="ms-link" href="calendar.html">
                                        {" "}
                                        <span>Calander</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="ms-link" href="chat.html">
                                        <span>Chat App</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="collapsed">
                            <a
                                className="m-link"
                                data-bs-toggle="collapse"
                                data-bs-target="#extra-Components"
                                href="#"
                            >
                                <i className="icofont-code-alt" /> <span>Other Pages</span>{" "}
                                <span className="arrow icofont-dotted-down ms-auto text-end fs-5" />
                            </a>
                            {/* Menu: Sub menu ul */}
                            <ul className="sub-menu collapse" id="extra-Components">
                                <li>
                                    <a className="ms-link" href="charts.html">
                                        {" "}
                                        <span>Apex Charts</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="ms-link" href="forms.html">
                                        <span>Forms Example</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="ms-link" href="table.html">
                                        {" "}
                                        <span>Table Example</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="ms-link" href="review.html">
                                        <span>Reviews Page</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="ms-link" href="icon.html">
                                        <span>Icons</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="ms-link" href="contact.html">
                                        <span>Contact</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="ms-link" href="widgets.html">
                                        <span>Widgets</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="ms-link" href="todo-list.html">
                                        <span>Todo-List</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a className="m-link" href="ui-elements/ui-alerts.html">
                                <i className="icofont-paint" /> <span>UI Components</span>
                            </a>
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


        );
    }}

export default Sidebar;