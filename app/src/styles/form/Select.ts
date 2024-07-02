import { css, cva } from "panda/css";

const root = cva({
  base: {
    w: "full",
    maxW: 350,
    gap: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  variants: {
    size: {
      full: {
        w: "full",
        maxW: "none",
      },
      fit: {
        w: "fit",
        maxW: 350,
      },
      normal: {
        w: "full",
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

const selectStyle = cva({
  base: {
    px: 4,
    py: 2,
    cursor: "pointer",
    fontSize: "btn",
    fontWeight: "btn",
    rounded: "lg",
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
        w: "full",
        maxW: "none",
      },
      fit: {
        w: "fit",
        maxW: 350,
      },
      normal: {
        w: "full",
        maxW: 350,
      },
    },
  },
});

export { root, labelStyle, selectStyle };
export default root;