import { css } from "panda/css";

const root = css({
  w: "full",
  h: "full",
  // divideX: "1px",
  // divideY: "1px",
  // divideColor: "#e2e8f0",
  overflowY: "scroll",
  gap: 0,
  display: "flex",
  flexWrap: "wrap",
  alignContent: "flex-start",
  mdDown: {
    flexWrap: "nowrap",
    overflowY: "hidden",
    overflowX: "scroll",
    h: 320,
  },
});

export { root };
export default root;