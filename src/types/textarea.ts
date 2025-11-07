export interface ITextarea {
  className?: string;
  name: string;
  id: string;
  label?: string;
  placeholder?: string;
  maxLength?: number;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  required?: boolean;
}