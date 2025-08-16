import React from 'react';
import { Project } from '../data/mockData';

export interface Filters {
    estado: string;
    tipoTrabajo: string;
    segmentacion: string;
    responsable: string;
    gestor: string;
    sponsor: string;
    año: string;
}

interface GlobalFiltersProps {
    projects: Project[];
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const getUniqueValues = (projects: Project[], key: keyof Project) => {
    const values = projects.map(p => p[key]);
    return ['Todos', ...Array.from(new Set(values))].filter(Boolean) as string[];
};

const getUniqueYears = (projects: Project[]) => {
    const years = projects.map(p => (p.fechaInicio as Date).getFullYear().toString());
    return ['Todos', ...Array.from(new Set(years)).sort((a, b) => Number(b) - Number(a))];
}

export const GlobalFilters: React.FC<GlobalFiltersProps> = ({ projects, filters, setFilters }) => {
    const options = {
        estados: getUniqueValues(projects, 'estado'),
        tiposTrabajo: getUniqueValues(projects, 'tipoTrabajo'),
        segmentaciones: getUniqueValues(projects, 'segmentacion'),
        responsables: getUniqueValues(projects, 'responsable'),
        gestores: getUniqueValues(projects, 'gestor'),
        sponsors: getUniqueValues(projects, 'sponsor'),
        años: getUniqueYears(projects),
    };

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="global-filters">
            <label htmlFor="estado">Estado:</label>
            <select id="estado" name="estado" value={filters.estado} onChange={handleChange}>
                {options.estados.map(o => <option key={o} value={o}>{o}</option>)}
            </select>

            <label htmlFor="tipoTrabajo">Tipo:</label>
            <select id="tipoTrabajo" name="tipoTrabajo" value={filters.tipoTrabajo} onChange={handleChange}>
                {options.tiposTrabajo.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
            
            <label htmlFor="segmentacion">Segmentación:</label>
            <select id="segmentacion" name="segmentacion" value={filters.segmentacion} onChange={handleChange}>
                {options.segmentaciones.map(o => <option key={o} value={o}>{o}</option>)}
            </select>

            <label htmlFor="responsable">Responsable:</label>
            <select id="responsable" name="responsable" value={filters.responsable} onChange={handleChange}>
                {options.responsables.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
            
            <label htmlFor="gestor">Gestor:</label>
            <select id="gestor" name="gestor" value={filters.gestor} onChange={handleChange}>
                {options.gestores.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
            
            <label htmlFor="sponsor">Sponsor:</label>
            <select id="sponsor" name="sponsor" value={filters.sponsor} onChange={handleChange}>
                {options.sponsors.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
            
            <label htmlFor="año">Año:</label>
            <select id="año" name="año" value={filters.año} onChange={handleChange}>
                {options.años.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
        </div>
    );
};
