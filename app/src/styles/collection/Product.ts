import { css } from "panda/css";

const root = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  w: "fit",
  h: "full",
  p: 10,
  mdDown: {
    p: 5,
    w: "full",
    h: "fit",
  },
});

export { root };
export default root;
