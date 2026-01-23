import React from 'react';

const PrinciplesSection: React.FC = () => {
  return (
    <div className="w-full h-screen snap-start shrink-0 flex items-center justify-center relative overflow-hidden">
      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 xl:px-32 flex flex-col lg:flex-row items-center gap-16 lg:gap-24 h-full pt-20 pb-10">
        {/* Left Section: Cards Grid */}
        <section className="w-full lg:w-1/2 xl:w-7/12 flex items-center justify-center h-full">
          <div className="grid grid-cols-2 gap-6 w-full max-w-4xl h-full max-h-[800px] content-center">
            <PrincipleCard 
              number="01" 
              icon="security" 
              title="安全" 
              description="用户在使用产品时感到安全和可控。避免由于系统错误导致的数据丢失。" 
            />
            <PrincipleCard 
              number="02" 
              icon="visibility" 
              title="清晰" 
              description="消除歧义，使用户能够自信地预测将会发生什么。语言直观，导航明确。" 
            />
            <PrincipleCard 
              number="03" 
              icon="speed" 
              title="流畅" 
              description="优化工作流程，预测用户需求以帮助其更快、更智能地工作。" 
            />
            <PrincipleCard 
              number="04" 
              icon="auto_awesome" 
              title="美观" 
              description="展示对工艺的尊重。通过精细的视觉设计提升用户体验的愉悦感。" 
            />
          </div>
        </section>

        {/* Right Section: Text Content */}
        <section className="w-full lg:w-1/2 xl:w-5/12 flex flex-col justify-center max-w-2xl h-full">
          <div className="space-y-12 lg:space-y-24">
            <div className="space-y-6">
              <div>
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wide mb-4">Core Philosophy</span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight leading-tight whitespace-nowrap">设计原则的必要性</h2>
                <div className="h-1.5 w-32 bg-primary rounded-full"></div>
              </div>
              <div className="prose prose-lg prose-slate dark:prose-invert prose-p:leading-relaxed max-w-none">
                <p className="text-lg text-muted-light dark:text-muted-dark font-normal">
                  Salesforce 的 Lightning 设计体系原则是“清晰、高效、一致、美观”。该体系强调，这些原则的优先级必须遵从以上顺序，“美观”不应该高于“高效”和“一致”，而是“清晰”应该在中方在第一位。
                </p>
                <p className="text-lg text-muted-light dark:text-muted-dark font-normal mt-4">
                  按照这种方式对原则进行排序，可以让团队在做设计决策时明确哪些东西应该优先考虑。
                </p>
              </div>
            </div>
            
            <div className="pt-8 border-t border-border-light dark:border-border-dark flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Citation Source</p>
                <p className="text-sm text-muted-light dark:text-muted-dark italic flex items-center gap-2">
                  <span className="material-icons-round text-base">menu_book</span>
                  引用《设计体系：数字产品设计的系统化方法》
                </p>
              </div>
              <button className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap">
                <span className="material-icons-round text-sm">download</span>
                Download Guidelines
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

interface PrincipleCardProps {
  number: string;
  icon: string;
  title: string;
  description: string;
}

const PrincipleCard: React.FC<PrincipleCardProps> = ({ number, icon, title, description }) => (
  <article className="bg-card-light dark:bg-card-dark rounded-2xl shadow-soft p-6 xl:p-8 border border-border-light dark:border-border-dark hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full justify-between">
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-primary flex items-center justify-center">
          <span className="material-icons-round text-3xl">{icon}</span>
        </div>
        <span className="text-sm font-bold text-slate-300 dark:text-slate-600">{number}</span>
      </div>
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary transition-colors">{title}</h3>
      <div className="flex-grow">
        <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>
    </div>
    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/50 flex justify-between items-center">
      <span className="text-xs uppercase font-semibold text-primary tracking-wide">Checklist</span>
      <span className="material-icons-round text-primary/40 text-sm transform group-hover:translate-x-1 transition-transform">arrow_forward</span>
    </div>
  </article>
);

export default PrinciplesSection;