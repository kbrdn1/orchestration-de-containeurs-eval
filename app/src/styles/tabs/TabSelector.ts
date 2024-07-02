import { hstack } from "panda/patterns";

const root = hstack({
  w: "full",
  overflowX: "scroll",
  overflowY: "hidden",
  gap: 0,
  justify: "start",
  borderBottom: "1px solid #e9ecef",
});

export { root };
export default root;
