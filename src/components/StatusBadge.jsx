import React from "react";

export default function StatusBadge({status}) {
    const className = status 
    .toLowerCase()
    .replace(/\s+/g, "-");

    return(
        <span className={`badge status -${className}`}>
            <span className="badge-dot" />
            {status}
        </span>
    );
}