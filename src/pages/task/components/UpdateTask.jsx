import React, { useState, useEffect } from 'react';
import * as TaskService from "../../../_services/TaskService.jsx";

const UpdateTaskForm = ({ task, onUpdate }) => {
    const [updatedTask, setUpdatedTask] = useState(task);

    useEffect(() => {
        setUpdatedTask(task); // Pré-remplir le formulaire avec les données de la tâche actuelle
        const fetchTasks = async () => {
            const data = await TaskService.updateTask();
            setTasks(data);
        };
        fetchTasks();
    }, [task]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedTask({ ...updatedTask, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(updatedTask);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={updatedTask.name}
                    onChange={handleChange}
                />
            </div>
            {/* Ajoutez d'autres champs ici comme la catégorie, la priorité, etc. */}
            <button type="submit">Update Task</button>
        </form>
    );
};

export default UpdateTaskForm;
