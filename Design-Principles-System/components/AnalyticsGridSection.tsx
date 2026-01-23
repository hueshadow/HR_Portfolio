import React from 'react';

interface AnalyticsGridSectionProps {
    isEmbedded?: boolean;
}

const AnalyticsGridSection: React.FC<AnalyticsGridSectionProps> = ({ isEmbedded = false }) => {
  const containerClass = isEmbedded 
    ? "contents" 
    : "w-full min-h-screen snap-start shrink-0 overflow-y-auto bg-background-light dark:bg-background-dark relative py-20 lg:py-32";

  const innerContainerClass = isEmbedded
    ? "contents"
    : "container mx-auto relative z-10 w-full max-w-7xl px-6 lg:px-8";
  
  const cardClass = "break-inside-avoid mb-6 w-full bg-surface-light dark:bg-surface-dark rounded-xl shadow-soft border border-border-light dark:border-border-dark overflow-hidden";

  const content = (
    <>
         {/* Notifications Card */}
        <div className={cardClass}>
            <div className="px-4 py-3 border-b border-border-light dark:border-border-dark flex items-center justify-between bg-gray-50/50 dark:bg-gray-800/50">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-light dark:text-muted-dark">Notifications</span>
                <span className="h-5 w-5 rounded-full bg-primary text-white text-[10px] flex items-center justify-center font-bold">3</span>
            </div>
            <div className="divide-y divide-border-light dark:divide-border-dark">
                <div className="p-3 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors cursor-pointer">
                <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-primary flex-shrink-0">
                    <span className="material-symbols-outlined text-sm">database</span>
                </div>
                <div>
                    <p className="text-xs font-semibold text-slate-900 dark:text-white leading-tight">Sync Completed</p>
                    <p className="text-[10px] text-muted-light dark:text-muted-dark mt-0.5">2,481 records processed successfully.</p>
                </div>
                </div>
                <div className="p-3 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors cursor-pointer">
                <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 flex-shrink-0">
                    <span className="material-symbols-outlined text-sm">warning</span>
                </div>
                <div>
                    <p className="text-xs font-semibold text-slate-900 dark:text-white leading-tight">Inactivity Alert</p>
                    <p className="text-[10px] text-muted-light dark:text-muted-dark mt-0.5">Workspace "Sales_v2" hasn't been accessed in 7 days.</p>
                </div>
                </div>
            </div>
        </div>

        {/* Profile */}
        <div className={`${cardClass} p-3 flex items-center gap-3`}>
            <div className="relative">
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center text-white font-bold text-sm">JD</div>
                <div className="absolute bottom-0 right-0 h-3 w-3 bg-success border-2 border-white dark:border-surface-dark rounded-full"></div>
            </div>
            <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-slate-900 dark:text-white truncate">Julian Drame</span>
                <span className="text-[10px] text-muted-light dark:text-muted-dark">System Architect</span>
            </div>
        </div>

         {/* File Types Grid */}
         <div className="break-inside-avoid mb-6 w-full flex flex-wrap gap-2">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark">
                <span className="material-symbols-outlined text-red-500 text-sm">description</span>
                <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">PDF</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark">
                <span className="material-symbols-outlined text-primary text-sm">image</span>
                <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">JPG</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg border border-border-light dark:border-border-dark bg-white dark:bg-surface-dark">
                <span className="material-symbols-outlined text-success text-sm">table_chart</span>
                <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">CSV</span>
            </div>
        </div>

        {/* Sparkline */}
        <div className={`${cardClass} p-4 flex flex-col justify-between`}>
            <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-muted-light dark:text-muted-dark uppercase">Sparkline</span>
                <span className="text-[10px] font-bold text-primary">+8.4%</span>
            </div>
            <div className="h-12 w-full mt-2">
                <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 40">
                    <path d="M0 35 Q 20 5, 40 25 T 70 15 T 100 20" fill="none" stroke="#3B82F6" strokeWidth="2.5" vectorEffect="non-scaling-stroke"></path>
                </svg>
            </div>
        </div>

        {/* Weather Card */}
        <div className={`${cardClass} p-4 bg-gradient-to-br from-blue-500 to-primary text-white border-transparent`}>
            <div className="flex justify-between items-start">
                <div>
                <p className="text-[10px] font-bold uppercase opacity-80">Local Weather</p>
                <h4 className="text-lg font-bold">San Francisco</h4>
                <p className="text-3xl font-bold mt-1">72°F</p>
                </div>
                <span className="material-symbols-outlined text-4xl opacity-90">wb_sunny</span>
            </div>
            <div className="mt-4 flex gap-4 text-[10px] font-medium opacity-90">
                <span>H: 74°</span>
                <span>L: 65°</span>
                <span className="ml-auto">Humidity: 12%</span>
            </div>
        </div>

        {/* Navigation Menu */}
        <div className={`${cardClass} p-2 h-fit`}>
            <div className="space-y-1">
                <div className="flex items-center gap-3 px-3 py-2 bg-primary/10 text-primary rounded-lg">
                <span className="material-symbols-outlined text-lg">dashboard</span>
                <span className="text-sm font-semibold">Overview</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 text-muted-light dark:text-muted-dark hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-lg">insights</span>
                <span className="text-sm font-medium">Analytics</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 text-muted-light dark:text-muted-dark hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-lg">payments</span>
                <span className="text-sm font-medium">Billing</span>
                </div>
            </div>
        </div>

        {/* Billing Summary */}
        <div className={`${cardClass} p-5`}>
            <div className="flex justify-between items-start mb-6">
                <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Billing Summary</h3>
                <p className="text-xs text-muted-light dark:text-muted-dark">Next payment due Oct 24, 2023</p>
                </div>
                <button className="px-3 py-1.5 text-[10px] font-bold bg-primary/10 text-primary rounded-lg border border-primary/20 hover:bg-primary/20 transition-colors">MANAGE</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-border-light dark:border-border-dark">
                <p className="text-[10px] font-bold text-muted-light dark:text-muted-dark mb-1 uppercase">Total Spent</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">$12,450.00</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-border-light dark:border-border-dark">
                <p className="text-[10px] font-bold text-muted-light dark:text-muted-dark mb-1 uppercase">Usage Tier</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">Enterprise</p>
                </div>
            </div>
        </div>

        {/* Weekly Volume */}
        <div className={`${cardClass} p-5`}>
            <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-light dark:text-muted-dark">Weekly Volume</span>
                <span className="material-symbols-outlined text-gray-400 text-lg cursor-pointer">more_vert</span>
            </div>
            <div className="flex items-end justify-between h-24 gap-1">
                <div className="w-full bg-primary/20 rounded-t-sm h-[40%]"></div>
                <div className="w-full bg-primary/40 rounded-t-sm h-[60%]"></div>
                <div className="w-full bg-primary rounded-t-sm h-[90%]"></div>
                <div className="w-full bg-primary/60 rounded-t-sm h-[50%]"></div>
                <div className="w-full bg-primary/30 rounded-t-sm h-[75%]"></div>
                <div className="w-full bg-primary/50 rounded-t-sm h-[30%]"></div>
                <div className="w-full bg-primary/80 rounded-t-sm h-[85%]"></div>
            </div>
            <div className="flex justify-between mt-2 text-[8px] font-bold text-muted-light dark:text-muted-dark uppercase">
                <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
            </div>
        </div>

        {/* Revenue Projections */}
        <div className={`${cardClass} p-5`}>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Revenue Projections</h3>
                <div className="flex gap-2">
                <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-primary"></div><span className="text-[10px] font-medium text-slate-700 dark:text-slate-300">Actual</span></div>
                <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-purple-400"></div><span className="text-[10px] font-medium text-slate-700 dark:text-slate-300">Projected</span></div>
                </div>
            </div>
            <div className="h-32 w-full relative">
                <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 400 120">
                <path d="M0 120 L0 80 Q 50 100, 100 60 T 200 80 T 300 40 T 400 50 L 400 120 Z" fill="rgba(29, 122, 252, 0.1)"></path>
                <path d="M0 80 Q 50 100, 100 60 T 200 80 T 300 40 T 400 50" fill="none" stroke="#3B82F6" strokeWidth="2"></path>
                <path d="M0 90 Q 50 110, 100 70 T 200 95 T 300 55 T 400 65" fill="none" stroke="#a855f7" strokeDasharray="4 4" strokeWidth="2"></path>
                </svg>
            </div>
        </div>

        {/* Search Input Widget */}
        <div className="break-inside-avoid mb-6 w-full space-y-6">
            <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-light dark:text-muted-dark">Input Field</label>
                <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">search</span>
                <input className="w-full pl-10 pr-4 py-2 text-sm border border-border-light dark:border-border-dark rounded-xl bg-surface-light dark:bg-surface-dark focus:ring-2 focus:ring-primary focus:border-primary text-slate-900 dark:text-white" placeholder="Search data..."/>
                </div>
            </div>
            <div className="space-y-2">
                <div className="flex gap-2">
                <button className="flex-1 bg-primary text-white text-xs font-bold py-2.5 rounded-xl shadow-sm hover:bg-primary-hover transition-colors">Apply</button>
                <button className="flex-1 bg-surface-light dark:bg-gray-800 border border-border-light dark:border-border-dark text-slate-900 dark:text-white text-xs font-bold py-2.5 rounded-xl transition-colors">Cancel</button>
                </div>
            </div>
            <div className="p-4 bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm">
                <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-900 dark:text-white">Real-time Analytics</span>
                <div className="w-10 h-5 bg-primary rounded-full relative cursor-pointer"><div className="absolute right-0.5 top-0.5 h-4 w-4 bg-white rounded-full transition-transform"></div></div>
                </div>
            </div>
        </div>

        {/* Device Usage Donut */}
        <div className={`${cardClass} p-5`}>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-bold uppercase text-muted-light dark:text-muted-dark tracking-wider">Device Usage</h3>
                <span className="material-symbols-outlined text-gray-400 text-sm">pie_chart</span>
            </div>
            <div className="flex items-center justify-center relative h-32">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-gray-100 dark:text-gray-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4"></path>
                <path className="text-primary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="60, 100" strokeWidth="4"></path>
                <path className="text-purple-500" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="25, 100" strokeDashoffset="-60" strokeWidth="4"></path>
                <path className="text-teal-400" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="15, 100" strokeDashoffset="-85" strokeWidth="4"></path>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">85%</span>
                </div>
            </div>
            <div className="flex justify-center gap-4 mt-2">
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-primary"></div><span className="text-[10px] text-muted-light dark:text-muted-dark">Desktop</span></div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-purple-500"></div><span className="text-[10px] text-muted-light dark:text-muted-dark">Mobile</span></div>
            </div>
        </div>

        {/* Activity Map */}
        <div className={`${cardClass} p-5`}>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-bold uppercase text-muted-light dark:text-muted-dark tracking-wider">Activity Map</h3>
                <span className="material-symbols-outlined text-gray-400 text-sm">grid_on</span>
            </div>
            <div className="flex items-center justify-center h-32">
                <svg className="w-full h-full text-primary" viewBox="0 0 140 70">
                <rect fill="currentColor" fillOpacity="0.2" height="12" rx="2" width="18" x="0" y="0"></rect>
                <rect fill="currentColor" fillOpacity="0.4" height="12" rx="2" width="18" x="20" y="0"></rect>
                <rect fill="currentColor" fillOpacity="0.1" height="12" rx="2" width="18" x="40" y="0"></rect>
                <rect fill="currentColor" fillOpacity="0.6" height="12" rx="2" width="18" x="60" y="0"></rect>
                <rect fill="currentColor" fillOpacity="0.3" height="12" rx="2" width="18" x="80" y="0"></rect>
                <rect fill="currentColor" fillOpacity="0.8" height="12" rx="2" width="18" x="100" y="0"></rect>
                <rect fill="currentColor" fillOpacity="0.2" height="12" rx="2" width="18" x="120" y="0"></rect>
                
                <rect fill="currentColor" fillOpacity="0.6" height="12" rx="2" width="18" x="0" y="14"></rect>
                <rect fill="currentColor" fillOpacity="0.8" height="12" rx="2" width="18" x="20" y="14"></rect>
                <rect fill="currentColor" fillOpacity="0.2" height="12" rx="2" width="18" x="40" y="14"></rect>
                <rect fill="currentColor" fillOpacity="0.9" height="12" rx="2" width="18" x="60" y="14"></rect>
                <rect fill="currentColor" fillOpacity="0.5" height="12" rx="2" width="18" x="80" y="14"></rect>
                <rect fill="currentColor" fillOpacity="0.3" height="12" rx="2" width="18" x="100" y="14"></rect>
                <rect fill="currentColor" fillOpacity="0.4" height="12" rx="2" width="18" x="120" y="14"></rect>
                
                <rect fill="currentColor" fillOpacity="0.1" height="12" rx="2" width="18" x="0" y="28"></rect>
                <rect fill="currentColor" fillOpacity="0.3" height="12" rx="2" width="18" x="20" y="28"></rect>
                <rect fill="currentColor" fillOpacity="0.9" height="12" rx="2" width="18" x="40" y="28"></rect>
                <rect fill="currentColor" fillOpacity="0.4" height="12" rx="2" width="18" x="60" y="28"></rect>
                <rect fill="currentColor" fillOpacity="0.2" height="12" rx="2" width="18" x="80" y="28"></rect>
                <rect fill="currentColor" fillOpacity="0.6" height="12" rx="2" width="18" x="100" y="28"></rect>
                <rect fill="currentColor" fillOpacity="0.5" height="12" rx="2" width="18" x="120" y="28"></rect>
                
                <rect fill="currentColor" fillOpacity="0.3" height="12" rx="2" width="18" x="0" y="42"></rect>
                <rect fill="currentColor" fillOpacity="0.5" height="12" rx="2" width="18" x="20" y="42"></rect>
                <rect fill="currentColor" fillOpacity="0.1" height="12" rx="2" width="18" x="40" y="42"></rect>
                <rect fill="currentColor" fillOpacity="0.7" height="12" rx="2" width="18" x="60" y="42"></rect>
                <rect fill="currentColor" fillOpacity="0.4" height="12" rx="2" width="18" x="80" y="42"></rect>
                <rect fill="currentColor" fillOpacity="0.2" height="12" rx="2" width="18" x="100" y="42"></rect>
                <rect fill="currentColor" fillOpacity="0.8" height="12" rx="2" width="18" x="120" y="42"></rect>
                
                <rect fill="currentColor" fillOpacity="0.2" height="12" rx="2" width="18" x="0" y="56"></rect>
                <rect fill="currentColor" fillOpacity="0.4" height="12" rx="2" width="18" x="20" y="56"></rect>
                <rect fill="currentColor" fillOpacity="0.6" height="12" rx="2" width="18" x="40" y="56"></rect>
                <rect fill="currentColor" fillOpacity="0.2" height="12" rx="2" width="18" x="60" y="56"></rect>
                <rect fill="currentColor" fillOpacity="0.1" height="12" rx="2" width="18" x="80" y="56"></rect>
                <rect fill="currentColor" fillOpacity="0.5" height="12" rx="2" width="18" x="100" y="56"></rect>
                <rect fill="currentColor" fillOpacity="0.3" height="12" rx="2" width="18" x="120" y="56"></rect>
                </svg>
            </div>
        </div>

        {/* System Health */}
        <div className={`${cardClass} p-5`}>
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-bold uppercase text-muted-light dark:text-muted-dark tracking-wider">System Health</h3>
                <div className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">98/100</div>
            </div>
            <div className="flex items-center justify-center h-36">
                <svg className="w-32 h-32" viewBox="0 0 100 100">
                <polygon className="text-gray-200 dark:text-gray-700" fill="none" points="50,10 90,30 90,70 50,90 10,70 10,30" stroke="currentColor" strokeWidth="0.5"></polygon>
                <polygon className="text-gray-200 dark:text-gray-700" fill="none" points="50,25 75,37.5 75,62.5 50,75 25,62.5 25,37.5" stroke="currentColor" strokeWidth="0.5"></polygon>
                <polygon fill="rgba(168, 85, 247, 0.2)" points="50,15 85,32 80,68 50,85 15,65 20,35" stroke="#a855f7" strokeWidth="2"></polygon>
                <circle cx="50" cy="15" fill="#a855f7" r="2"></circle>
                <circle cx="85" cy="32" fill="#a855f7" r="2"></circle>
                <circle cx="80" cy="68" fill="#a855f7" r="2"></circle>
                <circle cx="50" cy="85" fill="#a855f7" r="2"></circle>
                <circle cx="15" cy="65" fill="#a855f7" r="2"></circle>
                <circle cx="20" cy="35" fill="#a855f7" r="2"></circle>
                </svg>
            </div>
        </div>

        {/* Traffic Sources */}
        <div className={`${cardClass} p-5`}>
            <div className="flex justify-between items-start mb-6">
                <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Traffic Sources</h3>
                <p className="text-xs text-muted-light dark:text-muted-dark">Organic vs Paid Search</p>
                </div>
                <div className="flex gap-4">
                <div className="text-right">
                    <p className="text-[10px] uppercase text-muted-light dark:text-muted-dark">Organic</p>
                    <p className="text-lg font-bold text-primary">24.5k</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] uppercase text-muted-light dark:text-muted-dark">Paid</p>
                    <p className="text-lg font-bold text-purple-500">12.1k</p>
                </div>
                </div>
            </div>
            <div className="h-40 w-full">
                <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 400 150">
                <path d="M0 150 L0 100 Q 50 120, 100 90 T 200 100 T 300 60 T 400 80 L 400 150 Z" fill="rgba(168, 85, 247, 0.1)"></path>
                <path d="M0 100 Q 50 120, 100 60 T 200 100 T 300 60 T 400 80" fill="none" stroke="#a855f7" strokeWidth="2"></path>
                <path d="M0 150 L0 80 Q 60 40, 120 70 T 220 50 T 320 30 T 400 40 L 400 150 Z" fill="rgba(29, 122, 252, 0.15)"></path>
                <path d="M0 80 Q 60 40, 120 70 T 220 50 T 320 30 T 400 40" fill="none" stroke="#3B82F6" strokeWidth="2"></path>
                </svg>
            </div>
        </div>

        {/* Demographics Bar Chart */}
        <div className={`${cardClass} p-5`}>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-bold uppercase text-muted-light dark:text-muted-dark tracking-wider">Demographics</h3>
                <span className="material-symbols-outlined text-gray-400 text-sm">bar_chart</span>
            </div>
            <div className="flex items-end justify-between h-32 gap-3 px-2">
                <div className="w-full flex flex-col justify-end h-full gap-1">
                <div className="bg-purple-400 w-full rounded-sm h-[30%]"></div>
                <div className="bg-primary w-full rounded-sm h-[40%]"></div>
                </div>
                <div className="w-full flex flex-col justify-end h-full gap-1">
                <div className="bg-purple-400 w-full rounded-sm h-[20%]"></div>
                <div className="bg-primary w-full rounded-sm h-[60%]"></div>
                </div>
                <div className="w-full flex flex-col justify-end h-full gap-1">
                <div className="bg-purple-400 w-full rounded-sm h-[40%]"></div>
                <div className="bg-primary w-full rounded-sm h-[30%]"></div>
                </div>
                <div className="w-full flex flex-col justify-end h-full gap-1">
                <div className="bg-purple-400 w-full rounded-sm h-[25%]"></div>
                <div className="bg-primary w-full rounded-sm h-[55%]"></div>
                </div>
                <div className="w-full flex flex-col justify-end h-full gap-1">
                <div className="bg-purple-400 w-full rounded-sm h-[35%]"></div>
                <div className="bg-primary w-full rounded-sm h-[45%]"></div>
                </div>
            </div>
            <div className="flex justify-center gap-4 mt-3">
                <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-primary"></div><span className="text-[10px] text-muted-light dark:text-muted-dark">Male</span></div>
                <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-purple-400"></div><span className="text-[10px] text-muted-light dark:text-muted-dark">Female</span></div>
            </div>
        </div>
    </>
  );

  if (isEmbedded) return content;

  return (
    <div className={containerClass}>
      <div className={innerContainerClass}>
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}>
             {content}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsGridSection;