import { hstack } from "panda/patterns";

const root = hstack({
  position: "relative",
  w: "full",
  p: "4",
  alignItems: "center",
  justify: "center",
  textWrap: "wrap",
  color: "secondary",
  transitionTimingFunction: "ease",
  transitionDuration: "300ms",
  transitionProperty: "background-color",
  cursor: "pointer",
  _hover: {
    bg: "secondaryBtnHover",
    color: "primary",
  },
  _after: {
    position: "absolute",
    content: "''",
    w: "full",
    h: 0,
    bg: "primary",
    zIndex: 1,
    bottom: 0,
    transitionTimingFunction: "ease",
    transitionDuration: "300ms",
    transitionProperty: "height",
  },
  _selected: {
    bg: "secondaryBtn",
    color: "primary",
    fontWeight: "semibold",
    _after: {
      h: 2,
    },
  },
  _disabled: {
    cursor: "not-allowed",
    opacity: 0.5,
  },
});

export { root };
export default root;
