import axios from 'axios';
import BACK_END_URL from '../config';

const API_BASE_URL = BACK_END_URL + 'task';
const userid = '65d8dd987faf4da6a55483aa';

export const getAllTasks = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const addTask = async (data) => {
    try {

        const response = await axios.post(`${API_BASE_URL}`,  data );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getTaskById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateTask = async (data, id) => {
    console.log(data.name);
    try {
        const response = await axios.patch(`${API_BASE_URL}/${id}`, data);

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteTask = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
