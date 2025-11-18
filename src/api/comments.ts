import { IComments, ICreateCommentData } from "../types/api/comments";
import { IApiResponse } from "@/types/api/posts";
import { BASE_URL } from "./baseUrl";
import handleFetch from "./handleFetch";

export const commentsAPI = {
  // Получение комментариев поста
  getComments: async (postId: number): Promise<IApiResponse<IComments[]>> => {
    const url = `${BASE_URL}/api/posts/${postId}/comments`;
    
    return handleFetch<IComments[]>(url, {
      method: 'GET',
      cache: 'no-store',
    });
  },

  // Добавление комментария
  addComment: async (postId: number, data: ICreateCommentData): Promise<IApiResponse<IComments>> => {
    const url = `${BASE_URL}/api/posts/${postId}/comments`;
    
    return handleFetch<IComments>(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};