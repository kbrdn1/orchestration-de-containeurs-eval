import { vstack } from "panda/patterns";

const root = vstack({
  rounded: "md",
  overflow: "hidden",
  w: "calc(32% - 1rem)",
  h: "calc(100% - 2rem)",
  m: "1rem",
  gap: 0,
  bg: "#f8f9fa",
  justify: "space-between",
  mdDown: {
    w: "full",
    h: "fit",
    m: 0,
    rounded: 0,
  },
  shadow: "2xl",
});

export { root };
export default root;
