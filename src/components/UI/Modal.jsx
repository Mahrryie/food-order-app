import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ open, className = "", children }) {
  const dialogRef = useRef();

  useEffect(() => {
    if (open) {
      dialogRef.current.showModal();
    }
  }, [open]);

  return createPortal(
    <dialog ref={dialogRef} className={`modal ${className}`}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
