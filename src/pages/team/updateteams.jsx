import { useEffect, useState } from "react";
import * as TeamService from "../../_services/TeamService.jsx";

export default function UpdateTeam({ id,fetchTeams }) {
    const [team, setTeam] = useState({});

    const [description, setdescription] = useState('');
    const [nameteam, setnameteam] = useState('');
    const [teamCategory, setTeamCategory] = useState('');
    const categories = ["marketing", "developement", "test",'sales','it']; // Example of static categories
    const [errors, setErrors] = useState({});

    const getData = async () => {
        console.log(id);
        const fetchedData = await TeamService.getOneTeam(id);
        setTeam(fetchedData);
        setnameteam(fetchedData.name);
        setTeamCategory(fetchedData.category);
        setdescription(fetchedData.description);
        console.log("Team name: ", fetchedData.name);
    };

    useEffect(() => {
        getData();
    }, [id]);

    const handleUpdate = async () => {
        try {
            let valid = true;
            const newErrors = {};
            if (!nameteam) {
                valid = false;
                newErrors.teamName = 'Team name is required';
            }


            // Perform input validation
            if (!teamCategory) {
                valid = false;
                newErrors.teamCategory = 'Team category is required';
            }

            if (description && description.length < 5) {
                valid = false;
                newErrors.description = 'Description should be at least 5 characters long';
            }

            // Update errors state
            setErrors(newErrors);

            // If form is valid, proceed with the update
            if (valid) {
                const updatedTeam = { name:nameteam, category: teamCategory, description: description };

                await TeamService.updateTeam(id, updatedTeam);
                fetchTeams();
                console.log("Team updated successfully");
            }
        } catch (error) {
            console.error("Error updating team:", error);
        }
    };

    return (
        <>
            <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-toggle="modal"
                data-bs-target={`#editproject-${id}`}            >
                <i className="icofont-edit text-success" />
             </button>

            <div className="modal fade"  id={`editproject-${id}`} tabIndex={-1} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title  fw-bold" id="editprojectLabel">
                                Edit Team
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput78" className="form-label">
                                    Team Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleFormControlInput78"
                                    value={nameteam}
                                    onChange={(e) => setnameteam(e.target.value)}
                                />
                                {errors.teamName && <div className="text-danger">{errors.teamName}</div>} {/* Display error for team name */}
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
                                {errors.teamCategory && <div className="text-danger">{errors.teamCategory}</div>} {/* Display error for team category */}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlTextarea786" className="form-label">
                                    Description (optional)
                                </label>
                                <textarea
                                    className="form-control"
                                    id="exampleFormControlTextarea786"
                                    rows={3}
                                    placeholder="Add any extra details about the request"
                                    value={description}
                                    onChange={(e) => setdescription(e.target.value)}
                                />
                                {errors.description && <div className="text-danger">{errors.description}</div>} {/* Display error for description */}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleUpdate}>
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
