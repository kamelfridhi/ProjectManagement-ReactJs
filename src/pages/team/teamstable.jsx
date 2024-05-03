import React, {useEffect, useState} from "react";


import * as SprintsService from "../../_services/sprintService.jsx";
import * as ProjectService from "../../_services/ProjectService.jsx";
import addProject from "../projects/addProject.jsx";

import {Link} from "react-router-dom";
import {deleteSprintByName} from "../../_services/sprintService.jsx";
import addSprint from "../sprints/addSprint.jsx";
import {getAllteam} from "../../_services/TeamService.jsx";
import {affectteamtoproject, disaffectteamtoproject, getTeambyproject} from "../../_services/ProjectService.jsx";

export default function Teamstable({id}) {
    const [sprints, setSprints] = useState([]);
    const [teams, setTeams] = useState([]);

    const [sprintData, setSprintData] = useState({
        sprintPeriod:'1'
    });
    const [validationErrors, setValidationErrors] = useState({});
    const validateDates = (start, end) => {
        // Preserve previous validation errors
        setValidationErrors((prevErrors) => ({ ...prevErrors, dateError: undefined }));

        // Check if the start date is greater than or equal to the end date
        if (start && end && new Date(start) >= new Date(end)) {
            setValidationErrors((prevErrors) => ({
                ...prevErrors,
                dateError: 'Start date must be less than the end date',
            }));
        }
    };

    const handleAddSprint = async (idteam) => {
        try {
            const team=await affectteamtoproject(idteam,id);
            sprints.push(team)

        } catch (error) {
            console.error('Error creating sprint:', error);
        }
    };







// Define a function to convert sprintPeriod to days
    // Define a function to convert sprintPeriod to days
    // Define a function to convert sprintPeriod to days
    const getSprintPeriodInDays = (sprintPeriod) => {
        switch (sprintPeriod) {
            case '1':
                return 7; // One week
            case '2':
                return 14; // Two weeks
            case '3':
                return 21; // Three weeks
            default:
                return 0;
        }
    };








    const handleChange = (e) => {
       console.log(e.target.value)
    };


    const fetchSprints = async () => {
        try {
            const data2 = await getTeambyproject(id);
            setSprints(data2);
            const data = await getAllteam();
            setTeams(data.filter(team => !data2.some(team2 => team2._id === team._id)));
            console.log(data.filter(team => !data2.some(team2 => team2._id === team._id)))
        } catch (error) {
            console.error('Error fetching sprints:', error);
        }
    };
    useEffect(() => {




        fetchSprints();

    }, [sprints],[teams]);

    // ... (other imports and component setup)
    const sprintPeriod = sprintData?.sprintPeriod?.toString() ?? '';

    const handleRemoveSprint = async (idteam) => {
        try {
             // Delete sprint by name
            await disaffectteamtoproject(idteam,id);

        } catch (error) {
            console.error('Error removing sprint:', error);
        }
    };



    return (
        <>
            <div className="row g-3 mb-3 row-deck">
                <div className="col-md-12">
                    <div className="card mb-3">
                        <div className="card-header py-3 d-flex justify-content-between align-items-center">
                            <div className="info-header">
                                <h6 className="mb-0 fw-bold">Project Teams</h6>
                            </div>
                            {/* Body: Body */}
                            <div className="body d-flex py-lg-3 py-md-2">
                                <div className="container-xxl">
                                    <div className="row align-items-center">
                                        <div className="border-0 mb-4">
                                            <div
                                                className="card-header p-0 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap"
                                            >
                                                <div className="d-flex py-2 project-tab flex-wrap w-sm-100">
                                                    <button
                                                        type="button"
                                                        className="btn btn-dark w-sm-100"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#affectteam"
                                                        style={{backgroundColor: '#4c3575', color: '#ffffff'}}
                                                    >
                                                        <i className="icofont-plus-circle me-2 fs-6"/>
                                                        Affect Team
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <table id="myProjectTable" className="table table-hover align-middle mb-0"
                                   style={{width: '100%'}}>
                                <thead>
                                <tr>
                                    <th>Team Name</th>
                                    <th>Description</th>
                                    <th>category</th>
                                </tr>
                                </thead>
                                <tbody>
                                {sprints.map((sprint) => (
                                    <tr key={sprint._id}>
                                        <td>
                                            <Link to={`/Home/task/${sprint._id}`}>{sprint.name}</Link>
                                        </td>
                                        <td>{sprint.description}</td>
                                        <td>{sprint.category}</td>

                                        <td>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleRemoveSprint(sprint._id)}
                                            >
                                                Remove team
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>






            <div className="modal fade" id="affectteam" tabIndex={-1} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold" id="affectteamLabel">
                                Affect Team
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            {teams.map((team)=>{
                                return <> <div className="row g-3 mb-3">
                                    <div className="col">
                                        <label htmlFor="datepickerded" className="form-label">
                                            {team.name}
                                        </label>

                                    </div>
                                    <div className="col">
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={(e) => handleAddSprint(team._id)}
                                            style={{ backgroundColor: '#007bff' }}
                                        >
                                            add
                                        </button>
                                    </div>
                                </div>
                                </>

                            })}




                        </div>

                    </div>
                </div>
            </div>
        </>
    );


}