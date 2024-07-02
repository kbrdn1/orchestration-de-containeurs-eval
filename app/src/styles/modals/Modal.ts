import { css } from "panda/css";
import { hstack, vstack } from "panda/patterns";

const root = vstack({
  justify: "center",
  alignItems: "center",
  bg: "rgba(0, 0, 0, 0.5)",
  position: "fixed",
  top: 0,
  left: 0,
  w: "screen",
  h: "screen",
  zIndex: 100,
});

const modalStyle = vstack({
  w: "full",
  maxW: "lg",
  bg: "white",
  borderWidth: "2px",
  borderRadius: "lg",
  borderStyle: "solid",
  borderColor: "lightgray",
  overflow: "hidden",
  animation: "slideFromTop",
  animationName: "slideFromTop",
  animationDuration: "500ms",
  animationIterationCount: 1,
  gap: 0,
});

const titleContainerStyle = hstack({
  w: "full",
  p: 4,
  gap: 10,
  bg: "lightGray",
  justify: "space-between",
  alignItems: "center",
  shadow: "lg",
});

const titleStyle = css({
  fontSize: "xl",
  fontWeight: "bold",
});

const closeButtonStyle = css({
  cursor: "pointer",
});

const contentStyle = vstack({
  w: "full",
  gap: 0,
  alignItems: "start",
});

const footerStyle = hstack({
  w: "full",
  p: 4,
  gap: 4,
  justify: "flex-end",
  alignItems: "center",
  bg: "lightGray",
  borderBottomRadius: "lg",
  shadow: "lg-reverse",
});

export {
  root,
  modalStyle,
  titleContainerStyle,
  titleStyle,
  closeButtonStyle,
  contentStyle,
  footerStyle,
};
export default root;
