import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  login: (email, password) => apiClient.post('/auth/login', { email, password }),
  signup: (userData) => apiClient.post('/auth/signup', userData),
  getProfile: () => apiClient.get('/auth/me'),
};

// Forms APIs
export const formsAPI = {
  getAll: () => apiClient.get('/forms'),
  getById: (id) => apiClient.get(`/forms/${id}`),
  create: (data) => apiClient.post('/forms', data),
  update: (id, data) => apiClient.put(`/forms/${id}`, data),
  delete: (id) => apiClient.delete(`/forms/${id}`),
  publish: (id) => apiClient.patch(`/forms/${id}/publish`),
};

// Form Responses APIs
export const responsesAPI = {
  getByForm: (formId) => apiClient.get(`/forms/${formId}/responses`),
  submit: (formId, data) => apiClient.post(`/forms/${formId}/responses`, data),
  getStats: (formId) => apiClient.get(`/forms/${formId}/stats`),
};

// Documents APIs
export const documentsAPI = {
  getAll: () => apiClient.get('/documents'),
  getById: (id) => apiClient.get(`/documents/${id}`),
  upload: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post('/documents/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  delete: (id) => apiClient.delete(`/documents/${id}`),
};

// Signature APIs
export const signaturesAPI = {
  getAll: () => apiClient.get('/signatures'),
  getById: (id) => apiClient.get(`/signatures/${id}`),
  request: (data) => apiClient.post('/signatures/request', data),
  sign: (id, data) => apiClient.post(`/signatures/${id}/sign`, data),
  getStats: () => apiClient.get('/signatures/stats'),
};

export default apiClient;
