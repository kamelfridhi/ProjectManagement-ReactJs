import UsersTable from "../user/admin/usersTable.jsx";
import { useSelector } from "react-redux";
import { selectUserObject } from "../../redux/user/userSelector.js";
import axios from "axios";
import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";


ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
    const currentUser = useSelector(selectUserObject);
    const [userCount, setUserCount] = useState(0);
    const [genderData, setGenderData] = useState(null);
    const [ageData, setAgeData] = useState(null);
    const url = "http://localhost:3000/user/";
    useEffect(() => {
        const fetchData = async () => {
            // Fetch user count
            const userCountResponse = await axios.get(`${url}count`);
            setUserCount(userCountResponse.data);
        };
        fetchData();

    }, []);

    useEffect(() => {

        // Fetch user count
        const userCountResponse = axios.get(`${url}count`);
        setUserCount(userCountResponse.data);
        // Fetch gender distribution data from API
        axios.get('http://localhost:3000/user/gender-distribution')
            .then(response => {
                const { male, female } = response.data;
                setGenderData({
                    labels: ['Male', 'Female'],
                    datasets: [{
                        data: [male, female],
                        backgroundColor: ['#36A2EB', '#FF6384'],
                        hoverBackgroundColor: ['#36A2EB', '#FF6384']
                    }]
                });
            })
            .catch(error => {
                console.error('Error fetching gender distribution:', error);
            });

        // Fetch age distribution data from API
        axios.get('http://localhost:3000/user/age-distribution')
            .then(response => {
                const ageDistribution = response.data;
                setAgeData({
                    labels: Object.keys(ageDistribution),
                    datasets: [{
                        data: Object.values(ageDistribution),
                        backgroundColor: ['#FFCE56', '#FF6384', '#36A2EB'],
                        hoverBackgroundColor: ['#FFCE56', '#FF6384', '#36A2EB']
                    }]
                });
            })
            .catch(error => {
                console.error('Error fetching age distribution:', error);
            });
    }, []);


    return (
        <>
            {/* Body: Body */}
            <div className="body d-flex py-3">
                <div className="container-xxl">
                    <div className="row clearfix g-3">
                        <div className="col-xl-8 col-lg-12 col-md-12 flex-column">
                            <div className="row g-3">
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                                            <h6 className="mb-0 fw-bold ">Employees Info</h6>
                                        </div>
                                        <div className="card-body">
                                            <div
                                                className="ac-line-transparent"
                                                id="apex-emplyoeeAnalytics"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card">
                                        <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                                            <h6 className="mb-0 fw-bold ">Employees Availability</h6>
                                        </div>
                                        <h2>Age Distribution</h2>
                                        {ageData && <Doughnut data={ageData} />}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card">
                                        <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                                            <h6 className="mb-0 fw-bold ">Total Employees</h6>
                                            <h4 className="mb-0 fw-bold ">{userCount}</h4>
                                        </div>
                                        <div>
                                            <h2>Gender Distribution</h2>
                                            {genderData && <Doughnut data={genderData} />}


                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                                            <h6 className="mb-0 fw-bold ">Top Hiring Sources</h6>
                                        </div>
                                        <div className="card-body">
                                            <div id="hiringsources" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-12 col-md-12">
                            <div className="row g-3 row-deck">
                                <div className="col-md-6 col-lg-6 col-xl-12">
                                    <div className="card bg-primary">
                                        <div className="card-body row">
                                            <div className="col">
                                                <span className="avatar lg bg-white rounded-circle text-center d-flex align-items-center justify-content-center">
                                                    <i className="icofont-file-text fs-5" />
                                                </span>
                                                <h1 className="mt-3 mb-0 fw-bold text-white">1546</h1>
                                                <span className="text-white">Applications</span>
                                            </div>
                                            <div className="col">
                                                <img
                                                    className="img-fluid"
                                                    src="/assets/images/interview.svg"
                                                    alt="interview"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-6 col-xl-12  flex-column">
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center flex-fill">
                                                <span className="avatar lg light-success-bg rounded-circle text-center d-flex align-items-center justify-content-center">
                                                    <i className="icofont-users-alt-2 fs-5" />
                                                </span>
                                                <div className="d-flex flex-column ps-3  flex-fill">
                                                    <h6 className="fw-bold mb-0 fs-4">246</h6>
                                                    <span className="text-muted">Interviews</span>
                                                </div>
                                                <i className="icofont-chart-bar-graph fs-3 text-muted" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center flex-fill">
                                                <span className="avatar lg light-success-bg rounded-circle text-center d-flex align-items-center justify-content-center">
                                                    <i className="icofont-holding-hands fs-5" />
                                                </span>
                                                <div className="d-flex flex-column ps-3 flex-fill">
                                                    <h6 className="fw-bold mb-0 fs-4">101</h6>
                                                    <span className="text-muted">Hired</span>
                                                </div>
                                                <i className="icofont-chart-line fs-3 text-muted" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-12 col-xl-12">
                                    <div className="card">
                                        <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                                            <h6 className="mb-0 fw-bold ">Upcomming Interviews</h6>
                                        </div>
                                        <div className="card-body">
                                            <div className="flex-grow-1">
                                                <div className="py-2 d-flex align-items-center border-bottom flex-wrap">
                                                    <div className="d-flex align-items-center flex-fill">
                                                        <img
                                                            className="avatar lg rounded-circle img-thumbnail"
                                                            src="/assets/images/lg/avatar2.jpg"
                                                            alt="profile"
                                                        />
                                                        <div className="d-flex flex-column ps-3">
                                                            <h6 className="fw-bold mb-0 small-14">
                                                                Natalie Gibson
                                                            </h6>
                                                            <span className="text-muted">Ui/UX Designer</span>
                                                        </div>
                                                    </div>
                                                    <div className="time-block text-truncate">
                                                        <i className="icofont-clock-time" /> 1.30 - 1:30
                                                    </div>
                                                </div>
                                                <div className="py-2 d-flex align-items-center border-bottom flex-wrap">
                                                    <div className="d-flex align-items-center flex-fill">
                                                        <img
                                                            className="avatar lg rounded-circle img-thumbnail"
                                                            src="/assets/images/lg/avatar9.jpg"
                                                            alt="profile"
                                                        />
                                                        <div className="d-flex flex-column ps-3">
                                                            <h6 className="fw-bold mb-0 small-14">
                                                                Peter Piperg
                                                            </h6>
                                                            <span className="text-muted">Web Design</span>
                                                        </div>
                                                    </div>
                                                    <div className="time-block text-truncate">
                                                        <i className="icofont-clock-time" /> 9.00 - 1:30
                                                    </div>
                                                </div>
                                                <div className="py-2 d-flex align-items-center border-bottom flex-wrap">
                                                    <div className="d-flex align-items-center flex-fill">
                                                        <img
                                                            className="avatar lg rounded-circle img-thumbnail"
                                                            src="/assets/images/lg/avatar12.jpg"
                                                            alt="profile"
                                                        />
                                                        <div className="d-flex flex-column ps-3">
                                                            <h6 className="fw-bold mb-0 small-14">
                                                                Robert Young
                                                            </h6>
                                                            <span className="text-muted">PHP Developer</span>
                                                        </div>
                                                    </div>
                                                    <div className="time-block text-truncate">
                                                        <i className="icofont-clock-time" /> 1.30 - 2:30
                                                    </div>
                                                </div>
                                                <div className="py-2 d-flex align-items-center border-bottom flex-wrap">
                                                    <div className="d-flex align-items-center flex-fill">
                                                        <img
                                                            className="avatar lg rounded-circle img-thumbnail"
                                                            src="/assets/images/lg/avatar8.jpg"
                                                            alt="profile"
                                                        />
                                                        <div className="d-flex flex-column ps-3">
                                                            <h6 className="fw-bold mb-0 small-14">
                                                                Victoria Vbell
                                                            </h6>
                                                            <span className="text-muted">IOS Developer</span>
                                                        </div>
                                                    </div>
                                                    <div className="time-block text-truncate">
                                                        <i className="icofont-clock-time" /> 2.00 - 3:30
                                                    </div>
                                                </div>
                                                <div className="py-2 d-flex align-items-center border-bottom flex-wrap">
                                                    <div className="d-flex align-items-center flex-fill">
                                                        <img
                                                            className="avatar lg rounded-circle img-thumbnail"
                                                            src="/assets/images/lg/avatar7.jpg"
                                                            alt="profile"
                                                        />
                                                        <div className="d-flex flex-column ps-3">
                                                            <h6 className="fw-bold mb-0 small-14">Mary Butler</h6>
                                                            <span className="text-muted">Writer</span>
                                                        </div>
                                                    </div>
                                                    <div className="time-block text-truncate">
                                                        <i className="icofont-clock-time" /> 4.00 - 4:30
                                                    </div>
                                                </div>
                                                <div className="py-2 d-flex align-items-center border-bottom flex-wrap">
                                                    <div className="d-flex align-items-center flex-fill">
                                                        <img
                                                            className="avatar lg rounded-circle img-thumbnail"
                                                            src="/assets/images/lg/avatar3.jpg"
                                                            alt="profile"
                                                        />
                                                        <div className="d-flex flex-column ps-3">
                                                            <h6 className="fw-bold mb-0 small-14">Youn Bel</h6>
                                                            <span className="text-muted">Unity 3d</span>
                                                        </div>
                                                    </div>
                                                    <div className="time-block text-truncate">
                                                        <i className="icofont-clock-time" /> 7.00 - 8.00
                                                    </div>
                                                </div>
                                                <div className="py-2 d-flex align-items-center  flex-wrap">
                                                    <div className="d-flex align-items-center flex-fill">
                                                        <img
                                                            className="avatar lg rounded-circle img-thumbnail"
                                                            src="/assets/images/lg/avatar2.jpg"
                                                            alt="profile"
                                                        />
                                                        <div className="d-flex flex-column ps-3">
                                                            <h6 className="fw-bold mb-0 small-14">
                                                                Gibson Butler
                                                            </h6>
                                                            <span className="text-muted">Networking</span>
                                                        </div>
                                                    </div>
                                                    <div className="time-block text-truncate">
                                                        <i className="icofont-clock-time" /> 8.00 - 9.00
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="card light-danger-bg">
                                <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                                    <h6 className="mb-0 fw-bold ">Top Perfrormers</h6>
                                </div>
                                <div className="card-body">
                                    <div className="row g-3 align-items-center">
                                        <div className="col-md-12 col-lg-4 col-xl-4 col-xxl-2">
                                            <p>
                                                You have 140 <span className="fw-bold">influencers </span>{" "}
                                                in your company.
                                            </p>
                                            <div className="d-flex  justify-content-between text-center">
                                                <div className="">
                                                    <h3 className="fw-bold">350</h3>
                                                    <span className="small">New Task</span>
                                                </div>
                                                <div className="">
                                                    <h3 className="fw-bold">130</h3>
                                                    <span className="small">Task Completed</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-lg-12 col-xl-12 col-xxl-10">
                                            <div className="row g-3 row-cols-2 row-cols-sm-3 row-cols-md-3 row-cols-lg-3 row-cols-xl-3 row-cols-xxl-6 row-deck top-perfomer">
                                                <div className="col">
                                                    <div className="card shadow">
                                                        <div className="card-body text-center d-flex flex-column justify-content-center">
                                                            <img
                                                                className="avatar lg rounded-circle img-thumbnail mx-auto"
                                                                src="/assets/images/lg/avatar2.jpg"
                                                                alt="profile"
                                                            />
                                                            <h6 className="fw-bold my-2 small-14">Luke Short</h6>
                                                            <span className="text-muted mb-2">@Short</span>
                                                            <h4 className="fw-bold text-primary fs-3">80%</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="card shadow">
                                                        <div className="card-body text-center d-flex flex-column justify-content-center">
                                                            <img
                                                                className="avatar lg rounded-circle img-thumbnail mx-auto"
                                                                src="/assets/images/lg/avatar5.jpg"
                                                                alt="profile"
                                                            />
                                                            <h6 className="fw-bold my-2 small-14">John Hard</h6>
                                                            <span className="text-muted mb-2">@rdacre</span>
                                                            <h4 className="fw-bold text-primary fs-3">70%</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="card shadow">
                                                        <div className="card-body text-center d-flex flex-column justify-content-center">
                                                            <img
                                                                className="avatar lg rounded-circle img-thumbnail mx-auto"
                                                                src="/assets/images/lg/avatar8.jpg"
                                                                alt="profile"
                                                            />
                                                            <h6 className="fw-bold my-2 small-14">Paul Rees</h6>
                                                            <span className="text-muted mb-2">@Rees</span>
                                                            <h4 className="fw-bold text-primary fs-3">77%</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="card shadow">
                                                        <div className="card-body text-center d-flex flex-column justify-content-center">
                                                            <img
                                                                className="avatar lg rounded-circle img-thumbnail mx-auto"
                                                                src="/assets/images/lg/avatar9.jpg"
                                                                alt="profile"
                                                            />
                                                            <h6 className="fw-bold my-2 small-14">Rachel Parr</h6>
                                                            <span className="text-muted mb-2">@Parr</span>
                                                            <h4 className="fw-bold text-primary fs-3">85%</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="card shadow">
                                                        <div className="card-body text-center d-flex flex-column justify-content-center">
                                                            <img
                                                                className="avatar lg rounded-circle img-thumbnail mx-auto"
                                                                src="/assets/images/lg/avatar12.jpg"
                                                                alt="profile"
                                                            />
                                                            <h6 className="fw-bold my-2 small-14">Eric Reid</h6>
                                                            <span className="text-muted mb-2">@Eric</span>
                                                            <h4 className="fw-bold text-primary fs-3">95%</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="card shadow">
                                                        <div className="card-body text-center d-flex flex-column justify-content-center">
                                                            <img
                                                                className="avatar lg rounded-circle img-thumbnail mx-auto"
                                                                src="/assets/images/lg/avatar3.jpg"
                                                                alt="profile"
                                                            />
                                                            <h6 className="fw-bold my-2 small-14">Jan Ince</h6>
                                                            <span className="text-muted mb-2">@Ince</span>
                                                            <h4 className="fw-bold text-primary fs-3">97%</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        currentUser.role.role === "admin" && (
                            <>
                                <UsersTable etat={0} />
                                <UsersTable etat={1} />
                                <UsersTable etat={-1} />
                            </>
                        )
                    }

                    {/* Row End */}
                </div>

            </div>


        </>


    );
}