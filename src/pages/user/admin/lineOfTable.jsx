import React, {useEffect, useState} from "react";
import * as UserService from "../../../_services/UserService.jsx";

export default function LineOfTable({user,etat}){
    const [imageData, setImageData] = useState(null);
    const [emailPic, setEmailPic] = useState(null);

    useEffect(() => {
        const fetchImageData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/user/image/${user._id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user image');
                }
                if(user.settings.emailPhoto===true){
                    const data = await response.json();
                    setEmailPic(data.userEmailPic);
                }else{
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
            <tr>
                <td>{user.email}</td>
                <td>
                    { emailPic ?  (
                        <img className="rounded-5" width={50} height={50} src={emailPic}
                             alt="User"/>
                    ) : (
                        <img className="rounded-5" width={50} height={50}
                             src={imageData}
                             alt="User"/>
                    )}
                    <span className="fw-bold ms-1">{user.firstName}</span>
                </td>
                <td>{user.dateOfBirth}</td>
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
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#edittickit"
                                >
                                    <i className="icofont-edit text-success"/>
                                </button>
                                {etat == 0 && (
                                    <>
                                        <button
                                            onClick={() => UserService.acceptUser(user._id)}
                                            type="button"
                                            className="btn btn-outline-secondary deleterow"
                                        >
                                            accept
                                            <i className="icofont-ui-love-add  text-bg-success"/>
                                        </button>
                                    </>)
                                }


                                <button
                                    onClick={() => UserService.declinetUser(user._id)}
                                    type="button"
                                    className="btn btn-outline-secondary deleterow"
                                > {etat == 1 ? <p>block</p> : <p>decline</p>}
                                    <i className="icofont-ui-delete text-danger"/>
                                </button>
                            </div>
                        </td>
                    </>)
                }

            </tr>
        </>
    )
}