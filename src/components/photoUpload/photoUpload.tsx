"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/buttons/button";
import Image from "next/image";
import type { IPhotoUpload } from "@/types/photoUpload";
import "./photo-upload.scss"


export const PhotoUpload = ({ onFileSelect, className = "" }: IPhotoUpload) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      onFileSelect(file);
      
      // Создание превью
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`photo-upload ${className}`}>
      {preview ? (
        <div className="photo-upload__preview">
          <Image src={preview} alt="Превью" width={200} height={150} />
          <Button
            type="button"
            className="photo-upload__btn"
            text="Удалить"
            onClick={handleRemovePhoto}
          />
        </div>
      ) : (
        <Button
          type="button"
          className="photo-upload__btn"
          text="Загрузите ваше фото"
          onClick={handleButtonClick}
        />
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};