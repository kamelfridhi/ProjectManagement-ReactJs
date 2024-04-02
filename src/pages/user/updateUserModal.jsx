import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectUserObject} from "../../redux/user/userSelector.js";
import {toast} from "react-toastify";
import {updateUser} from "../../redux/user/userSlice.js";

const UpdateUserModal = () => {
    const currentUser = useSelector(selectUserObject);
    const dispatch = useDispatch();

    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        telephone: '',
        dateOfBirth: '',
        password: ''
    });

    useEffect(() => {
        // Fetch user data from the backend when the component mounts
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            // Make a GET request to fetch user data from the backend
            const response = await fetch(`http://localhost:3000/user/${currentUser._id}`); // Update the URL with your backend endpoint
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            const userData = await response.json();
            // Update the local state with the fetched user data
            setUserData(userData.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleInputChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdateProfile = async () => {
        try {
            const response = await fetch(`http://localhost:3000/user/updateMe/${currentUser._id}`, {
                method: 'PATCH', // Use PATCH or PUT based on your backend API
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if (!response.ok) {
                throw new Error('Failed to update user profile');
            }
            console.log(userData)
            dispatch(updateUser(userData));

            toast.success('User profile updated successfully');
            // Handle success response (optional)
        } catch (error) {


            // Handle error response
            toast.error('Error updating user profile!');
            // Display an error message to the user (optional)
        }
    };

//console.log(userData);
    return (
        <div
            className="modal fade"
            id="updateuser"
            tabIndex={-1}
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Update Profile</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="firstName"
                                value={userData.firstName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="lastName"
                                value={userData.lastName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={userData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                name="address"
                                value={userData.address}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Telephone</label>
                            <input
                                type="text"
                                className="form-control"
                                name="telephone"
                                value={userData.telephone}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Date of Birth</label>
                            <input
                                type="date"
                                className="form-control"
                                name="dateOfBirth"
                                value={userData.dateOfBirth}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                value={userData.password}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleUpdateProfile}
                        >
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateUserModal;
