import React, { useState } from 'react';
import {
  ComponentsPreview,
  MosaicDesignSection,
  AnalyticsGridSection,
  ChartsSection,
  FileUploadSection,
  FloatingDashboard
} from './index';

type SectionType = 'components' | 'mosaic' | 'analytics' | 'charts' | 'upload' | 'dashboard';

const sections: { id: SectionType; label: string; icon: string }[] = [
  { id: 'components', label: 'Components', icon: 'widgets' },
  { id: 'mosaic', label: 'Mosaic', icon: 'grid_view' },
  { id: 'analytics', label: 'Analytics', icon: 'insights' },
  { id: 'charts', label: 'Charts', icon: 'bar_chart' },
  { id: 'upload', label: 'Upload', icon: 'cloud_upload' },
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
];

const DesignSystemShowcase: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionType>('components');

  const renderSection = () => {
    switch (activeSection) {
      case 'components':
        return <ComponentsPreview isEmbedded />;
      case 'mosaic':
        return <MosaicDesignSection isEmbedded />;
      case 'analytics':
        return <AnalyticsGridSection isEmbedded />;
      case 'charts':
        return <ChartsSection isEmbedded />;
      case 'upload':
        return <FileUploadSection isEmbedded />;
      case 'dashboard':
        return (
          <div className="w-full h-[500px] relative bg-gray-50 dark:bg-slate-900 rounded-xl overflow-hidden border border-[var(--border-light)] dark:border-[var(--border-dark)]">
            <FloatingDashboard />
          </div>
        );
      default:
        return <ComponentsPreview isEmbedded />;
    }
  };

  return (
    <div className="design-system-showcase w-full">
      {/* Section Navigation */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">
          Design System Components
        </h2>
        <div className="flex flex-wrap gap-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeSection === section.id
                  ? 'bg-[var(--primary)] text-white shadow-md shadow-[var(--primary)]/20'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-[var(--border-light)] dark:border-[var(--border-dark)] hover:bg-gray-50 dark:hover:bg-slate-700'
              }`}
            >
              <span className="material-icons-round text-sm">{section.icon}</span>
              {section.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Section Content */}
      <div className="design-system-content">
        {renderSection()}
      </div>

      {/* Section Description */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-slate-800/50 rounded-lg border border-[var(--border-light)] dark:border-[var(--border-dark)]">
        <p className="text-sm text-[var(--text-secondary-light)] dark:text-[var(--text-secondary-dark)]">
          <strong className="text-slate-900 dark:text-white">
            {sections.find(s => s.id === activeSection)?.label}
          </strong>{' '}
          {activeSection === 'components' && 'components showcase featuring inputs, buttons, toggles, calendars, notifications, and data tables.'}
          {activeSection === 'mosaic' && 'layout components including tables, search bars, storage indicators, timelines, and progress indicators.'}
          {activeSection === 'analytics' && 'grid components featuring charts, device usage, activity maps, and system health indicators.'}
          {activeSection === 'charts' && 'data visualization components including line charts, area charts, bar charts, radar charts, and pie charts.'}
          {activeSection === 'upload' && 'file upload components with drag-and-drop, progress indicators, and error states.'}
          {activeSection === 'dashboard' && 'floating dashboard layout with animated widgets, notifications, and real-time data.'}
        </p>
      </div>
    </div>
  );
};

export default DesignSystemShowcase;
