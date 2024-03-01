import React, {useEffect, useState} from "react";
import * as TaskService from "../../../_services/TaskService.jsx";

export default function AddTask() {


    const [taskName, setTaskName] = useState('');
    const [taskCategory, setTaskCategory] = useState('');
    // Autres états pour les autres champs du formulaire

    const handleAddTask = async () => {
        try {
            // Créer un objet de données pour la nouvelle tâche
            const newTaskData = {
                name: taskName,
                category: taskCategory,
                // Ajoutez d'autres propriétés de tâche nécessaires
            };

            // Envoyer la requête POST pour créer une nouvelle tâche
            const createdTask = await TaskService.createTask(newTaskData);

            // Réinitialiser les champs du formulaire après la création de la tâche
            setTaskName('');
            setTaskCategory('');
            // Réinitialiser d'autres champs du formulaire si nécessaire

            // Faites quelque chose avec la tâche créée, par exemple, affichez un message de succès
            console.log('Task created successfully:', createdTask);
        } catch (error) {
            // Gérer les erreurs lors de la création de la tâche, par exemple, affichez un message d'erreur
            console.error('Error creating task:', error);
        }
    };


        return (
            <>



                <div className="modal-dialog modal-dialog-centered modal-md modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title  fw-bold" id="createprojectlLabel">
                                {" "}
                                Create Task
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
                                <label className="form-label">Project Name</label>
                                <select
                                    className="form-select"
                                    aria-label="Default select Project Category"
                                >
                                    <option selected="">Project Name Select</option>
                                    <option value={1}>Fast Cad</option>
                                    <option value={2}>Box of Crayons</option>
                                    <option value={3}>Gob Geeklords</option>
                                    <option value={4}>Java Dalia</option>
                                    <option value={5}>Practice to Perfect</option>
                                    <option value={6}>Rhinestone</option>
                                    <option value={7}>Social Geek Made</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Task Category</label>
                                <select
                                    className="form-select"
                                    aria-label="Default select Project Category"
                                >
                                    <option selected="">UI/UX Design</option>
                                    <option value={1}>Website Design</option>
                                    <option value={2}>App Development</option>
                                    <option value={3}>Quality Assurance</option>
                                    <option value={4}>Development</option>
                                    <option value={5}>Backend Development</option>
                                    <option value={6}>Software Testing</option>
                                    <option value={7}>Website Design</option>
                                    <option value={8}>Marketing</option>
                                    <option value={9}>SEO</option>
                                    <option value={10}>Other</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formFileMultipleone" className="form-label">
                                    Task Images &amp; Document
                                </label>
                                <input
                                    className="form-control"
                                    type="file"
                                    id="formFileMultipleone"
                                    multiple=""
                                />
                            </div>
                            <div className="deadline-form mb-3">
                                <form>
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="datepickerded" className="form-label">
                                                Task Start Date
                                            </label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="datepickerded"
                                            />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="datepickerdedone" className="form-label">
                                                Task End Date
                                            </label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="datepickerdedone"
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="row g-3 mb-3">
                                <div className="col-sm">
                                    <label className="form-label">Task Assign Person</label>
                                    <select
                                        className="form-select"
                                        multiple=""
                                        aria-label="Default select Priority"
                                    >
                                        <option selected="">Lucinda Massey</option>
                                        <option value={1}>Ryan Nolan</option>
                                        <option value={2}>Oliver Black</option>
                                        <option value={3}>Adam Walker</option>
                                        <option value={4}>Brian Skinner</option>
                                        <option value={5}>Dan Short</option>
                                        <option value={5}>Jack Glover</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row g-3 mb-3">
                                <div className="col-sm">
                                    <label className="form-label">Task Priority</label>
                                    <select
                                        className="form-select"
                                        aria-label="Default select Priority"
                                    >
                                        <option selected="">Highest</option>
                                        <option value={1}>Medium</option>
                                        <option value={2}>Low</option>
                                        <option value={3}>Lowest</option>
                                    </select>
                                </div>
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
                                    defaultValue={""}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Done
                            </button>
                            <button type="button" className="btn btn-primary">
                                Create
                            </button>
                        </div>
                    </div>
                </div>




            </>





        );

}

