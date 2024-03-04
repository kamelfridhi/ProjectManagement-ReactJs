import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import * as TaskService from '../../../_services/TaskService.jsx';
import * as StatusService from "../../../_services/StatusService.jsx";

export default function StatusBoard() {
    const [tasks, setTasks] = useState([]);
    const [columns, setColumns] = useState([]);

    useEffect(() => {
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

        fetchTasks();
    }, []);

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

    return (
        <>

            <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                <DragDropContext onDragEnd={onDragEnd}>
                    {columns.map((column) => (
                        <div key={column.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                            <h6 className="fw-bold py-3 mb-0">{column.status}</h6>

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
