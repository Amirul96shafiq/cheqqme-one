import { User, AuthResponse, DashboardStats, Project, Client, Document } from '@/types';
import Cookies from 'js-cookie';

// Mock data
const mockUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@cheqqme.com",
    email_verified_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
];

const mockProjects: Project[] = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Complete overhaul of company website",
    status: "active",
    client_id: 1,
    client: {
      id: 1,
      name: "Acme Corp",
      email: "contact@acme.com",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Mobile App Development",
    description: "Native iOS and Android app",
    status: "active",
    client_id: 2,
    client: {
      id: 2,
      name: "Tech Solutions Inc",
      email: "hello@techsolutions.com",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const mockDocuments: Document[] = [
  {
    id: 1,
    name: "Project Requirements.pdf",
    file_path: "/documents/requirements.pdf",
    file_size: 2048000,
    mime_type: "application/pdf",
    project_id: 1,
    client_id: 1,
    project: mockProjects[0],
    client: mockProjects[0].client,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock token storage
let currentToken: string | null = null;
let currentUser: User | null = null;

// Helper to check if user is authenticated (check both memory and storage)
const isAuthenticated = (): boolean => {
  // First check memory
  if (currentToken && currentUser) {
    return true;
  }
  
  // Then check storage (simulating real app behavior)
  if (typeof window !== 'undefined') {
    const token = Cookies.get('auth_token') || localStorage.getItem('auth_token');
    if (token && token.startsWith('mock-jwt-token-')) {
      // If we find a mock token, restore the session
      currentToken = token;
      currentUser = mockUsers[0]; // Use default user for mock
      return true;
    }
  }
  
  return false;
};

// Helper to get current user (with fallback)
const getCurrentUser = (): User | null => {
  if (currentUser) {
    return currentUser;
  }
  
  // If no current user but we have a token, use default user
  if (isAuthenticated()) {
    return mockUsers[0];
  }
  
  return null;
};

export const mockApi = {
  // Auth endpoints
  async login(credentials: { email: string; password: string }): Promise<AuthResponse> {
    await delay(1000); // Simulate network delay
    
    // Simple validation
    if (credentials.email === "admin@cheqqme.com" && credentials.password === "password") {
      const token = "mock-jwt-token-" + Date.now();
      const user = mockUsers[0];
      
      currentToken = token;
      currentUser = user;
      
      return { user, token };
    }
    
    // Throw an error that matches the expected API error format
    const error = new Error("Invalid credentials");
    (error as any).response = {
      data: {
        message: "The provided credentials are incorrect."
      }
    };
    throw error;
  },

  async register(credentials: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }): Promise<AuthResponse> {
    await delay(1500);
    
    // Validate passwords match
    if (credentials.password !== credentials.password_confirmation) {
      const error = new Error("Passwords do not match");
      (error as any).response = {
        data: {
          message: "The password confirmation does not match."
        }
      };
      throw error;
    }
    
    // Check if email already exists
    if (mockUsers.some(user => user.email === credentials.email)) {
      const error = new Error("Email already exists");
      (error as any).response = {
        data: {
          message: "The email has already been taken."
        }
      };
      throw error;
    }
    
    // Create new user
    const newUser: User = {
      id: mockUsers.length + 1,
      name: credentials.name,
      email: credentials.email,
      email_verified_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    mockUsers.push(newUser);
    
    const token = "mock-jwt-token-" + Date.now();
    currentToken = token;
    currentUser = newUser;
    
    return { user: newUser, token };
  },

  async logout(): Promise<void> {
    await delay(500);
    currentToken = null;
    currentUser = null;
  },

  async getUser(): Promise<{ user: User }> {
    await delay(300);
    
    if (!isAuthenticated()) {
      const error = new Error("Unauthorized");
      (error as any).response = {
        data: {
          message: "Unauthenticated."
        }
      };
      throw error;
    }
    
    const user = getCurrentUser();
    if (!user) {
      const error = new Error("User not found");
      (error as any).response = {
        data: {
          message: "User not found."
        }
      };
      throw error;
    }
    
    return { user };
  },

  // Dashboard endpoints
  async getDashboardStats(): Promise<DashboardStats> {
    await delay(800);
    
    if (!isAuthenticated()) {
      const error = new Error("Unauthorized");
      (error as any).response = {
        data: {
          message: "Unauthenticated."
        }
      };
      throw error;
    }
    
    return {
      total_clients: 15,
      total_projects: 8,
      total_documents: 42,
      recent_documents: mockDocuments,
    };
  },

  // Resource endpoints
  async getProjects(): Promise<{ data: Project[] }> {
    await delay(600);
    
    if (!isAuthenticated()) {
      const error = new Error("Unauthorized");
      (error as any).response = {
        data: {
          message: "Unauthenticated."
        }
      };
      throw error;
    }
    
    return { data: mockProjects };
  },

  async getClients(): Promise<{ data: Client[] }> {
    await delay(500);
    
    if (!isAuthenticated()) {
      const error = new Error("Unauthorized");
      (error as any).response = {
        data: {
          message: "Unauthenticated."
        }
      };
      throw error;
    }
    
    const clients = mockProjects.map(p => p.client);
    return { data: clients };
  },

  async getDocuments(): Promise<{ data: Document[] }> {
    await delay(700);
    
    if (!isAuthenticated()) {
      const error = new Error("Unauthorized");
      (error as any).response = {
        data: {
          message: "Unauthenticated."
        }
      };
      throw error;
    }
    
    return { data: mockDocuments };
  },
};

// Helper to determine if we should use mock API
export const shouldUseMockApi = () => {
  return process.env.NODE_ENV === 'development' && 
         process.env.NEXT_PUBLIC_USE_MOCK_API === 'true';
};
