import type { IInput } from "@/types/input"
import "./input.scss"

export const Input = ({
  className,
  type,
  name,
  id,
  label,
  placeholder
}: IInput) => {
  return (
    <div className={className}>
      <label
        className={`${className}__label`}
        htmlFor={id}
      >
        <span className={`${className}__requred`}>*</span>
        <p>{label}</p>
      </label>
      <input
        className={`${className}__field`}
        type={type} name={name}
        id={id}
        placeholder={placeholder}
      />
    </div>
  )
}