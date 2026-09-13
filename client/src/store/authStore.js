import { create } from 'zustand';
import { authAPI } from '../services/api';

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,

  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const response = await authAPI.login(credentials);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      set({ user, token, isAuthenticated: true, loading: false });
      return response;
    } catch (error) {
      set({ loading: false, error: error.message || 'Login failed' });
      throw error;
    }
  },

  register: async (userData) => {
    set({ loading: true, error: null });
    try {
      const response = await authAPI.register(userData);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      set({ user, token, isAuthenticated: true, loading: false });
      return response;
    } catch (error) {
      set({ loading: false, error: error.message || 'Registration failed' });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, token: null, isAuthenticated: false });
    authAPI.logout().catch(() => {});
  },

  updateUser: (userData) => {
    const updatedUser = { ...useAuthStore.getState().user, ...userData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    set({ user: updatedUser });
  },

  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ isAuthenticated: false, user: null });
      return;
    }

    try {
      const response = await authAPI.getMe();
      const user = response.data.user;
      localStorage.setItem('user', JSON.stringify(user));
      set({ user, isAuthenticated: true });
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      set({ isAuthenticated: false, user: null, token: null });
    }
  },
}));

export default useAuthStore;
