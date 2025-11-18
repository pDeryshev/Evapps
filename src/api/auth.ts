import { LoginData, RegisterData, LoginResponse, RegisterResponse } from "@/types/api/auth";
import { BASE_URL } from "./baseUrl";
import handleFetch from "./handleFetch";


export const authAPI = {
  // Логин - POST /api/login
  login: async (data: LoginData): Promise<LoginResponse> => {
    console.log("Sending login request to:", `${BASE_URL}/api/login`);
    console.log("Login data:", data);
    
    try {
      const responseData = await handleFetch<LoginResponse>(`${BASE_URL}/api/login`, {
        method: 'POST',
        body: JSON.stringify(data),
      });
      
      console.log("Login response data:", responseData);
      return responseData.data;
    } catch (error) {
      console.error("Login fetch error:", error);
      throw error;
    }
  },

  // Регистрация - POST /api/register
  register: async (data: RegisterData): Promise<RegisterResponse> => {
    console.log("Sending register request to:", `${BASE_URL}/api/register`);
    console.log("Register data:", data);
    
    try {
      const responseData = await handleFetch<RegisterResponse>(`${BASE_URL}/api/register`, {
        method: 'POST',
        body: JSON.stringify(data),
      });
      
      console.log("Register response data:", responseData);
      return responseData.data;
    } catch (error) {
      console.error("Register fetch error:", error);
      throw error;
    }
  },
};