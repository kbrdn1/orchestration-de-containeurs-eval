import { vstack } from "panda/patterns";
import { css } from "panda/css";

const root = vstack({
  w: "1/2",
  h: 120,
  p: 2,
  gap: 2,
  display: "flex",
  flexDir: "column",
  alignItems: "center",
  justifyContent: "start",
  cursor: "pointer",
  color: "secondary",
  borderColor: "#e2e8f0",
  borderBlock: "solid",
  borderWidth: 0.25,
  _hover: {
    bg: "secondaryBtnHover",
    color: "primary",
  },
  _selected: {
    bg: "secondaryBtn",
    color: "primary",
  },
  lg: {
    w: "1/3",
  },
  xl: {
    w: "1/4",
  },
  mdDown: {
    justifyContent: "center",
    alignItems: "center",
    minW: 220,
    h: "full",
  },
});

const nameStyle = css({
  fontSize: ".85rem",
  textAlign: "center",
  h: "full",
  display: "flex",
  alignItems: "center",
});

const imgStyle = css({
  h: 220,
  overflow: "hidden",
  rounded: "full",
});

export { root, nameStyle, imgStyle }
export default root;
