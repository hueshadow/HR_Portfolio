import { useNavigate, useParams } from 'react-router-dom'
import BriefingBody from './BriefingBody'
import { formatBriefingDate, getBriefing } from '../data/briefings'

interface FlowDetailPageProps {
  onPageChange: (pageId: string) => void
}

const FlowDetailPage = (_props: FlowDetailPageProps) => {
  const { date } = useParams<{ date: string }>()
  const navigate = useNavigate()
  const briefing = date ? getBriefing(date) : undefined

  const back = () => {
    navigate('/flow')
  }

  if (!briefing) {
    return (
      <div className="flow-detail-wrapper">
        <div className="page-header c12">
          <button type="button" className="back-button" onClick={back}>
            ← 返回晨流
          </button>
          <h1>未找到这一天</h1>
          <hr />
        </div>
      </div>
    )
  }

  return (
    <div className="flow-detail-wrapper">
      <div className="page-header c12">
        <div className="header-with-back">
          <button type="button" className="back-button" onClick={back}>
            ← 返回
          </button>
          <h1 data-value="晨流">晨流</h1>
        </div>
        <hr />
      </div>
      <article className="flow-detail-post">
        <p className="flow-date">{formatBriefingDate(briefing.date)}</p>
        <h2 className="flow-title">{briefing.title}</h2>
        <BriefingBody briefing={briefing} />
      </article>
    </div>
  )
}

export default FlowDetailPage
