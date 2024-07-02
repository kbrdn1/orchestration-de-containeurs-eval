import { css } from "panda/css";

const root = css({
  w: "full",
  h: "full",
  display: "flex",
  alignItems: "center",
  flexDir: "column",
  gap: 4,
});

const headerStyle = css({
  position: "fixed",
  top: 0,
  left: 0,
  w: "full",
  p: "6",
  bg: "primary",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDir: "column",
  gap: 2,
});

const titleStyle = css({
  fontSize: "4xl",
  fontWeight: "bold",
});

const imgStyle = css({
  w: "300",
});

const bodyStyle = css({
  w: "full",
  h: "full",
  p: "6",
  display: "flex",
  justifyContent: "center",
});

export { root, headerStyle, titleStyle, bodyStyle, imgStyle };
export default root;
