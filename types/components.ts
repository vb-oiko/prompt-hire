import type { Position } from "../tables/PositionTable.ts";

export interface InputFieldProps {
  name: string;
  label: string;
  type?: "text" | "textarea" | "url" | "number" | "email" | "password";
  value?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export interface PositionViewProps {
  position?: Position;
  mode?: "view" | "edit" | "create";
}
