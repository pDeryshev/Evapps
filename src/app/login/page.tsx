"use client";

import { Button } from "@/components/buttons/button";
import { Input } from "@/components/input/input";
import { Form } from "@/components/form/form";
import Link from "next/link";
import "./login.scss";
import { authAPI } from "@/api/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/utils/hooks/useAuth";
import { userAPI } from "@/api/user";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Очищаем ошибку при изменении поля
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email.trim()) {
      newErrors.email = "Введите email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Введите корректный email";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Введите пароль";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await authAPI.login(formData);
      const token = response.token; // Получаем токен из ответа
      // Сохраняем токен в localStorage перед запросом пользователя
      localStorage.setItem('auth-token', token);

      // После успешного логина получаем данные пользователя отдельным запросом
      try {
        const userData = await userAPI.getUser();
        // Сохраняем данные пользователя
        login(userData, token);
        // Перенаправляем на главную страницу
        router.push('/');
      } catch (userError) {
        console.error('Failed to fetch user data:', userError);
        setErrors({ submit: "Ошибка при получении данных пользователя" });
        // Очищаем токен если не удалось получить пользователя
        localStorage.removeItem('auth-token');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      // ... обработка ошибок без изменений ...
    } finally {
      setLoading(false);
    }
  };

  const formInputs = [
    <Input
      key="email"
      className="custom-input"
      type="email"
      name="email"
      id="email"
      label="Email"
      placeholder="Email"
      value={formData.email}
      onChange={(value) => handleInputChange("email", value)}
      error={errors.email}
      required
    />,
    <Input
      key="password"
      className="custom-input"
      type="password"
      name="password"
      id="password"
      label="Пароль"
      placeholder="Пароль"
      value={formData.password}
      onChange={(value) => handleInputChange("password", value)}
      error={errors.password}
      required
    />
  ];

  const formButtons = [
    <Link href="/register" key="register">
      <Button
        type="button"
        className="btn login__btn"
      >Зарегистрироваться</Button>
    </Link>,
    <Button
      key="login"
      type="submit"
      className="btn btn--accent login__btn"
      disabled={loading}
    >{loading ? "Вход..." : "Войти"}</Button>
  ];

  return (
    <div className="login">
      <div className="container">
        <div className="login__wrapper">
          <Form
            className="login__form"
            title="Вход в профиль"
            inputs={formInputs}
            buttons={formButtons}
            onSubmit={handleSubmit}
          />
          {errors.submit && (
            <div className="login__error">
              {errors.submit}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}