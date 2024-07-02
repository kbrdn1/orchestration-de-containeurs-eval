import { css } from "panda/css";
import { hstack, vstack } from "panda/patterns";

const root = vstack({
  w: "full",
  h: "full",
  alignItems: "center",
  gap: 4,
});

const navStyle = hstack({
  w: "full",
  h: "fit",
  bg: "primary",
  color: "lightgray",
  gap: 10,
  p: 4,
  position: "fixed",
  zIndex: 10,
  top: 0,
  left: 0,
});

const titleStyle = css({
  fontSize: "xl",
  fontWeight: "bold",
  color: "white",
});

const navListStyle = hstack({
  gap: 4,
  alignItems: "center",
});

const navItemStyle = css({
  _hover: {
    color: "white",
  },
  fontSize: "md",
  fontWeight: "medium",
  transition: "color 0.3s",
});

const activeStyle = css({
  color: "accentLight",
  fontWeight: "semibold",
});

const profileStyle = css({
  ml: "auto",
});

const mainStyle = vstack({
  w: "full",
  h: "full",
  p: 4,
  gap: 4,
  mt: 16,
});

export {
  root,
  navStyle,
  titleStyle,
  navListStyle,
  navItemStyle,
  activeStyle,
  profileStyle,
  mainStyle,
};
export default root;
