import { css } from "panda/css";
import { grid, hstack, vstack } from "panda/patterns";

const root = grid({
  w: "full",
  p: 4,
  gap: 2,
  gridTemplateColumns: "repeat(2, 1fr)",
  mdDown: {
    gridTemplateColumns: "1fr",
  },
});

const fieldItemStyle = vstack({
  alignItems: "center",
  justify: "center",
});

const fieldItemFullStyle = vstack({
  w: "full",
  alignItems: "start",
  justify: "start",
  gridColumn: "span 2",
});

const tokenContainerStyle = hstack({
  w: "full",
  gap: 2,
  p: 4,
  justify: "start",
  alignItems: "center",
});

const singleTextStyle = css({
  w: "full",
  p: 4,
});

export {
  root,
  fieldItemStyle,
  fieldItemFullStyle,
  tokenContainerStyle,
  singleTextStyle,
};
export default root;
