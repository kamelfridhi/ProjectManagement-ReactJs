import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from "../_shared/sidebar/Sidebar.jsx";
import Task from "../pages/task/Task.jsx";
import Login from "../pages/Login/Login.jsx";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";
import ProjectDashboard from "../pages/Dashboard/ProjectDashboard.jsx";
import Project from "../pages/projects/Projects.jsx";
import TeamLeader from "../pages/team/TeamLeader.jsx";
import Ticket from "../pages/Tickets/Ticket.jsx";
import TicketDetails from "../pages/Tickets/TicketDetails.jsx";
import OurClients from "../pages/user/OurClients.jsx";
import Teams from "../pages/team/Teams.jsx";
import TeamMembers from "../pages/team/TeamMembers.jsx";
import Signup from "../pages/user/Signup.jsx";
import { PrivateRoute, DontLogin } from "../_shared/protectRoutes.jsx";
import UserProfile from "../pages/user/Profile.jsx";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route element={<DontLogin/>}>
                    <Route path="/" element={<Login />} />
                </Route>

                <Route  path="/signup" element={<Signup/>}/>

                <Route element={<PrivateRoute/>}>
                    <Route path="/Home" element={<Sidebar />}>
                        <Route path="project-dashboard" element={<ProjectDashboard />} />
                        <Route path="project" element={<Project />} />
                        <Route path="team-leader" element={<TeamLeader />} />
                        <Route path="ticket" element={<Ticket />} />
                        <Route path="ticket-details" element={<TicketDetails />} />
                        <Route path="our-clients" element={<OurClients />} />
                        <Route path="our-teams" element={<Teams />} />
                        <Route path="teams-members" element={<TeamMembers />} />
                        <Route path="task" element={<Task />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="profile" element={<UserProfile />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRouter;
