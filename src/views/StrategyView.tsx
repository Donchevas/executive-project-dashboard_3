import React, { useMemo } from 'react';
import { Project } from '../data/mockData';
import { KpiCard } from '../components/KpiCard';
import { Widget } from '../components/Widget';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Treemap } from 'recharts';

interface ViewProps {
    projects: Project[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const StrategyView: React.FC<ViewProps> = ({ projects }) => {
    const totalProjects = projects.length;

    const bySegment = useMemo(() => {
        return projects.reduce((acc, p) => {
            acc[p.segmentacion] = (acc[p.segmentacion] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
    }, [projects]);
    
    const byType = useMemo(() => {
        return projects.reduce((acc, p) => {
            acc[p.tipoTrabajo] = (acc[p.tipoTrabajo] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
    }, [projects]);

    const segmentData = Object.entries(bySegment).map(([name, value]) => ({ name, value }));
    const [mainSegment, mainSegmentCount] = Object.entries(bySegment).sort((a,b) => b[1] - a[1])[0] || ["N/A", 0];
    const [mainType, mainTypeCount] = Object.entries(byType).sort((a,b) => b[1] - a[1])[0] || ["N/A", 0];

    const stateByTypeData = useMemo(() => {
        const types = [...new Set(projects.map(p => p.tipoTrabajo))];
        const states = [...new Set(projects.map(p => p.estado))];
        const data = types.map(type => {
            const row: {[key: string]: string | number} = { name: type };
            states.forEach(state => {
                row[state] = projects.filter(p => p.tipoTrabajo === type && p.estado === state).length;
            });
            return row;
        });
        return { data, states };
    }, [projects]);

    return (
        <>
            <div className="kpi-grid">
                <KpiCard value={`${totalProjects > 0 ? (mainSegmentCount/totalProjects*100).toFixed(0) : 0}%`} label={`% ${mainSegment}`} />
                <KpiCard value={`${totalProjects > 0 ? (mainTypeCount/totalProjects*100).toFixed(0) : 0}%`} label={`% ${mainType}`} />
            </div>
            <div className="widgets-grid grid-3-cols">
                <Widget title="Segmentación por Estado">
                    <ResponsiveContainer width="100%" height={300}>
                         <PieChart>
                            <Pie data={segmentData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                                {segmentData.map((_entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </Widget>
                <Widget title="Estado por Tipo de Trabajo">
                   <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={stateByTypeData.data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            {stateByTypeData.states.map((state, i) => (
                                <Bar key={state} dataKey={state} stackId="a" fill={COLORS[i % COLORS.length]} />
                            ))}
                        </BarChart>
                    </ResponsiveContainer>
                </Widget>
                <Widget title="Distribución por Portafolio (Sponsor)">
                    <ResponsiveContainer width="100%" height={300}>
                        <Treemap
                            data={Object.entries(projects.reduce((acc, p) => {
                                acc[p.sponsor] = (acc[p.sponsor] || 0) + 1;
                                return acc;
                            }, {} as Record<string, number>)).map(([name, size]) => ({ name, size }))}
                            dataKey="size"
                            aspectRatio={4 / 3}
                            stroke="#fff"
                            fill="#8884d8"
                        />
                    </ResponsiveContainer>
                </Widget>
            </div>
        </>
    );
};