"use client";

import type { IFormProps } from "@/types/form";

export const Form = ({
  title,
  inputs,
  buttons,
  onSubmit,
  className = '',
  children
}: IFormProps) => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      {/* Заголовок */}
      {title && (
        <div className="form__header">
          {typeof title === 'string' ? <h1 className={`${className}-title`}>{title}</h1> : title}
        </div>
      )}
      {/* Поля ввода */}
      <div className={`${className}-inner`}>
        {inputs}
      </div>
      {/* Кнопки */}
      {buttons.length > 0 && (
        <div className={`${className}-buttons`}>
          {buttons}
        </div>
      )}
      {children}
    </form>
  );
};