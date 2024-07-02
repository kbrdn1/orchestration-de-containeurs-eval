import { vstack } from "panda/patterns";

const root = vstack({
  w: "full",
  h: "fit-content",
  justify: "space-between",
  alignItems: "center",
  p: 4,
  gap: 4,
  borderTop: "1px solid #e9ecef",
});

export { root };
export default root;
