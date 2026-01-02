import axios from 'axios';

const API = axios.create({
  baseURL: '/api'
});

export const contentAPI = {
  getAll: () => API.get('/content'),
  getById: (id) => API.get(`/content/${id}`),
  create: (data) => API.post('/content', data),
  update: (id, data) => API.put(`/content/${id}`, data),
  delete: (id) => API.delete(`/content/${id}`),
  addReview: (id, text) => API.post(`/content/${id}/reviews`, { text }),
  deleteReview: (id, reviewId) => API.delete(`/content/${id}/reviews/${reviewId}`)
};

export default API;
