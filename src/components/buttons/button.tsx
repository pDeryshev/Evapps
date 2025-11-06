import type { IButton } from "../../types/button";
import "./button.scss"

export const Button = ({ className, text, type }: IButton) => {
  return (
    <button type={type} className={className}>{text}</button>
  )
}
