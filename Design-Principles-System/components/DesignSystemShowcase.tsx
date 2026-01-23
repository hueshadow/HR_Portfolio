import React from 'react';
import ComponentsPreview from './ComponentsPreview';
import MosaicDesignSection from './MosaicDesignSection';
import AnalyticsGridSection from './AnalyticsGridSection';
import ChartsSection from './ChartsSection';
import FileUploadSection from './FileUploadSection';

const DesignSystemShowcase: React.FC = () => {
  return (
    <div className="w-full min-h-screen snap-start shrink-0 overflow-y-auto bg-background-light dark:bg-background-dark relative py-20 lg:py-24">
      <div className="w-full max-w-[2100px] mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wide mb-4">UI Kit</span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900 dark:text-white tracking-tight">设计系统组件库</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            精心打造的原子化组件集合，支持深色模式、响应式布局和无障碍访问，助力快速构建现代化的数据密集型应用界面。
          </p>
        </div>

        {/* 
          Masonry Layout Container 
          Uses CSS columns to create a dense, gap-free layout.
          Order of components is adjusted to mix categories (Inputs, Data, Visuals) for better visual balance.
        */}
        <div className="columns-1 md:columns-2 xl:columns-3 2xl:columns-4 gap-6 space-y-6 pb-20">
            {/* Input & Controls Group */}
            <ComponentsPreview isEmbedded={true} />
            <FileUploadSection isEmbedded={true} />
            
            {/* Layout & Widgets Group */}
            <MosaicDesignSection isEmbedded={true} />
            
            {/* Data Visualization Group */}
            <AnalyticsGridSection isEmbedded={true} />
            <ChartsSection isEmbedded={true} />
        </div>

        {/* Analytics UI Kit Showcase Section */}
        <div className="mt-10 border-t border-slate-200 dark:border-slate-800 pt-20 pb-10">
            <div className="text-center mb-16">
                <span className="inline-block px-3 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-full text-xs font-bold uppercase tracking-wide mb-4">Preview</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">Analytics UI Kit</h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                    Full-scale dashboard examples featuring complex data visualization, filtering, and reporting layouts.
                </p>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 group">
                {/* 
                  Replaced placeholder with local image reference as requested.
                  The onError handler ensures the UI doesn't break if the file is missing.
                */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                <img 
                    src="/analytics-preview.png" 
                    alt="Analytics Dashboard Preview" 
                    className="w-full h-auto object-cover transform group-hover:scale-[1.01] transition-transform duration-700"
                    onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop";
                        e.currentTarget.onerror = null; // Prevent infinite loop
                    }}
                />
                
                {/* Floating Badge */}
                <div className="absolute bottom-8 right-8 bg-white/90 dark:bg-slate-900/90 backdrop-blur text-slate-900 dark:text-white px-4 py-2 rounded-lg shadow-lg text-sm font-bold border border-slate-200 dark:border-slate-700 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    View Full Demo
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default DesignSystemShowcase;