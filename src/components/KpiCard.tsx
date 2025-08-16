import React from 'react';

interface KpiCardProps {
    value: string | number;
    label: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({ value, label }) => {
    return (
        <div className="kpi-card">
            <div className="kpi-value">{value}</div>
            <div className="kpi-label">{label}</div>
        </div>
    );
};
