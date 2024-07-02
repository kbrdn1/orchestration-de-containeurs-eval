import { css, cva } from "panda/css";
import { vstack } from "panda/patterns";

const root = vstack({
  w: "full",
  maxW: 350,
  gap: 1,
  justify: "flex-start",
  alignItems: "center",
});

const labelStyle = css({
  fontSize: ".75rem",
  fontWeight: "semibold",
  alignSelf: "flex-start",
});

const inputStyle = cva({
  base: {
    fontSize: "btn",
    p: 2,
    color: "black",
    rounded: "lg",
    border: "1px solid #26221e",
    w: "full",
    bg: "white",
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
    _disabled: {
      cursor: "not-allowed",
      opacity: 0.5,
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
      fit: {
        w: "fit",
        maxW: 350,
      },
    },
  },
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

export { root, labelStyle, inputStyle, requiredStyle, textareaStyle };
export default root;