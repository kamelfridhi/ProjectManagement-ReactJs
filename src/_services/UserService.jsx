
import axios from 'axios';
import BACK_END_URL from '../config';
import User from '../_models/User';
import {toast} from "react-toastify";
import {signInSuccess, signOut} from "../redux/user/userSlice.js";
import {useDispatch} from "react-redux";

const API_BASE_URL = BACK_END_URL + 'user';
//const userid = '65d8dd987faf4da6a55483aa';

export const getAllUsers = async() => {
    try {
        return (await axios.get(`${API_BASE_URL}`)).data;

    } catch (error) {
        console.error(error);
        throw error;
    }
};

  export const getAllUserss = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}`);
        console.log(data.size+"datttttttta")
        return response.data;

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

export const UpdateUserLocalStorage = async (currentUser) => {
    const dispatch = useDispatch();

    //dispatch(signOut());

    try {
        const response = await fetch(`http://localhost:3000/user/${currentUser._id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();
        console.log("user : " + userData.data.email);
        localStorage.removeItem('currentUser');
        //localStorage.setItem('currentUser', JSON.stringify(userData));
        dispatch(signInSuccess(userData.data))

         //toast.success('User data updated successfully.');


    } catch (error) {
        console.error('Error updating user data:', error);
        toast.error('Failed to update user data.');
    }
};
