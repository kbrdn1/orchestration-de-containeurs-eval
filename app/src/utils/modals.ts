import Swal from "sweetalert2";
import { SweetAlertOptions } from "sweetalert2";

const modal = Swal.mixin({
  showCloseButton: true,
  showCancelButton: true,
  showConfirmButton: true,
  confirmButtonColor: "#007bff",
  cancelButtonColor: "#6c757d",
  confirmButtonText: "Yes",
  cancelButtonText: "No",
});

const success = (title: string, message: string, options?: SweetAlertOptions<any, any>) => {
  modal.fire({
    icon: "success",
    title,
    text: message,
    iconColor: "#155724",
    background: "#d4edda",
    color: "#155724",
    ...options,
  });
}

const error = (title: string, message: string, options?: SweetAlertOptions<any, any>) => {
  modal.fire({
    icon: "error",
    title,
    text: message,
    iconColor: "#721c24",
    background: "#f8d7da",
    color: "#721c24",
    ...options,
  });
}

const warning = (title: string, message: string, options?: SweetAlertOptions<any, any>) => {
  modal.fire({
    icon: "warning",
    title,
    text: message,
    iconColor: "#856404",
    background: "#fff3cd",
    color: "#856404",
    ...options,
  });
}

const info = (title: string, message: string, options?: SweetAlertOptions<any, any>) => {
  modal.fire({
    icon: "info",
    title,
    text: message,
    iconColor: "#0c5460",
    background: "#d1ecf1",
    color: "#0c5460",
    ...options,
  });
}

const question = (title: string, message: string, options?: SweetAlertOptions<any, any>) => {
  modal.fire({
    icon: "question",
    title,
    text: message,
    ...options,
  });
}

const Modal = {
  success,
  error,
  warning,
  info,
  question,
};

export { Modal, modal };
export default Modal;