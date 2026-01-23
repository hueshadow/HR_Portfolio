import React from 'react';
import FloatingDashboard from './FloatingDashboard';
import { CheckCircle, ArrowRight } from 'lucide-react';

const DashboardSection: React.FC = () => {
  return (
    <div className="w-full h-screen snap-start shrink-0 flex items-center justify-center relative overflow-hidden bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 xl:px-32 flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-24 h-full pt-20 pb-10">
        
        {/* Left Section: Text Content */}
        <section className="w-full lg:w-5/12 flex flex-col justify-center max-w-2xl h-full z-10">
          <div className="space-y-8 lg:space-y-12">
            <div>
              <span className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 rounded-full text-xs font-bold uppercase tracking-wide mb-4">Analytics & Data</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
                实时数据 <br/>
                <span className="text-primary">监控面板</span>
              </h2>
              <p className="text-lg text-muted-light dark:text-muted-dark font-normal leading-relaxed">
                通过高度可定制的仪表盘组件，即时获取业务洞察。支持深色模式、自动布局和响应式设计，为您的数据可视化提供最佳体验。
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["实时事件追踪", "收入增长分析", "用户行为热图", "全平台兼容"].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle className="text-primary w-5 h-5 shrink-0" />
                  <span className="font-medium text-slate-700 dark:text-slate-300">{feature}</span>
                </div>
              ))}
            </div>

            <button className="group flex items-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all active:scale-95 w-fit">
              查看演示
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </section>

        {/* Right Section: Floating Dashboard Mockup */}
        <section className="w-full lg:w-7/12 h-[50vh] lg:h-full relative flex items-center justify-center perspective-1000">
            <div className="relative w-full h-[500px] scale-75 lg:scale-100 origin-center">
                <FloatingDashboard />
            </div>
        </section>

      </div>
    </div>
  );
};

export default DashboardSection;