import Filter from "./Filter";

interface Field extends Filter {
  default?: string | number;
  required?: boolean;
}

export default Field;
