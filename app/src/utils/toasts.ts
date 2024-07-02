import Swal from "sweetalert2";
import { SweetAlertOptions } from "sweetalert2";

const toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: true,
  padding: ".5rem",
});

const success = (
  title: string,
  message: string,
  options?: SweetAlertOptions<any, any>,
) => {
  toast.fire({
    icon: "success",
    title,
    text: message,
    iconColor: "#155724",
    background: "#d4edda",
    color: "#155724",
    ...options,
  });
};

const error = (
  title: string,
  message: string,
  options?: SweetAlertOptions<any, any>,
) => {
  toast.fire({
    icon: "error",
    title,
    text: message,
    iconColor: "#9f1c24",
    background: "#f8d7da",
    color: "#721c24",
    ...options,
  });
};

const warning = (
  title: string,
  message: string,
  options?: SweetAlertOptions<any, any>,
) => {
  toast.fire({
    icon: "warning",
    title,
    text: message,
    iconColor: "#856404",
    background: "#fff3cd",
    color: "#856404",
    ...options,
  });
};

const info = (
  title: string,
  message: string,
  options?: SweetAlertOptions<any, any>,
) => {
  toast.fire({
    icon: "info",
    title,
    text: message,
    iconColor: "#0c5460",
    background: "#d1ecf1",
    color: "#0c5460",
    ...options,
  });
};

const question = (
  title: string,
  message: string,
  options?: SweetAlertOptions<any, any>,
) => {
  toast.fire({
    icon: "question",
    title,
    text: message,
    ...options,
  });
};

const Toast = {
  success,
  error,
  warning,
  info,
  question,
};

export { Toast, toast };
export default Toast;
