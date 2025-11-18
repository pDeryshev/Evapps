import { IPosts, IPostDetail, IGetPostsParams } from "../types/api/posts";
import { BASE_URL } from "./baseUrl";

// Функции для работы с постами (серверные)
export const postsServerAPI = {
  // Получение всех постов
  getPosts: async (params?: IGetPostsParams): Promise<IPosts[]> => {
    try {
      const queryString = params ? new URLSearchParams(params as any).toString() : '';
      const url = `${BASE_URL}/api/posts${queryString ? `?${queryString}` : ''}`;
      
      const response = await fetch(url, {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
  },

  // Получение конкретного поста
  getPost: async (id: number): Promise<IPostDetail | null> => {
    try {
      const url = `${BASE_URL}/api/posts/${id}`;     
      const response = await fetch(url, {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch post: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching post:', error);
      return null;
    }
  },
};
