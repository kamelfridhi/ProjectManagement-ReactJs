import {useDispatch, useSelector} from "react-redux";
import { selectUserObject } from "../redux/user/userSelector.js";
import {Navigate, Outlet, useNavigate} from "react-router-dom";
import React from 'react';
import * as UserService from "../_services/UserService.jsx";



export const PrivateRoute = () => {
    const currentUser = useSelector(selectUserObject);

    if (currentUser) {
        return <NotVerifiedUser />;
    } else {
        return <Navigate to={"/"} />;
    }
}

export const NotVerifiedUser = () => {
    const currentUser = useSelector(selectUserObject);

    if (currentUser.settings.verifiedAccount && !currentUser.settings.blocked) {
        return <Outlet />;
    } else if(!currentUser.settings.verifiedAccount) {
        return <AccountNotVerified />;
    }else if(currentUser.settings.blocked){
        return <AccountBlocked />;
    }
}

// Define a component to render when the account is not verified
const AccountNotVerified = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector(selectUserObject);
    const handleSignOut = async () => {
        await UserService.handleSignOut(currentUser._id, dispatch, navigate);
    };

    return (
        <div>
            <h1>Account Not Verified</h1>
            <p>Please wait an admin to verify your account to access this page.</p>
                <button onClick={handleSignOut}>Sign Out</button>
        </div>
    );
}

const AccountBlocked = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector(selectUserObject);
    const handleSignOut = async () => {
        await UserService.handleSignOut(currentUser._id, dispatch, navigate);
    };

    return (
        <div>
            <h1>Account Blocked</h1>
            <p>Please verify your account to access this page.</p>
            <button onClick={handleSignOut}>Sign Out</button>

        </div>
    );
}

export const DontLogin = () => {
    const currentUser = useSelector(selectUserObject);
    //console.log("userr : " + currentUser.firstName)
    return currentUser ? <Navigate to="/Home/dashboard" /> : <Outlet/> ;
}

/*
const currentUser = useSelector(selectUserObject);
if(currentUser && currentUser.settings.verifiedAccount===true){
    <Navigate to="/Home/dashboard" />

}else {
    <Outlet/>
}
*/
