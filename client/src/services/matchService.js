import api from '../api/axios.js';

export const matchService = {
  list(params) {
    return api.get('/matches', { params });
  },
};
