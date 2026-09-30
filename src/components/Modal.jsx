import React from "react";
import { X } from "lucide-react";

export default function Modal({
    open,
    title,
    children,
    onClose,
    width = "600px",
}){
    if (!open) return null;

    return (
        <div className="modal-overlay"
        onMouseDown={onClose}
        >
            <div 
            className="modal"
            style={{ maxwidth: width }}
            onMouseDown={(e) => e.stopPropagation()}
                >
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button className="modal-close"
                    onClick={onClose}
                    >
                        <X size={19} />
                        </button>
                        </div>
                            <div className="modal-body">
                                {children}
                            </div>
                            </div>
                            </div>
            
    );
}