import React from 'react';

interface MosaicDesignSectionProps {
  isEmbedded?: boolean;
}

const MosaicDesignSection: React.FC<MosaicDesignSectionProps> = ({ isEmbedded = false }) => {
  const mosaicCardClass = "design-card p-4 transition-all hover:shadow-md break-inside-avoid mb-6 w-full";

  const content = (
    <>
      {/* Table Card - Full Width if embedded, or just part of flow */}
      <div className="w-full design-card overflow-hidden break-inside-avoid mb-6">
        <div className="px-6 py-4 border-b border-[var(--border-light)] dark:border-[var(--border-dark)] flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Recent Users</h3>
          <button className="text-xs text-[var(--primary)] font-bold hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[var(--border-light)] dark:divide-[var(--border-dark)]">
            <tbody className="divide-y divide-[var(--border-light)] dark:divide-[var(--border-dark)]">
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">Sophie Miller</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-secondary-light)] dark:text-[var(--text-secondary-dark)]">Admin</td>
                <td className="px-6 py-4 whitespace-nowrap"><span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Active</span></td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">James Logan</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-secondary-light)] dark:text-[var(--text-secondary-dark)]">Editor</td>
                <td className="px-6 py-4 whitespace-nowrap"><span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">Offline</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative w-full group break-inside-avoid mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="material-symbols-outlined text-gray-400">search</span>
        </div>
        <input className="block w-full pl-10 pr-12 py-3 border border-[var(--border-light)] dark:border-[var(--border-dark)] rounded-xl bg-[var(--surface-light)] dark:bg-[var(--surface-dark)] placeholder-gray-400 focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] shadow-sm outline-none transition-all dark:text-white" placeholder="Search components..." type="text"/>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <kbd className="hidden sm:inline-flex border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded px-2 py-0.5 text-xs text-gray-400">⌘K</kbd>
        </div>
      </div>

      {/* Login */}
      <div className="w-full design-card p-6 space-y-5 break-inside-avoid mb-6">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white">Log in</h3>
        <div className="space-y-4">
          <input className="w-full px-4 py-2.5 rounded-lg border border-[var(--border-light)] dark:border-[var(--border-dark)] bg-gray-50 dark:bg-gray-800/50 outline-none focus:ring-2 focus:ring-[var(--primary)] dark:text-white" placeholder="Username" type="text"/>
          <input className="w-full px-4 py-2.5 rounded-lg border border-[var(--border-light)] dark:border-[var(--border-dark)] bg-gray-50 dark:bg-gray-800/50 outline-none focus:ring-2 focus:ring-[var(--primary)] dark:text-white" placeholder="Password" type="password"/>
          <button className="w-full bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-bold py-2.5 rounded-lg shadow-lg shadow-[var(--primary)]/20 transition-all active:scale-95">Sign In</button>
        </div>
      </div>

      {/* Buttons Mosaic */}
      <div className={mosaicCardClass}>
        <label className="block text-[10px] font-bold text-[var(--text-secondary-light)] dark:text-[var(--text-secondary-dark)] uppercase tracking-widest mb-3">Buttons</label>
        <div className="grid grid-cols-3 gap-2">
          <button className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-medium px-2 py-2.5 rounded-lg shadow-sm text-sm transition-colors">Primary</button>
          <button className="bg-[var(--surface-light)] dark:bg-[var(--surface-dark)] border border-[var(--border-light)] dark:border-[var(--border-dark)] text-slate-900 dark:text-white font-medium px-2 py-2.5 rounded-lg shadow-sm text-sm hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">Default</button>
          <button className="border border-dashed border-gray-400 text-slate-900 dark:text-white font-medium px-2 py-2.5 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">Dashed</button>
          <button className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white h-[44px] w-[44px] rounded-lg shadow-sm flex items-center justify-center shrink-0 transition-colors">
            <span className="material-symbols-outlined text-xl">add</span>
          </button>
          <button className="bg-[var(--surface-light)] dark:bg-[var(--surface-dark)] border border-[var(--border-light)] dark:border-[var(--border-dark)] text-[var(--text-secondary-light)] dark:text-[var(--text-secondary-dark)] h-[44px] w-[44px] rounded-lg shadow-sm flex items-center justify-center shrink-0 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-xl">settings</span>
          </button>
          <button className="border border-dashed border-gray-400 text-slate-900 dark:text-white h-[44px] w-[44px] rounded-lg flex items-center justify-center shrink-0 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-xl">upload</span>
          </button>
        </div>
      </div>

      {/* Tag Input */}
      <div className={mosaicCardClass}>
        <label className="block text-[10px] font-bold text-[var(--text-secondary-light)] dark:text-[var(--text-secondary-dark)] uppercase tracking-widest mb-3">Tag Input</label>
        <div className="flex flex-wrap items-center gap-2 p-2 rounded-lg border border-[var(--border-light)] dark:border-[var(--border-dark)] bg-gray-50/50 dark:bg-gray-900/20">
          <span className="inline-flex items-center px-2 py-1 rounded-md bg-[var(--info-bg-light)] dark:bg-[var(--info-bg-dark)] text-[var(--primary)] text-xs font-medium border border-blue-100">
            UI Design <span className="material-symbols-outlined text-xs ml-1 cursor-pointer">close</span>
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded-md bg-purple-50 text-purple-600 text-xs font-medium border border-purple-100">
            React <span className="material-symbols-outlined text-xs ml-1 cursor-pointer">close</span>
          </span>
          <input className="flex-1 min-w-[40px] bg-transparent border-none p-0 text-sm focus:ring-0 dark:text-white placeholder-gray-400" placeholder="Add..." type="text"/>
        </div>
      </div>

      {/* Storage */}
      <div className={mosaicCardClass}>
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path className="text-gray-100 dark:text-gray-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
              <path className="text-[var(--primary)]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="75, 100" strokeLinecap="round" strokeWidth="3"></path>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-900 dark:text-white">75%</div>
          </div>
          <div>
            <span className="text-sm font-semibold text-slate-900 dark:text-white">Storage Capacity</span>
            <p className="text-[10px] text-[var(--text-secondary-light)] dark:text-[var(--text-secondary-dark)]">15GB used of 20GB</p>
          </div>
        </div>
      </div>

      {/* System Alert */}
      <div className="w-full bg-[var(--info-bg-light)] dark:bg-[var(--info-bg-dark)] border border-blue-200 dark:border-blue-800 rounded-[14px] px-4 py-3 flex items-start gap-3 break-inside-avoid mb-6">
        <span className="material-symbols-outlined text-[var(--primary)] text-xl mt-0.5">info</span>
        <div>
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white">System Update</h4>
          <p className="text-xs text-[var(--text-secondary-light)] dark:text-gray-300 mt-1">Scheduled maintenance in 2 hours.</p>
        </div>
      </div>

      {/* Layout Settings */}
      <div className={mosaicCardClass}>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800/40 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <span className="text-sm font-medium text-slate-900 dark:text-white">Layout Settings</span>
            <span className="material-symbols-outlined text-sm text-gray-500">expand_more</span>
          </div>
          <div className="p-2 text-xs text-[var(--text-secondary-light)] dark:text-[var(--text-secondary-dark)]">
            Adjust grid density and component spacing from the preferences panel.
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className={mosaicCardClass}>
        <div className="space-y-4 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-0.5 before:bg-[var(--border-light)] dark:before:bg-[var(--border-dark)]">
          <div className="relative pl-6">
            <div className="absolute left-0 top-1 w-3.5 h-3.5 rounded-full bg-[var(--primary)] ring-4 ring-white dark:ring-[var(--surface-dark)]"></div>
            <p className="text-xs font-semibold text-slate-900 dark:text-white">Project Launched</p>
            <p className="text-[10px] text-[var(--text-secondary-light)] dark:text-[var(--text-secondary-dark)]">10:45 AM</p>
          </div>
          <div className="relative pl-6">
            <div className="absolute left-0 top-1 w-3.5 h-3.5 rounded-full bg-[var(--success)] ring-4 ring-white dark:ring-[var(--surface-dark)]"></div>
            <p className="text-xs font-semibold text-slate-900 dark:text-white">CI/CD Passed</p>
            <p className="text-[10px] text-[var(--text-secondary-light)] dark:text-[var(--text-secondary-dark)]">09:12 AM</p>
          </div>
        </div>
      </div>

      {/* Kanban Card */}
      <div className={mosaicCardClass}>
        <div className="flex gap-2 h-full overflow-hidden">
          <div className="flex-1 space-y-2">
            <div className="text-[10px] font-bold text-[var(--text-secondary-light)] dark:text-[var(--text-secondary-dark)] uppercase">To Do</div>
            <div className="p-2 bg-gray-50 dark:bg-gray-800/40 rounded-lg text-[10px] border border-[var(--border-light)] dark:border-[var(--border-dark)] text-slate-700 dark:text-slate-300">Auth Flow</div>
          </div>
          <div className="flex-1 space-y-2">
            <div className="text-[10px] font-bold text-[var(--text-secondary-light)] dark:text-[var(--text-secondary-dark)] uppercase">Doing</div>
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-[10px] border border-blue-100 dark:border-blue-900 text-[var(--primary)]">Mosaic Hero</div>
          </div>
        </div>
      </div>

      {/* Status Chips */}
      <div className={mosaicCardClass}>
        <div className="flex flex-wrap gap-1.5 items-center">
          <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-[10px] flex items-center gap-1 text-slate-700 dark:text-slate-300 border border-gray-200 dark:border-gray-700">Status: Active <span className="material-symbols-outlined text-[12px] cursor-pointer hover:text-red-500">close</span></span>
          <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-[10px] flex items-center gap-1 text-slate-700 dark:text-slate-300 border border-gray-200 dark:border-gray-700">Role: Admin <span className="material-symbols-outlined text-[12px] cursor-pointer hover:text-red-500">close</span></span>
        </div>
      </div>

      {/* File List */}
      <div className={mosaicCardClass}>
        <div className="space-y-2">
          <div className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg cursor-pointer transition-colors">
            <span className="material-symbols-outlined text-lg text-[var(--primary)]">description</span>
            <div className="min-w-0">
              <p className="text-xs font-medium truncate text-slate-900 dark:text-white">Quarterly_Report.pdf</p>
              <p className="text-[10px] text-[var(--text-secondary-light)] dark:text-[var(--text-secondary-dark)]">Updated 2h ago</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg cursor-pointer transition-colors">
            <span className="material-symbols-outlined text-lg text-[var(--primary)]">folder</span>
            <div className="min-w-0">
              <p className="text-xs font-medium truncate text-slate-900 dark:text-white">Design Assets</p>
              <p className="text-[10px] text-[var(--text-secondary-light)] dark:text-[var(--text-secondary-dark)]">124 items</p>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Toast */}
      <div className={`${mosaicCardClass} bg-[var(--primary)]/5 border-[var(--primary)]/20`}>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-slate-900 dark:text-white">Notifications</span>
          <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse"></span>
        </div>
        <div className="space-y-2">
          <div className="text-[10px] pb-2 border-b border-[var(--border-light)] dark:border-[var(--border-dark)] text-slate-600 dark:text-slate-400">New comment on <span className="font-bold text-slate-900 dark:text-white">Dashboard v2</span></div>
        </div>
      </div>

      {/* Form Validation */}
      <div className={mosaicCardClass}>
        <div className="space-y-3">
          <div>
            <input className="w-full text-xs px-2 py-1.5 rounded border border-red-500 bg-red-50 dark:bg-red-900/10 focus:ring-1 focus:ring-red-500 outline-none text-red-900 dark:text-red-200" type="text" defaultValue="invalid-email" readOnly/>
            <p className="text-[9px] text-red-500 mt-1">Please enter a valid email address.</p>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className={mosaicCardClass}>
        <div className="flex rounded-lg border border-[var(--border-light)] dark:border-[var(--border-dark)] p-1 overflow-hidden bg-white dark:bg-black/20">
          <button className="flex-1 py-1 text-[10px] font-bold bg-[var(--primary)] text-white rounded shadow-sm">List</button>
          <button className="flex-1 py-1 text-[10px] font-bold text-[var(--text-secondary-light)] dark:text-[var(--text-secondary-dark)] hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">Grid</button>
        </div>
      </div>

      {/* Radio Group */}
      <div className={mosaicCardClass}>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer hover:opacity-80">
            <input defaultChecked className="w-3 h-3 text-[var(--primary)] border-gray-300 focus:ring-[var(--primary)] rounded-full" name="mosaic-r" type="radio"/>
            <span className="text-xs text-slate-900 dark:text-white">Standard Delivery</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:opacity-80">
            <input className="w-3 h-3 text-[var(--primary)] border-gray-300 focus:ring-[var(--primary)] rounded-full" name="mosaic-r" type="radio"/>
            <span className="text-xs text-slate-900 dark:text-white">Express</span>
          </label>
        </div>
      </div>

      {/* Steps */}
      <div className={mosaicCardClass}>
        <div className="flex items-center justify-between px-2">
          <div className="w-6 h-6 rounded-full bg-[var(--primary)] text-white text-[10px] flex items-center justify-center font-bold shadow-md">1</div>
          <div className="flex-1 h-0.5 bg-[var(--primary)]/20 mx-1"></div>
          <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 text-[var(--text-secondary-light)] dark:text-[var(--text-secondary-dark)] text-[10px] flex items-center justify-center border border-gray-200 dark:border-gray-700">2</div>
          <div className="flex-1 h-0.5 bg-gray-100 dark:bg-gray-800 mx-1"></div>
          <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 text-[var(--text-secondary-light)] dark:text-[var(--text-secondary-dark)] text-[10px] flex items-center justify-center border border-gray-200 dark:border-gray-700">3</div>
        </div>
        <div className="flex justify-between mt-2 text-[9px] text-[var(--text-secondary-light)] dark:text-[var(--text-secondary-dark)] font-medium px-1">
          <span>Cart</span><span>Billing</span><span>Done</span>
        </div>
      </div>

      {/* Code Snippet */}
      <div className={`${mosaicCardClass} bg-gray-900 text-gray-300 font-mono text-[10px] relative overflow-hidden group`}>
        <button className="absolute top-2 right-2 text-gray-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
          <span className="material-symbols-outlined text-sm">content_copy</span>
        </button>
        <code>npm install @kit/ui</code><br/>
        <code>import &#123; Button &#125;...</code>
      </div>
    </>
  );

  if (isEmbedded) return content;

  return (
    <div className="w-full min-h-screen snap-start shrink-0 overflow-y-auto bg-[var(--background-light)] dark:bg-[var(--background-dark)] relative">
      <div className="container mx-auto relative z-10 w-full max-w-[1600px] px-6 lg:px-8 pt-20 lg:pt-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {content}
        </div>
      </div>
    </div>
  );
};

export default MosaicDesignSection;
