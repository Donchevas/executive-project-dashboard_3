import React from 'react';

interface WidgetProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

export const Widget: React.FC<WidgetProps> = ({ title, children, className }) => {
    return (
        <div className={`widget ${className || ''}`}>
            <h3>{title}</h3>
            {children}
        </div>
    );
};
