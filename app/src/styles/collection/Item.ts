import { vstack } from "panda/patterns";
import { css } from "panda/css";

const root = vstack({
  w: "full",
  gap: 2,
  p: 2,
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
    w: "1/2",
  },
  xl: {
    w: "1/3",
  },
  mdDown: {
    justifyContent: "center",
    alignItems: "center",
    w: 220,
    h: "full",
  },
});

const imgStyle = css({
  mdDown: {
    maxW: 120,
    maxH: 120,
  },
});

const nameStyle = css({
  fontSize: ".85rem",
  textAlign: "center",
  h: "full",
  display: "flex",
  alignItems: "center",
});

export { root, imgStyle, nameStyle };
export default root;