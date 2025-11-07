import { AxiosResponse } from "axios";
import { apiClient } from "./baseUrl";
import { IApiResponse } from "@/types/api/posts";
import { ICreateCommentData } from "@/types/api/comments";

// Функции для работы с комментариями
export const commentsAPI = {
  // Получение комментариев поста
  getComments: async (postId: number): Promise<IApiResponse<Comment[]>> => {
    const response: AxiosResponse<Comment[]> = await apiClient.get(`/posts/${postId}/comments`);
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  },

  // Добавление комментария
  addComment: async (postId: number, data: ICreateCommentData): Promise<IApiResponse<Comment>> => {
    const response: AxiosResponse<Comment> = await apiClient.post(`/posts/${postId}/comments`, data);
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  },
};