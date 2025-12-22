import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

console.log('[API] Base URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log('[API] Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('[API] Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for logging
api.interceptors.response.use(
  (response) => {
    console.log('[API] Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('[API] Response error:', error.message, error.config?.url);
    return Promise.reject(error);
  }
);

// Resume API Calls
export const resumeAPI = {
  createResume: (userId, title) => 
    api.post('/resumes', { user_id: userId, title }),
  
  getUserResumes: (userId) => 
    api.get(`/resumes/user/${userId}`),
  
  getResume: (resumeId) => 
    api.get(`/resumes/${resumeId}`),
  
  updateResume: (resumeId, data) => 
    api.put(`/resumes/${resumeId}`, data),
  
  deleteResume: (resumeId) => 
    api.delete(`/resumes/${resumeId}`),
};

// Personal Details API Calls
export const personalDetailsAPI = {
  createPersonalDetails: (data) => 
    api.post('/personal-details', data),
  
  getPersonalDetails: (resumeId) => 
    api.get(`/personal-details/resume/${resumeId}`),
  
  updatePersonalDetails: (id, data) => 
    api.put(`/personal-details/${id}`, data),
  
  deletePersonalDetails: (id) => 
    api.delete(`/personal-details/${id}`),
};

// Education API Calls
export const educationAPI = {
  createEducation: (data) => 
    api.post('/education', data),
  
  getEducation: (resumeId) => 
    api.get(`/education/resume/${resumeId}`),
  
  updateEducation: (id, data) => 
    api.put(`/education/${id}`, data),
  
  deleteEducation: (id) => 
    api.delete(`/education/${id}`),
};

// Projects API Calls
export const projectsAPI = {
  createProject: (data) => 
    api.post('/projects', data),
  
  getProjects: (resumeId) => 
    api.get(`/projects/resume/${resumeId}`),
  
  updateProject: (id, data) => 
    api.put(`/projects/${id}`, data),
  
  deleteProject: (id) => 
    api.delete(`/projects/${id}`),
};

// Skills API Calls
export const skillsAPI = {
  createSkill: (data) => 
    api.post('/skills', data),
  
  getSkills: (resumeId) => 
    api.get(`/skills/resume/${resumeId}`),
  
  updateSkill: (id, data) => 
    api.put(`/skills/${id}`, data),
  
  deleteSkill: (id) => 
    api.delete(`/skills/${id}`),
};

// Internships API Calls
export const internshipsAPI = {
  createInternship: (data) => 
    api.post('/internships', data),
  
  getInternships: (resumeId) => 
    api.get(`/internships/resume/${resumeId}`),
  
  updateInternship: (id, data) => 
    api.put(`/internships/${id}`, data),
  
  deleteInternship: (id) => 
    api.delete(`/internships/${id}`),
};

// Certifications API Calls
export const certificationsAPI = {
  createCertification: (data) => 
    api.post('/certifications', data),
  
  getCertifications: (resumeId) => 
    api.get(`/certifications/resume/${resumeId}`),
  
  updateCertification: (id, data) => 
    api.put(`/certifications/${id}`, data),
  
  deleteCertification: (id) => 
    api.delete(`/certifications/${id}`),
};

export default api;
