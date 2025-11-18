import { IApiResponse } from "@/types/api/posts";

// Вспомогательная функция для обработки fetch запросов
export default async function handleFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<IApiResponse<T>> {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth-token') : null;
    
    // Создаем объект заголовков
    const headers = new Headers(options.headers);
    headers.set('Content-Type', 'application/json');

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    const response = await fetch(url, {
      ...options,
      headers, 
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return {
      data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}