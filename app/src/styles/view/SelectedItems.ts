import { flex } from "panda/patterns";

const root = flex({
  direction: "horizontal",
  p: 2,
  gap: 2,
  bg: "#f8f9fa",
  border: "1px solid #e9ecef",
  rounded: "lg",
  minW: "full",
  minHeight: 320,
  md: {
    direction: "vertical",
  },
});

export { root };
export default root;
