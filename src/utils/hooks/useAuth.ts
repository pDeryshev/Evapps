"use client";

import { useState, useEffect } from 'react';
import { User } from '@/types/api/user';
import { userAPI } from '@/api/user';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      // Проверяем, есть ли пользователь в localStorage при загрузке
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('auth-token');
      
      // Добавляем проверки на валидность данных
      if (storedUser && storedUser !== 'undefined' && 
          storedToken && storedToken !== 'undefined' && storedToken !== 'null') {
        try {
          const parsedUser = JSON.parse(storedUser); 
          setUser(parsedUser);
          
          // Дополнительно: проверяем токен, запрашивая данные пользователя с сервера
          try {
            const freshUserData = await userAPI.getUser();
            setUser(freshUserData);
            // Обновляем данные в localStorage
            localStorage.setItem('user', JSON.stringify(freshUserData));
          } catch (apiError) {
            console.error('Failed to fetch fresh user data:', apiError);
            // Если API запрос не удался, используем данные из localStorage
            // Но если токен невалиден, очищаем данные
            if ((apiError as any).response?.status === 401) {
              clearAuthData();
            }
          }
        } catch (error) {
          console.error('Error parsing user data:', error);
          clearAuthData();
        }
      } else {
        // Если данные неполные или невалидны, очищаем их
        if (storedUser === 'undefined' || storedToken === 'undefined' || storedToken === 'null') {
          clearAuthData();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  // Функция для очистки данных аутентификации
  const clearAuthData = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('auth-token');
    setUser(null);
  };

  const login = (userData: User, token: string) => {
    // Валидация входных данных
    if (!userData || !userData.id || !token) {
      console.error('Invalid login data:', { userData, token });
      return;
    }
    
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('auth-token', token);
  };

  const logout = () => {
    clearAuthData();
    // Принудительно обновляем страницу для сброса состояния
    window.location.href = '/';
  };

  // Функция для обновления данных пользователя
  const refreshUser = (userData: User) => {  
      setUser(userData);
  };

  return {
    user,
    loading,
    login,
    logout,
    refreshUser,
    isAuthenticated: !!user && !!user.id
  };
};