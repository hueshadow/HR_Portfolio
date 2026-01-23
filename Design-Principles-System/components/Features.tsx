import React from 'react';
import { Zap, Layers, Palette, Code, Smartphone, Globe } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <section className="w-full h-screen snap-start shrink-0 flex items-center justify-center relative overflow-hidden bg-slate-50 dark:bg-slate-900/80">
      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 xl:px-32 flex flex-col justify-center h-full pt-20">
        
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <span className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wide mb-4">Technical Specs</span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900 dark:text-white tracking-tight">为高性能而构建</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl leading-relaxed">
            Design System 提供了一整套构建现代化、响应式应用所需的工具和组件，让开发过程如丝般顺滑。
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto w-full">
          <FeatureCard 
            icon={<Zap className="w-6 h-6 text-white" />}
            color="bg-amber-500"
            title="极速构建"
            description="预置组件库遵循最新的设计趋势和最佳实践，开箱即用。"
          />
          <FeatureCard 
            icon={<Layers className="w-6 h-6 text-white" />}
            color="bg-primary"
            title="原子化架构"
            description="清晰的层级结构和原子化设计，确保系统的可维护性和扩展性。"
          />
          <FeatureCard 
            icon={<Palette className="w-6 h-6 text-white" />}
            color="bg-purple-500"
            title="全局主题"
            description="统一的色彩和排版系统，轻松实现明暗模式和品牌定制。"
          />
          <FeatureCard 
            icon={<Code className="w-6 h-6 text-white" />}
            color="bg-pink-500"
            title="开发者友好"
            description="基于 React 和 Tailwind CSS 构建，提供完整的 TypeScript 支持。"
          />
          <FeatureCard 
            icon={<Smartphone className="w-6 h-6 text-white" />}
            color="bg-emerald-500"
            title="全端响应式"
            description="完美适配各种屏幕尺寸，从大屏桌面到移动设备。"
          />
          <FeatureCard 
            icon={<Globe className="w-6 h-6 text-white" />}
            color="bg-cyan-500"
            title="国际化支持"
            description="内置多语言支持架构，轻松拓展全球业务。"
          />
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, color }) => (
  <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
    <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4 shadow-lg shadow-gray-200 dark:shadow-none group-hover:scale-110 transition-transform duration-300`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-primary transition-colors">{title}</h3>
    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{description}</p>
  </div>
);

export default Features;