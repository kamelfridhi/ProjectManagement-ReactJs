import * as UserService from "./../../_services/UserService";
import * as Yup from 'yup';
import { useFormik } from 'formik';
export default function Signup() {

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('username is required')
            .matches(
                /^[a-zA-Z0-9]{5,}$/,
                'Folder name must be at least 5 characters long and contain only alphanumeric characters.',
            ),

    });

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log(values);
            try {
                await UserService.addUser(values);
                formik.resetForm();
            } catch (error) {
                console.error(error);
            }
        },
    });

    return (
        <>
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
                                            My-Task Lets Management Better
                                        </h2>
                                    </div>
                                    {/* Image block */}
                                    <div className="">
                                        <img src="/assets/images/login-img.svg" alt="login-img" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 d-flex justify-content-center align-items-center border-0 rounded-lg auth-h100" style={{ backgroundColor: "#4c3575" }}>
                                <div
                                    className="w-100 p-3 p-md-5 card border-0 bg-dark text-light"
                                    style={{ maxWidth: "32rem" }}
                                >
                                    {/* Form */}
                                    <form onSubmit={formik.handleSubmit} className="row g-1 p-3 p-md-4">
                                        <div className="col-12 text-center mb-1 mb-lg-5">
                                            <h1>Create your account</h1>
                                            <span>Free access to our dashboard.</span>
                                        </div>
                                        <div className="col-6">
                                            <div className="mb-2">
                                                <label className="form-label">Full name</label>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    placeholder="John"
                                                    value={formik.values.username}
                                                        id='username'
                                                    onChange={formik.handleChange} // Assurez-vous que les changements sont gérés par formik
                                                    onBlur={formik.handleBlur}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="mb-2">
                                                <label className="form-label">&nbsp;</label>
                                                <input
                                                    type="email"
                                                    className="form-control form-control-lg"
                                                    placeholder="Parker"
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
                                                    value={formik.values.email}
                                                    id='email'
                                                    onChange={formik.handleChange} // Assurez-vous que les changements sont gérés par formik
                                                    onBlur={formik.handleBlur}
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
                                                    value={formik.values.password}
                                                    id='password'
                                                    onChange={formik.handleChange} // Assurez-vous que les changements sont gérés par formik
                                                    onBlur={formik.handleBlur}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="mb-2">
                                                <label className="form-label">Confirm password</label>
                                                <input
                                                    type="email"
                                                    className="form-control form-control-lg"
                                                    placeholder="8+ characters required"
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
                                                    I accept the{" "}
                                                    <a
                                                        href="#"
                                                        title="Terms and Conditions"
                                                        className="text-secondary"
                                                    >
                                                        Terms and Conditions
                                                    </a>
                                                </label>
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
                                                <a
                                                    href="auth-signin.html"
                                                    title="Sign in"
                                                    className="text-secondary"
                                                >
                                                    Sign in here
                                                </a>
                                            </span>
                                        </div>
                                    </form>
                                    {/* End Form */}
                                </div>
                            </div>
                        </div>{" "}
                        {/* End Row */}
                    </div>
                </div>
            </div>
        </>
    )
}