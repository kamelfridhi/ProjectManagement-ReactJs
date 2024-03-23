import React from 'react';
import {BrowserRouter, BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Sidebar from "../_shared/sidebar/Sidebar.jsx";
import Task from "../pages/task/pages/Task.jsx";
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
import ProjectList from "../pages/projects/showProjects.jsx";
import Teamcard from "../pages/team/teamcard.jsx";
import TaskList from "../pages/task/components/ShowTask.jsx";
import ShowTasks from "../pages/task/pages/ShowTasks.jsx";
import TaskManagement from "../pages/task/components/TaskManagement.jsx";
import UpdateTask from "../pages/task/components/UpdateTask.jsx";
import UpdateTaskForm from "../pages/task/components/UpdateTask.jsx";
import TestDrag from "../pages/task/components/TestDrag.jsx";
import Mehdidrag from "../pages/task/components/StatusBoard.jsx";
import StatusPage from "../pages/task/components/StatusPage.jsx";
import StatusBoard from "../pages/task/components/StatusBoard.jsx";
import { PrivateRoute, DontLogin } from "../_shared/protectRoutes.jsx";
import UserProfile from "../pages/user/Profile.jsx";
import ChangePassword from "../pages/user/ChangePassword.jsx";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route element={<DontLogin/>}>
                    <Route path="/" element={<Login />} />
                </Route>

                <Route path="/showtask" element={<TaskList />} />
                <Route path="/status" element={<StatusPage />} />
                <Route path="/showtasks" element={<ShowTasks />} />
                <Route path="/board" element={<StatusBoard />} />
                <Route path="card" element={<Teamcard />} />
                <Route path="/testdrag" element={<TestDrag />} />
                <Route path="/prog" element={<TaskManagement />} />
                <Route path="/update" element={<UpdateTaskForm />} />
                <Route path="signup" element={<Signup />} />
                <Route path="change-password" element={<ChangePassword />} />

                <Route element={<PrivateRoute/>}>

                <Route path="/Home" element={<Sidebar />}>
                    {/* Nested route for Task */}
                    <Route path="project-dashboard" element={<ProjectDashboard />} />
                    <Route path="showProject" element={<ProjectList />} />
                    <Route path="project" element={<Project />} />
                    <Route path="team-leader" element={<TeamLeader />} />
                    <Route path="ticket" element={<Ticket />} />
                    <Route path="ticket-details" element={<TicketDetails />} />
                    <Route path="our-clients" element={<OurClients />} />
                    <Route path="our-teams" element={<Teams />} />
                    <Route path="showtask" element={<ShowTasks />} />
                    <Route path="teams-members/:id" element={<TeamMembers />} />
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
