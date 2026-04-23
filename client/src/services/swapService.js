import api from '../api/axios.js';

export const swapService = {
  create(payload) {
    return api.post('/swaps', payload);
  },
  list(params) {
    return api.get('/swaps', { params });
  },
  getById(id) {
    return api.get(`/swaps/${id}`);
  },
  accept(id) {
    return api.patch(`/swaps/${id}/accept`);
  },
  reject(id) {
    return api.patch(`/swaps/${id}/reject`);
  },
  cancel(id) {
    return api.patch(`/swaps/${id}/cancel`);
  },
  complete(id) {
    return api.patch(`/swaps/${id}/complete`);
  },
};
