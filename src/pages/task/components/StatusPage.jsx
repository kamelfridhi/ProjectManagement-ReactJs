import React, { useState, useEffect } from 'react';
import { getAllStatus, addStatus, updateStatus, deleteStatus } from '../../../_services/StatusService.jsx';

const StatusPage = () => {
    const [statuses, setStatuses] = useState([]);
    const [newStatus, setNewStatus] = useState('');
    const [updateStatusId, setUpdateStatusId] = useState('');
    const [updateStatusText, setUpdateStatusText] = useState('');

    useEffect(() => {
        loadStatuses();
    }, []);

    const loadStatuses = async () => {
        try {
            const data = await getAllStatus();
            setStatuses(data);
        } catch (error) {
            console.error('Error loading statuses:', error);
        }
    };

    const handleAddStatus = async (e) => {
        e.preventDefault();
        const projectId = '65e4b65f97417e8007cc7e53'; // Remplacez 'your_static_project_id' par l'ID statique souhaité
        try {
            await addStatus({ status: newStatus }, projectId);
            setNewStatus('');
            loadStatuses();
        } catch (error) {
            console.error('Error adding status:', error);
        }
    };


    const handleUpdateStatus = async (e) => {
        e.preventDefault();
        try {
            await updateStatus({ status: updateStatusText }, updateStatusId);
            setUpdateStatusId('');
            setUpdateStatusText('');
            loadStatuses();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleDeleteStatus = async (id) => {
        try {
            await deleteStatus(id);
            loadStatuses();
        } catch (error) {
            console.error('Error deleting status:', error);
        }
    };

    return (
        <div>
            <h1>All Statuses</h1>
            <ul>
                {statuses.map((status) => (
                    <li key={status._id}>
                        {status.status}{' '}
                        <button onClick={() => handleDeleteStatus(status._id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h2>Add New Status</h2>
            <form onSubmit={handleAddStatus}>
                <input
                    type="text"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    placeholder="Enter new status"
                />
                <button type="submit">Add Status</button>
            </form>
            <h2>Update Status</h2>
            <form onSubmit={handleUpdateStatus}>
                <input
                    type="text"
                    value={updateStatusText}
                    onChange={(e) => setUpdateStatusText(e.target.value)}
                    placeholder="Enter updated status"
                />
                <input
                    type="text"
                    value={updateStatusId}
                    onChange={(e) => setUpdateStatusId(e.target.value)}
                    placeholder="Enter status ID to update"
                />
                <button type="submit">Update Status</button>
            </form>
        </div>
    );
};

export default StatusPage;
