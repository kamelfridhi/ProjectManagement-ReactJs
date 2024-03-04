import Teamcard from "./teamcard.jsx";
import {useEffect, useState} from "react";
import * as TeamService from "../../_services/TeamService.jsx";

export default function Teams() {

    const [teamName, setTeamName] = useState('');
    const [description, setdescription] = useState('');
    const [teamCategory, setTeamCategory] = useState('');
    const [teams, setTeams] = useState([]);

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
            // Créer un objet de données pour la nouvelle tâche
            const newTeamData = {
                name: teamName,
                description:description,
                category: teamCategory // Include the teamCategory

                // Ajoutez d'autres propriétés de tâche nécessaires
            };

            // Envoyer la requête POST pour créer une nouvelle tâche
            const createdTeam = await TeamService.addTeam(newTeamData);

            // Réinitialiser les champs du formulaire après la création de la tâche
            setTeamName('');
            setdescription('');
            setTeamCategory('');
            //setTaskCategory('');
            // Réinitialiser d'autres champs du formulaire si nécessaire
            // Fetch teams again to update the list
            fetchTeams();
            // Faites quelque chose avec la tâche créée, par exemple, affichez un message de succès
            console.log('Team created successfully:', createdTeam);
        } catch (error) {
            // Gérer les erreurs lors de la création de la tâche, par exemple, affichez un message d'erreur
            console.error('Error creating team:', error);
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
                                <input type="text" className="form-control" value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="Team Name" />

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