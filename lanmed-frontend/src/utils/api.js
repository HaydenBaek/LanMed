const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

function getStoredToken() {
  return localStorage.getItem('accessToken');
}

function setStoredTokens(access, refresh) {
  if (access) localStorage.setItem('accessToken', access);
  if (refresh) localStorage.setItem('refreshToken', refresh);
}

function clearStoredTokens() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

async function request(path, options = {}) {
  const token = getStoredToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 401 && localStorage.getItem('refreshToken')) {
    const refreshed = await refreshToken();
    if (refreshed) {
      return request(path, options);
    }
  }

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const message = errorBody.detail || errorBody.message || 'Request failed';
    const error = new Error(message);
    error.status = response.status;
    error.body = errorBody;
    throw error;
  }

  if (response.status === 204) return null;
  return response.json();
}

async function refreshToken() {
  const refresh = localStorage.getItem('refreshToken');
  if (!refresh) return false;

  const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh }),
  });

  if (!response.ok) {
    clearStoredTokens();
    return false;
  }

  const data = await response.json();
  setStoredTokens(data.access, data.refresh);
  return true;
}

export async function login(email, password) {
  const data = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  setStoredTokens(data.access, data.refresh);
  return data;
}

export async function registerUser({ email, password, name }) {
  const data = await request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password, name }),
  });
  setStoredTokens(data.access, data.refresh);
  return data;
}

export async function getProfile() {
  return request('/me/profile');
}

export async function updateProfile(payload) {
  return request('/me/profile', {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function getDocuments() {
  return request('/documents/');
}

export async function getDocument(id) {
  return request(`/documents/${id}/`);
}

export async function createDocument(payload) {
  return request('/documents/', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function deleteDocument(id) {
  return request(`/documents/${id}/`, {
    method: 'DELETE',
  });
}

export async function translate(text, sourceLang, targetLang) {
  const data = await request('/translate', {
    method: 'POST',
    body: JSON.stringify({
      text,
      source_lang: sourceLang,
      target_lang: targetLang,
    }),
  });
  return data.text;
}

export { API_BASE_URL, getStoredToken, setStoredTokens, clearStoredTokens };
