import { css, cva } from "panda/css";

const root = cva({
  base: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
    w: "full",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  variants: {
    size: {
      full: {
        maxW: "full",
      },
      normal: {
        maxW: 350,
      },
    },
  },
});

const labelStyle = css({
  fontSize: ".75rem",
  fontWeight: "semibold",
  alignSelf: "flex-start",
});

const textareaStyle = cva({
  base: {
    fontSize: "btn",
    p: 2,
    color: "black",
    rounded: "lg",
    border: "1px solid #26221e",
    w: "full",
    bg: "white",
    resize: "both",
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
  },
  variants: {
    size: {
      full: {
        maxW: "full",
      },
      normal: {
        maxW: 350,
      },
    },
  },
});

const requiredStyle = css({
  color: "red",
  fontSize: ".75rem",
  fontWeight: "semibold",
  alignSelf: "flex-start",
});

export { root, labelStyle, textareaStyle, requiredStyle };
export default root;
