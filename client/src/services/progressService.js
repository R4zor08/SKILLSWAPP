import api from '../api/axios.js';

export const progressService = {
  create(payload) {
    return api.post('/progress', payload);
  },
  listBySwap(swapId) {
    return api.get(`/progress/${swapId}`);
  },
};
