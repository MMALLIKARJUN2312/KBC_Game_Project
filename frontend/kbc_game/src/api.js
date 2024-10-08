import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';  

export const fetchQuestions = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/questions`);
        return response.data;
    } catch (error) {
        console.error('Error fetching questions:', error);
        return [];
    }
};
