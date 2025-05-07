import api from './apiService';

export const getUsers = (params = {}) => {
    return api.get('/users', { params });
};
export const getUserById = id => api.get(`/users/${id}`);