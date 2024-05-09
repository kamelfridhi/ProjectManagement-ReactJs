import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {toast, ToastContainer} from "react-toastify";

export default function ChangePassword(){
    const [formData, setFormData] = useState({})

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault(); //stop the refresh of the page
        try {
            //await schema.validate(formData, { abortEarly: false });

            const res = await fetch(`https://nestpiteamsphere-production.up.railway.app/user/forgotPassword`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)

            });
            //const data = await res.json();
            toast.success("check your email!");


        }catch (error) {
            // Validation failed or server error
            error.inner.forEach(err => {
                toast.error(err.message); // Display validation error using Toastr
            });
        }
    }
    console.log(formData)

    return(
        <>
            <ToastContainer />

            <div id="mytask-layout">
                {/* main body area */}
                <div className="main p-2 py-3 p-xl-5">
                    {/* Body: Body */}
                    <div className="body d-flex p-0 p-xl-5">
                        <div className="container-xxl">
                            <div className="row g-0">
                                <div className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center rounded-lg auth-h100">
                                    <div style={{ maxWidth: "25rem" }}>
                                        <div className="text-center mb-5">
                                            <svg
                                                width="4rem"
                                                fill="currentColor"
                                                className="bi bi-clipboard-check"
                                                viewBox="0 0 16 16"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                                                />
                                                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                                                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                                            </svg>
                                        </div>
                                        <div className="mb-5">
                                            <h2 className="color-900 text-center">
                                                TeamSphere Let's Management Better
                                            </h2>
                                        </div>
                                        {/* Image block */}
                                        <div className="">
                                            <img src="../assets/images/login-img.svg" alt="login-img" />
                                        </div>
                                    </div>
                                </div>
                                <div style={{backgroundColor:"#4C3575"}} className="col-lg-6 d-flex justify-content-center align-items-center border-0 rounded-lg auth-h100">
                                    <div
                                        className="w-100 p-3 p-md-5 card border-0 bg-dark text-light"
                                        style={{maxWidth: "32rem"}}
                                    >
                                        {/* Form */}
                                        <form onSubmit={handleSubmit} className="row g-1 p-3 p-md-4">
                                            <div className="col-12 text-center mb-1 mb-lg-5">
                                                <img
                                                    src="../assets/images/forgot-password.svg"
                                                    className="w240 mb-4"
                                                    alt=""
                                                />
                                                <h1>Forgot password?</h1>
                                                <span>
                    Enter the email address you used when you joined and we'll
                    send you instructions to reset your password.
                  </span>
                                            </div>
                                            <div className="col-12">
                                                <div className="mb-2">
                                                    <label className="form-label">Email address</label>
                                                    <input
                                                        type="email"
                                                        className="form-control form-control-lg"
                                                        placeholder="*@*.*"
                                                        onChange={handleChange}
                                                        id="email"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12 text-center mt-4">
                                                <button
                                                    type="submit"
                                                    className="btn btn-lg btn-block btn-light lift text-uppercase"
                                                    alt="SIGNUP"
                                                >
                                                    SEND EMAIL
                                                </button>
                                            </div>

                                        </form>
                                        <div className="col-12 text-center mt-4">
                  <span className="text-muted">
                    <Link to="/signup" className="text-secondary">
                      Back to Sign in
                    </Link>
                  </span>
                                        </div>
                                        {/* End Form */}
                                    </div>
                                </div>
                            </div>
                            {" "}
                            {/* End Row */}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}