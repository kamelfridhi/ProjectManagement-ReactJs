import React, {  useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'

import {signInStart,signInSuccess,signInFailure} from "../../redux/user/userSlice.js";
import {useDispatch, useSelector} from "react-redux";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OAuth from "../user/OAuth.jsx";


export default function Login() {

const [formData, setFormData] = useState({})

    const {loading,error} = useSelector((state)=>state.user)        //    name:'user',


    const dispatch = useDispatch();

    const navigate = useNavigate();

    // Validate email format using regex
    const isEmailValid = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // Validate password length
    const isPasswordValid = (password) => {
        return password.length >= 2; // Adjust the minimum password length as needed
    };

    const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e) => {
    e.preventDefault(); //stop the refresh of the page
        const { email, password } = formData;

        // Check if email is valid
        if (!email || !isEmailValid(email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        // Check if password is valid
        if (!password || !isPasswordValid(password)) {
            toast.error('Password must be at least 2 characters long');
            return;
        }
try {
    dispatch(signInStart());
        const res = await fetch(`https://nestpiteamsphere-production.up.railway.app/auth/login`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)

    });
    const data = await res.json();
    if (data.message!=='success') {
        toast.error(data.message);
        dispatch(signInFailure(data))
    }else if(data.message ==='success'){
        dispatch(signInSuccess(data.data))
    }

}catch (error){
    dispatch(signInFailure('An error occurred'));
    toast.error(error?error.message || 'something went wrong' : '');
}
    }

    return (
        <>
            <div id="mytask-layout">
                <div className="main p-2 py-3 p-xl-5">
                    <div className="body p-0 p-xl-5">
                        <div className="container-xxl">
                            <div className="row g-0">
                                <div className="col-lg-6 col-sm d-flex justify-content-center align-items-center rounded-lg auth-h100">
                                    <div style={{ maxWidth: "25rem" }}>
                                        <div className="text-center mb-5">
                                            <img
                                                src="/assets/images/logots.png"
                                                alt="logo"
                                                className="img-fluid"
                                                style={{ width: "150px", height: "150px" }}
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <h2 className="color-900 text-center">
                                                TeamSphere Lets Management Better
                                            </h2>
                                        </div>
                                        <div className="text-center">
                                            <img
                                                src="/assets/images/login-img.svg"
                                                alt="login-img"
                                                className="img-fluid"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6 col-sm d-flex justify-content-center align-items-center rounded-lg auth-h100" style={{ backgroundColor: "#4c3575" }}>
                                    <div className="w-100 p-3 p-md-5 card border-0 bg-dark text-light" style={{ maxWidth: "90%" }}>
                                        <div className="col-12 text-center mb-1 mb-lg-5">
                                            <h1>Sign in</h1>
                                            <span>Free access to our dashboard.</span>
                                        </div>
                                        <div className="col-12 text-center mb-4">
                                            {/* OAuth component */}
                                            <OAuth/>
                                            <span className="dividers text-muted mt-4">OR</span>
                                        </div>
                                        <form onSubmit={handleSubmit} className="row g-1 p-3 p-md-4">
                                            <div className="col-12">
                                                <div className="mb-2">
                                                    <label className="form-label">Email address</label>
                                                    <input
                                                        type="email"
                                                        onChange={handleChange}
                                                        className="form-control form-control-lg"
                                                        placeholder="name@example.com"
                                                        id="email"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                {error && error.email && (
                                                    <div className="text-danger">{error.email}</div>
                                                )}
                                            </div>
                                            <div className="col-12">
                                                <div className="mb-2">
                                                    <div className="form-label">
                            <span className="d-flex justify-content-between align-items-center">
                              Password
                              <a
                                  className="text-secondary"
                                  href="change-password"
                              >
                                Forgot Password?
                              </a>
                            </span>
                                                    </div>
                                                    <input
                                                        type="password"
                                                        onChange={handleChange}
                                                        className="form-control form-control-lg"
                                                        placeholder="***************"
                                                        id="password"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        defaultValue=""
                                                        id="flexCheckDefault"
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="flexCheckDefault"
                                                    >
                                                        Remember me
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-12 text-center mt-4">
                                                <button
                                                    disabled={loading}
                                                    type="submit"
                                                    id="submit"
                                                    className="btn btn-lg btn-block btn-light lift text-uppercase"
                                                >
                                                    {loading ? 'Loading...' : 'Sign in'}
                                                </button>
                                            </div>
                                            <div className="col-12 text-center mt-4">
                        <span className="text-muted">
                          Don't have an account yet?{' '}
                            <a href="signup" className="text-secondary">
                            Sign up here
                          </a>
                        </span>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};