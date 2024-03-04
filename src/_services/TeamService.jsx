import axios from 'axios';
import BACK_END_URL from '../config';
import Team from "../_models/Team.jsx";
const API_BASE_URL = BACK_END_URL + 'team';
const API_User_URL = BACK_END_URL + 'user';
const userid = '65d8dd987faf4da6a55483aa';

export const getAllteam = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const addTeam = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}` , data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};



export const deleteTeam = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }





};


export const getOneTeam = async (id) => {
  try {
      const response = await axios.get(`${API_BASE_URL}/${id}`)
      return response.data }
  catch (error)
  {
      console.log(error)  }
};
export const updateTeam = async (idteam,data) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/${idteam}`, data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getOneUser = async (id) => {
    try {
        const response = await axios.get(`${API_User_URL}/${id}`)
        return response.data }
    catch (error)
    {
        console.log(error)  }
};

export const getAllUser= async () => {
    try {
        const response = await axios.get(`${API_User_URL}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const addMemberToTeam = async (teamId, userId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/${teamId}/members/${userId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const removeMember = async (teamId, userId) => {
    try {
        console.log(teamId,userId)
        const response = await axios.patch(`${API_BASE_URL}/${teamId}/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

