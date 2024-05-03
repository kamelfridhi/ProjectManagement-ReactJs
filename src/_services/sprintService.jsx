import axios from 'axios';
import BACK_END_URL from '../config';

const API_BASE_URL = BACK_END_URL + 'sprint';
const userid = '65d8dd987faf4da6a55483aa';

export const getAllSprints = async (idproject) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${idproject}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const createSprint = async (data,idproject) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/${idproject}`, data);
        console.log('Create Sprint Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating sprint:', error.response.data);
        throw error;
    }

};

// sprintService.jsx

export const deleteSprintByName = async (sprintName) => {
    try {
        console.log('Deleting sprint:', sprintName);
        const response = await axios.delete(`${API_BASE_URL}/${sprintName}`);
        console.log('Delete sprint response:', response);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};