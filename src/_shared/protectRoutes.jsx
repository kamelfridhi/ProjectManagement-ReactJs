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
    //console.log("userr : " + currentUser.firstName)
    return currentUser ? <Navigate to="/Home/dashboard" /> : <Outlet/> ;
};
/*
const currentUser = useSelector(selectUserObject);
if(currentUser && currentUser.settings.verifiedAccount===true){
    <Navigate to="/Home/dashboard" />

}else {
    <Outlet/>
}
*/