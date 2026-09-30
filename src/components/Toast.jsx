import React from "react";
import {
  CheckCircle2,
  AlertCircle,
  Info,
  XCircle,
  X
} from "lucide-react";

export default function Toast({
  message,
  type = "success",
  onClose
}) {
  if (!message) return null;

  const icons = {
    success: <CheckCircle2 size={20} />,
    error: <XCircle size={20} />,
    warning: <AlertCircle size={20} />,
    info: <Info size={20} />
  };

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-icon">
        {icons[type] || icons.success}
      </div>

      <div className="toast-message">
        {message}
      </div>

      <button
        type="button"
        className="toast-close"
        onClick={onClose}
        aria-label="Close notification"
      >
        <X size={17} />
      </button>
    </div>
  );
}