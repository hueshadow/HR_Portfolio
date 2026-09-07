import { useNavigate } from 'react-router-dom'
import BriefingBody from './BriefingBody'
import { formatBriefingDate, getAllBriefings, getHomeBriefing } from '../data/briefings'

interface FlowPageProps {
  active: boolean
  loaded: boolean
  onPageChange: (pageId: string) => void
  onToggleSidebar?: () => void
}

const FlowPage = ({ loaded }: FlowPageProps) => {
  const navigate = useNavigate()
  const { briefing, isToday } = getHomeBriefing()
  const archive = getAllBriefings()

  return (
    <>
      <div className="page-header c12">
        <h1 data-value="晨流">晨流</h1>
        <p className="flow-kicker">工作日情报 · AI / 设计 / 世界模型 / 神经科学</p>
        <hr className={loaded ? 'enabled' : ''} />
      </div>

      {!briefing ? (
        <div className="row c12">
          <p>还没有晨报。</p>
        </div>
      ) : (
        <div className="row c12">
          <p className="flow-date">
            {isToday ? '今日晨报' : '最新一期'}
            <span> / </span>
            {formatBriefingDate(briefing.date)}
          </p>
          <h2 className="flow-title">{briefing.title}</h2>
          <BriefingBody briefing={briefing} />

          {archive.length > 1 ? (
            <div className="flow-archive">
              <h3>往期</h3>
              <ol>
                {archive.map((item) => (
                  <li key={item.date}>
                    <a
                      href={`/flow/${item.date}`}
                      onClick={(e) => {
                        e.preventDefault()
                        navigate(`/flow/${item.date}`)
                      }}
                    >
                      <span>{formatBriefingDate(item.date)}</span>
                      <strong>{item.title}</strong>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          ) : null}
        </div>
      )}
    </>
  )
}

export default FlowPage
