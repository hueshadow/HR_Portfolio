export type Source = {
  label: string
  url: string
}

export type BriefingItem = {
  title: string
  why: string
  sources?: Source[]
}

export type Briefing = {
  date: string
  title: string
  tldr: string
  example?: boolean
  intel: BriefingItem[]
  taste: BriefingItem[]
  interviews: BriefingItem[]
  todos: BriefingItem[]
  note?: string
}

export const SECTION_META = [
  { key: 'intel', label: '情报', en: 'Intel' },
  { key: 'taste', label: '口味板', en: 'Taste' },
  { key: 'interviews', label: '长访谈', en: 'Interviews' },
  { key: 'todos', label: '待办', en: 'Actions' },
] as const

export type SectionKey = (typeof SECTION_META)[number]['key']

export const briefings: Briefing[] = [
  {
    date: '2026-09-07',
    title: '没人准备好狂奔，Cloudflare 9/15 要分桶',
    tldr: 'OpenAI 首席科学家公开谈自愿减速；Cloudflare 9/15 AI 爬虫默认策略会误伤可见度；Anthropic IPO 再往后挪。',
    intel: [
      {
        title: 'OpenAI 首席科学家：没人准备好继续狂奔',
        why: 'Astra 刚推几天，Jakub Pachocki 在 An Alien Mind 写：对齐/监控还不够「最大速度缩放」；期待自愿减速，并把 Preparedness / RSP 做成可强制门槛。',
        sources: [
          { label: 'The Next Web', url: 'https://thenextweb.com/news/openai-slowdown-pachocki-alien-mind-research-intern-compute' },
          { label: 'Business Insider', url: 'https://www.businessinsider.com/openai-chief-scientist-ai-risks-slowdown-rogue-agents-consequences-safety-2026-9' },
        ],
      },
      {
        title: 'Cloudflare 9/15：AI 爬虫默认策略——别一刀切封 AI',
        why: '新站/相关默认拦 Training+Agent，Search 仍放行；混合爬虫按最严规则，可能误伤 ChatGPT/Claude/Google AI 发现路径。要分桶，不是全关。',
        sources: [
          { label: 'Cloudflare 官方', url: 'https://blog.cloudflare.com/content-independence-day-ai-options/' },
          { label: '开发者文档', url: 'https://developers.cloudflare.com/bots/additional-configurations/block-ai-bots/' },
        ],
      },
      {
        title: 'Anthropic IPO 时间表再往后挪',
        why: '招股书改到 late September，路演最早 mid-October，仍瞄着 11 月中期选举前；伴随约 $15B 循环信贷收尾。',
        sources: [
          { label: 'CNBC / Reuters', url: 'https://www.cnbc.com/2026/09/05/anthropic-ipo-launch-shifts-toward-mid-october-reuters.html' },
        ],
      },
    ],
    taste: [
      {
        title: 'Viktor Oddy · Astra one-shot Three.js NeuralKinetics',
        why: '电影感落地页 / Agent 可改 3D：整站一次生成，另有 Motionsites 600+ prompt 库。',
        sources: [{ label: 'X', url: 'https://x.com/ViktorOddy' }],
      },
      {
        title: 'Loki Yan：出海子域名 + 海量 AI 博客后流量并未崩',
        why: '有效个人经验，不是泛 SEO 教程；另盯 Bing AI Performance（企业 Edge 默认 Bing）。',
        sources: [{ label: 'X 帖', url: 'https://x.com/loki_yan_seo/status/2092448668712645088' }],
      },
    ],
    interviews: [],
    todos: [
      {
        title: 'Cloudflare dashboard 分桶：Search 放行，Training/Agent 另配',
        why: '9/15 默认策略生效前写清楚：完成标准是站点仍被 AI 搜索发现，而不是全站封死。',
      },
    ],
    note: '窗口：2026-09-04 08:48 上海之后。本篇无新的 45min+ 长访谈。',
  },
  {
    date: '2026-09-04',
    title: 'Astra 正式开推，开源 Hub 易主',
    tldr: 'GPT-6 Astra 分阶段 GA；NVIDIA 约 $12.93B 签下 Hugging Face；四家前沿同窗故障提醒多供应商备份。',
    intel: [
      {
        title: 'OpenAI GPT-6 Astra 正式分阶段 GA',
        why: 'Daybreak 起数日内进 Plus / Pro / Business / Enterprise；API 为 gpt-6-astra，$10 / $50 per MTok。宣称 computer use / 数学 / ARC 饱和，但是分阶段开，不是全量瞬间切换。',
        sources: [
          { label: 'OpenAI', url: 'https://openai.com/index/gpt-6-astra/' },
          { label: 'WIRED', url: 'https://www.wired.com/story/openai-says-gpt-6-can-use-a-computer-better-than-a-human/' },
        ],
      },
      {
        title: 'NVIDIA 约 $12.93B 收购 Hugging Face，协议已签',
        why: '开源 Hub 落入芯片巨头；官方承诺仍多云 / 多加速器、不强制 NVIDIA。预计 2027 H1 交割，须监管批准。',
        sources: [
          { label: 'NVIDIA 官方', url: 'https://blogs.nvidia.com/blog/nvidia-to-acquire-hugging-face/' },
          { label: 'TechCrunch', url: 'https://techcrunch.com/2026/09/03/nvidia-confirms-it-will-buy-hugging-face-for-12-9-billion/' },
        ],
      },
      {
        title: 'OpenAI / Anthropic / xAI 同窗大面积故障',
        why: '四家前沿几乎同窗掉线极罕见；行动项是多供应商 SLA / 备份路由。根因各方说法不一。',
        sources: [{ label: 'Ars Technica', url: 'https://arstechnica.com' }],
      },
    ],
    taste: [
      {
        title: 'Viktor Oddy × Fable 5.1 Motion Sites',
        why: 'one-shot 网页 + 生成站，对齐电影感 landing / Agent 可改动效这条线。',
        sources: [{ label: 'X', url: 'https://x.com/ViktorOddy' }],
      },
      {
        title: 'Alex Groberman：Google 更新后的行业 GEO 冲击',
        why: '金融 / 健康较稳，时尚美妆 / 法律 / 本地 / 部分 SaaS 更伤——本地与品牌被引用仍是硬问题。',
        sources: [{ label: 'X 帖', url: 'https://x.com/alexgroberman/status/2092248243568865453' }],
      },
      {
        title: 'Loki Yan：AI Overview 繁体与外链 / AIGC 风险管理',
        why: '英文环境出繁体；外链与 AIGC 当风险项管，而不是当流量彩蛋。',
        sources: [{ label: 'X 帖', url: 'https://x.com/loki_yan_seo' }],
      },
    ],
    interviews: [
      {
        title: '张小珺 × 曾鸣《产业史观》',
        why: '2:34；OAI / Anth「大概率不是原生时代大赢家」、公司制度消亡等非共识，值得整集听。',
        sources: [{ label: 'YouTube', url: 'https://www.youtube.com' }],
      },
      {
        title: 'a16z Training Data：Why AI Agents Could Finally Reinvent the Credit Card',
        why: '59 分钟；Max Levchin + Alex Rampell，从支付史谈到 agentic commerce。',
        sources: [{ label: 'YouTube', url: 'https://www.youtube.com' }],
      },
    ],
    todos: [
      {
        title: '核对多供应商 SLA / 备份路由',
        why: '同窗故障后，完成标准是至少两条可用模型通路，而不是只换一个默认模型名。',
      },
    ],
  },
]

export function shanghaiDateISO(d = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(d)
}

export function formatBriefingDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  const date = new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1))
  return new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).format(date)
}

export function getAllBriefings(): Briefing[] {
  return [...briefings].sort((a, b) => b.date.localeCompare(a.date))
}

export function getBriefing(date: string): Briefing | undefined {
  return getAllBriefings().find((b) => b.date === date)
}

export function getHomeBriefing(): { briefing: Briefing | undefined; isToday: boolean } {
  const all = getAllBriefings()
  const today = shanghaiDateISO()
  const todayBriefing = all.find((b) => b.date === today)
  if (todayBriefing) return { briefing: todayBriefing, isToday: true }
  return { briefing: all[0], isToday: false }
}
