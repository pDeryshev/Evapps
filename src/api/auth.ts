import { LoginData, RegisterData, LoginResponse, RegisterResponse } from "@/types/api/auth";
import { BASE_URL } from "./baseUrl";
import handleFetch from "./handleFetch";


export const authAPI = {

  login: async (data: LoginData): Promise<LoginResponse> => {
    try {
      const response = await handleFetch<LoginResponse>(`${BASE_URL}/api/login`, {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return response.data;
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
      const response = await handleFetch<RegisterResponse>(`${BASE_URL}/api/register`, {
        method: 'POST',
        body: JSON.stringify(data),
      });

      console.log("Register response data:", response);
      return response.data;
    } catch (error) {
      console.error("Register fetch error:", error);
      throw error;
    }
  },
};