"use client"

import { userAPI } from "@/api/user";
import { Button } from "@/components/buttons/button";
import { Form } from "@/components/form/form";
import { Input } from "@/components/input/input";
import { useAuth } from "@/utils/hooks/useAuth";
import { useNavigation } from "@/utils/hooks/useNavigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import "./edit.scss";
import AddPhotoIcon from "../../../../public/icon/AddPhotoIcon";
import { Textarea } from "@/components/textarea/textarea";

export default function UserProfileEditPage() {
  const { user, refreshUser } = useAuth()
  const [formData, setFormData] = useState({
    full_name: "",
    city: "",
    bio: "",
    password: "",
    password_confirmation: ""
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { handleBack, handleProfile } = useNavigation();
  const [loading, setLoading] = useState(false);

  // Инициализируем formData данными пользователя при загрузке
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        full_name: user.full_name || "",
        city: user.city || "",
        bio: user.bio || ""
      }));
    }
  }, [user]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({})

    try {
      const userData = {
        full_name: formData.full_name,
        city: formData.city,
        bio: formData.bio
      }
      const updatedUser = await userAPI.chengeUser(userData);
      if (formData.password && formData.password_confirmation) {
        const passwordData = {
          password: formData.password
        };
        await userAPI.changePassword(passwordData);
      }
      if (refreshUser) {
        refreshUser(updatedUser);
      }
      // Очищаем поля пароля после успешного обновления
      setFormData(prev => ({
        ...prev,
        password: "",
        password_confirmation: ""
      }));
      handleProfile()
    } catch (error: any) {
      console.error("Error updating profile:", error);
      setErrors({
        submit: error.message || "Произошла ошибка при обновлении данных"
      });
    } finally {
      setLoading(false);
    }
  };

  const formInputsInfo = [
    <Input
      key="full_name"
      className="custom-input"
      type="text"
      name="full_name"
      id="full_name"
      label="ФИО"
      placeholder="ФИО"
      value={formData.full_name}
      onChange={(value) => handleInputChange("full_name", value)}
      error={errors.full_name}
      required
    />,
    <Input
      key="city"
      className="custom-input"
      type="text"
      name="city"
      id="city"
      label="Город"
      placeholder="Город"
      value={formData.city} // Используем formData вместо user
      onChange={(value) => handleInputChange("city", value)}
      error={errors.city}
      required
    />,
    <Textarea
      key="bio"
      className="custom-textarea"
      name="bio"
      id="bio"
      label="О себе"
      placeholder="Расскажите о себе"
      maxLength={600}
      value={formData.bio}
      onChange={(value) => handleInputChange("comment", value)}
      error={errors.bio}
      required
    />
  ];

  return (
    <div className="edit">
      <div className="container">
        <div className="edit__wrapper">
          <div className="edit__avatar">
            <Image
              className="edit_img"
              src="/"
              alt="Фото пользователя"
              width={240}
              height={240}
            />
            <Button
              className="edit__remove-img"
              type="button"
            >
              <AddPhotoIcon className="edit__photo-icon" />
              Изменить фото
            </Button>
          </div>
          <Form
            className="edit__form"
            inputs={formInputsInfo}
            buttons={[]}
            onSubmit={handleSubmit}
          >
            <>
              <fieldset className="edit__form-password">
                <legend className="edit__form-subtitle">Смена пароля</legend>
                <Input
                  key="password"
                  className="custom-input"
                  type="password"
                  name="password"
                  id="password"
                  label="Новый пароль"
                  placeholder="Новый пароль"
                  value={formData.password}
                  onChange={(value) => handleInputChange("password", value)}
                  error={errors.new_password}
                />
                <Input
                  key="password_confirmation"
                  className="custom-input"
                  type="password"
                  name="password_confirmation"
                  id="password_confirmation"
                  label="Повторите пароль"
                  placeholder="Повторите пароль"
                  value={formData.password_confirmation}
                  onChange={(value) => handleInputChange("password_confirmation", value)}
                  error={errors.new_password_confirmation}
                />
              </fieldset>
              <div className="edit__buttons">
                <Button
                  key="back"
                  type="button"
                  className="btn edit__btn"
                  onClick={handleBack}
                >Назад</Button>
                <Button
                  key="save"
                  type="submit"
                  className="btn btn--accent edit__btn"
                  disabled={loading}
                >Сохранить</Button>
              </div>
            </>
          </Form>
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