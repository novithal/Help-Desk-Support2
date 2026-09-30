import React from "react";
 
export default function PriorityBadge ({ priority }) {
    const className = priority.toLowerCase();

    return (
        <span className={`badge priority-${className}`}>
        {priority}</span>
    );
}