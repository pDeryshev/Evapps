"use client";

import { Button } from "@/components/buttons/button";
import { Input } from "@/components/input/input";
import { Form } from "@/components/form/form";
import { Textarea } from "@/components/textarea/textarea";
import "./create-review.scss";
import { useNavigation } from "@/utils/hooks/useNavigation";
import { commentsAPI } from "@/api/comments";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateReviewPage() {
  const { handleBack } = useNavigation();
  const params = useParams();
  const router = useRouter();
  const postId = Number(params.id);

  const [formData, setFormData] = useState({
    author_name: "",
    comment: ""
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

    if (!formData.author_name.trim()) {
      newErrors.author_name = "Введите ваше имя";
    }

    if (!formData.comment.trim()) {
      newErrors.comment = "Введите текст отзыва";
    } else if (formData.comment.length < 10) {
      newErrors.comment = "Отзыв должен содержать минимум 10 символов";
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

    try {
      await commentsAPI.addComment(postId, formData);

      // Перенаправляем на страницу поста после успешного создания
      router.push(`/post/${postId}`);

    } catch (error) {
      console.error('Error creating comment:', error);
      setErrors({
        submit: "Ошибка при отправке отзыва. Попробуйте еще раз."
      });
    } finally {
      setLoading(false);
    }
  };

  const formInputs = [
    <Input
      key="author_name"
      className="custom-input"
      type="text"
      name="author_name"
      id="author_name"
      label="Ваше имя"
      placeholder="Ваше имя"
      value={formData.author_name}
      onChange={(value) => handleInputChange("author_name", value)}
      error={errors.author_name}
      required
    />,
    <Textarea
      key="comment"
      className="custom-textarea"
      name="comment"
      id="comment"
      label="Описание"
      placeholder="Добавьте текст отзыва"
      maxLength={600}
      value={formData.comment}
      onChange={(value) => handleInputChange("comment", value)}
      error={errors.comment}
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
      key="save"
      type="submit"
      className="btn btn--accent login__btn"
      text={loading ? "Сохранение..." : "Сохранить"}
      disabled={loading}
    />
  ];

  return (
    <div className="create-review">
      <div className="container">
        <div className="create-review__wrapper">
          <Form
            className="create-review__form"
            title="Добавление отзыва"
            inputs={formInputs}
            buttons={formButtons}
            onSubmit={handleSubmit}
          />

          {errors.submit && (
            <div className="create-review__error">
              {errors.submit}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};