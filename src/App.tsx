import React, { useState, useMemo } from 'react';
import { projects as rawProjects, Project } from './data/mockData';
import { GlobalFilters, Filters } from './components/GlobalFilters';
import { GeneralView } from './views/GeneralView';
import { ComplianceView } from './views/ComplianceView';
import { StrategyView } from './views/StrategyView';
import { GovernanceView } from './views/GovernanceView';

type Tab = 'general' | 'cumplimiento' | 'estrategia' | 'gobierno';

function App() {
    const [activeTab, setActiveTab] = useState<Tab>('general');
    const [filters, setFilters] = useState<Filters>({
        estado: 'Todos',
        tipoTrabajo: 'Todos',
        segmentacion: 'Todos',
        responsable: 'Todos',
        gestor: 'Todos',
        sponsor: 'Todos',
        año: 'Todos'
    });

    const projects: Project[] = useMemo(() => rawProjects.map(p => ({
        ...p,
        fechaInicio: new Date(p.fechaInicio),
        fechaFinCompromiso: new Date(p.fechaFinCompromiso),
        fechaFinReal: p.fechaFinReal ? new Date(p.fechaFinReal) : null,
        ultimaActualizacion: new Date(p.ultimaActualizacion),
    })), []);


    const filteredProjects = useMemo(() => {
        return projects.filter(p => {
            const year = p.fechaInicio.getFullYear().toString();
            return (filters.estado === 'Todos' || p.estado === filters.estado) &&
                   (filters.tipoTrabajo === 'Todos' || p.tipoTrabajo === filters.tipoTrabajo) &&
                   (filters.segmentacion === 'Todos' || p.segmentacion === filters.segmentacion) &&
                   (filters.responsable === 'Todos' || p.responsable === filters.responsable) &&
                   (filters.gestor === 'Todos' || p.gestor === filters.gestor) &&
                   (filters.sponsor === 'Todos' || p.sponsor === filters.sponsor) &&
                   (filters.año === 'Todos' || year === filters.año);
        });
    }, [projects, filters]);

    const renderContent = () => {
        switch (activeTab) {
            case 'general':
                return <GeneralView projects={filteredProjects} />;
            case 'cumplimiento':
                return <ComplianceView projects={filteredProjects} />;
            case 'estrategia':
                return <StrategyView projects={filteredProjects} />;
            case 'gobierno':
                return <GovernanceView projects={filteredProjects} />;
            default:
                return null;
        }
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="header-top">
                    <h1>Executive Project Dashboard</h1>
                </div>
                <GlobalFilters
                    projects={projects}
                    filters={filters}
                    setFilters={setFilters}
                />
            </header>

            <nav className="dashboard-tabs">
                <button onClick={() => setActiveTab('general')} className={`tab-link ${activeTab === 'general' ? 'active' : ''}`}>Vista General</button>
                <button onClick={() => setActiveTab('cumplimiento')} className={`tab-link ${activeTab === 'cumplimiento' ? 'active' : ''}`}>Cumplimiento y Tiempo</button>
                <button onClick={() => setActiveTab('estrategia')} className={`tab-link ${activeTab === 'estrategia' ? 'active' : ''}`}>Estrategia y Segmentación</button>
                <button onClick={() => setActiveTab('gobierno')} className={`tab-link ${activeTab === 'gobierno' ? 'active' : ''}`}>Gobierno y Actualización</button>
            </nav>

            <main className="dashboard-content">
                {renderContent()}
            </main>
        </div>
    );
}

export default App;