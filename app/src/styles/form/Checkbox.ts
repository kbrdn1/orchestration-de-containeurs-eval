import { css, cva } from "panda/css";
import { hstack } from "panda/patterns";

const root = hstack({
  w: "full",
  gap: 2.5,
  justify: "flex-start",
  alignItems: "center",
});

const buttonStyle = cva({
  base: {
    display: "inline-flex",
    p: 2,
    rounded: "lg",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    gap: 2.5,
    transition: "background-color 0.3s",
    _focus: {
      outline: "solid",
      outlineColor: "accentLight",
      outlineOffset: "2px",
      outlineWidth: 2,
      animation: "focus",
      animationName: "focus",
      animationDuration: "150ms",
      animationIterationCount: 1,
    },
    _selected: {
      bg: "#eff7fa",
    },
  },
  variants: {
    size: {
      fit: {
        w: "fit",
      },
      full: {
        w: "full",
      },
    },
  },
});

const checkboxStyle = css({
  appearance: "none",
  pos: "relative",
  display: "inline-block",
  verticalAlign: "middle",
  borderRadius: "md",
  w: 4,
  h: 4,
  _after: {
    content: '""',
    pos: "absolute",
    top: 0,
    left: 0,
    w: 4,
    h: 4,
    zIndex: 1,
    bg: "transparent",
    transition: "all",
    transitionDuration: "150ms",
    transitionTimingFunction: "inOut",
  },
  _checked: {
    _before: {
      content: '""',
      pos: "absolute",
      w: "75%",
      h: "75%",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 2,
      rounded: "sm",
      bg: "accent",
    },
  },
  _focus: {
    outline: "solid",
    outlineColor: "accentLight",
    outlineOffset: "2px",
    outlineWidth: 2,
    animation: "focus",
    animationName: "focus",
    animationDuration: "150ms",
    animationIterationCount: 1,
    rounded: "md",
  },
});

const labelStyle = css({
  fontSize: ".75rem",
  fontWeight: "semibold",
  alignSelf: "flex-start",
  cursor: "pointer",
  w: "fit",
});

const labelCountStyle = css({
  fontSize: ".75rem",
  fontWeight: "semibold",
  alignSelf: "flex-start",
  cursor: "pointer",
  w: "fit",
  color: "secondary",
  py: 1,
  px: 2,
  bg: "rgba(173, 216, 230, 0.5)",
  borderRadius: "md",
});

export { root, buttonStyle, checkboxStyle, labelStyle, labelCountStyle };
