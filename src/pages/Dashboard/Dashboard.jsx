import UsersTable from "../user/admin/usersTable.jsx";
import { useSelector } from "react-redux";
import { selectUserObject } from "../../redux/user/userSelector.js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


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
                        backgroundColor: ['#5f59a8', '#b488f6'],
                        hoverBackgroundColor: ['#5f59a8', '#b488f6']
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
                        backgroundColor: ['#68358d', '#b488f6', '#5f59a8'],
                        hoverBackgroundColor: ['#68358d', '#b488f6', '#5f59a8']
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

                                        <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0" >
                                            <i className="icofont-briefcase" style={{ width: "500px" , height: "500px"}}/>
                                            <i className="icofont-ticket" style={{ width: "500px" , height: "500px"}}/>
                                            <i className="icofont-users-alt-5" style={{ width: "500px!important" , height: "500px!important"}}/>


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
                                                <h1 className="mt-3 mb-0 fw-bold text-black">{userCount}</h1>
                                                <span className="text-black">Employees</span>
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