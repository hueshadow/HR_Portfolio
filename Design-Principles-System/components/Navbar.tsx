import React from 'react';

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDark, toggleTheme }) => {
  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 z-50 px-6 md:px-12 py-8 flex justify-between items-center w-full max-w-[1920px]">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
          <span className="material-icons-round text-primary text-2xl">design_services</span>
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white leading-none mix-blend-difference_">Design System</h1>
          <p className="text-xs text-muted-light dark:text-muted-dark font-medium tracking-wide mt-1 uppercase">Principles v2.0</p>
        </div>
      </div>
      <button 
        onClick={toggleTheme}
        className="p-3 rounded-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-md hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors text-muted-light dark:text-muted-dark flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-sm"
        aria-label="Toggle Dark Mode"
      >
        <span className="material-icons-round">{isDark ? 'light_mode' : 'dark_mode'}</span>
      </button>
    </header>
  );
};

export default Header;