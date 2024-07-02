import { css } from "panda/css";
import { hstack, vstack } from "panda/patterns";

const root = css({
  w: "full",
});

const checkCellStyle = css({
  w: "fit",
});

const tableHeaderStyle = css({
  borderBottomWidth: "1px",
  borderBottomColor: "lightgray",
  borderBottomStyle: "solid",
});

const tableHeaderCellStyle = css({
  textAlign: "left",
  py: 2,
});

const tableBodyStyle = css({
  divideStyle: "solid",
  divideColor: "lightgray",
  divideY: "1px",
});

const tableBodyCellStyle = css({
  py: 4,
});

const tableSecretContainerStyle = hstack({
  w: "full",
  gap: 2,
});

const linkStyle = css({
  color: "accentLight",
  textDecoration: "underline",
  cursor: "pointer",
});

const actionsRowStyle = hstack({
  position: "relative",
  w: "full",
  justify: "end",
  alignItems: "center",
  py: 4,
});

const actionsBoxStyle = css({
  position: "relative",
  display: "flex",
});

const actionsContainerStyle = vstack({
  position: "absolute",
  zIndex: 10,
  display: "none",
  top: "45px",
  right: 0,
  w: "fit",
  gap: 0,
  bg: "white",
  rounded: "lg",
  borderWidth: 2,
  borderStyle: "solid",
  borderColor: "lightgray",
  overflow: "hidden",
  divideX: 0,
  divideY: 1,
  divideStyle: "solid",
  divideColor: "lightgray",
  _selected: {
    display: "flex",
  },
  animation: "slideFromTop",
  animationName: "slideFromTop",
  animationDuration: "200ms",
  animationIterationCount: 1,
});

const rowStyle = css({
  transitionProperty: "background-color, transform",
  transitionDuration: "300ms",
  _selected: {
    bg: "rgba(173, 216, 230, 0.2)",
    _hover: {
      bg: "rgba(173, 216, 230, 0.1)",
    }
  },
  _hover: {
    // transform: "translateX(-.2rem)",
    bg: "lightGray",
  },
});

export {
  root,
  checkCellStyle,
  tableHeaderStyle,
  tableHeaderCellStyle,
  tableBodyStyle,
  tableBodyCellStyle,
  tableSecretContainerStyle,
  linkStyle,
  actionsRowStyle,
  actionsBoxStyle,
  actionsContainerStyle,
  rowStyle,
};
export default root;
