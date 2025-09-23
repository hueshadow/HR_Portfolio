import Slider from './Slider'
import Tabs from './Tabs'
import SkillBar from './SkillBar'

interface AboutPageProps {
  active: boolean
  loaded: boolean
  onPageChange: (pageId: string) => void
}

const AboutPage = ({ active, loaded, onPageChange }: AboutPageProps) => {
  const tabItems = [
    {
      id: 'experience',
      label: 'Experience',
      content: (
        <div>
          <div className="row">
            <div className="c12">
              <h3>UX Designer</h3>
              <h5>2023-2025 • HUAWEI Cloud</h5>
              <p>负责费用中心 5.0 → 6.x 全链路改版，基于埋点与访谈确定关键指标（DAU、转化漏斗），落地 15 项体验优化；3 个月内易用性相关工单 ↓ 37%，付费转化率 ↑ 22%。与产品/研发共建设计规范 2.0，覆盖 25 个业务模块、200+ UI 资产，重复设计工时 ↓ 35%。推动"AI 账单助手"概念验证，在 Midjourney + LLM Prompt 迭代中输出 3 种用户画像的体验打法。</p>
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="c12">
              <h3>UX/Product Designer Leader</h3>
              <h5>2019-2024 • HUAWEI Analytics</h5>
              <p>主导全球 SDK 控制台信息架构重构，支持 21,071 款应用接入，海外日活 ↑ 28%。引入可视化漏斗分析模板，新手上手时间 30 → 10 分钟，满意度 MPS ↑ 0.6。</p>
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="c12">
              <h3>UX/Product Designer Leader</h3>
              <h5>2020-2022 • HUAWEI Business Connect</h5>
              <p>设计海外商家入驻流程（对标 Google My Business / Apple Business Connect），上线半年商家量达 594 万，后台自助入驻率 88%。</p>
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="c12">
              <h3>Graphic/UI Designer</h3>
              <h5>2014-2015 • Matchbox</h5>
              <p>During the operation period, the product was ranked in the top seven of the APP store's hot recommendations, recommended as the "Most Beautiful Application", and successfully completed the angel round of financing.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'education',
      label: 'Education',
      content: (
        <div>
          <div className="row">
            <div className="c12">
              <h3>Art Design</h3>
              <h5>2009-2013 • Ningbo University</h5>
              <p>Praesent congue diam eu accumsan sodales. In ligula dui, pretium gravida aliquet quis, iaculis a diam. Nulla ut posuere augue.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'skills',
      label: 'Skills',
      content: (
        <div>
          <div className="row">
            <div className="c6">
              <h4>Design Skills</h4>
              <SkillBar title="Axure" percentage={90} animated={loaded} />
              <SkillBar title="Figma/Pixso/Sketch" percentage={80} animated={loaded} />
              <SkillBar title="Adobe X" percentage={70} animated={loaded} />
              <SkillBar title="Html" percentage={50} animated={loaded} />
            </div>
            <div className="c6">
              <h4>Professional</h4>
              <p>-负责项目多个平台与设备上的全流程设计；通过设计思维梳理产品需求，帮助产品完善体验；可同时处理多项任务，明确完成标准，根据经验预测风险给出对应方案；灵活处理各类任务；</p>
              <p>具备体验敏感度，持续提出体验优化建议，主导设计理念和总体方案，并有效实施在项目中；梳理系统化理论，整理通用模板高效支持日常工作；</p>
            </div>
          </div>
        </div>
      )
    }
  ]

  const sliderItems = [
    {
      id: 1,
      content: (
        <div>
          <img src="/assets/img/slide1.jpg" alt="About slide 1" style={{ width: '100%' }} />
        </div>
      )
    },
    {
      id: 2,
      content: (
        <div>
          <img src="/assets/img/slide2.jpg" alt="About slide 2" style={{ width: '100%' }} />
        </div>
      )
    },
    {
      id: 3,
      content: (
        <div>
          <img src="/assets/img/slide3.jpg" alt="About slide 3" style={{ width: '100%' }} />
        </div>
      )
    }
  ]


  return (
    <>
        <div className="page-header c12">
          <h1 data-value="About Me">About Me</h1>
          <hr className={loaded ? 'enabled' : ''} />
        </div>

        <div className="row">
          <div className="c6">
            <h2>Ronn Huang</h2>
            <h5>Freelancer Extraordinaire</h5>
            <hr />
            <p>
              -精通专业领域的方法论，梳理系统化的理论以供支持日常工作；
            </p>
            <p>
              -可以提出创新性的专业建议，帮助业务达成目标；
            </p>
            <p>
              -有能力主导设计原则理念和总体方案，可以有效实施在项目中；
            </p>
            <p>
              -具有成熟的系统思维，与设计上下游高效合作；
            </p>
            <p>
              <a href="#" className="button">Download PDF <i className="fas fa-download"></i></a>
            </p>
          </div>
          <div className="c6">
            <Slider 
              items={sliderItems}
              className="about-slider about-slider-outer"
              showControls={true}
              showSlideNumber={true}
              autoPlay={true}
              interval={4000}
            />
          </div>
        </div>

        <div className="row">
          <div className="c12">
            <h2>Professional Experience & Skills</h2>
          </div>
        </div>

        <Tabs items={tabItems} active={active} />
    </>
  )
}

export default AboutPage
