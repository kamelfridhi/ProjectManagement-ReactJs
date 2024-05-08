import * as Yup from 'yup';
import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
    const [formData, setFormData] = useState({})

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); //stop the refresh of the page
        try {
            await schema.validate(formData, { abortEarly: false });

            const res = await fetch(`/auth`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)

            });
            //const data = await res.json();
            toast.success("registred successfuly");
            navigate("/")

        }catch (error) {
            // Validation failed or server error
            error.inner.forEach(err => {
                toast.error(err.message); // Display validation error using Toastr
            });
        }
    }
    console.log(formData)

    // Define validation schema using Yup
    const schema = Yup.object().shape({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        dateOfBirth: Yup.date().required('Date of Birth is required'),
        address: Yup.string().required('Address is required'),
        gendre: Yup.string().required('Gendre is required'),
        role: Yup.string().required('Role is required')
    });
    return (
        <>
            <ToastContainer />
            {/* main body area */}
            <div className="main p-2 py-3 p-xl-5">
                {/* Body: Body */}
                <div className="body d-flex p-0 p-xl-5">
                    <div className="container-xxl">
                        <div className="row g-0">
                            <div className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center rounded-lg auth-h100">
                                <div style={{ maxWidth: "25rem" }}>
                                    <div className="text-center mb-5">
                                        <img src="/assets/images/logots.png" alt="logo" style={{width: "150px" , height: "150px" }}/>
                                    </div>
                                    <div className="col-12 text-center mb-1 mb-lg-5">
                                        <h1>Create your account</h1>
                                        <h5>Free access to our dashboard.</h5>
                                    </div>
                                    {/* Image block */}
                                    <div className="">
                                        <img src="/assets/images/login-img.svg" alt="login-img" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 d-flex justify-content-center align-items-center border-0 rounded-lg auth-h100" style={{ backgroundColor: "#4c3575" , maxWidth: "40rem" , marginLeft: "100px"}}>
                                <div
                                    className="w-100 p-3 p-md-5 h-250 card border-0 bg-dark text-light"
                                    style={{ maxWidth: "32rem" , height: "850px" }}
                                >
                                    <br/>
                                    {/* Form */}
                                    <form onSubmit={handleSubmit} className="row g-1 p-3 p-md-4">

                                        <div className="col-6">
                                            <div className="mb-2">
                                                <label className="form-label">Firstname and Lastname</label>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    placeholder="John"
                                                    onChange={handleChange}
                                                    id="firstName"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="mb-2">
                                                <label className="form-label">&nbsp;</label>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    placeholder="Parker"
                                                    onChange={handleChange}
                                                    id="lastName"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="mb-2">
                                                <label className="form-label">Email address</label>
                                                <input
                                                    type="email"
                                                    className="form-control form-control-lg"
                                                    placeholder="name@example.com"
                                                    onChange={handleChange}
                                                    id="email"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="mb-2">
                                                <label className="form-label">Telephone number</label>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    placeholder="Enter your telephone number"
                                                    onChange={handleChange}
                                                    id="telephone"
                                                    value={formData.telephone}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="mb-2">
                                                <label className="form-label">Password</label>
                                                <input
                                                    type="password"
                                                    className="form-control form-control-lg"
                                                    placeholder="8+ characters required"
                                                    onChange={handleChange}
                                                    id="password"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-6">
                                            <div className="mb-2">
                                                <label className="form-label">Role</label>
                                                <select
                                                    className="form-select form-select-lg"
                                                    onChange={handleChange}
                                                    id="role"
                                                >
                                                    <option value="">Select a role</option>
                                                    <option value="user">User</option>
                                                    <option value="employee">Employee</option>
                                                    <option value="projectManager">Project Manager</option>
                                                    <option value="client">Client</option>

                                                    <option value="development">development</option>
                                                    <option value="marketing">marketing</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="mb-2">
                                                <label className="form-label">Gendre</label>
                                                <select
                                                    className="form-select form-select-lg"
                                                    onChange={handleChange}
                                                    id="gendre"
                                                >
                                                    <option value="">Select a Gendre</option>
                                                    <option value="male">male</option>
                                                    <option value="female">female</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="mb-2">
                                                <label className="form-label">Address</label>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    placeholder="Enter your address"
                                                    onChange={handleChange}
                                                    id="address"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="mb-2">
                                                <label className="form-label">Date of Birth</label>
                                                <input
                                                    type="date"
                                                    className="form-control form-control-lg"
                                                    onChange={handleChange}
                                                    id="dateOfBirth"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 text-center mt-4">
                                            <button
                                                type="submit"
                                                href="auth-signin.html"
                                                className="btn btn-lg btn-block btn-light lift text-uppercase"
                                                alt="SIGNUP"
                                            >
                                                SIGN UP
                                            </button>
                                        </div>
                                        <div className="col-12 text-center mt-4">
                                            <span className="text-muted">
                                                Already have an account?{" "}
                                                <Link
                                                    to="/"
                                                    title="Sign in"
                                                    className="text-secondary"
                                                >
                                                    Sign in here
                                                </Link>
                                            </span>
                                        </div>
                                    </form>
                                    {/* End Form */}
                                </div>
                            </div>
                        </div>
                        {" "}
                        {/* End Row */}
                    </div>
                </div>
            </div>
        </>
    )
}