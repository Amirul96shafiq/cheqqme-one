export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: number;
  name: string;
  description?: string;
  client_id: number;
  client: Client;
  status: 'active' | 'completed' | 'on_hold' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface Client {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  created_at: string;
  updated_at: string;
}

export interface Document {
  id: number;
  name: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  project_id?: number;
  client_id?: number;
  project?: Project;
  client?: Client;
  created_at: string;
  updated_at: string;
}

export interface DashboardStats {
  total_clients: number;
  total_projects: number;
  total_documents: number;
  recent_documents: Document[];
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}
