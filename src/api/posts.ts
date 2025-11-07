import { AxiosResponse } from "axios";
import {
  IPosts,
  IPostDetail,
  ICreatePostData,
  IGetPostsParams,
  IApiResponse,
} from "../types/api/posts";
import { apiClient } from "./baseUrl";

// Функции для работы с постами
export const postsAPI = {
  // Получение всех постов
  getPosts: async (params?: IGetPostsParams): Promise<IApiResponse<IPosts[]>> => {
    const response: AxiosResponse<IPosts[]> = await apiClient.get('/posts', { params });
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  },

  // Получение конкретного поста
  getPost: async (id: number): Promise<IApiResponse<IPostDetail>> => {
    const response: AxiosResponse<IPostDetail> = await apiClient.get(`/posts/${id}`);
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  },

  // Создание поста
  createPost: async (data: ICreatePostData): Promise<IApiResponse<IPostDetail>> => {
    const response: AxiosResponse<IPostDetail> = await apiClient.post('/posts', data);
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  },
};

// Вспомогательная функция для загрузки изображений
export const uploadImage = async (file: File): Promise<IApiResponse<{ path: string }>> => {
  const formData = new FormData();
  formData.append('image', file);

  // Для загрузки изображений используем URL без /api
  const UPLOAD_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://travelblog.skillbox.cc';
  
  const response = await fetch(`${UPLOAD_BASE_URL}/upload`, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  
  return {
    data,
    status: response.status,
    statusText: response.statusText,
  };
};