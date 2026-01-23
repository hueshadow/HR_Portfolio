import React from 'react';
import { BarChart2 } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 py-12 border-t border-slate-100 dark:border-slate-800">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
            <BarChart2 className="text-white w-3 h-3" />
          </div>
          <span className="font-bold text-slate-900 dark:text-white">Analytics UI Kit</span>
        </div>
        
        <p className="text-slate-400 text-sm">© 2024 Analytics UI Kit. All rights reserved.</p>
        
        <div className="flex gap-6 text-slate-400 text-sm">
          <a href="#" className="hover:text-primary transition-colors">Terms</a>
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          <a href="#" className="hover:text-primary transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;