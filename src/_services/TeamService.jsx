import axios from 'axios';
import BACK_END_URL from '../config';
import Team from "../_models/Team.jsx";
const API_BASE_URL = BACK_END_URL + 'team';
const API_User_URL = BACK_END_URL + 'user';
const userid = '65d8dd987faf4da6a55483aa';

export const sendChatMessage = async (teamId, sendChatMessageDto) => {
    try {
        await axios.post(`${API_BASE_URL}/${teamId}/chat/send`, sendChatMessageDto);
    } catch (error) {
        console.error('Error sending chat message:', error);
        throw error;
    }
};

export const getChatMessages = async (teamId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${teamId}/chat`);
        return response.data;
    } catch (error) {
        console.error('Error getting chat messages:', error);
        throw error;
    }
};
export const getTeamuser = async (userid) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/user/${userid}/teams`);
        return response.data;
    } catch (error) {
        console.error('Error getting user teams messages:', error);
        throw error;
    }
};
export const getUsersOfTeamProject = async (idProjecct) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${idProjecct}/users`);
        console.log("deheheh : "+response.data.users[0]._id)

        return response.data.users;
    } catch (error) {
        console.error('Error getting user teams messages:', error);
        throw error;
    }
};
    export const getAllteam = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const getAllnotif = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/notif/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const getUsersNotInTeam = async (id, role) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/all/${id}/${role}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getallcategories = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}`+'/categories'); // Assuming you have appropriate base URL configured
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
        const response = await axios.get(`${API_User_URL}/teamuser/${id}`);
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
export const addMemberToTeam2 = async (teamId, userId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/${teamId}/members2/${userId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const acceptInvitation = async (userId, notificationId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/accept-invitation/${userId}/${notificationId}`);
        return response.data;
    } catch (error) {
        console.error('Error accepting team invitation:', error);
        throw error;
    }
};
export const reject = async (  notificationId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/reject-invitation/${notificationId}`);
        return response.data;
    } catch (error) {
        console.error('Error accepting team invitation:', error);
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

