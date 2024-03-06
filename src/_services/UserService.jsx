import axios from 'axios';
import BACK_END_URL from '../config';
import User from '../_models/User';

const API_BASE_URL = BACK_END_URL + '/user';
//const userid = '65d8dd987faf4da6a55483aa';

export const getAllUsers = async() => {
    try {
        return (await axios.get(`${API_BASE_URL}`)).data;

    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const addUser = async (data) => {
    try {
        return await axios.post (API_BASE_URL, data);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getUserById = async (id) => {
    try {
        return await axios.get (`${API_BASE_URL}/${id}`);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateUser = (data, idUser) => {
    try {
        const response = axios.patch < User > (`${API_BASE_URL}/${idUser}`, data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await axios.delete (`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};