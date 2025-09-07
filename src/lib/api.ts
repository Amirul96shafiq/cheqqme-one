import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { mockApi, shouldUseMockApi } from './mock-api';
import { AuthResponse, User, DashboardStats, Project, Client, Document } from '@/types';

class ApiClient {
  private client: AxiosInstance;
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://data.cheqqme.com/api';
    
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          this.clearToken();
          // Redirect to login if not already there
          if (typeof window !== 'undefined' && !window.location.pathname.includes('/auth')) {
            window.location.href = '/auth/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // Token management
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return Cookies.get('auth_token') || localStorage.getItem('auth_token');
  }

  setToken(token: string): void {
    if (typeof window === 'undefined') return;
    Cookies.set('auth_token', token, { expires: 7 }); // 7 days
    localStorage.setItem('auth_token', token);
  }

  clearToken(): void {
    if (typeof window === 'undefined') return;
    Cookies.remove('auth_token');
    localStorage.removeItem('auth_token');
  }

  // HTTP Methods
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url, config);
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data, config);
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.put<T>(url, data, config);
  }

  async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.patch<T>(url, data, config);
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.delete<T>(url, config);
  }
}

// Create singleton instance
const apiClient = new ApiClient();

// Mock API handlers
const mockHandlers = {
  async handleAuth(endpoint: string, data?: unknown): Promise<any> {
    try {
      if (endpoint === '/auth/login') {
        return { data: await mockApi.login(data as any) };
      } else if (endpoint === '/auth/register') {
        return { data: await mockApi.register(data as any) };
      } else if (endpoint === '/auth/logout') {
        await mockApi.logout();
        return { data: {} };
      } else if (endpoint === '/user') {
        return { data: await mockApi.getUser() };
      }
      throw new Error(`Mock endpoint not implemented: ${endpoint}`);
    } catch (error: any) {
      // Re-throw with proper axios-like error structure
      throw error;
    }
  },

  async handleGet(endpoint: string): Promise<any> {
    try {
      if (endpoint === '/dashboard/stats') {
        return { data: await mockApi.getDashboardStats() };
      } else if (endpoint === '/projects') {
        return { data: await mockApi.getProjects() };
      } else if (endpoint === '/clients') {
        return { data: await mockApi.getClients() };
      } else if (endpoint === '/documents') {
        return { data: await mockApi.getDocuments() };
      } else if (endpoint === '/user') {
        return { data: await mockApi.getUser() };
      }
      throw new Error(`Mock endpoint not implemented: ${endpoint}`);
    } catch (error: any) {
      // Re-throw with proper axios-like error structure
      throw error;
    }
  }
};

// Utility function for easier use
export const fetchWithAuth = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    if (shouldUseMockApi()) {
      return await mockHandlers.handleGet(url) as AxiosResponse<T>;
    }
    return apiClient.get<T>(url, config);
  },
  
  post: async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    if (shouldUseMockApi()) {
      if (url.startsWith('/auth/') || url === '/user') {
        return await mockHandlers.handleAuth(url, data) as AxiosResponse<T>;
      }
      return await mockHandlers.handleGet(url) as AxiosResponse<T>;
    }
    return apiClient.post<T>(url, data, config);
  },
  
  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => apiClient.put<T>(url, data, config),
  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) => apiClient.patch<T>(url, data, config),
  delete: <T>(url: string, config?: AxiosRequestConfig) => apiClient.delete<T>(url, config),
  setToken: (token: string) => apiClient.setToken(token),
  clearToken: () => apiClient.clearToken(),
  getToken: () => apiClient.getToken(),
};

export default apiClient;
