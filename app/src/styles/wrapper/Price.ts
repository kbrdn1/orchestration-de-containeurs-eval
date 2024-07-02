import { cva, css } from "panda/css";

const root = cva({
  base: {
    w: "full",
    textAlign: "center",
    fontSize: "1rem",
    fontWeight: "medium",
  },
  variants: {
    size: {
      full: {
        w: "full",
      },
      fit: {
        w: "fit-content",
      },
    },
  },
});

const soldOutStyle = css({
  color: "primary",
  opacity: 0.5,
  fontSize: "0.8rem",
  fontWeight: "semibold",
});

export { root, soldOutStyle };
export default root;
