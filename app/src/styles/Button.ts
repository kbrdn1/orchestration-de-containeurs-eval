import { cva } from "panda/css";

const root = cva({
  base: {
    w: "full",
    maxW: 350,
    px: 4,
    py: 2,
    display: "flex",
    gap: 2,
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "btn",
    fontWeight: "btn",
    rounded: "lg",
    transitionTimingFunction: "ease",
    transitionDuration: "150ms",
    transitionProperty: "background-color, border-color, color",
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
    visual: {
      solid: {
        color: "primaryBtnText",
        bg: "primaryBtn",
        _hover: {
          bg: "primaryBtnHover",
        },
      },
      secondary: {
        color: "primaryBtn",
        bg: "secondaryBtn",
        _hover: {
          bg: "secondaryBtnHover",
        },
      },
      outline: {
        color: "primaryBtn",
        bg: "white",
        borderBlockColor: "primaryBtn",
        borderBlockStyle: "solid",
        borderWidth: 1,
        _hover: {
          bg: "secondaryBtnHover",
        },
      },
      ghost: {
        color: "primaryBtn",
        bg: "transparent",
        border: "none",
        _hover: {
          bg: "secondaryBtn",
        },
      },
      action: {
        color: "primaryBtn",
        bg: "transparent",
        border: "none",
        justifyContent: "left",
        _hover: {
          bg: "secondaryBtn",
        },
        _focus: {
          outline: "none",
        },
      },
    },
    color: {
      danger: {
        color: "white",
        bg: "danger",
        _hover: {
          bg: "dangerHover",
        },
      },
      warning: {
        color: "white",
        bg: "warning",
        _hover: {
          bg: "warningHover",
        },
      },
      success: {
        color: "white",
        bg: "success",
        _hover: {
          bg: "successHover",
        },
      },
      info: {
        color: "white",
        bg: "info",
        _hover: {
          bg: "infoHover",
        },
      },
    },
    size: {
      full: {
        w: "full",
      },
      fit: {
        w: "fit-content",
      },
      sm: {
        fontSize: "0.75rem",
      },
      action: {
        textWrap: "nowrap",
        w: "full",
        rounded: "none",
      },
      icon: {
        w: "fit",
        py: 3,
      },
    },
  },
});

export { root };
export default root;
