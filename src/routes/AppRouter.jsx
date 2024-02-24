import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from "../_shared/sidebar/Sidebar.jsx";
import Navbar  from "../_shared/navbar/Navbar.jsx";
import NavSide from "../_shared/NavAndSide/NavSide.jsx";
import Task from "../pages/task/Task.jsx";
import Login from "../pages/Login/Login.jsx";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";


const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Home" element={<Sidebar />}>
                    {/* Nested route for Task */}
                    <Route path="task" element={<Task />} />
                    <Route path="dashboard" element={<Dashboard />} />
                </Route>

            </Routes>
        </Router>



    );
};

export default AppRouter;
