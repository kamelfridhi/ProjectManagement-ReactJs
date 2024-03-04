import { useEffect, useState } from "react";
import * as TeamService from "../../_services/TeamService.jsx";

export default function UpdateTeam({ id,fetchTeams }) {
    const [team, setTeam] = useState({});

    const [description, setdescription] = useState('');
    const [teamCategory, setTeamCategory] = useState('');
    const categories = ["marketing", "developement", "test",'sales','it']; // Example of static categories

    const getData = async () => {
        console.log(id);
        const fetchedData = await TeamService.getOneTeam(id);
        setTeam(fetchedData);
        setTeamCategory(fetchedData.category);
        setdescription(fetchedData.description);
        console.log("Team name: ", fetchedData.name);
    };

    useEffect(() => {
        getData();
    }, [id]);

    const handleUpdate = async () => {
        try {
            const updatedTeam = { ...team, category: teamCategory, description: description }; // Update category and description in team object

            await TeamService.updateTeam(id, updatedTeam); // Supposons que vous ayez une fonction de service pour mettre à jour l'équipe
            fetchTeams();
            console.log("Team updated successfully");
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
                                    value={team.name || ""} // Utiliser value au lieu de defaultValue
                                    onChange={(e) => setTeam({ ...team, name: e.target.value })} // Mettre à jour le nom de l'équipe lors de la saisie
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Team Category</label>
                                <select
                                    className="form-select"
                                    aria-label="Default select Project Category"
                                    value={teamCategory} // Assuming you have state for selected category
                                    onChange={(e) => setTeamCategory(e.target.value)} // Assuming you have a function to set the selected category
                                >
                                    <option value="">Select a category</option>
                                    {categories.map((category, index) => (
                                        <option key={index} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="exampleFormControlTextarea786"
                                    className="form-label"
                                >
                                    Description (optional)
                                </label>
                                <textarea
                                    className="form-control"
                                    id="exampleFormControlTextarea786"
                                    rows={3}
                                    placeholder="Add any extra details about the request"
                                    value={description}
                                    onChange={(e) => setdescription(e.target.value)}
                                    defaultValue={""}
                                />
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
