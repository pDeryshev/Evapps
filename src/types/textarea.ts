export interface ITextarea {
  className?: string;
  name: string;
  id: string;
  label?: string;
  placeholder?: string;
  maxLength?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}