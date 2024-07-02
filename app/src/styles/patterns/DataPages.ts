import { css } from "panda/css";
import { grid, hstack, vstack } from "panda/patterns";

const root = vstack({
  w: "full",
  h: "fit",
  bg: "white",
  gap: 4,
  alignItems: "start",
  rounded: "md",
  shadow: "lg",
  borderWidth: "2px",
  borderRadius: "lg",
  borderStyle: "solid",
  borderColor: "lightgray",
});

const titleContainerStyle = hstack({
  w: "full",
  justify: "space-between",
  p: 4,
  bg: "lightGray",
  shadow: "sm",
  borderTopRadius: "lg",
});

const titleStyle = hstack({
  fontSize: "2xl",
  fontWeight: "bold",
  color: "primary",
  alignItems: "center",
});

const mainActionsStyle = hstack({
  gap: 2,
  ml: "auto",
});

const countStyle = css({
  fontSize: "sm",
  color: "secondary",
  py: 1,
  px: 3,
  bg: "rgba(173, 216, 230, 0.5)",
  borderRadius: "md",
});

const loaderContainerStyle = hstack({
  justify: "center",
  alignItems: "center",
  w: "full",
  p: 4,
  fontSize: "lg",
});

const optionsContainerStyle = hstack({
  w: "full",
  gap: 4,
  p: 4,
});

const tableContainerStyle = vstack({
  w: "full",
  h: "fit",
  bg: "white",
  rounded: "lg",
  px: 4,
  gap: 0,
});

const filterContainerStyle = grid({
  w: "full",
  p: 4,
  gap: 2,
  gridTemplateColumns: "repeat(2, 1fr)",
});

const filterItemStyle = vstack({
  alignItems: "center",
  justify: "center",
});

const totalContainerStyle = hstack({
  gap: 2,
});

const totalStyle = css({
  fontSize: "medium",
  bg: "primary",
  color: "white",
  p: 2,
});

export {
  root,
  titleContainerStyle,
  titleStyle,
  mainActionsStyle,
  countStyle,
  loaderContainerStyle,
  optionsContainerStyle,
  tableContainerStyle,
  filterContainerStyle,
  filterItemStyle,
  totalContainerStyle,
  totalStyle,
};
export default root;
