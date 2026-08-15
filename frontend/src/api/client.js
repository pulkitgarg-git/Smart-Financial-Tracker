const TOKEN_KEY = 'sft_token';
const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

async function request(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const body = await response.json();
      if (body.message) message = body.message;
      else if (typeof body === 'string') message = body;
    } catch {
      try {
        message = await response.text();
      } catch {
        /* keep default */
      }
    }
    throw new Error(message);
  }

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  return response.text();
}

export const api = {
  signUp: (body) =>
    request('/api/auth/signUp', { method: 'POST', body: JSON.stringify(body) }),

  login: (body) =>
    request('/api/auth/login', { method: 'POST', body: JSON.stringify(body) }),

  getTransactions: (type) => {
    const query = type ? `?type=${type}` : '';
    return request(`/api/transactions${query}`);
  },

  addTransaction: (body) =>
    request('/api/transactions/addTrans', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  getSummary: () => request('/api/transactions/summary'),

  getSummaryForDate: (date) =>
    request(`/api/transactions/summary/overall?date=${date}`),

  getMonthlySummary: (year, month) =>
    request(`/api/transactions/summary/monthly?year=${year}&month=${month}`),

  getCategorySummaries: (type) =>
    request(`/api/transactions/summary/categories?type=${type}`),
};
