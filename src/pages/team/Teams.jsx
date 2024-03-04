import Teamcard from "./teamcard.jsx";
import {useEffect, useState} from "react";
import * as TeamService from "../../_services/TeamService.jsx";

export default function Teams() {

    const [teamName, setTeamName] = useState('');
    const [description, setdescription] = useState('');
    const [teamCategory, setTeamCategory] = useState('');
    const [teams, setTeams] = useState([]);
    const [errors, setErrors] = useState({
        teamName: '',
        teamCategory: '',
        description: '',
    });
    const categories = ["marketing", "developement", "test",'sales','it']; // Example of static categories
    useEffect(() => {
        // Fetch teams when the component mounts
        fetchTeams();
    }, []);

    const fetchTeams = async () => {
        try {
            const fetchedTeams = await TeamService.getAllteam(); // Assuming you have a function to get teams from your service
            setTeams(fetchedTeams);
        } catch (error) {
            console.error('Error fetching teams:', error);
        }
    };


    const handleAddTeam = async () => {
        try {
            let valid = true;
            const newErrors = {};

            if (!teamName) {
                valid = false;
                newErrors.teamName = 'Team name is required';
            }
            else if( teamName.length < 5)
            {
                valid = false;
                newErrors.teamName = 'Team should be at least 5 characters long';
            }
            if (!teamCategory) {
                valid = false;
                newErrors.teamCategory = 'Team category is required';
            }

            // Validate description field if it exists
            if (!description) {
                valid = false;
                newErrors.description = 'Description is required';
            }
            else if( description.length < 5)
            {
                valid = false;
                newErrors.description = 'description should be at least 5 characters long';
            }
            // Update errors state
            setErrors(newErrors);

            // If form is valid, proceed
            if (valid) {
                // Create a data object for the new team
                const newTeamData = {
                    name: teamName,
                    description: description,
                    category: teamCategory
                    // Add other necessary task properties
                };

                // Send POST request to create a new team
                const createdTeam = await TeamService.addTeam(newTeamData);

                // Reset form fields after creating the team
                setTeamName('');
                setdescription('');
                setTeamCategory('');

                // Fetch teams again to update the list
                fetchTeams();

                // Do something with the created team, for example, display a success message
                console.log('Team created successfully:', createdTeam);
            }
        } catch (error) {
            // Handle errors when creating the team, for example, display an error message
            console.error('Error creating team:', error.message);
        }
    };


    return (

        <>
        <div className="row align-items-center" >
            <div className="border-0 mb-4">
                <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                    <h3 className="fw-bold mb-0">Teams</h3>
                    <div className="col-auto d-flex w-sm-100">
                        <button
                            type="button"
                            className="btn btn-dark btn-set-task w-sm-100"
                            data-bs-toggle="modal"
                            data-bs-target="#createtask"
                            style={{backgroundColor: '#4c3575'}}
                        >
                            <i className="icofont-plus-circle me-2 fs-6" />
                            Add Team
                        </button>


                    </div>
                </div>
            </div>
        </div>
        <div className="row align-items-center">
            <div className="col-lg-12 col-md-12 flex-column">
                <div className="tab-content mt-4">
                    <div className="tab-pane fade show active" id="All-list">
                        <div className="row g-3 gy-5 py-3 row-deck">
 {}
                            {teams.map((team, index) => (
                                <Teamcard key={index} team={team}  fetchTeams={fetchTeams}/>

                            ))}

                        </div>
                        </div>
                        </div>
                        </div>
                        </div>
            <div
                className="modal fade"
                id="createtask"
                tabIndex={-1}
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title  fw-bold" id="createprojectlLabel">
                                {" "}
                                Create Team
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Team Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={teamName}
                                    onChange={(e) => setTeamName(e.target.value)}
                                    placeholder="Team Name"
                                />
                                {errors.teamName && <div className="text-danger">{errors.teamName}</div>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Team Category</label>
                                <select
                                    className="form-select"
                                    aria-label="Default select Project Category"
                                    value={teamCategory}
                                    onChange={(e) => setTeamCategory(e.target.value)}
                                >
                                    <option value="">Select a category</option>
                                    {categories.map((category, index) => (
                                        <option key={index} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                                {errors.teamCategory && <div className="text-danger">{errors.teamCategory}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlTextarea786" className="form-label">Description (optional)</label>
                                <textarea
                                    className="form-control"
                                    id="exampleFormControlTextarea786"
                                    rows={3}
                                    placeholder="Add any extra details about the request"
                                    value={description}
                                    onChange={(e) => setdescription(e.target.value)}

                                />
                                {errors.description && <div className="text-danger">{errors.description}</div>}

                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                onClick={handleAddTeam}
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}