"use client";

import { Button } from "@/components/buttons/button";
import { Input } from "@/components/input/input";
import { Form } from "@/components/form/form";
import { Textarea } from "@/components/textarea/textarea";
import "./create-review.scss";
import { useNavigation } from "@/utils/hooks/useNavigation";

export default function CreateReviewPage() {
  const { handleBack } = useNavigation();

  return (
    <div className="create-review">
      <div className="container">
        <div className="create-review__wrapper">
          <Form
            className="create-review__form"
            title="Добавление отзыва"
            inputs={[
              <Input
                key="name"
                className="custom-input"
                type="text"
                name="name"
                id="name"
                label="Ваше имя"
                placeholder="Ваше имя"
              />,
              <Textarea
                key="description"
                className="custom-textarea"
                name="description"
                id="description"
                label="Описание"
                placeholder="Добавьте текст отзыва"
                maxLength={600}
              />
            ]}
            buttons={[
              <Button
                key="back"
                type="button"
                className="btn login__btn"
                text="Назад"
                onClick={handleBack}
              />,
              <Button
                key="save"
                type="submit"
                className="btn btn--accent login__btn"
                text="Сохранить"
              />
            ]}
          />
        </div>
      </div>
    </div>

  )
}