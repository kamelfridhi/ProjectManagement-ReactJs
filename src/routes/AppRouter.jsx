import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from "../_shared/sidebar/Sidebar.jsx";
import Navbar  from "../_shared/navbar/Navbar.jsx";
import NavSide from "../_shared/NavAndSide/NavSide.jsx";
import Task from "../pages/task/Task.jsx";
import Login from "../pages/Login/Login.jsx";


const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/nav" element={<Navbar />} />
                <Route path="/home" element={<Sidebar />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<NavSide />}>
                    <Route path="/task" element={<Task />} />


                </Route>

            </Routes>
        </Router>



    );
};

export default AppRouter;
