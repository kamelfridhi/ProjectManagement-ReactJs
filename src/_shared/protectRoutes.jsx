import { useSelector } from "react-redux";
import { selectUserObject } from "../redux/user/userSelector.js";
import { Navigate, Outlet } from "react-router-dom";
import React from 'react';
export const PrivateRoute = () => {
    const currentUser = useSelector(selectUserObject);
    return currentUser ? <Outlet/> : <Navigate to={"/"}/>;
}

export const DontLogin = () => {
    const currentUser = useSelector(selectUserObject);
    return currentUser ? <Navigate to="/Home/dashboard" /> : <Outlet/> ;
};
