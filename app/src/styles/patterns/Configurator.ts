import { css } from "panda/css";

const root = css({
  display: "flex",
  flexDir: "row",
  w: "100vw",
  h: "100vh",
  maxW: "100vw",
  maxH: "100vh",
  mdDown: {
    flexDir: "column",
  },
});

export { root };
export default root;
