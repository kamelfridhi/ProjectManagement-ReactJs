import axios from 'axios';
import BACK_END_URL from '../config';

const API_BASE_URL = BACK_END_URL + 'status';

export const getAllStatus = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const addStatus = async (data, projectId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/${projectId}`, data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getStatusById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateStatus = async (data, id) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteStatus = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
