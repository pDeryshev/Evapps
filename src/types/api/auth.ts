export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  password_confirmation: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface ErrorResponse {
  message?: string;
  errors?: {
    email?: string[];
    password?: string[];
    password_confirmation?: string[];
  };
}