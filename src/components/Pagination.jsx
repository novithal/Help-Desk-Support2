import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination ({
    page,
    totalPages,
    onChange,
}) {
    if (totalPages <=1) return null;
    return (
        <div className="pagination">
            <button disabled={page === 1}
            onClick={()=> onChange(page - 1)}
            >  
            <ChevronLeft size={17} />
            </button>
            {Array.from(
                { length: totalPages },
                (_, index) => index + 1
            ).map((number) => (
                <button key={number}
                className={ number === page ? "active" : ""}
                onClick={() => onChange(number)}>
                    {number}
                </button>
            ))}
            <button 
            disabled={page === totalPages} 
            onClick={() => onChange(page +1)}>
                <ChevronRight size={17} />
            </button>
        </div>
    );
}