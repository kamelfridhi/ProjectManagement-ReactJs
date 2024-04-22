// ticketService.js

import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Remplacez l'URL par l'URL de votre back-end

const TicketService = {
    getAllTickets: async () => {
        try {
            const response = await axios.get(`${API_URL}/tickets`);
            return response.data;
        } catch (error) {
            console.error('Error fetching tickets:', error);
            throw error;
        }
    },
    async updateTicket(ticketId, ticketData) {
        try {
            const response = await axios.put(`${API_URL}/tickets/${ticketId}`, ticketData);
            return response.data;
        } catch (error) {
            console.error('Error updating ticket:', error);
            throw error;
        }
    },

    async deleteTicket(ticketId) {
        try {
            const response = await axios.delete(`${API_URL}/tickets/${ticketId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting ticket:', error);
            throw error;
        }
    }








};

export default TicketService;
