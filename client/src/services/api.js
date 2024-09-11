import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, { username, password });
        return response.data; 
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        throw error; 
    }
};


export const searchCards = async (name, token) => {
    try {
        const response = await axios.get(`${API_URL}/cards`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { q: `name:${name}` }
        });
        return response.data;  
    } catch (error) {
        console.error('Erro ao buscar cartas:', error);
        throw error;
    }
};

export const addCard = async (cardData, token) => {
    try {
        const response = await axios.post(`${API_URL}/cards`, cardData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao adicionar carta:', error);
        throw error;
    }
};