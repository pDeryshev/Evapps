import type { ITextarea } from "@/types/textarea"
import "./textarea.scss"
import React, { useState, useEffect } from "react"

export const Textarea = ({
  className,
  name,
  id,
  label,
  placeholder,
  maxLength,
  value,
  onChange,
  error,
  required
}: ITextarea) => {
  const [charCount, setCharCount] = useState(0);

  // Обновляем счетчик символов при изменении value
  useEffect(() => {
    setCharCount(value?.length || 0);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    
    // Проверяем максимальную длину
    if (maxLength && newValue.length > maxLength) {
      return;
    }
    
    setCharCount(newValue.length);
    onChange?.(newValue);
  }

  return (
    <div className={className}>
      {label && <label
        className={`${className}__label`}
        htmlFor={id}
      >
        {required && <span className={`${className}__requred`}>*</span>}
        <p>{label}</p>
      </label>
      }
      <div className={`${className}__inner`}>
        <textarea
          className={`${className}__field ${error ? `${className}__field--error` : ''}`}
          name={name}
          id={id}
          placeholder={placeholder}
          maxLength={maxLength}
          value={value}
          onChange={handleChange}
        />
        {maxLength && (
          <span className={`${className}__counter`}>
            {charCount} / {maxLength}
          </span>
        )}
      </div>
      {error && <span className={`${className}__error`}>{error}</span>}
    </div>
  )
}