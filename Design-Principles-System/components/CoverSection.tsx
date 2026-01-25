import React from 'react';
import { ArrowDown, Layers, Component } from 'lucide-react';

const CoverSection: React.FC = () => {
  return (
    <div className="w-full min-h-screen snap-start shrink-0 flex items-center justify-center relative overflow-hidden bg-background-light dark:bg-background-dark pt-20 lg:pt-0">
      
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/50 via-transparent to-transparent dark:from-white/5 dark:via-transparent dark:to-transparent -z-10"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 xl:px-32 flex flex-col lg:flex-row items-center gap-12 lg:gap-8 h-full">
        
        {/* Left Side: Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start justify-center z-10 pt-10 lg:pt-0">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-semibold mb-8 backdrop-blur-sm shadow-sm hover:scale-105 transition-transform cursor-default">
            <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                v2.0 System Update
            </div>
            
            <h1 className="text-5xl md:text-7xl xl:text-8xl font-extrabold tracking-tighter text-slate-900 dark:text-white mb-6 leading-[0.95] select-none text-left">
            Analytics Kit <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-indigo-500 animate-gradient pb-2">
                Design System
            </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mb-10 leading-relaxed font-medium text-left">
            A comprehensive foundation for building data-rich, high-performance dashboards. 
            Crafted with precision for the modern web.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl hover:shadow-2xl shadow-primary/20 flex items-center justify-center gap-2">
                    <Component className="w-5 h-5" />
                    Get Started
                </button>
                <button className="w-full sm:w-auto px-8 py-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-full font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                    <Layers className="w-5 h-5" />
                    Documentation
                </button>
            </div>
        </div>

        {/* Right Side: Floating Dashboard */}
        <div className="w-full lg:w-1/2 h-[500px] lg:h-full min-h-[500px] relative flex items-center justify-center perspective-1000 z-10 pointer-events-none lg:pointer-events-auto">
             <div className="relative w-full h-full max-w-[600px] max-h-[500px] scale-[0.65] sm:scale-75 md:scale-90 lg:scale-100 origin-center flex items-center justify-center">
                <img
                  src="/analytics-preview.png"
                  alt="Analytics Dashboard Preview"
                  className="w-full h-auto object-contain"
                />
            </div>
        </div>

      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 animate-bounce">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">Scroll</span>
        <ArrowDown className="w-5 h-5 text-slate-400" />
      </div>
    </div>
  );
};

export default CoverSection;