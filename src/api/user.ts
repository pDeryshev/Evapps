import { ChangePasswordData, ChangePasswordResponse, UpdateUserData, User } from "@/types/api/user";
import { BASE_URL } from "./baseUrl";
import handleFetch from "./handleFetch";


export const userAPI = {
  // Получение информации о пользователе
  getUser: async (): Promise<User> => {
    const response = await handleFetch<User>(`${BASE_URL}/api/user`, {
      method: 'GET',
    });
    return response.data;
  },

  // Изменение информации о пользователе
  chengeUser: async (data: UpdateUserData): Promise<User> => {
    const response = await handleFetch<User>(`${BASE_URL}/api/user`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.data;
  },

  // Изменить пароль
  changePassword: async (data: ChangePasswordData): Promise<ChangePasswordResponse> => {
    const response = await handleFetch<ChangePasswordResponse>(`${BASE_URL}/api/user/password`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    return response.data;
  },
};