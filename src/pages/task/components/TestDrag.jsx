import React, {useEffect, useState} from "react";
import * as TaskService from "../../../_services/TaskService.jsx";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";




export default function TestDrag() {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const data = await TaskService.getAllTasks();
            setTasks(data);
        };
        fetchTasks();
    }, []);
    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        // Vérifier si la tâche a été déplacée vers une destination valide
        if (!destination) {
            return;
        }

        // Vérifier si la tâche a été déplacée vers une position différente
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        // Obtenir la tâche déplacée
        const movedTask = tasks.find((task) => task._id === draggableId);

        // Créer une copie de la liste de tâches actuelle
        const updatedTasks = [...tasks];

        // Supprimer la tâche de la liste d'origine
        updatedTasks.splice(source.index, 1);

        // Insérer la tâche dans la liste de destination
        updatedTasks.splice(destination.index, 0, movedTask);

        // Mettre à jour l'état avec la nouvelle liste de tâches réorganisée
        setTasks(updatedTasks);
    };

    return (

        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="row taskboard g-3 py-xxl-4">
                    {/* To Do Column */}
                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-12 mt-xxl-4 mt-xl-4 mt-lg-4 mt-md-4 mt-sm-4 mt-4">
                        <h6 className="fw-bold py-3 mb-0">To do</h6>
                        <Droppable droppableId="to-do">
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="droppable-column"
                                >
                                    {/* Contenu de la colonne To Do */}
                                    {tasks.map((task, index) => (
                                        <Draggable key={task._id} draggableId={task._id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    {/* Contenu d'une tâche */}
                                                    <li className="dd-item" key={task._id} data-id={1}>
                                                        <div className="dd-handle">
                                                            <div className="d-flex">
                                                                <h6 className="mt-2">{task.name}</h6>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>

                    {/* In Progress Column */}
                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-12 mt-xxl-4 mt-xl-4 mt-lg-4 mt-md-0 mt-sm-0 mt-0">
                        <h6 className="fw-bold py-3 mb-0">In Progress</h6>
                        <Droppable droppableId="in-progress">
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="droppable-column"
                                >
                                    {/* Contenu de la colonne In Progress */}
                                    {/* Placez ici le contenu de la colonne In Progress */}
                                </div>
                            )}
                        </Droppable>
                    </div>

                    {/* Done Column */}
                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-12 mt-xxl-4 mt-xl-4 mt-lg-4 mt-md-0 mt-sm-0 mt-0">
                        <h6 className="fw-bold py-3 mb-0">Done</h6>
                        <Droppable droppableId="done">
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="droppable-column"
                                >
                                    {/* Contenu de la colonne Done */}
                                    {/* Placez ici le contenu de la colonne Done */}
                                </div>
                            )}
                        </Droppable>
                    </div>
                </div>
            </DragDropContext>
        </>
    )
}
