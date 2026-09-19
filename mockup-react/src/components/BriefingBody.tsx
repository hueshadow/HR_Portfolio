import type { Briefing, BriefingItem, SectionKey } from '../data/briefings'
import { SECTION_META } from '../data/briefings'
import { resolveCover } from '../data/resolveCover'

function Item({
  date,
  section,
  item,
  index,
  action,
}: {
  date: string
  section: SectionKey
  item: BriefingItem
  index: number
  action?: boolean
}) {
  const primary = item.sources?.[0]
  const image = resolveCover(date, item, section)
  const thumb = image ? (
    primary ? (
      <a href={primary.url} target="_blank" rel="noreferrer" className="flow-thumb">
        <img src={image} alt="" />
      </a>
    ) : (
      <span className="flow-thumb">
        <img src={image} alt="" />
      </span>
    )
  ) : null

  return (
    <article className={`flow-item${image ? ' has-thumb' : ''}`}>
      <span className="flow-index">{action ? '□' : String(index).padStart(2, '0')}</span>
      {thumb}
      <div className="flow-item-body">
        {primary ? (
          <a href={primary.url} target="_blank" rel="noreferrer" className="flow-item-title">
            {item.title}
          </a>
        ) : (
          <h4 className="flow-item-title">{item.title}</h4>
        )}
        {item.why ? <p className="flow-why">{item.why}</p> : null}
        {item.sources?.length ? (
          <ul className="flow-sources">
            {item.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  )
}

export default function BriefingBody({ briefing }: { briefing: Briefing }) {
  return (
    <div className="flow-briefing">
      <p className="flow-tldr">{briefing.tldr}</p>

      {SECTION_META.map((section) => {
        const items = briefing[section.key as SectionKey]
        if (!items.length) return null
        return (
          <section key={section.key} className="flow-section">
            <div className="flow-section-head">
              <h3>{section.label}</h3>
              <span>{section.en}</span>
            </div>
            {items.map((item, i) => (
              <Item
                key={`${section.key}-${item.title}`}
                date={briefing.date}
                section={section.key as SectionKey}
                item={item}
                index={i + 1}
                action={section.key === 'todos'}
              />
            ))}
          </section>
        )
      })}

      {briefing.note ? <p className="flow-note">{briefing.note}</p> : null}
    </div>
  )
}
