import { Option } from "@/types";

interface Filter {
  key: string;
  label: string;
  value?: string;
  type:
    | "text"
    | "url"
    | "email"
    | "password"
    | "select"
    | "date"
    | "number"
    | "checkbox"
    | "json";
  options?: Option[];
  defaultChecked?: boolean;
}

export default Filter;
