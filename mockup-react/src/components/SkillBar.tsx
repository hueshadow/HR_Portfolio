interface SkillBarProps {
  title: string
  percentage: number
  animated?: boolean
}

const SkillBar = ({ title, percentage, animated = false }: SkillBarProps) => {
  return (
    <div className="skill-bar-wrapper">
      <div className="skill-title">
        {title} <span>{percentage}%</span>
      </div>
      <div 
        className={`skill-bar ${animated ? 'enabled' : ''}`}
        style={{ width: animated ? `${percentage}%` : '0%' }}
      >
        <span></span>
      </div>
    </div>
  )
}

export default SkillBar
