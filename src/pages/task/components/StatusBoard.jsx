import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircle, faMinus, faPlus, faPlusCircle, faTimesCircle, faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import * as TaskService from '../../../_services/TaskService.jsx';
import * as StatusService from "../../../_services/StatusService.jsx";
import Swal from 'sweetalert2'
import {addStatus, deleteStatus, getAllStatus} from "../../../_services/StatusService.jsx";



export default function StatusBoard({ refresh }) {
    const [tasks, setTasks] = useState([]);
    const [columns, setColumns] = useState([]);
    const [newStatus, setNewStatus] = useState('');
    const [statuses, setStatuses] = useState([]);


    const fetchTasks = async () => {
        try {
            const [data, status] = await Promise.all([TaskService.getAllTasks(), StatusService.getAllStatus()]);

            const mappedColumns = status.map((column) => ({
                id: column._id,
                status: column.status,
                items: [],
            }));

            data.forEach((task) => {
                const columnId = getColumnIdByStatus(task.status[task.status.length - 1].status, mappedColumns);

                if (columnId !== null) {
                    const columnToUpdate = mappedColumns.find((column) => column.id === columnId);
                    columnToUpdate.items.push({
                        id: task._id,
                        name: task.name,
                        category: task.category,
                        description: task.description,
                        priority: task.priority,
                        dueDate: task.creationDate,

                        status: task.status.length > 0 ? task.status[task.status.length - 1].status : 'Aucun statut',
                    });
                }
            });

            console.log(mappedColumns);

            setColumns(mappedColumns);
            setTasks(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
        fetchStatuses();
    }, [refresh]);
    const fetchStatuses = async () => {
        try {
            const fetchedStatuses = await getAllStatus(); // Récupérer les statuts depuis le service
            setStatuses(fetchedStatuses); // Mettre à jour les statuts
        } catch (error) {
            console.error('Error fetching statuses:', error);
        }
    };

// Helper function to get column id based on task status
    const getColumnIdByStatus = (status, columns) => {
        const foundColumn = columns.find((column) => column.status === status);
        return foundColumn ? foundColumn.id : null;
    };



    const changeTaskStatusByName = async (taskId, newStatus) => {
        try {
            await TaskService.changeTaskStatus(taskId, newStatus);
            // Mettre à jour localement le statut de la tâche modifiée
            const updatedTasks = tasks.map((task) => {
                if (task._id === taskId) {
                    return {
                        ...task,
                        status: [{ status: newStatus }], // Mettre à jour le statut de la tâche
                    };
                }
                return task;
            });
            setTasks(updatedTasks);

        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const { source, destination } = result;
        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns.find((column) => column.id === (source.droppableId));
            const desColumn = columns.find((column) => column.id === (destination.droppableId));
            console.log(result)
            const sourceItems = [...sourceColumn.items];
            const destItems = [...desColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            changeTaskStatusByName(removed.id, desColumn.id);
            destItems.splice(destination.index, 0, removed);
            setColumns((prevColumns) => {
                const updatedColumns = [...prevColumns];
                updatedColumns.find((column) => column.id === (source.droppableId)).items = sourceItems;
                updatedColumns.find((column) => column.id === (destination.droppableId)).items = destItems;
                return updatedColumns;
            });
        } else {
            const column = columns.find((column) => column.id === (source.droppableId));
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns((prevColumns) => {
                const updatedColumns = [...prevColumns];
                updatedColumns.find((column) => column.id === (source.droppableId)).items = copiedItems;
                return updatedColumns;
            });
        }
    };

    const handleDeleteStatus = async (statusId, status) => {
        console.log(status + "staaaaaaatttttuuuuttttt")
        try {
            if (status !== 'TODO' && status !== 'INPROGRESS' && status !== 'DONE') {
                await Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to delete  '" + status + "' status",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#68358d",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete '" +status + "' status",
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        // Supprimer l'élément
                        await StatusService.deleteStatus(statusId);
                        // Afficher un message de confirmation
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your status has been deleted.",
                            icon: "success"
                        });
                        fetchTasks(); // Appeler fetchTasks pour rafraîchir les tâches après la suppression
                    }
                });
            } else {
                // Afficher un message d'erreur
                Swal.fire({
                    title: "Error!",
                    text: "Vous ne pouvez pas supprimer une tâche avec ce statut.",
                    icon: "error"
                });
            }
        } catch (error) {
            console.error('Error deleting task:', error);
            // Afficher un message d'erreur
            Swal.fire({
                title: "Error!",
                text: "An error occurred while deleting the task.",
                icon: "error"
            });
        }
    };


    const handleAddStatus = async (e) => {
        e.preventDefault();
        const projectId = '65eb0662938257e24665fb0e'; // Remplacez 'your_static_project_id' par l'ID statique souhaité
        const maxStatusCount = 5; // Nombre maximum de statuts
        try {
            // Récupérer les statuts actuels
            const statusData = await StatusService.getAllStatus();
            const currentStatusCount = statusData.length; // Compter le nombre de statuts actuels
            if (currentStatusCount >= maxStatusCount) {
                // Afficher une alerte si le nombre maximum est atteint
                Swal.fire({
                    icon: 'warning',
                    title: 'Maximum Number of Status Reached',
                    text: `You have reached the maximum number of status, which is ${maxStatusCount}.`,
                    confirmButtonText: 'OK'
                });
            } else {
                // Ajouter le statut si le nombre maximum n'est pas atteint
                await addStatus({ status: newStatus }, projectId);
                setNewStatus('');
                fetchTasks();
            }
        } catch (error) {
            console.error('Error adding status:', error);
        }
    };



    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'end' , marginTop: 20 }}>

                <form onSubmit={handleAddStatus}>
                    <input
                        className="form-control"
                        type="text"
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        placeholder="Enter new status"
                    />
                    <button type="submit" className="btn btn-dark btn-set-task w-sm-100"


                            style={{ backgroundColor: '#4c3575' , marginLeft: 50 , marginTop: 8 }}><i className="icofont-plus-circle me-2 fs-6" /> Add Status</button>
                </form>
        </div>

            <div style={{ display: 'flex', justifyContent: 'start', height: '100%' ,marginLeft: 1}}>

                <DragDropContext onDragEnd={onDragEnd}>
                    {columns.map((column) => (
                        <div key={column.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                            <h6 className="fw-bold py-3 mb-0"  style={{ display: 'flex', justifyContent: 'end'}}>{column.status}
                                {column.status !== 'TODO' && column.status !== 'INPROGRESS' && column.status !== 'DONE' && (


                                    <FontAwesomeIcon icon={faTimesCircle} onClick={() => handleDeleteStatus(column.id, column.status)} style={{width: 20, height: 20 , color: 'red' , marginLeft: 10}}/>
                                )}

                            </h6>

                            <div style={{ margin: 8 }} className="dd-list card-body mem-list" >

                                <Droppable droppableId={column.id.toString()} key={column.id}>
                                    {(provided, snapshot) => (
                                        <div

                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            style={{
                                                background: snapshot.isDraggingOver ? '#4c3575' : 'white',
                                                padding: 1,
                                                width: 250,
                                                minHeight: 530,
                                            }}
                                        >

                                            <ol className="dd-list">
                                            {column.items.map((item, index) => (
                                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={{
                                                                userSelect: 'none',
                                                                padding: 6,
                                                                margin: '0 0 1px 0',
                                                                minHeight: '10px',

                                                                color: 'white',
                                                                ...provided.draggableProps.style,
                                                            }}
                                                        >

                                                            <li className="dd-item" key={item.id} data-id={1}>
                                                                <div className="dd-handle">
                                                                    <div
                                                                        className="task-info d-flex align-items-center justify-content-between">
                                                                        <h6 className="light-info-bg py-1 px-2 rounded-1 d-inline-block fw-bold small-14 mb-0">
                                                                            {item.name}
                                                                        </h6>
                                                                        <div
                                                                            className="task-priority d-flex flex-column align-items-center justify-content-center">
                                                                            <div className="avatar-list avatar-list-stacked m-0">

                                                                                <img
                                                                                    className="avatar rounded-circle small-avt"
                                                                                    src="../../../../public/assets/images/xs/avatar1.jpg"
                                                                                    alt=""
                                                                                />
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                    <p className="py-2 mb-0">
                                                                        {item.description}
                                                                    </p>
                                                                    <div className="tikit-info row g-3 align-items-center">
                                                                        <div className="col-sm">
                                                                            <ul className="d-flex list-unstyled align-items-center flex-wrap">
                                                                                <li className="me-2">
                                                                                    <div className="d-flex align-items-center">
                                                                                        <i className="icofont-flag"/>
                                                                                        <span className="ms-1">{item.dueDate.split("T")[0].split("-").reverse().join("-")}</span>
                                                                                    </div>
                                                                                </li>
                                                                                {/* <li className="me-2">
                                                                                    <div className="d-flex align-items-center">
                                                                                        <i className="icofont-ui-text-chat"/>
                                                                                        <span className="ms-1">5</span>
                                                                                    </div>
                                                                                </li>
                                                                                <li>
                                                                                    <div className="d-flex align-items-center">
                                                                                        <i className="icofont-paper-clip"/>
                                                                                        <span className="ms-1">5</span>
                                                                                    </div>
                                                                                </li>*/}
                                                                            </ul>
                                                                        </div>
                                                                        {/* <div className="col-sm text-end">
                                                                            <div
                                                                                className="small text-truncate light-danger-bg py-1 px-2 rounded-1 d-inline-block fw-bold small">
                                                                                {" "}
                                                                                Box of Crayons{" "}
                                                                            </div>
                                                                        </div>*/}
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                            </ol>
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        </div>
                    ))}
                </DragDropContext>
            </div>



        </>
    );
}
