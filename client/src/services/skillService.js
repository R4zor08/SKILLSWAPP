import api from '../api/axios.js';

export const skillService = {
  list(params) {
    return api.get('/skills', { params });
  },
  getById(id) {
    return api.get(`/skills/${id}`);
  },
  create(payload) {
    return api.post('/skills', payload);
  },
  update(id, payload) {
    return api.put(`/skills/${id}`, payload);
  },
  remove(id) {
    return api.delete(`/skills/${id}`);
  },
};
