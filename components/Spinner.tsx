import React from 'react';
interface Props {
    mini?: boolean;
}
export const Spinner = ({ mini}: Props) => {
    return (
        <div className={(mini) ? "sk-chase-mini" : "sk-chase"}>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
        </div>
    );
}
