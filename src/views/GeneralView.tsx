import React, { useMemo } from 'react';
import { Project } from '../data/mockData';
import { KpiCard } from '../components/KpiCard';
import { Widget } from '../components/Widget';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

interface ViewProps {
    projects: Project[];
}

const PIE_COLORS = {
    'En curso': '#0d6efd',
    'Finalizado': '#198754',
    'Vencido': '#dc3545',
    'Stand-by': '#ffc107',
    'Cancelado': '#6c757d'
};
const PHASE_ORDER: Project['fase'][] = ['Idea', 'Planificación', 'Desarrollo', 'Ejecución', 'Pruebas', 'Cierre'];
const ESTADO_ORDER: Project['estado'][] = ['En curso', 'Vencido', 'Stand-by', 'Finalizado', 'Cancelado'];

export const GeneralView: React.FC<ViewProps> = ({ projects }) => {
    const totalProjects = projects.length;
    const activeProjects = projects.filter(p => p.estado !== 'Finalizado' && p.estado !== 'Cancelado').length;
    const finishedProjects = projects.filter(p => p.estado === 'Finalizado').length;
    const avgProgress = totalProjects > 0 ? projects.reduce((acc, p) => acc + p.avanceReal, 0) / totalProjects : 0;
    const overdueProjects = projects.filter(p => p.estado === 'Vencido').length;
    
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const updatedLast7Days = projects.filter(p => p.ultimaActualizacion >= sevenDaysAgo).length;

    const statusData = useMemo(() => {
        const counts = projects.reduce((acc, p) => {
            acc[p.estado] = (acc[p.estado] || 0) + 1;
            return acc;
        }, {} as Record<Project['estado'], number>);

        return ESTADO_ORDER.map(name => ({ name, value: counts[name] || 0 })).filter(item => item.value > 0);
    }, [projects]);

    const phaseData = useMemo(() => {
        const counts = projects.reduce((acc, p) => {
            acc[p.fase] = (acc[p.fase] || 0) + 1;
            return acc;
        }, {} as Record<Project['fase'], number>);
        
        return PHASE_ORDER.map(name => ({ name, value: counts[name] || 0 }));
    }, [projects]);

    const heatmapData = useMemo(() => {
        const responsables = [...new Set(projects.map(p => p.responsable))].sort();
        return responsables.map(responsable => {
            const row: { [key: string]: string | number } = { responsable };
            ESTADO_ORDER.forEach(estado => {
                row[estado] = projects.filter(p => p.responsable === responsable && p.estado === state).length;
            });
            return row;
        });
    }, [projects]);
    
    const getHeatmapColor = (value: number) => {
        if (value === 0) return '#ffffff';
        if (value <= 2) return '#cfe2ff';
        if (value <= 4) return '#9ec5fe';
        if (value <= 6) return '#6ea8fe';
        return '#3d8bfd';
    };
    
    return (
        <>
            <div className="kpi-grid">
                <KpiCard value={totalProjects} label="Total de Proyectos" />
                <KpiCard value={activeProjects} label="Proyectos Activos" />
                <KpiCard value={`${totalProjects > 0 ? ((finishedProjects / totalProjects) * 100).toFixed(0) : 0}%`} label="% Proyectos Finalizados" />
                <KpiCard value={`${avgProgress.toFixed(0)}%`} label="% Avance Promedio" />
                <KpiCard value={overdueProjects} label="Vencidos no Cerrados" />
                <KpiCard value={`${totalProjects > 0 ? ((updatedLast7Days / totalProjects) * 100).toFixed(0) : 0}%`} label="% Actualizado (7 días)" />
            </div>
            <div className="widgets-grid grid-3-cols">
                <Widget title="Distribución por ESTADO">
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                {statusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={PIE_COLORS[entry.name as keyof typeof PIE_COLORS]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value, name) => [value, name]}/>
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </Widget>
                <Widget title="Embudo por FASE">
                     <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={phaseData} layout="vertical" margin={{ top: 5, right: 20, left: 60, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis type="category" dataKey="name" />
                            <Tooltip />
                            <Bar dataKey="value" fill="#8884d8" name="Proyectos" />
                        </BarChart>
                    </ResponsiveContainer>
                </Widget>
                <Widget title="Heatmap: Responsable x Estado">
                    <div className="table-container">
                        <table className="heatmap-table">
                            <thead>
                                <tr>
                                    <th>Responsable</th>
                                    {ESTADO_ORDER.map(e => <th key={e}>{e}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {heatmapData.map(row => (
                                    <tr key={row.responsable as string}>
                                        <td>{row.responsable}</td>
                                        {ESTADO_ORDER.map(estado => (
                                            <td key={estado} style={{ backgroundColor: getHeatmapColor(row[estado] as number) }}>
                                                {(row[estado] as number) > 0 ? row[estado] : ''}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Widget>
                <Widget title="Tabla Ejecutiva de Proyectos" className="full-width">
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Estado</th>
                                    <th>Avance</th>
                                    <th>Responsable</th>
                                    <th>Fecha Fin Comp.</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.slice(0, 10).map(p => (
                                    <tr key={p.idClarity}>
                                        <td>{p.idClarity}</td>
                                        <td>{p.nombre}</td>
                                        <td>{p.estado}</td>
                                        <td>{p.avanceReal}%</td>
                                        <td>{p.responsable}</td>
                                        <td>{p.fechaFinCompromiso.toLocaleDateString()}</td>
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