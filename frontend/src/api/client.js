// src/api/client.js
// Centralized API client connecting React frontend to the Spring Boot REST API

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';

let authToken = localStorage.getItem('alumni_auth_token');

export const setAuthToken = (token) => {
  authToken = token;
  if (token) {
    localStorage.setItem('alumni_auth_token', token);
  } else {
    localStorage.removeItem('alumni_auth_token');
  }
};

export const getAuthToken = () => authToken;

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const config = {
    ...options,
    headers,
    credentials: 'include', // Automatically sends HttpOnly JWT cookies
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMsg = data?.message || `Request failed with status ${response.status}`;
      throw new Error(errorMsg);
    }

    return data;
  } catch (err) {
    console.error(`API Error on [${options.method || 'GET'} ${endpoint}]:`, err.message);
    throw err;
  }
}

// 1. Authentication APIs
export const authApi = {
  login: async (email, password) => {
    const res = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (res.data?.token) {
      setAuthToken(res.data.token);
    }
    return res.data;
  },
  register: async (fullName, email, password, role) => {
    const res = await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ fullName, email, password, role }),
    });
    if (res.data?.token) {
      setAuthToken(res.data.token);
    }
    return res.data;
  },
  logout: async () => {
    try {
      await request('/auth/logout', { method: 'POST' });
    } finally {
      setAuthToken(null);
    }
  },
  getCurrentUser: async () => {
    const res = await request('/auth/me');
    return res.data;
  },
};

// 2. Alumni Directory APIs
export const alumniApi = {
  getFeatured: async () => {
    const res = await request('/alumni/public');
    return res.data;
  },
  search: async (keyword = '', department = 'ALL', gradYear = 'ALL') => {
    const params = new URLSearchParams();
    if (keyword) params.append('keyword', keyword);
    if (department && department !== 'ALL') params.append('department', department);
    if (gradYear && gradYear !== 'ALL') params.append('gradYear', gradYear);

    const res = await request(`/alumni/search?${params.toString()}`);
    return res.data;
  },
  getById: async (id) => {
    const res = await request(`/alumni/${id}`);
    return res.data;
  },
  updateProfile: async (profileData) => {
    const res = await request('/alumni/me', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
    return res.data;
  },
};

// 3. Network & Connection APIs
export const connectionApi = {
  send: async (receiverId, note = '') => {
    const res = await request('/connections/send', {
      method: 'POST',
      body: JSON.stringify({ receiverId, note }),
    });
    return res.data;
  },
  accept: async (id) => {
    const res = await request(`/connections/${id}/accept`, {
      method: 'POST',
    });
    return res.data;
  },
  reject: async (id) => {
    const res = await request(`/connections/${id}/reject`, {
      method: 'DELETE',
    });
    return res.data;
  },
  cancel: async (id) => {
    const res = await request(`/connections/${id}/cancel`, {
      method: 'DELETE',
    });
    return res.data;
  },
  getReceived: async () => {
    const res = await request('/connections/received');
    return res.data;
  },
  getSent: async () => {
    const res = await request('/connections/sent');
    return res.data;
  },
};

// 4. Job Opportunities APIs
export const jobApi = {
  search: async (keyword = '', jobType = 'ALL') => {
    const params = new URLSearchParams();
    if (keyword) params.append('keyword', keyword);
    if (jobType && jobType !== 'ALL') params.append('jobType', jobType);

    const res = await request(`/jobs/search?${params.toString()}`);
    return res.data;
  },
  create: async (jobData) => {
    const res = await request('/jobs', {
      method: 'POST',
      body: JSON.stringify(jobData),
    });
    return res.data;
  },
  delete: async (id) => {
    const res = await request(`/jobs/${id}`, {
      method: 'DELETE',
    });
    return res.data;
  },
};

// 5. Campus Events & RSVP APIs
export const eventApi = {
  search: async (keyword = '', eventType = 'ALL') => {
    const params = new URLSearchParams();
    if (keyword) params.append('keyword', keyword);
    if (eventType && eventType !== 'ALL') params.append('eventType', eventType);

    const res = await request(`/events/search?${params.toString()}`);
    return res.data;
  },
  toggleRsvp: async (id) => {
    const res = await request(`/events/${id}/rsvp`, {
      method: 'POST',
    });
    return res.data;
  },
  create: async (eventData) => {
    const res = await request('/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
    return res.data;
  },
  delete: async (id) => {
    const res = await request(`/events/${id}`, {
      method: 'DELETE',
    });
    return res.data;
  },
};

// 6. Gemini AI Guidance APIs
export const aiApi = {
  getGuidance: async (targetRole, currentSkills, educationLevel, apiKey = '') => {
    const res = await request('/ai/guidance', {
      method: 'POST',
      body: JSON.stringify({ targetRole, currentSkills, educationLevel, apiKey }),
    });
    return res.data;
  },
};

// 7. Administration APIs
export const adminApi = {
  getAllUsers: async () => {
    const res = await request('/admin/users');
    return res.data;
  },
  updateUserStatus: async (id, status) => {
    const res = await request(`/admin/users/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
    return res.data;
  },
  getStats: async () => {
    const res = await request('/admin/stats');
    return res.data;
  },
};
