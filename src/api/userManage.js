import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor for JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const userManageApi = {
  getUsers(params) {
    return api.get('/usermanage/users', { params });
  },
  getUser(id) {
    return api.get(`/usermanage/users/${id}`);
  },
  createUser(data) {
    return api.post('/usermanage/users', data);
  },
  updateUser(id, data) {
    return api.put(`/usermanage/users/${id}`, data);
  },
  deleteUser(id) {
    return api.delete(`/usermanage/users/${id}`);
  },
  checkIdDplct(emplyrId) {
    return api.get('/usermanage/users/check-id', { params: { emplyrId } });
  },
};
