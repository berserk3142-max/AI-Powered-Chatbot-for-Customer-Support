import axios from 'axios';

// Use environment variable for production, fallback to proxy for development
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(
    (config) => {
        console.log(`📤 ${config.method?.toUpperCase()} ${config.url}`);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('API Error:', error.message);
        return Promise.reject(error);
    }
);

export const chatAPI = {
    sendMessage: async (message, userId, sessionId) => {
        const response = await api.post('/chat/message', {
            message,
            userId,
            sessionId
        });
        return response.data;
    },

    createSession: async (userId) => {
        const response = await api.post('/chat/session', { userId });
        return response.data;
    },

    getSession: async (sessionId) => {
        const response = await api.get(`/chat/session/${sessionId}`);
        return response.data;
    },

    getHistory: async (userId) => {
        const response = await api.get(`/chat/history/${userId}`);
        return response.data;
    },

    clearHistory: async (userId) => {
        const response = await api.delete(`/chat/history/${userId}`);
        return response.data;
    }
};

export const analyticsAPI = {
    getOverview: async () => {
        const response = await api.get('/analytics/overview');
        return response.data;
    },

    getMessageStats: async () => {
        const response = await api.get('/analytics/messages');
        return response.data;
    },

    getSourceStats: async () => {
        const response = await api.get('/analytics/sources');
        return response.data;
    },

    getTopQueries: async (limit = 10) => {
        const response = await api.get(`/analytics/top-queries?limit=${limit}`);
        return response.data;
    }
};

export default api;
