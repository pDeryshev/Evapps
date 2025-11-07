import { IPosts, IPostDetail, IGetPostsParams } from "../types/api/posts";

// Разделяем URL для API и изображений
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ? 
  `${process.env.NEXT_PUBLIC_API_URL}/api` : 
  'https://travelblog.skillbox.cc/api';

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 
  'https://travelblog.skillbox.cc';

// Функции для работы с постами (серверные)
export const postsServerAPI = {
  // Получение всех постов
  getPosts: async (params?: IGetPostsParams): Promise<IPosts[]> => {
    try {
      const queryString = params ? new URLSearchParams(params as any).toString() : '';
      const url = `${API_BASE_URL}/posts${queryString ? `?${queryString}` : ''}`;
      
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
      const url = `${API_BASE_URL}/posts/${id}`;     
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

// Экспортируем BASE URL для изображений
export { IMAGE_BASE_URL };