import React, { useEffect, useState } from 'react';
import { 
  Info, Gamepad2, BarChart, PlusCircle, HelpCircle, 
  Cloud, TrendingUp, Bell, MoreHorizontal, ChevronRight, 
  User, DollarSign, FileText 
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const data = [
  { value: 30 }, { value: 40 }, { value: 35 }, { value: 50 }, 
  { value: 45 }, { value: 60 }, { value: 55 }, { value: 70 }
];

const FloatingDashboard: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative w-full h-full">
      
      {/* 
        Layer 1: Background Elements 
        Static or very slow moving elements behind the main dashboard
      */}

      {/* 
        Layer 2: Main Dashboard Card (Event Tracking) 
        The anchor of the visualization
        Centered in the container
      */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[440px] bg-white/95 dark:bg-slate-900/95 rounded-2xl shadow-2xl p-6 border border-white/20 backdrop-blur-xl z-10 transition-transform hover:scale-[1.005] duration-500 animate-fade-in-up" 
        style={{ animationDelay: '0.1s' }}
      >
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-slate-800 dark:text-white">Event Tracking</span>
            <Info className="text-slate-400 w-4 h-4" />
          </div>
          <span className="text-xs font-semibold text-primary uppercase tracking-wider bg-indigo-50 dark:bg-indigo-900/20 px-2 py-1 rounded">Reports</span>
        </div>
        
        <div className="space-y-4">
          {/* List Item 1 */}
          <div className="h-16 w-full bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 flex items-center px-4 gap-4 transition-all hover:bg-slate-100 dark:hover:bg-slate-700/80 hover:translate-x-1 group">
            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 dark:group-hover:bg-indigo-900/50 transition-colors">
              <Gamepad2 className="text-primary w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="h-3 w-32 bg-slate-200 dark:bg-slate-700 rounded mb-1 animate-pulse"></div>
              <div className="h-2 w-20 bg-slate-100 dark:bg-slate-800 rounded"></div>
            </div>
            <span className="bg-indigo-500 text-[10px] text-white px-2 py-0.5 rounded-full font-bold shadow-sm shadow-indigo-500/40">NEW</span>
          </div>
          
          {/* List Item 2 */}
          <div className="h-16 w-full bg-slate-50 dark:bg-slate-800 rounded-xl border border-indigo-200 dark:border-indigo-500/30 flex items-center px-4 gap-4 transition-all hover:bg-slate-100 dark:hover:bg-slate-700/80 hover:translate-x-1 cursor-pointer group">
            <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform">
              <BarChart className="text-white w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold text-slate-800 dark:text-white">Battle Analytics</div>
              <div className="text-[10px] text-slate-400">Synced: 2/2</div>
            </div>
            <PlusCircle className="text-indigo-500 w-5 h-5 group-hover:text-indigo-600 transition-colors" />
          </div>
        </div>

        {/* Bar Chart Mockup Section */}
        <div className="mt-8 bg-slate-50 dark:bg-slate-800 rounded-xl p-6 border border-slate-100 dark:border-slate-700">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm font-bold text-slate-800 dark:text-white">PvP Battle Total</div>
            <HelpCircle className="text-slate-300 w-4 h-4" />
          </div>
          <div className="h-24 flex items-end gap-2 overflow-hidden">
            {/* Bars with dynamic growth animation */}
            <div className={`w-full bg-indigo-100 dark:bg-indigo-900/20 rounded-t-sm transition-all duration-1000 ease-out hover:bg-indigo-200 ${mounted ? 'h-1/2' : 'h-0'}`}></div>
            <div className={`w-full bg-indigo-200 dark:bg-indigo-900/40 rounded-t-sm transition-all duration-1000 delay-75 ease-out hover:bg-indigo-300 ${mounted ? 'h-2/3' : 'h-0'}`}></div>
            <div className={`w-full bg-indigo-300 dark:bg-indigo-900/60 rounded-t-sm transition-all duration-1000 delay-150 ease-out hover:bg-indigo-400 ${mounted ? 'h-3/4' : 'h-0'}`}></div>
            <div className={`w-full bg-indigo-500 rounded-t-sm shadow-lg shadow-indigo-500/20 transition-all duration-1000 delay-200 ease-out hover:bg-indigo-600 ${mounted ? 'h-full' : 'h-0'}`}></div>
            <div className={`w-full bg-indigo-400 dark:bg-indigo-900/80 rounded-t-sm transition-all duration-1000 delay-300 ease-out hover:bg-indigo-500 ${mounted ? 'h-4/5' : 'h-0'}`}></div>
          </div>
        </div>
      </div>

      {/* 
        Layer 3: Floating Widgets 
        Positions adjusted slightly for centered layout
      */}

      {/* Floating: Storage Usage (Top Left) */}
      <div className="absolute top-0 left-0 z-20 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="w-64 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 animate-float">
          <div className="flex justify-between items-start mb-6">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Storage Usage</div>
            <Cloud className="text-indigo-400 w-5 h-5" />
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 flex items-center justify-center">
              {/* SVG Ring Chart with rotation animation */}
              <svg className="w-16 h-16 -rotate-90 animate-spin-slow" viewBox="0 0 48 48">
                <circle className="stroke-slate-100 dark:stroke-slate-700" cx="24" cy="24" fill="transparent" r="20" strokeWidth="4"></circle>
                <circle className="stroke-primary" cx="24" cy="24" fill="transparent" r="20" strokeDasharray="125" strokeDashoffset="35" strokeWidth="4" strokeLinecap="round"></circle>
              </svg>
              {/* Counter-rotate text so it stays upright if parent spins, or just don't spin the container */}
              <span className="absolute text-xs font-bold text-primary">70%</span>
            </div>
            <div>
              <span className="text-2xl font-bold dark:text-white leading-none">85</span>
              <span className="text-xs text-slate-400 font-bold block">GB Used</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating: Revenue Growth (Middle Left) */}
      <div className="absolute top-[280px] -left-8 z-30 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <div className="w-52 bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 animate-float-delayed hover:paused">
          <div className="text-[10px] font-bold text-slate-400 uppercase mb-2">Revenue Growth</div>
          <div className="flex items-end justify-between mb-4">
            <div className="text-2xl font-extrabold dark:text-white">$8,420</div>
            <div className="flex items-center gap-1 text-emerald-500 font-bold text-[10px] bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded">
              <TrendingUp className="w-3 h-3" />
              +24%
            </div>
          </div>
          <div className="flex items-end gap-1.5 h-12">
            <div className={`flex-1 bg-indigo-100 dark:bg-indigo-900/30 rounded-sm transition-all duration-1000 ${mounted ? 'h-[40%]' : 'h-0'}`}></div>
            <div className={`flex-1 bg-indigo-300 dark:bg-indigo-800/60 rounded-sm transition-all duration-1000 delay-75 ${mounted ? 'h-[70%]' : 'h-0'}`}></div>
            <div className={`flex-1 bg-indigo-200 dark:bg-indigo-900/40 rounded-sm transition-all duration-1000 delay-150 ${mounted ? 'h-[50%]' : 'h-0'}`}></div>
            <div className={`flex-1 bg-indigo-500 rounded-sm shadow shadow-indigo-500/30 transition-all duration-1000 delay-200 ${mounted ? 'h-[90%]' : 'h-0'}`}></div>
            <div className={`flex-1 bg-indigo-400 dark:bg-indigo-700/80 rounded-sm transition-all duration-1000 delay-300 ${mounted ? 'h-[60%]' : 'h-0'}`}></div>
          </div>
        </div>
      </div>

      {/* Floating: Daily Traffic (Bottom Leftish) */}
      <div className="absolute top-[400px] left-[180px] z-40 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
        <div className="w-48 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 animate-float-slow">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Daily Traffic</span>
            <span className="text-[10px] font-bold text-emerald-500">+12%</span>
          </div>
          <div className="h-12 w-full -mx-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5A67FF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#5A67FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#5A67FF" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                  isAnimationActive={true}
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Floating: Notifications (Top Right) */}
      <div className="absolute top-[60px] right-[-60px] z-30 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <div className="w-48 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 animate-float-reverse hover:scale-105 transition-transform">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center flex-shrink-0 relative">
              <Bell className="text-pink-500 w-4 h-4 animate-swing origin-top" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>
            </div>
            <div>
              <div className="text-[11px] font-bold dark:text-white leading-none mb-0.5">Notifications</div>
              <div className="text-[9px] text-slate-400">Manage alerts</div>
            </div>
          </div>
          <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-900/50 p-2 rounded-lg">
            <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-300">Push Alerts</span>
            <div className="w-8 h-4 bg-primary rounded-full relative cursor-pointer">
              <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow-sm"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating: Game Analytics (Overlay Center) */}
      <div className="absolute top-[160px] left-[260px] z-30 animate-fade-in-up" style={{ animationDelay: '0.45s' }}>
        <div className="w-60 bg-indigo-600 dark:bg-indigo-700 p-5 rounded-2xl shadow-2xl shadow-indigo-900/50 border border-indigo-400/30 transition-transform hover:scale-105 duration-300 animate-float">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-bold text-white">Game Analytics</span>
            <MoreHorizontal className="text-white/60 w-4 h-4" />
          </div>
          <p className="text-[11px] text-indigo-100/80 leading-relaxed mb-4">
            Real-time tracking for in-game events, payments, and battle metrics.
          </p>
          <div className="flex gap-2">
            <button className="flex-1 py-2 rounded-lg bg-white text-indigo-600 text-[10px] font-bold uppercase tracking-wider hover:bg-indigo-50 transition-colors shadow-sm">Details</button>
            <button className="flex-1 py-2 rounded-lg bg-indigo-500/50 text-white text-[10px] font-bold uppercase tracking-wider hover:bg-indigo-500/70 transition-colors">MMO</button>
          </div>
        </div>
      </div>

      {/* Floating: iOS Access (Top Right Extreme) */}
      <div className="absolute -top-10 right-[-60px] z-20 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
        <div className="w-64 bg-primary p-6 rounded-3xl shadow-xl border border-white/20 animate-float-delayed hover:bg-primary-hover transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-white font-bold text-lg leading-tight">iOS Access</h3>
              <p className="text-indigo-100 text-[10px]">Seamless integration</p>
            </div>
            <div className="text-white/50 bg-white/10 p-1.5 rounded-lg">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.3-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.98 1.08-3.11-1.06.05-2.31.71-3.06 1.48-.69.72-1.24 1.87-1.09 2.98 1.18.09 2.36-.64 3.07-1.35z"/>
              </svg>
            </div>
          </div>
          <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-xs font-bold transition-colors flex items-center gap-2 group">
            Connect <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Floating: Recent Activity (Bottom Right) */}
      <div className="absolute bottom-0 right-[-40px] z-30 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
        <div className="w-64 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 hover:scale-105 transition-transform duration-300">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-sm font-bold dark:text-white">Recent Activity</h4>
            <button className="text-[10px] font-bold text-primary uppercase hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            <div className="flex gap-3 items-start group cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-200 transition-colors">
                <User className="text-emerald-500 w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-bold dark:text-white leading-none mb-0.5">New user subscribed</div>
                <div className="text-[10px] text-slate-400">2 minutes ago</div>
              </div>
            </div>
            <div className="flex gap-3 items-start group cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-200 transition-colors">
                <DollarSign className="text-amber-500 w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-bold dark:text-white leading-none mb-0.5">Payment received</div>
                <div className="text-[10px] text-slate-400">15 minutes ago</div>
              </div>
            </div>
            <div className="flex gap-3 items-start group cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-200 transition-colors">
                <FileText className="text-indigo-500 w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-bold dark:text-white leading-none mb-0.5">Invoice #402 sent</div>
                <div className="text-[10px] text-slate-400">1 hour ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingDashboard;