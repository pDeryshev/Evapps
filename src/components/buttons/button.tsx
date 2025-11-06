import type { IButton } from "../../types/button";
import "./button.scss"

export const Button = ({
  className,
  text,
  type,
  ...props
}: IButton) => {
  return (
    <button
      type={type}
      className={className}
      {...props}
    >
      {text}
    </button>
  )
}
