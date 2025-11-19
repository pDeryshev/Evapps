import { User } from "./user";

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterData {
  email: string;
  password: string;
  password_confirmation: string;
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

