import { useDispatch, useSelector } from "react-redux";
import { selectUserObject } from "../redux/user/userSelector.js";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import * as UserService from "../_services/UserService.jsx";
import io from "socket.io-client";
import { updateUserStatus } from "../redux/user/userSlice.js";
let socket = io('ws://localhost:3000');



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
    console.log('yes')
    if (currentUser.settings.verifiedAccount && !currentUser.settings.blocked) {
        return <Outlet />;
    } else if (!currentUser.settings.verifiedAccount) {
        return <AccountNotVerified />;
    } else if (currentUser.settings.blocked) {
        return <AccountBlocked />;
    }
}

// Define a component to render when the account is not verified

const AccountNotVerified = () => {
    const [showAlert, setShowAlert] = useState(false);
    const currentUser = useSelector(selectUserObject);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const handleAccepted = (data) => {
            console.log('socket data accept ', data);
            // Update the user's status in the Redux store
            dispatch(updateUserStatus({
                statusAccount: 1, // Set statusAccount to 1 for accepted
                verifiedAccount: true // Set verifiedAccount to true for accepted
            }));
        };

        const handleRejected = (data) => {
            console.log('socket data reject ', data);
            // Update the user's status in the Redux store
            dispatch(updateUserStatus({
                statusAccount: -1, // Set statusAccount to -1 for rejected
                verifiedAccount: false // Set verifiedAccount to false for rejected
            }));
            setShowAlert(true);
        };

        socket.emit('Connect', {
            id: currentUser._id,
            socketid: null,
            name: currentUser.firstName,
            statusAccount: currentUser.settings.statusAccount,
            verified: currentUser.settings.verifiedAccount
        });

        socket.on('Accepted', handleAccepted);
        socket.on('userdeclined', handleRejected);

        return () => {
            socket.off('Accepted', handleAccepted);
            socket.off('userdeclined', handleRejected);
        };
    }, [currentUser._id, currentUser.firstName, currentUser.settings.statusAccount, currentUser.settings.verifiedAccount, dispatch, navigate]);

    const handleSignOut = async () => {
        await UserService.handleSignOut(currentUser._id, dispatch, navigate);
    };

    return (
        <div>
            <div className="body d-flex py-lg-3 py-md-2">
                <div className="container-xxl">
                    <div className="row align-items-center">
                        <div className="border-0 mb-4">
                            <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                                <h3 className="fw-bold mb-0">Tickets Detail</h3>
                            </div>
                        </div>
                    </div>{" "}
                    {/* Row end  */}
                    <div className="row g-3">
                        <div className="col-xxl-8 col-xl-8 col-lg-12 col-md-12">
                            <div className="row g-3 mb-3">
                                <div className="col-md-4">
                                    <div className="card ">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center">
                                                <div className="avatar lg  rounded-1 no-thumbnail bg-lightyellow color-defult">
                                                    <i className="icofont-optic fs-4" />
                                                </div>
                                                <div className="flex-fill ms-4 text-truncate">
                                                    <div className="text-truncate">Status</div>
                                                    {showAlert ? (
                                                        <span className="badge bg-danger">Declined</span>

                                                    ) :
                                                        <span className="badge bg-warning">In Progress</span>

                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card ">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center">
                                                <div className="avatar lg  rounded-1 no-thumbnail bg-lightblue color-defult">
                                                    <i className="icofont-user fs-4" />
                                                </div>
                                                <div className="flex-fill ms-4 text-truncate">
                                                    <div className="text-truncate">Email</div>
                                                    <span className="fw-bold">{currentUser.email}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card ">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center">
                                                <div className="avatar lg  rounded-1 no-thumbnail bg-lightgreen color-defult">
                                                    <i className="icofont-price fs-4" />
                                                </div>
                                                <div className="flex-fill ms-4 text-truncate">
                                                    <button
                                                        onClick={handleSignOut}
                                                        type="button"
                                                        className="btn btn-dark  w-sm-100 text-danger"
                                                    >
                                                        <i className="icofont-minus-circle me-2 fs-6" />
                                                        Sign out                                                    </button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>{" "}
                            {/* Row end  */}
                            <div className="row g-3">
                                <div className="col-md-12">
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <h6 className="fw-bold mb-3 text-danger">
                                                Account Not Verified Yet
                                            </h6>
                                            <p>
                                                Please wait for an admin to verify your account to access this page.


                                            </p>

                                        </div>
                                    </div>

                                </div>
                            </div>{" "}
                            {/* Row end  */}
                        </div>

                    </div>
                </div>
            </div>{" "}
        </div>
    );
}

const AccountBlocked = () => {
    return (
        <div>
            <h1>Account Blocked</h1>
            <p>Please verify your account to access this page.</p>
        </div>
    );
}

export const DontLogin = () => {
    const currentUser = useSelector(selectUserObject);
    //console.log("userr : " + currentUser.firstName)
    return currentUser ? <Navigate to="/Home/dashboard" /> : <Outlet />;
}

/*
const currentUser = useSelector(selectUserObject);
if(currentUser && currentUser.settings.verifiedAccount===true){
    <Navigate to="/Home/dashboard" />

}else {
    <Outlet/>
}
*/