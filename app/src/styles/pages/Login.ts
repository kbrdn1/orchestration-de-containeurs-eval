import { css } from "panda/css";

const formStyle = css({
  w: "full",
  h: "full",
  display: "flex",
  flexDir: "column",
  justifyContent: "center",
  alignItems: "center",
  p: 4,
  gap: 2,
  textAlign: "center",
});

const formTitleStyle = css({
  fontSize: "2xl",
  fontWeight: "bold",
});

export { formStyle, formTitleStyle };
