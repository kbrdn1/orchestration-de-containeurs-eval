import { css } from "panda/css";
import { vstack } from "panda/patterns";

const root = vstack({
  w: "full",
  h: "full",
  alignItems: "center",
  gap: 6,
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

const logoStyle = css({
  h: "6rem",
});

const titleStyle = css({
  fontSize: "4xl",
  fontWeight: "bold",
});

const mainStyle = vstack({
  w: "full",
  h: "full",
  p: 4,
  gap: 4,
});

export { root, logoStyle, headerStyle, titleStyle, mainStyle };
export default root;
