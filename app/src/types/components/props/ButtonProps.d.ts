import * as icons from "lucide-vue-next";

type ButtonProps = {
  type: "button" | "submit" | "reset";
  visual: "solid" | "outline" | "ghost" | "secondary" | "action";
  size: "full" | "fit" | "sm" | "action" | "icon";
  color?: "danger" | "warning" | "success" | "info";
  icon?: keyof typeof icons;
  handleClick?: () => void;
};

export default ButtonProps;
