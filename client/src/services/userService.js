import api from '../api/axios.js';

export const userService = {
  getById(id) {
    return api.get(`/users/${id}`);
  },
  updateProfile(payload) {
    return api.put('/users/profile', payload);
  },
};
