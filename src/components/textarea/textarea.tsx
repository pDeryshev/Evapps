import type { ITextarea } from "@/types/textarea"
import "./textarea.scss"
import React, { useState } from "react"

export const Textarea = ({
  className,
  name,
  id,
  label,
  placeholder,
  maxLength,
  ...props
}: ITextarea) => {
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length);

    // Пробрасываем событие onChange если оно есть в props
    props.onChange?.(e);
  }

  return (
    <div className={className}>
      {label && <label
        className={`${className}__label`}
        htmlFor={id}
      >
        <span className={`${className}__requred`}>*</span>
        <p>{label}</p>
      </label>
      }
      <div className={`${className}__inner`}>
        <textarea
          className={`${className}__field`}
          name={name}
          id={id}
          placeholder={placeholder}
          maxLength={maxLength}
          onChange={handleChange}
          {...props}
        />
        {maxLength && (
          <span className={`${className}__counter`}>
            {charCount} / {maxLength}
          </span>
        )}
      </div>

    </div>
  )
}