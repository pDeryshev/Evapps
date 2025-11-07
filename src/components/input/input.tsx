"use client"

import type { IInput } from "@/types/input"
import "./input.scss"

export const Input = ({
  className,
  type,
  name,
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
  required
}: IInput) => {
  return (
    <div className={className}>
      <label
        className={`${className}__label`}
        htmlFor={id}
      >
        {required && <span className={`${className}__requred`}>*</span>}
        <p>{label}</p>
      </label>
      <input
        className={`${className}__field ${error ? `${className}__field--error` : ''}`}
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
      {error && <span className={`${className}__error`}>{error}</span>}
    </div>
  )
}