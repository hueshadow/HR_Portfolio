import React, { useState, useEffect } from 'react';
import CoverSection from './components/CoverSection';
import PrinciplesSection from './components/Hero';
import Features from './components/Features';
import DesignSystemShowcase from './components/DesignSystemShowcase';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className="h-full w-full relative">
      {/* Standalone Theme Toggle Button */}
      <div className="fixed top-6 right-6 z-50">
        <button 
            onClick={toggleTheme}
            className="p-3 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md hover:bg-white dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary shadow-lg active:scale-95"
            aria-label="Toggle Dark Mode"
        >
            <span className="material-icons-round text-xl">{isDark ? 'light_mode' : 'dark_mode'}</span>
        </button>
      </div>
      
      {/* Scroll Snap Container */}
      <div className="h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar">
        <CoverSection />
        <PrinciplesSection />
        
        {/* Unified Design System Section */}
        <DesignSystemShowcase />
        
        {/* Features Section (Moved to bottom) */}
        <Features />

        {/* Footer */}
        <div className="snap-start shrink-0">
          <Footer />
        </div>
      </div>

      {/* Background Decorative Blobs - Fixed position to stay while scrolling */}
      <div className="fixed top-0 right-0 -z-10 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
    </div>
  );
};

export default App;