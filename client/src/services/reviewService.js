import api from '../api/axios.js';

export const reviewService = {
  create(payload) {
    return api.post('/reviews', payload);
  },
  listForUser(userId) {
    return api.get(`/reviews/user/${userId}`);
  },
};
