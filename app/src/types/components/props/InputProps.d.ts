type InputProps = {
  name: string;
  type: "text" | "email" | "password" | "tel" | "url";
  label?: string;
  required?: boolean;
  hidden?: boolean;
  error?: string;
  placeholder?: string;
  readonly?: boolean;
  size?: "full" | "fit";
};

export default InputProps;
