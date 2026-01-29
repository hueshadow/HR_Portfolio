import Slider from './Slider'
import Tabs from './Tabs'
import SkillBar from './SkillBar'

interface AboutPageProps {
  active: boolean
  loaded: boolean
  onPageChange: (pageId: string) => void
}

const AboutPage = ({ active, loaded }: AboutPageProps) => {
  const tabItems = [
    {
      id: 'experience',
      label: '工作经历',
      content: (
        <div>
          <div className="row">
            <div className="c12">
              <h3>用户体验设计师</h3>
              <h5>2023-2025 • 华为云</h5>
              <p>负责费用中心 5.0 → 6.x 全链路改版，基于埋点与访谈确定关键指标（DAU、转化漏斗），落地 15 项体验优化；3 个月内易用性相关工单 ↓ 37%，付费转化率 ↑ 22%。与产品/研发共建设计规范 2.0，覆盖 25 个业务模块、200+ UI 资产，重复设计工时 ↓ 35%。推动"AI 账单助手"概念验证，在 Midjourney + LLM Prompt 迭代中输出 3 种用户画像的体验打法。</p>
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="c12">
              <h3>用户体验/产品设计负责人</h3>
              <h5>2019-2024 • 华为分析</h5>
              <p>主导全球 SDK 控制台信息架构重构，支持 21,071 款应用接入，海外日活 ↑ 28%。引入可视化漏斗分析模板，新手上手时间 30 → 10 分钟，满意度 MPS ↑ 0.6。</p>
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="c12">
              <h3>用户体验/产品设计负责人</h3>
              <h5>2020-2022 • 华为商业连接</h5>
              <p>设计海外商家入驻流程（对标 Google My Business / Apple Business Connect），上线半年商家量达 594 万，后台自助入驻率 88%。</p>
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="c12">
              <h3>平面/UI 设计师</h3>
              <h5>2014-2015 • 火柴盒</h5>
              <p>运营期间产品位列 APP Store 热门推荐前七，被评为"最美应用"，并成功完成天使轮融资。</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'education',
      label: '教育背景',
      content: (
        <div>
          <div className="row">
            <div className="c12">
              <h3>艺术设计</h3>
              <h5>2009-2013 • 宁波大学</h5>
              <p>主修艺术设计专业，系统学习视觉传达、用户界面设计等核心课程，培养了扎实的设计理论基础和实践能力。</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'skills',
      label: '专业技能',
      content: (
        <div>
          <div className="row">
            <div className="c6">
              <h4>设计技能</h4>
              <SkillBar title="Axure" percentage={90} animated={loaded} />
              <SkillBar title="Figma/Pixso/Sketch" percentage={80} animated={loaded} />
              <SkillBar title="Adobe X" percentage={70} animated={loaded} />
              <SkillBar title="Html" percentage={50} animated={loaded} />
            </div>
            <div className="c6">
              <h4>专业能力</h4>
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
        <div style={{ height: '500px' }}>
          <video
            src="https://photosave.net/2025/09/39e9be97da2f52a29a639b2d83aed0d9.mp4"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            muted
            loop
            autoPlay
            playsInline
            title="About slide 1"
          />
        </div>
      )
    }
  ]


  return (
    <>
        <div className="page-header c12">
          <h1 data-value="关于我">关于我</h1>
          <hr className={loaded ? 'enabled' : ''} />
        </div>

        <div className="row">
          <div className="c6">
            <h2>黄蓉</h2>
            <h5>资深用户体验设计师</h5>
            <hr />
            <p>
              精通专业方法论，能够梳理并构建系统化理论，为日常工作提供坚实支持；
            </p>
            <p>
              善于提出创新且可落地的专业建议，助力业务目标达成；
            </p>
            <p>
              具备主导设计原则与总体方案的能力，推动项目高效落地；
            </p>
            <p>
              拥有成熟的系统思维，能与设计上下游高效协同。
            </p>
            <p>
              <a href="https://photosave.net/2025/09/9a9d7bd463f26787c8a97e61e2ccec88.zip" className="button" target="_blank" rel="noopener noreferrer" download="黄蓉_个人简历.pdf.zip">下载简历 <i className="fas fa-download"></i></a>
            </p>
          </div>
          <div className="c6">
            <Slider
              items={sliderItems}
              className="about-slider about-slider-outer"
              showControls={false}
              showSlideNumber={false}
              autoPlay={false}
            />
          </div>
        </div>

        <div className="row">
          <div className="c12">
            <h2>工作经历与专业技能</h2>
          </div>
        </div>

        <Tabs items={tabItems} active={active} />
    </>
  )
}

export default AboutPage
