import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";

export default function TicketDetails() {
    const { id } = useParams();
    const fileInputRef = useRef(null);
    const [imageData, setImageData] = useState(null);

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImageData(reader.result);
        };

        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
            await handleSubmit(selectedFile);
        }
    };


    const handleSubmit = async (selectedFile) => {
        try {
            const formData = new FormData();
            formData.append('image', selectedFile);

            const response = await fetch(`http://localhost:3000/tickets/upload/${id}`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload file');
            }

            const data = await response.json();
            console.log('File uploaded successfully:', data);
            setImageData(selectedFile);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return(
        <>
            {/* main body area */}
            <div className="main px-lg-4 px-md-4">
                {/* Body: Body */}
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
                                                        <span className="badge bg-warning">In Progress</span>
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
                                                        <div className="text-truncate">Created Name</div>
                                                        <span className="fw-bold">Sally Graham</span>
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
                                                        <div className="text-truncate">Priority</div>
                                                        <span className="badge bg-danger">High</span>
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
                                                    Internet Not Working
                                                </h6>
                                                <p>
                                                    Vivamus blandit, odio eget tristique volutpat, eros lectus
                                                    auctor lorem, vitae sagittis sapien mauris interdum ex.
                                                    Donec eu eleifend massa. Donec viverra, ex ut euismod
                                                    hendrerit, nunc nisi cursus est, nec scelerisque lorem
                                                    erat vel nunc. Duis non urna ornare, commodo felis ac,
                                                    fringilla tortor. Nulla dui libero, dignissim et eros id,
                                                    elementum rutrum risus
                                                </p>
                                                <p>
                                                    Vivamus blandit, odio eget tristique volutpat, eros lectus
                                                    auctor lorem, vitae sagittis sapien mauris interdum ex.
                                                    Donec eu eleifend massa. Donec viverra, ex ut euismod
                                                    hendrerit, nunc nisi cursus est, nec scelerisque lorem
                                                    erat vel nunc. Duis non urna ornare, commodo felis ac,
                                                    fringilla tortor. Nulla dui libero, dignissim et eros id,
                                                    elementum rutrum risus
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <h2>Upload File</h2>
                                            <form style={{ display: 'none' }}>
                                                <input type="file" onChange={handleFileChange} ref={fileInputRef} style={{ display: 'none' }} />
                                            </form>

                                            <a href="#" onClick={handleImageClick}>upload
                                                <div>
                                                    {imageData && (
                                                        <img className="rounded-5" width={200} src={imageData} alt="User" />
                                                    )}
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>{" "}
                                {/* Row end  */}
                            </div>
                            <div className="col-xxl-4 col-xl-4 col-lg-12 col-md-12">
                                <div className="card">
                                    <div className="card-body card-body-height py-4">
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12">
                                                <h6 className="mb-0 fw-bold mb-3">Ticket Chat</h6>
                                                <div className="card mb-2">
                                                    <div className="card-body">
                                                        <div className="post">
                          <textarea
                              className="form-control"
                              placeholder="Chat"
                              rows={4}
                              defaultValue={""}
                          />
                                                            <div className="py-3">
                                                                <a href="#" className="px-3 " title="upload images">
                                                                    <i className="icofont-ui-camera" />
                                                                </a>
                                                                <a href="#" className="px-3 " title="upload video">
                                                                    <i className="icofont-video-cam" />
                                                                </a>
                                                                <a
                                                                    href="#"
                                                                    className="px-3 "
                                                                    title="Send for signuture"
                                                                >
                                                                    <i className="icofont-pen-alt-2" />
                                                                </a>
                                                                <button className="btn btn-primary float-sm-end  mt-2 mt-sm-0">
                                                                    Sent
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>{" "}
                                                {/* .Card End */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Modal Members*/}
                <div
                    className="modal fade"
                    id="addUser"
                    tabIndex={-1}
                    aria-labelledby="addUserLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title  fw-bold" id="addUserLabel">
                                    Employee Invitation
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                />
                            </div>
                            <div className="modal-body">
                                <div className="inviteby_email">
                                    <div className="input-group mb-3">
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Email address"
                                            id="exampleInputEmail1"
                                            aria-describedby="exampleInputEmail1"
                                        />
                                        <button
                                            className="btn btn-dark"
                                            type="button"
                                            id="button-addon2"
                                        >
                                            Sent
                                        </button>
                                    </div>
                                </div>
                                <div className="members_list">
                                    <h6 className="fw-bold ">Employee </h6>
                                    <ul className="list-unstyled list-group list-group-custom list-group-flush mb-0">
                                        <li className="list-group-item py-3 text-center text-md-start">
                                            <div className="d-flex align-items-center flex-column flex-sm-column flex-md-column flex-lg-row">
                                                <div className="no-thumbnail mb-2 mb-md-0">
                                                    <img
                                                        className="avatar lg rounded-circle"
                                                        src="assets/images/xs/avatar2.jpg"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="flex-fill ms-3 text-truncate">
                                                    <h6 className="mb-0  fw-bold">Rachel Carr(you)</h6>
                                                    <span className="text-muted">rachel.carr@gmail.com</span>
                                                </div>
                                                <div className="members-action">
                                                    <span className="members-role ">Admin</span>
                                                    <div className="btn-group">
                                                        <button
                                                            type="button"
                                                            className="btn bg-transparent dropdown-toggle"
                                                            data-bs-toggle="dropdown"
                                                            aria-expanded="false"
                                                        >
                                                            <i className="icofont-ui-settings  fs-6" />
                                                        </button>
                                                        <ul className="dropdown-menu dropdown-menu-end">
                                                            <li>
                                                                <a className="dropdown-item" href="#">
                                                                    <i className="icofont-ui-password fs-6 me-2" />
                                                                    ResetPassword
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a className="dropdown-item" href="#">
                                                                    <i className="icofont-chart-line fs-6 me-2" />
                                                                    ActivityReport
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item py-3 text-center text-md-start">
                                            <div className="d-flex align-items-center flex-column flex-sm-column flex-md-column flex-lg-row">
                                                <div className="no-thumbnail mb-2 mb-md-0">
                                                    <img
                                                        className="avatar lg rounded-circle"
                                                        src="assets/images/xs/avatar3.jpg"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="flex-fill ms-3 text-truncate">
                                                    <h6 className="mb-0  fw-bold">
                                                        Lucas Baker
                                                        <a href="#" className="link-secondary ms-2">
                                                            (Resend invitation)
                                                        </a>
                                                    </h6>
                                                    <span className="text-muted">lucas.baker@gmail.com</span>
                                                </div>
                                                <div className="members-action">
                                                    <div className="btn-group">
                                                        <button
                                                            type="button"
                                                            className="btn bg-transparent dropdown-toggle"
                                                            data-bs-toggle="dropdown"
                                                            aria-expanded="false"
                                                        >
                                                            Members
                                                        </button>
                                                        <ul className="dropdown-menu dropdown-menu-end">
                                                            <li>
                                                                <a className="dropdown-item" href="#">
                                                                    <i className="icofont-check-circled" />
                                                                    <span>All operations permission</span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a className="dropdown-item" href="#">
                                                                    <i className="fs-6 p-2 me-1" />
                                                                    <span>Only Invite &amp; manage team</span>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="btn-group">
                                                        <button
                                                            type="button"
                                                            className="btn bg-transparent dropdown-toggle"
                                                            data-bs-toggle="dropdown"
                                                            aria-expanded="false"
                                                        >
                                                            <i className="icofont-ui-settings  fs-6" />
                                                        </button>
                                                        <ul className="dropdown-menu dropdown-menu-end">
                                                            <li>
                                                                <a className="dropdown-item" href="#">
                                                                    <i className="icofont-delete-alt fs-6 me-2" />
                                                                    Delete Member
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item py-3 text-center text-md-start">
                                            <div className="d-flex align-items-center flex-column flex-sm-column flex-md-column flex-lg-row">
                                                <div className="no-thumbnail mb-2 mb-md-0">
                                                    <img
                                                        className="avatar lg rounded-circle"
                                                        src="assets/images/xs/avatar8.jpg"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="flex-fill ms-3 text-truncate">
                                                    <h6 className="mb-0  fw-bold">Una Coleman</h6>
                                                    <span className="text-muted">una.coleman@gmail.com</span>
                                                </div>
                                                <div className="members-action">
                                                    <div className="btn-group">
                                                        <button
                                                            type="button"
                                                            className="btn bg-transparent dropdown-toggle"
                                                            data-bs-toggle="dropdown"
                                                            aria-expanded="false"
                                                        >
                                                            Members
                                                        </button>
                                                        <ul className="dropdown-menu dropdown-menu-end">
                                                            <li>
                                                                <a className="dropdown-item" href="#">
                                                                    <i className="icofont-check-circled" />
                                                                    <span>All operations permission</span>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a className="dropdown-item" href="#">
                                                                    <i className="fs-6 p-2 me-1" />
                                                                    <span>Only Invite &amp; manage team</span>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="btn-group">
                                                        <div className="btn-group">
                                                            <button
                                                                type="button"
                                                                className="btn bg-transparent dropdown-toggle"
                                                                data-bs-toggle="dropdown"
                                                                aria-expanded="false"
                                                            >
                                                                <i className="icofont-ui-settings  fs-6" />
                                                            </button>
                                                            <ul className="dropdown-menu dropdown-menu-end">
                                                                <li>
                                                                    <a className="dropdown-item" href="#">
                                                                        <i className="icofont-ui-password fs-6 me-2" />
                                                                        ResetPassword
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a className="dropdown-item" href="#">
                                                                        <i className="icofont-chart-line fs-6 me-2" />
                                                                        ActivityReport
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a className="dropdown-item" href="#">
                                                                        <i className="icofont-delete-alt fs-6 me-2" />
                                                                        Suspend member
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a className="dropdown-item" href="#">
                                                                        <i className="icofont-not-allowed fs-6 me-2" />
                                                                        Delete Member
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}