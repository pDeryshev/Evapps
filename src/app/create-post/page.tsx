"use client";

import { Button } from "@/components/buttons/button";
import { Input } from "@/components/input/input";
import { Form } from "@/components/form/form";
import { Textarea } from "@/components/textarea/textarea";
import "./create-post.scss";
import { PhotoUpload } from "@/components/photoUpload/photoUpload";
import { useNavigation } from "@/utils/hooks/useNavigation";

export default function CreatePostPage() {
  const handleFileSelect = (file: File) => {
    console.log("Выбран файл:", file);
    // Обработка файла: превью, валидация, подготовка к загрузке
  };

  const { handleBack } = useNavigation();

  return (
    <div className="create-post">
      <div className="container">
        <div className="create-post__wrapper">
          <Form
            className="create-post__form"
            title="Добавление истории о путешествии"
            inputs={[
              <PhotoUpload
                key="photo"
                onFileSelect={handleFileSelect}
                className="create-post__photo-upload"
              />,
              <Input
                key="title"
                className="custom-input"
                type="text"
                name="title"
                id="title"
                label="Заголовок"
                placeholder="Заголовок"
              />,
              <Input
                key="country"
                className="custom-input"
                type="text"
                name="country"
                id="country"
                label="Страна"
                placeholder="Страна"
              />,
              <Input
                key="city"
                className="custom-input"
                type="text"
                name="city"
                id="city"
                label="Город"
                placeholder="Город"
              />,
              <Textarea
                key="description"
                className="custom-textarea"
                name="description"
                id="description"
                label="Описание"
                placeholder="Добавьте описание вашей истории"
                maxLength={2000}
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