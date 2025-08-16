import React, { useMemo } from 'react';
import { Project } from '../data/mockData';
import { KpiCard } from '../components/KpiCard';
import { Widget } from '../components/Widget';

interface ViewProps {
    projects: Project[];
}

export const GovernanceView: React.FC<ViewProps> = ({ projects }) => {
    
    const gestores = [...new Set(projects.map(p => p.gestor))];
    const sponsors = [...new Set(projects.map(p => p.sponsor))];
    const projectsPerGestor = gestores.length > 0 ? (projects.length / gestores.length).toFixed(1) : 0;
    const projectsPerSponsor = sponsors.length > 0 ? (projects.length / sponsors.length).toFixed(1) : 0;

    const now = new Date();
    const recentUpdateCount = projects.filter(p => {
        const diffDays = (now.getTime() - (p.ultimaActualizacion as Date).getTime()) / (1000 * 3600 * 24);
        return diffDays <= 7;
    }).length;
    const recentUpdatePercentage = projects.length > 0 ? (recentUpdateCount / projects.length * 100).toFixed(0) : 0;

    const freshness = useMemo(() => {
        const green = projects.filter(p => (now.getTime() - (p.ultimaActualizacion as Date).getTime()) / (1000 * 3600 * 24) <= 7).length;
        const yellow = projects.filter(p => {
            const days = (now.getTime() - (p.ultimaActualizacion as Date).getTime()) / (1000 * 3600 * 24);
            return days > 7 && days <= 14;
        }).length;
        const red = projects.length - green - yellow;
        return { green, yellow, red };
    }, [projects, now]);
    
    const outdatedProjects = useMemo(() => {
        return projects.filter(p => (now.getTime() - (p.ultimaActualizacion as Date).getTime()) / (1000 * 3600 * 24) > 14)
            .sort((a, b) => (a.ultimaActualizacion as Date).getTime() - (b.ultimaActualizacion as Date).getTime());
    }, [projects, now]);

    const getRanking = (key: 'gestor' | 'sponsor') => {
        const counts = projects.reduce((acc, p) => {
            if (!acc[p[key]]) {
                acc[p[key]] = { active: 0, finished: 0, total: 0 };
            }
            if (p.estado === 'Finalizado') {
                acc[p[key]].finished++;
            } else if (p.estado !== 'Cancelado') {
                acc[p[key]].active++;
            }
            acc[p[key]].total++;
            return acc;
        }, {} as Record<string, { active: number, finished: number, total: number }>);
        return Object.entries(counts).sort((a,b) => b[1].total - a[1].total);
    };

    const gestorRanking = getRanking('gestor');
    const sponsorRanking = getRanking('sponsor');

    return (
        <>
            <div className="kpi-grid">
                <KpiCard value={projectsPerGestor} label="Proyectos / Gestor" />
                <KpiCard value={projectsPerSponsor} label="Proyectos / Sponsor" />
                <KpiCard value={`${recentUpdatePercentage}%`} label="% Actualización Reciente" />
            </div>
            <div className="widgets-grid">
                <Widget title="Ranking de Gestores">
                   <div className="table-container">
                        <table>
                            <thead><tr><th>Gestor</th><th>Activos</th><th>Finalizados</th></tr></thead>
                            <tbody>
                                {gestorRanking.slice(0, 5).map(([name, data]) => (
                                    <tr key={name}><td>{name}</td><td>{data.active}</td><td>{data.finished}</td></tr>
                                ))}
                            </tbody>
                        </table>
                   </div>
                </Widget>
                <Widget title="Ranking de Sponsors">
                   <div className="table-container">
                        <table>
                            <thead><tr><th>Sponsor</th><th>Activos</th><th>Finalizados</th></tr></thead>
                            <tbody>
                                {sponsorRanking.slice(0, 5).map(([name, data]) => (
                                    <tr key={name}><td>{name}</td><td>{data.active}</td><td>{data.finished}</td></tr>
                                ))}
                            </tbody>
                        </table>
                   </div>
                </Widget>
                <Widget title="Frescura de Datos">
                    <div className="traffic-light">
                        <div className="light green"><span>{freshness.green}</span><span>{"<7d"}</span></div>
                        <div className="light yellow"><span>{freshness.yellow}</span><span>{"8-14d"}</span></div>
                        <div className="light red"><span>{freshness.red}</span><span>{">14d"}</span></div>
                    </div>
                </Widget>
                <Widget title="Proyectos sin Actualización (>14 días)">
                    <ul>
                        {outdatedProjects.length > 0 ? outdatedProjects.slice(0, 10).map(p => (
                            <li key={p.idClarity}>{p.nombre} ({(p.ultimaActualizacion as Date).toLocaleDateString()})</li>
                        )) : <li>Ninguno</li>}
                    </ul>
                </Widget>
            </div>
        </>
    );
};
