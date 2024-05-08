import React, { useEffect, useState } from "react";
import * as UserService from "../../../_services/UserService.jsx";
import { acceptUser, declinetUser } from "../../../_services/UserService.jsx";
import { useSelector } from "react-redux";
import { selectUserObject } from "../../../redux/user/userSelector.js";
import io from 'socket.io-client';
let socket= io('ws://localhost:3000');


export default function LineOfTable({ user, etat }) {
    const [imageData, setImageData] = useState(null);
    const [emailPic, setEmailPic] = useState(null);
    const currentUser = useSelector(selectUserObject);

    const [selectedRole, setSelectedRole] = useState('');

    useEffect(() => {
        socket.on('connect',(data)=>{
            socket.emit('Connect',{
                id: currentUser._id,
                socketid:null,
                name: currentUser.firstName,
                statusAccount: currentUser.settings.statusAccount,
                verified: currentUser.settings.verifiedAccount
            })
        })

    }, []);

    const handleChange = async (event) => {
        const newRole = event.target.value;
        setSelectedRole(newRole);
        await updateRole(newRole);
    };

    const updateRole = async (role) => {
        try {
            const response = await fetch(`https://nestpiteamsphere-production.up.railway.app/user/setRole/${user._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role }),
            });
            if (!response.ok) {
                throw new Error('Failed to update role');
            }
            // Handle success
        } catch (error) {
            console.error('Error updating role:', error);
        }
    };


    const accept = async () => {

            socket.emit('userAccepted',{
                id: user._id,
                socketid:null,
                name: user.firstName,
                statusAccount: user.statusAccount,
                verifiedAccount: true
            })

        //await UserService.acceptUser(user._id);
    }
    const decline = async () => {

            socket.emit('userRejected',{
                id: user._id,
                socketid:null,
                name: user.firstName,
                statusAccount: user.statusAccount,
                verifiedAccount:false
            })
        //await UserService.declinetUser(user._id);
    }
    const block = async () => {
        await UserService.blockUser(user._id);
    }
    /*
        useEffect(() => {
            console.log(selectedRole);
        }, [selectedRole]);
    */
    useEffect(() => {
        const fetchImageData = async () => {
            try {
                const response = await fetch(`https://nestpiteamsphere-production.up.railway.app/user/image/${user._id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user image');
                }
                if (user.settings.emailPhoto === true) {
                    const data = await response.json();
                    setEmailPic(data.userEmailPic);
                } else {
                    const blob = await response.blob();
                    const reader = new FileReader();
                    reader.onload = () => {
                        setImageData(reader.result);
                    };
                    reader.readAsDataURL(blob);
                }
            } catch (error) {
                console.error('Error fetching user image:', error);
            }
        };
        fetchImageData();


    });
    return (
        <>
            {

                    <tr>
                        <td>{user.email}</td>
                        <td>
                            {emailPic ? (
                                <img className="rounded-5" width={50} height={50} src={emailPic}
                                    alt="User" />
                            ) : (
                                <img className="rounded-5" width={50} height={50}
                                    src={imageData}
                                    alt="User" />
                            )}
                            <span className="fw-bold ms-1">{user.firstName}</span>
                        </td>
                        <td>{user.dateOfBirth}</td>

                        <td>
                            <select
                                disabled={user.role.role === "admin"}
                                className="form-select form-select-lg"
                                onChange={handleChange}
                                value={selectedRole}
                                id="role"
                            >
                                <option value="" disabled={user.role.role === "admin"}>
                                    {user.role.role}
                                </option>
                                <option value="user">User</option>
                                <option value="employee">Employee</option>
                                <option value="projectManager">Project Manager</option>
                                <option value="client">Client</option>
                            </select>

                        </td>
                        <td>
                            {
                                etat == 1 && <span className="badge bg-success">accepted</span>
                            }

                            {
                                etat == 0 && <span className="badge bg-warning">en attente</span>
                            }

                            {
                                etat == -1 && <span className="badge bg-danger">declined</span>
                            }
                        </td>
                        {
                            etat != -1 && (<>
                                <td>
                                    <div
                                        className="btn-group"
                                        role="group"
                                        aria-label="Basic outlined example"
                                    >

                                        {etat == 0 && (
                                            <>
                                                <button
                                                    disabled={currentUser._id === user._id || user.role.role === 'user'}
                                                    onClick={accept}
                                                    type="button"
                                                    className="btn btn-outline-secondary deleterow"
                                                >
                                                    accept
                                                    <i className="icofont-ui-love-add  text-bg-success" />
                                                </button>
                                            </>)
                                        }


                                        <button
                                            disabled={currentUser._id === user._id || user.role.role === 'user'}
                                            onClick={decline}
                                            type="button"
                                            className="btn btn-outline-secondary deleterow"
                                        > {etat == 1 ? <p>block</p> : <p>decline</p>}
                                            <i className="icofont-ui-delete text-danger" />
                                        </button>
                                    </div>
                                </td>
                            </>)
                        }

                    </tr>
                
            }

        </>
    )
}