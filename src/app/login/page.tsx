"use client";

import { Button } from "@/components/buttons/button";
import { Input } from "@/components/input/input";
import { Form } from "@/components/form/form";
import Link from "next/link";
import "./login.scss";
import { useNavigation } from "@/utils/hooks/useNavigation";
import { authAPI } from "@/api/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/utils/hooks/useAuth";

export default function LoginPage() {
  const { handleBack } = useNavigation();
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
      
      // Сохраняем данные пользователя
      login(response.user, response.token);
      
      // Перенаправляем на главную страницу
      router.push('/');
    } catch (error: any) {
      console.error('Login error:', error);
      
      if (error.response?.status === 401) {
        setErrors({ submit: "Неверный email или пароль" });
      } else if (error.response?.status === 422) {
        // Обработка ошибок валидации
        const serverErrors = error.response.data.errors;
        const newErrors: { [key: string]: string } = {};
        
        if (serverErrors.email) {
          newErrors.email = serverErrors.email[0];
        }
        if (serverErrors.password) {
          newErrors.password = serverErrors.password[0];
        }
        
        setErrors(newErrors);
      } else {
        setErrors({ submit: "Ошибка при входе. Попробуйте еще раз." });
      }
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
    <Button
      key="back"
      type="button"
      className="btn login__btn"
      text="Назад"
      onClick={handleBack}
      disabled={loading}
    />,
    <Button
      key="login"
      type="submit"
      className="btn btn--accent login__btn"
      text={loading ? "Вход..." : "Войти"}
      disabled={loading}
    />
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

          <div className="login__register-link">
            Нет аккаунта? <Link href="/register">Зарегистрироваться</Link>
          </div>

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