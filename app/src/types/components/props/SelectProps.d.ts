type Option = {
  label: string;
  value: string | number;
};

type SelectProps = {
  label?: string;
  name: string;
  size: "fit" | "full";
  options?: Option[];
  required?: boolean;
};

export { Option };
export default SelectProps;
