// ticketService.js

import axios from 'axios';
import BACK_END_URL from '../config';

const API_URL = 'http://localhost:3000'; // Remplacez l'URL par l'URL de votre back-end


    export const getAllTickets = async () => {

        try {
            const response = await axios.get(`${API_URL}/tickets`);
            return response.data;
        } catch (error) {
            console.error('Error fetching tickets:', error);
            throw error;
        }
    };


    export const addTicket = async (ticketData, userId) => {

        try {
            const response = await axios.post(`${API_URL}/tickets/${userId}`, ticketData);
            return response.data;
        } catch (error) {
            console.error('Error adding ticket:', error);
            throw error;
        }
    };
    export const updateTicket = async (ticketId, ticketData) => {

        try {
            const response = await axios.put(`${API_URL}/tickets/${ticketId}`, ticketData);
            return response.data;
        } catch (error) {
            console.error('Error updating ticket:', error);
            throw error;
        }
    };
    export const deleteTicket = async (ticketId) => {

        try {
            const response = await axios.delete(`${API_URL}/tickets/${ticketId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting ticket:', error);
            throw error;
        }
    };











