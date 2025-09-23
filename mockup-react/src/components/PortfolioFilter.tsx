import { useState } from 'react'

interface FilterItem {
  id: string
  label: string
  target: string
}

interface PortfolioFilterProps {
  items: FilterItem[]
  onFilterChange: (filter: string) => void
}

const PortfolioFilter = ({ items, onFilterChange }: PortfolioFilterProps) => {
  const [selectedFilter, setSelectedFilter] = useState('*')

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter)
    onFilterChange(filter)
  }

  return (
    <ul className="portfolio-filter">
      {items.map(item => (
        <li
          key={item.id}
          data-target={item.target}
          className={selectedFilter === item.target ? 'selected' : ''}
          onClick={() => handleFilterClick(item.target)}
        >
          {item.label}
        </li>
      ))}
    </ul>
  )
}

export default PortfolioFilter
