import { css } from "panda/css";
import { hstack } from "panda/patterns";

const root = hstack({
  w: "full",
  h: "fit",
  bg: "primary",
  color: "lightgray",
  gap: 10,
  py: 4,
  pl: 8,
  pr: 4,
  position: "fixed",
  zIndex: 99999,
  top: 0,
  left: 0,
});

const titleStyle = css({
  fontSize: "xl",
  fontWeight: "bold",
  color: "white",
});

const logoStyle = css({
  h: "2rem",
});

const navListStyle = hstack({
  gap: 2,
  p: 1,
  alignItems: "center",
  bg: "rgba(100, 100, 100, 0.1)",
  borderRadius: "md",
});

const navItemStyle = css({
  display: "flex",
  gap: 2,
  alignItems: "center",
  flexWrap: "nowrap",
  _hover: {
    color: "white",
    bg: "rgba(255, 255, 255, 0.1)",
  },
  fontSize: "md",
  fontWeight: "medium",
  transition: "color 0.3s, background-color 0.3s",
  px: 3,
  py: 1,
  borderRadius: "md",
  bg: "rgba(255, 255, 255, 0.05)",
});

const activeStyle = css({
  color: "accentLight",
  fontWeight: "semibold",
  bg: "rgba(173, 216, 230, 0.2)",
});

export { root, titleStyle, logoStyle, navListStyle, navItemStyle, activeStyle };
export default root;
