
import axios from 'axios';
import BACK_END_URL from '../config';
import User from '../_models/User';
import {toast} from "react-toastify";
import {signInSuccess, signOut} from "../redux/user/userSlice.js";
import {useDispatch} from "react-redux";

const API_BASE_URL = BACK_END_URL + 'user';
//const userid = '65d8dd987faf4da6a55483aa';

export const handleSignOut = async (userId,dispatch,navigate) => {
    try {
        const response = await fetch(`https://nestpiteamsphere-production.up.railway.app/auth/logout/${userId}`, {
            method: 'POST',
        });
        if (response.ok) {
            // Logout successful
            dispatch(signOut());
            navigate("/");
            console.log('Logout successful');
            // Perform any additional actions (e.g., clear user session)
        } else {
            // Logout failed
            console.error('Logout failed');
        }
    } catch (error) {
        console.error('Error logging out:', error.message);
    }

};


export const getAllUsers = async() => {
    try {
        return (await axios.get(`${API_BASE_URL}`)).data;

    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getAlllUsers = async() => {
    try {
        return (await axios.get(`${API_BASE_URL}/alll`)).data;

    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getUsersWithEtat = async(etat) => {
    try {
        return((await axios.get(`${API_BASE_URL}/getUsersEtat/${etat}`)).data.data);

    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const getBlockedUsers = async() => {
    try {
        return((await axios.get(`${API_BASE_URL}/getBlockedUsers`)).data.data);

    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const acceptUser = async (idUser) => {
    try {
        return await axios.patch(`${API_BASE_URL}/accept/${idUser}`);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const declinetUser = async(idUser) => {
    try {
        return await axios.patch(`${API_BASE_URL}/decline/${idUser}`);

    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const blockUser = async(idUser) => {
    try {
        return await axios.patch(`${API_BASE_URL}/blockUser/${idUser}`);
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
        const response = await fetch(`https://nestpiteamsphere-production.up.railway.app/user/${currentUser._id}`, {
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
