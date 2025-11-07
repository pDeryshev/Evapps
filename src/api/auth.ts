import { AxiosResponse } from "axios";
import { apiClient } from "./baseUrl";
import { LoginData, RegisterData, LoginResponse, RegisterResponse, ErrorResponse } from "@/types/api/auth";

export const authAPI = {
  // Логин - POST /api/login
  login: async (data: LoginData): Promise<LoginResponse> => {
    const response: AxiosResponse<LoginResponse> = await apiClient.post('/api/login', data);
    return response.data;
  },

  // Регистрация - POST /api/register
  register: async (data: RegisterData): Promise<RegisterResponse> => {
    const response: AxiosResponse<RegisterResponse> = await apiClient.post('/api/register', data);
    return response.data;
  },
};