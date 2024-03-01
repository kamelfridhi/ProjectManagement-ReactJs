import React, { useEffect, useState } from 'react';
import * as TaskService from '../../../_services/TaskService.jsx';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const data = await TaskService.getAllTasks();
            setTasks(data);
        };
        fetchTasks();
    }, []);

    return (
        <div>
            <h1>Tasks: </h1>
            <ul>
                {tasks.map(task => (
                    <li key={task._id}>name {task.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
