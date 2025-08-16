import React, { useMemo } from 'react';
import { Project } from '../data/mockData';
import { KpiCard } from '../components/KpiCard';
import { Widget } from '../components/Widget';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ScatterChart, Scatter, BarChart, Bar } from 'recharts';

interface ViewProps {
    projects: Project[];
}

const dayDiff = (d1: Date, d2: Date) => Math.round((d1.getTime() - d2.getTime()) / (1000 * 60 * 60 * 24));

export const ComplianceView: React.FC<ViewProps> = ({ projects }) => {
    const onTimeProjects = projects.filter(p => p.estado !== 'Vencido');
    const onTimePercentage = projects.length > 0 ? (onTimeProjects.length / projects.length * 100) : 0;

    const overdueProjects = projects.filter(p => p.estado === 'Vencido');
    const avgDelay = overdueProjects.length > 0
        ? overdueProjects.reduce((acc, p) => acc + dayDiff(new Date(), p.fechaFinCompromiso as Date), 0) / overdueProjects.length
        : 0;
    
    const completedOnTime = projects.filter(p => p.fechaFinReal && p.fechaFinReal <= (p.fechaFinCompromiso as Date)).length;
    const totalFinished = projects.filter(p => p.estado === 'Finalizado').length;
    const completedOnTimePercentage = totalFinished > 0 ? (completedOnTime / totalFinished * 100) : 0;

    const projectsByYear = useMemo(() => {
        const counts = projects.reduce((acc, p) => {
            const year = (p.fechaInicio as Date).getFullYear();
            acc[year] = (acc[year] || 0) + 1;
            return acc;
        }, {} as Record<number, number>);
        return Object.entries(counts).map(([year, count]) => ({ year, count })).sort((a,b) => a.year.localeCompare(b.year));
    }, [projects]);

    const scatterData = useMemo(() => {
        return projects.map(p => ({
            x: p.plazo,
            y: p.avanceReal,
            name: p.nombre,
        }));
    }, [projects]);
    
    const overdueDaysData = useMemo(() => {
        return overdueProjects
            .map(p => ({
                name: p.idClarity,
                days: dayDiff(new Date(), p.fechaFinCompromiso as Date)
            }))
            .sort((a,b) => b.days - a.days)
            .slice(0, 10);
    }, [overdueProjects]);

    return (
        <>
            <div className="kpi-grid">
                <KpiCard value={`${onTimePercentage.toFixed(0)}%`} label="% Proyectos en Fecha" />
                <KpiCard value={`${avgDelay.toFixed(0)} días`} label="Tiempo Promedio Retraso" />
                <KpiCard value={`${completedOnTimePercentage.toFixed(0)}%`} label="% Cumplidos en Plazo" />
            </div>
            <div className="widgets-grid grid-3-cols">
                <Widget title="Proyectos Iniciados por Año">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={projectsByYear}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="count" stroke="#8884d8" name="Proyectos" />
                        </LineChart>
                    </ResponsiveContainer>
                </Widget>
                <Widget title="Avance Real vs % Plazo">
                     <ResponsiveContainer width="100%" height={300}>
                        <ScatterChart>
                            <CartesianGrid />
                            <XAxis type="number" dataKey="x" name="Plazo" unit="%" />
                            <YAxis type="number" dataKey="y" name="Avance" unit="%" />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                            <Scatter name="Proyectos" data={scatterData} fill="#8884d8" />
                        </ScatterChart>
                    </ResponsiveContainer>
                </Widget>
                <Widget title="Top Proyectos Vencidos (Días)">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={overdueDaysData} layout="vertical">
                             <CartesianGrid strokeDasharray="3 3" />
                             <XAxis type="number" />
                             <YAxis type="category" dataKey="name" width={80} />
                             <Tooltip />
                             <Bar dataKey="days" fill="#dc3545" name="Días de atraso"/>
                        </BarChart>
                    </ResponsiveContainer>
                </Widget>
                <Widget title="Detalle de Fechas Compromiso/Real" className="full-width">
                     <div className="table-container">
                        <table>
                           <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Fecha Fin Comp.</th>
                                    <th>Fecha Fin Real</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                               {projects.filter(p => p.estado === 'Finalizado' || p.estado === 'Vencido').slice(0, 10).map(p => (
                                    <tr key={p.idClarity}>
                                        <td>{p.idClarity}</td>
                                        <td>{p.nombre}</td>
                                        <td>{(p.fechaFinCompromiso as Date).toLocaleDateString()}</td>
                                        <td>{p.fechaFinReal ? (p.fechaFinReal as Date).toLocaleDateString() : 'N/A'}</td>
                                        <td>{p.estado}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Widget>
            </div>
        </>
    );
};
