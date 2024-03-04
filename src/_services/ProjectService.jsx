import axios from 'axios';
import BACK_END_URL from '../config';

const API_BASE_URL = BACK_END_URL + 'Projects';
const userid = '65d8dd987faf4da6a55483aa';

export const getAllProject = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const createProject = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}`, data);
        console.log('Create Project Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating project:', error.response.data);
        throw error;
    }

};


export const getProjectById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/oneTask/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
};

export const updateProject = async (id, data) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};



export const deleteProject = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};