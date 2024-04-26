// AddProject.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as ProjectService from '../../_services/ProjectService.jsx';
import * as SprintService from "../../_services/ProjectService.jsx";
import * as SprintsService from "../../_services/sprintService.jsx";

const AddSprint = ({ addSprint }) => {
    // Ensure that useState is called directly inside the functional component
    const [sprintData, setSprintData] = useState({
        sprintName: '',
        sprintDescription: '',
        startDate: '',
        endDate: '',
        period:''
    });

    const handleChange = (e, field) => {
        const value = e.target.value;

        console.log('Updated Field:', field);
        console.log('Updated Value:', value);

        setSprintData((prevData) => ({
            ...prevData,
            [field]: field === 'sprintPeriod' ? parseInt(value, 10) || value : value,
        }));

        console.log('Updated Sprint Data:', sprintData);
        console.log('Updated Sprint Period:', sprintData.sprintPeriod);
    };


    const [validationErrors, setValidationErrors] = useState({});
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

                sprintData.endDate = endDate.toISOString();
            } else {
                const sprintPeriodInDays = getSprintPeriodInDays(sprintData.sprintPeriod);

                console.log('Sprint period in days:', sprintPeriodInDays);

                if (sprintPeriodInDays > 0) {
                    const endDate = new Date(startDate.getTime() + sprintPeriodInDays * 24 * 60 * 60 * 1000);

                    console.log('End date:', endDate);

                    sprintData.endDate = endDate.toISOString();
                } else {
                    // Handle invalid sprint period
                    console.error('Invalid sprint period. Returning 0 days.');
                    return;
                }
            }

            console.log('Before adding sprint:', sprintData);

            await SprintsService.createSprint(sprintData);

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
    const getSprintPeriodInDays = (sprintPeriod) => {
        switch (sprintPeriod) {
            case '1':
                return 7; // One week
            case '2':
                return 14; // Two weeks
            case '3':
                return 21; // Three weeks
            case 'Custom':
                return 0; // Custom period (user will input the end date)
            default:
                return 0;
        }
    };



    return (
        <div>
            {/* Your modal JSX here */}

            {/* Button to trigger handleAddProject */}
            <button type="button" className="btn btn-primary" onClick={handleAddSprint}>
                Create
            </button>
        </div>
    );
};

AddSprint.propTypes = {
    addSprint: PropTypes.func.isRequired,
};

export default AddSprint;
