// app/register/page.tsx
"use client";

import { Button } from "@/components/buttons/button";
import { Input } from "@/components/input/input";
import "./register.scss";
import { Form } from "@/components/form/form";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authAPI } from "@/api/auth";
import { useAuth } from "@/utils/hooks/useAuth";
import { useNavigation } from "@/utils/hooks/useNavigation";

export default function RegisterPage() {
  const { handleBack } = useNavigation();
  const { login } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password_confirmation: ""
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState("");

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

    // Валидация email
    if (!formData.email.trim()) {
      newErrors.email = "Введите email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Введите корректный email";
    }

    // Валидация пароля
    if (!formData.password) {
      newErrors.password = "Введите пароль";
    } else if (formData.password.length < 6) {
      newErrors.password = "Пароль должен содержать минимум 6 символов";
    }

    // Валидация подтверждения пароля
    if (!formData.password_confirmation) {
      newErrors.password_confirmation = "Подтвердите пароль";
    } else if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = "Пароли не совпадают";
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
    setSuccessMessage("");

    try {
      // Отправляем данные для регистрации
      const response = await authAPI.register(formData);
      
      // Успешная регистрация
      setSuccessMessage("Регистрация успешна! Выполняется вход...");
      
      // После успешной регистрации автоматически логинимся
      try {
        const loginResponse = await authAPI.login({
          email: formData.email,
          password: formData.password
        });
        
        // Сохраняем данные пользователя
        login(loginResponse.user, loginResponse.token);
        
        // Перенаправляем на главную страницу
        setTimeout(() => {
          router.push('/');
        }, 1000);
        
      } catch (loginError) {
        console.error('Auto-login error:', loginError);
        setSuccessMessage("Регистрация успешна! Теперь вы можете войти.");
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      
      // Обработка ошибок валидации (422)
      if (error.response?.status === 422 && error.response?.data?.errors) {
        const serverErrors = error.response.data.errors;
        const newErrors: { [key: string]: string } = {};
        
        if (serverErrors.email) {
          newErrors.email = serverErrors.email[0];
        }
        if (serverErrors.password) {
          newErrors.password = serverErrors.password[0];
        }
        if (serverErrors.password_confirmation) {
          newErrors.password_confirmation = serverErrors.password_confirmation[0];
        }
        
        setErrors(newErrors);
      } else {
        setErrors({ submit: "Ошибка при регистрации. Попробуйте еще раз." });
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
    />,
    <Input
      key="password_confirmation"
      className="custom-input"
      type="password"
      name="password_confirmation"
      id="password_confirmation"
      label="Подтверждение пароля"
      placeholder="Повторите пароль"
      value={formData.password_confirmation}
      onChange={(value) => handleInputChange("password_confirmation", value)}
      error={errors.password_confirmation}
      required
    />
  ];

  const formButtons = [
    <Button
      key="back"
      type="button"
      className="btn register__btn"
      text="Назад"
      onClick={handleBack}
      disabled={loading}
    />,
    <Button
      key="submit"
      type="submit"
      className="btn btn--accent register__btn"
      text={loading ? "Регистрация..." : "Зарегистрироваться"}
      disabled={loading}
    />
  ];

  return (
    <div className="register">
      <div className="container">
        <div className="register__wrapper">
          <Form
            className="register__form"
            title="Регистрация"
            inputs={formInputs}
            buttons={formButtons}
            onSubmit={handleSubmit}
          />

          <div className="register__login-link">
            Уже есть аккаунт? <Link href="/login">Войти</Link>
          </div>

          {successMessage && (
            <div className="register__success">
              {successMessage}
            </div>
          )}
          
          {errors.submit && (
            <div className="register__error">
              {errors.submit}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}