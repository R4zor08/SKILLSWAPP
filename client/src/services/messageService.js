import api from '../api/axios.js';

export const messageService = {
  send(payload) {
    return api.post('/messages', payload);
  },
  listBySwap(swapId) {
    return api.get(`/messages/${swapId}`);
  },
};
