import React, { useEffect, useState } from 'react';
import * as TaskService from '../../../_services/TaskService.jsx';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const data = await TaskService.getAllTasksbysprint('663191e2aa5ff82325d6ab36');
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
