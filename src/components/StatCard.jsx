import React from "react";;

export default function StatCard({
    title,
    value,
    icon: Icon,
    trend,
    description,
}) {
    return( 
    <div className="stat-card">
        <div className="stat-top">
            <div className="stat-icon">
                <Icon size={21} />
            </div>
            {trend && ( <span className="stat-trend">
                {trend}
            </span>
        )}
        </div>
        <div className="stat-value">{value}</div>
        <div className="stat-title">{title}</div>
        {description &&(<div className="stat-description">
            {description}
           </div>
         )}
    </div>
    );
}