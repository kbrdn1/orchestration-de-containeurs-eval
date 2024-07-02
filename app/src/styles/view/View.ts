import { vstack } from "panda/patterns";

const root = vstack({
  w: "4/6",
  h: "full",
  maxH: "100vh",
  position: "relative",
  justify: "space-between",
  mdDown: {
    w: "full",
  },
});

export { root };
export default root;
