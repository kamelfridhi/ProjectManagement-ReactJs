import React, {useEffect, useState} from "react";


import * as SprintsService from "../../_services/sprintService.jsx";
import * as ProjectService from "../../_services/ProjectService.jsx";
import addProject from "../projects/addProject.jsx";
import addSprint from "./addSprint.jsx";
import {Link} from "react-router-dom";
import {deleteSprintByName} from "../../_services/sprintService.jsx";

export default function Sprints({id}) {
    const [sprints, setSprints] = useState([]);

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

    const handleAddSprint = async () => {
        try {
            const startDate = new Date(sprintData.startDate);

            console.log('Updated Sprint Data:', sprintData);
            console.log('Start date:', startDate);
            console.log('Sprint period:', sprintData.sprintPeriod);

            if (sprintData.sprintPeriod === 'Custom') {
                const endDate = new Date(sprintData.endDate);

                console.log('End date:', endDate);

                if (endDate <= startDate) {
                    setValidationErrors((prevErrors) => ({
                        ...prevErrors,
                        endDate: 'End date must be greater than start date',
                    }));
                    return;
                }

                //sprintData.endDate = endDate.toISOString();
            } else {
                const sprintPeriodInDays = getSprintPeriodInDays(sprintData.sprintPeriod);

                console.log('Sprint period in days:', sprintPeriodInDays);

                if (sprintPeriodInDays > 0) {
                    const endDate = new Date(startDate.getTime() + sprintPeriodInDays * 24 * 60 * 60 * 1000);

                    console.log('End date:', endDate);

                    //sprintData.endDate = endDate.toISOString();
                } else {
                    // Handle invalid sprint period
                    console.error('Invalid sprint period. Returning 0 days.');
                    return;
                }
            }

            console.log('Before adding sprint:', sprintData);

            await SprintsService.createSprint(sprintData,id);

            // Notify the parent component to update its state
            addSprint(sprintData);

            console.log('After adding sprint:', sprintData);
            // Reset validation errors after successfully creating a sprint
            setValidationErrors({});
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








    const handleChange = (e, field) => {
        const value = e.target.value;

        // Convert value to string
        setSprintData((prevData) => ({
            ...prevData,
            [field]: field === 'sprintPeriod' ? value.toString() : value,
        }));

        console.log('Updated Sprint Data:', sprintData);
    };



    useEffect(() => {
        const fetchSprints = async () => {
            try {
                console.log('Fetching sprints...');
                const data = await SprintsService.getAllSprints(id);
                setSprints(data);


            } catch (error) {
                console.error('Error fetching sprints:', error);
            }
        };

        fetchSprints();
    }, []);

    // ... (other imports and component setup)
    const sprintPeriod = sprintData?.sprintPeriod?.toString() ?? '';

    const handleRemoveSprint = async (sprintName) => {
        try {
            console.log('Removing sprint:', sprintName);
            // Delete sprint by name
            await deleteSprintByName(sprintName);

            // Remove the deleted sprint from the state
            setSprints((prevSprints) =>
                prevSprints.filter((sprint) => sprint.sprintName !== sprintName)
            );
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
                                <h6 className="mb-0 fw-bold">Project Sprints</h6>
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
                                                        data-bs-target="#createsprint"
                                                        style={{backgroundColor: '#343a40', color: '#ffffff'}}
                                                    >
                                                        <i className="icofont-plus-circle me-2 fs-6"/>
                                                        Create Sprint
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
                                    <th>Sprint Name</th>
                                    <th>Description</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {sprints.map((sprint) => (
                                    <tr key={sprint._id}>
                                        <td>
                                            <Link to={`/Home/task/${sprint._id}`}>{sprint.sprintName}</Link>
                                        </td>
                                        <td>{sprint.sprintDescription}</td>
                                        <td>{new Date(sprint.startDate).toLocaleDateString()}</td>
                                        <td>{new Date(sprint.endDate).toLocaleDateString()}</td>
                                        <td>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleRemoveSprint(sprint.sprintName)}
                                            >
                                                Remove Sprint
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

            {/* Create Sprint */}
            <div className="modal fade" id="createsprint" tabIndex={-1} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold" id="createsprintLabel">
                                Create Sprint
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput77" className="form-label">
                                    Sprint Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleFormControlInput77"
                                    placeholder="Explain what the Sprint Name"
                                    onChange={(e) => handleChange(e, 'sprintName')}
                                />
                            </div>
                            <div className="row g-3 mb-3">
                                <div className="col-sm-12">
                                    <label className="form-label">Sprint Period</label>
                                    <select
                                        className="form-select"
                                        aria-label="Default select example"
                                        value={sprintData.sprintPeriod}
                                        onChange={(e) => handleChange(e, 'sprintPeriod')}
                                    >
                                        <option value={1}>One week</option>
                                        <option value={2}>Two weeks</option>
                                        <option value={3}>Three weeks</option>
                                        <option value="Custom">Custom</option>
                                    </select>

                                </div>
                            </div>
                            <div className="row g-3 mb-3">
                                <div className="col">
                                    <label htmlFor="datepickerded" className="form-label">
                                        Sprint Start Date
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="datepickerded"
                                        onChange={(e) => handleChange(e, 'startDate')}
                                    />
                                </div>
                                <div className="col">
                                    <label htmlFor="datepickerdedone" className="form-label">
                                        Sprint End Date
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="datepickerdedone"
                                        onChange={(e) => handleChange(e, 'endDate')}
                                        disabled={sprintData.sprintPeriod !== 'Custom'}
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleFormControlTextarea78" className="form-label">
                                    Description (optional)
                                </label>
                                <textarea
                                    className="form-control"
                                    id="exampleFormControlTextarea78"
                                    rows={3}
                                    placeholder="Add any extra details about the sprint"

                                    onChange={(e) => handleChange(e, 'sprintDescription')}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Done
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleAddSprint}
                                style={{ backgroundColor: '#007bff' }}
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );


}