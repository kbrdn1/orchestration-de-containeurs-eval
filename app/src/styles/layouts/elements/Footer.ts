import { css } from "panda/css";

const root = css({
  position: "fixed",
  bottom: 0,
  left: 0,
  w: "full",
  bg: "primary",
  color: "white",
  textAlign: "center",
  fontSize: "xs",
  p: 2,
});

const linkStyle = css({
  _hover: {
    textDecoration: "underline",
    color: "accentLight",
  },
});

export { root, linkStyle };
export default root;
