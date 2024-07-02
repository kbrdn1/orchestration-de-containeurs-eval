import { css } from "panda/css";
import { hstack, vstack } from "panda/patterns";

const root = hstack({
  pl: 2,
  gap: 2,
  ml: "auto",
  borderRadius: "lg",
  bg: "rgba(255, 255, 255, 0.1)",
});

const containerStyle = vstack({
  gap: 2,
});

const emailStyle = css({
  fontSize: "small",
  fontWeight: "semibold",
});

const buttonStyle = hstack({
  cursor: "pointer",
  w: "full",
});

export { root, containerStyle, emailStyle, buttonStyle };
export default root;
