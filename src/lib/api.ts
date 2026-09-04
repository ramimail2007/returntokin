// ReturnToKin — Frontend API Client
// Single entry point for all backend communication

const API = process.env.NEXT_PUBLIC_API_URL || 'https://returntokin-api.onrender.com';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('rtk_token');
}

function getHeaders(): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

async function request<T = any>(path: string, opts: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...opts,
    headers: { ...getHeaders(), ...(opts.headers || {}) },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: { message: 'Request failed' } }));
    throw new Error(err.error?.message || `HTTP ${res.status}`);
  }
  return res.json();
}

export const api = {
  // Auth
  signup: (data: { email: string; password: string; name?: string }) =>
    request('/api/auth/signup', { method: 'POST', body: JSON.stringify(data) }),
  login: (data: { email: string; password: string }) =>
    request<{ token: string; user: any }>('/api/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  me: () => request('/api/auth/me'),

  // Persons
  createPerson: (data: any) => request('/api/persons', { method: 'POST', body: JSON.stringify(data) }),
  uploadImage: (personId: string, file: File, isPrimary?: boolean) => {
    const fd = new FormData();
    fd.append('image', file);
    if (isPrimary) fd.append('is_primary', 'true');
    const token = getToken();
    return fetch(`${API}/api/persons/${personId}/images`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: fd,
    }).then(r => r.json());
  },

  // Cases
  createCase: (data: any) => request('/api/cases', { method: 'POST', body: JSON.stringify(data) }),
  getMyCases: () => request('/api/cases'),
  getPublicCases: (params?: { search?: string; country?: string; city?: string }) => {
    const q = new URLSearchParams();
    if (params?.search) q.set('search', params.search);
    if (params?.country) q.set('country', params.country);
    if (params?.city) q.set('city', params.city);
    const qs = q.toString();
    return request(`/api/cases/public${qs ? `?${qs}` : ''}`);
  },
  getCase: (id: string) => request(`/api/cases/${id}`),
  updateCaseStatus: (id: string, status: string, visibility?: string) =>
    request(`/api/cases/${id}/status`, { method: 'PUT', body: JSON.stringify({ status, visibility }) }),

  // Sightings
  createSighting: (data: any) => request('/api/sightings', { method: 'POST', body: JSON.stringify(data) }),
  getSightings: () => request('/api/sightings'),

  // Dashboard
  getDashboard: () => request('/api/dashboard'),

  // Organizations
  applyPartner: (data: any) => request('/api/organizations/apply', { method: 'POST', body: JSON.stringify(data) }),

  // Notifications
  getNotifications: () => request('/api/notifications'),
  markNotificationRead: (id: string) => request(`/api/notifications/${id}/read`, { method: 'PUT' }),

  // Admin
  getAdminStats: () => request('/api/admin/stats'),
  getVerificationQueue: () => request('/api/admin/verification-queue'),
  getMatches: () => request('/api/matches'),
  reviewMatch: (id: string, status: string, notes?: string) =>
    request(`/api/matches/${id}/review`, { method: 'PUT', body: JSON.stringify({ status, review_notes: notes }) }),

  // Abuse
  reportAbuse: (data: { case_id?: string; reason: string; details?: string }) =>
    request('/api/abuse', { method: 'POST', body: JSON.stringify(data) }),

  // Utilities
  getToken,
  isAuthenticated: () => !!getToken(),
  logout: () => { if (typeof window !== 'undefined') localStorage.removeItem('rtk_token'); },
};