import { useState, useRef, useEffect } from 'react'

interface DesignSystemShowcaseProps {
  isEmbedded?: boolean
}

const DesignSystemShowcase: React.FC<DesignSystemShowcaseProps> = ({ isEmbedded = true }) => {
  const [activeSection, setActiveSection] = useState<'components' | 'charts' | 'layout'>('components')
  const [timeRange, setTimeRange] = useState('Daily')
  const [volume, setVolume] = useState(75)
  const [calendarDate, setCalendarDate] = useState(4)
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [smsAlerts, setSmsAlerts] = useState(false)
  const [plan, setPlan] = useState('pro')
  const [formatting, setFormatting] = useState({ bold: false, italic: false, link: false, list: false })
  const [tags, setTags] = useState(['UI Design', 'React'])
  const [tagInput, setTagInput] = useState('')

  const toggleFormatting = (key: keyof typeof formatting) => {
    setFormatting(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      setTags([...tags, tagInput.trim()])
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = Math.min(100, Math.max(0, (x / rect.width) * 100))
    setVolume(Math.round(percentage))
  }

  const cardClass = "break-inside-avoid mb-6 w-full bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden"

  return (
    <div className="design-system-showcase">
      <style>{`
        .design-system-showcase {
          background: #fafafa;
          border-radius: 12px;
          padding: 30px;
          margin-top: 20px;
        }

        .design-system-showcase h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 24px;
          color: var(--px-theme-clr, #ff6b6b);
        }

        .ds-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 30px;
          border-bottom: 2px solid #eee;
          padding-bottom: 12px;
        }

        .ds-tab {
          padding: 10px 24px;
          border: none;
          background: transparent;
          color: #666;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          border-radius: 8px 8px 0 0;
          transition: all 0.3s ease;
        }

        .ds-tab:hover {
          color: var(--px-theme-clr, #ff6b6b);
          background: rgba(255, 107, 107, 0.05);
        }

        .ds-tab.active {
          color: var(--px-theme-clr, #ff6b6b);
          background: rgba(255, 107, 107, 0.1);
        }

        .masonry-grid {
          columns: 1;
          column-gap: 24px;
        }

        @media (min-width: 640px) {
          .masonry-grid {
            columns: 2;
          }
        }

        @media (min-width: 1280px) {
          .masonry-grid {
            columns: 3;
          }
        }

        @media (min-width: 1600px) {
          .masonry-grid {
            columns: 4;
          }
        }

        /* Component Cards */
        .component-card {
          break-inside: avoid;
          margin-bottom: 24px;
          background: white;
          border-radius: 14px;
          padding: 16px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }

        .component-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }

        /* Input styles */
        .ds-input {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 14px;
          background: #f9fafb;
          transition: all 0.3s ease;
        }

        .ds-input:focus {
          outline: none;
          border-color: var(--px-theme-clr, #ff6b6b);
          box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1);
        }

        .ds-btn {
          padding: 10px 24px;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .ds-btn-primary {
          background: var(--px-theme-clr, #ff6b6b);
          color: white;
        }

        .ds-btn-primary:hover {
          background: #ff5252;
        }

        .ds-btn-secondary {
          background: #f3f4f6;
          color: #374151;
        }

        .ds-btn-secondary:hover {
          background: #e5e7eb;
        }

        .ds-btn-outline {
          background: transparent;
          border: 2px dashed #d1d5db;
          color: #374151;
        }

        .ds-btn-outline:hover {
          border-color: var(--px-theme-clr, #ff6b6b);
          color: var(--px-theme-clr, #ff6b6b);
        }

        /* Tag Input */
        .tag-container {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding: 8px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background: #f9fafb;
        }

        .tag {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
        }

        .tag-blue {
          background: #eff6ff;
          color: #3b82f6;
          border: 1px solid #dbeafe;
        }

        .tag-purple {
          background: #faf5ff;
          color: #9333ea;
          border: 1px solid #f3e8ff;
        }

        .tag-remove {
          cursor: pointer;
          opacity: 0.7;
        }

        .tag-remove:hover {
          opacity: 1;
        }

        .tag-input {
          flex: 1;
          min-width: 60px;
          border: none;
          background: transparent;
          font-size: 14px;
          outline: none;
        }

        /* Toggle Switch */
        .toggle-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 0;
        }

        .toggle-label {
          font-size: 14px;
          color: #374151;
        }

        .toggle-switch {
          position: relative;
          width: 44px;
          height: 24px;
        }

        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .toggle-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #e5e7eb;
          transition: 0.3s;
          border-radius: 24px;
        }

        .toggle-slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: 0.3s;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .toggle-switch input:checked + .toggle-slider {
          background: var(--px-theme-clr, #ff6b6b);
        }

        .toggle-switch input:checked + .toggle-slider:before {
          transform: translateX(20px);
        }

        /* Progress Bar */
        .progress-container {
          width: 100%;
          height: 6px;
          background: #e5e7eb;
          border-radius: 3px;
          cursor: pointer;
          position: relative;
        }

        .progress-bar {
          height: 100%;
          background: var(--px-theme-clr, #ff6b6b);
          border-radius: 3px;
          transition: width 0.1s ease;
        }

        .progress-thumb {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 16px;
          height: 16px;
          background: white;
          border: 2px solid var(--px-theme-clr, #ff6b6b);
          border-radius: 50%;
          cursor: grab;
        }

        /* Calendar */
        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .calendar-nav {
          padding: 4px;
          background: transparent;
          border: none;
          cursor: pointer;
          border-radius: 50%;
          color: #9ca3af;
          transition: all 0.2s ease;
        }

        .calendar-nav:hover {
          background: #f3f4f6;
          color: #374151;
        }

        .calendar-month {
          font-size: 14px;
          font-weight: 600;
          color: #111827;
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
          text-align: center;
          font-size: 12px;
        }

        .calendar-day-header {
          color: #9ca3af;
          font-weight: 500;
          padding: 4px;
        }

        .calendar-day {
          padding: 6px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          color: #374151;
        }

        .calendar-day:hover {
          background: #f3f4f6;
        }

        .calendar-day.active {
          background: var(--px-theme-clr, #ff6b6b);
          color: white;
        }

        .calendar-day.other-month {
          color: #d1d5db;
        }

        /* Toggle Group */
        .toggle-group {
          display: inline-flex;
          background: #f3f4f6;
          padding: 4px;
          border-radius: 8px;
        }

        .toggle-group-btn {
          padding: 8px 16px;
          border: none;
          background: transparent;
          font-size: 14px;
          font-weight: 500;
          color: #6b7280;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.2s ease;
        }

        .toggle-group-btn.active {
          background: white;
          color: #111827;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        /* Notification Card */
        .notification-card {
          display: flex;
          gap: 12px;
          padding: 16px;
          background: white;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          position: relative;
        }

        .notification-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--px-theme-clr, #ff6b6b);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .notification-content h4 {
          font-size: 15px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 4px;
        }

        .notification-content p {
          font-size: 13px;
          color: #6b7280;
          line-height: 1.5;
        }

        .notification-actions {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          margin-top: 12px;
        }

        .notification-btn {
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .notification-btn-secondary {
          background: transparent;
          color: var(--px-theme-clr, #ff6b6b);
          border: 1px solid var(--px-theme-clr, #ff6b6b);
        }

        .notification-btn-secondary:hover {
          background: #fff1f2;
        }

        .notification-btn-primary {
          background: var(--px-theme-clr, #ff6b6b);
          color: white;
          border: none;
        }

        .notification-btn-primary:hover {
          background: #ff5252;
        }

        /* Table */
        .data-table {
          width: 100%;
          border-collapse: collapse;
        }

        .data-table th {
          padding: 12px 16px;
          text-align: left;
          font-size: 11px;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          background: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
        }

        .data-table td {
          padding: 12px 16px;
          font-size: 14px;
          color: #374151;
          border-bottom: 1px solid #e5e7eb;
        }

        .data-table tr:hover td {
          background: #f9fafb;
        }

        .status-badge {
          display: inline-flex;
          padding: 4px 10px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 500;
        }

        .status-active {
          background: #dcfce7;
          color: #166534;
        }

        .status-offline {
          background: #f3f4f6;
          color: #6b7280;
        }

        /* Search Input */
        .search-container {
          position: relative;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
        }

        .search-input {
          width: 100%;
          padding: 12px 12px 12px 44px;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          font-size: 14px;
          background: white;
        }

        .search-kbd {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          padding: 4px 8px;
          background: #f3f4f6;
          border: 1px solid #e5e7eb;
          border-radius: 4px;
          font-size: 11px;
          color: #9ca3af;
        }

        /* Storage Card */
        .storage-card {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .storage-ring {
          width: 48px;
          height: 48px;
          position: relative;
        }

        .storage-ring svg {
          transform: rotate(-90deg);
        }

        .storage-ring-bg {
          fill: none;
          stroke: #e5e7eb;
          stroke-width: 3;
        }

        .storage-ring-progress {
          fill: none;
          stroke: var(--px-theme-clr, #ff6b6b);
          stroke-width: 3;
          stroke-linecap: round;
          stroke-dasharray: 75 100;
        }

        .storage-ring-text {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 600;
          color: #111827;
        }

        /* Radio Group */
        .radio-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .radio-item {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .radio-item input {
          width: 14px;
          height: 14px;
          accent-color: var(--px-theme-clr, #ff6b6b);
        }

        .radio-item span {
          font-size: 13px;
          color: #374151;
        }

        /* Timeline */
        .timeline {
          position: relative;
          padding-left: 20px;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 7px;
          top: 8px;
          bottom: 8px;
          width: 2px;
          background: #e5e7eb;
        }

        .timeline-item {
          position: relative;
          padding-bottom: 16px;
        }

        .timeline-item::before {
          content: '';
          position: absolute;
          left: -20px;
          top: 4px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: white;
          border: 3px solid var(--px-theme-clr, #ff6b6b);
        }

        .timeline-item:last-child {
          padding-bottom: 0;
        }

        .timeline-item.success::before {
          border-color: #10b981;
        }

        .timeline-title {
          font-size: 12px;
          font-weight: 600;
          color: #111827;
        }

        .timeline-time {
          font-size: 10px;
          color: #9ca3af;
        }

        /* Steps */
        .steps-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .step {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 600;
        }

        .step-active {
          background: var(--px-theme-clr, #ff6b6b);
          color: white;
        }

        .step-inactive {
          background: #f3f4f6;
          color: #9ca3af;
          border: 1px solid #e5e7eb;
        }

        .step-line {
          flex: 1;
          height: 2px;
          margin: 0 4px;
        }

        .step-line-active {
          background: var(--px-theme-clr, #ff6b6b);
          opacity: 0.3;
        }

        .step-line-inactive {
          background: #e5e7eb;
        }

        /* Charts */
        .chart-card {
          break-inside: avoid;
          margin-bottom: 24px;
          background: white;
          border-radius: 14px;
          padding: 20px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .chart-card h3 {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 600;
          color: #111827;
          text-transform: uppercase;
          margin-bottom: 20px;
        }

        .chart-card h3 .material-icons {
          font-size: 18px;
          color: var(--px-theme-clr, #ff6b6b);
        }

        .chart-container {
          height: 200px;
        }

        .chart-container svg {
          width: 100%;
          height: 100%;
        }

        /* Bar Chart */
        .bar-chart {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          height: 100%;
          gap: 8px;
          padding: 10px 0;
        }

        .bar-group {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          height: 100%;
          gap: 4px;
        }

        .bar {
          width: 100%;
          border-radius: 4px 4px 0 0;
          transition: height 0.3s ease;
        }

        .bar-primary {
          background: var(--px-theme-clr, #ff6b6b);
        }

        .bar-secondary {
          background: #e5e7eb;
        }

        /* Line Chart SVG */
        .line-chart-svg {
          width: 100%;
          height: 100%;
        }

        /* Donut Chart */
        .donut-container {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .donut-chart {
          width: 140px;
          height: 140px;
          transform: rotate(-90deg);
        }

        .donut-center {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .donut-value {
          font-size: 28px;
          font-weight: 600;
          color: #111827;
        }

        .donut-label {
          font-size: 12px;
          color: #6b7280;
        }

        /* Mosaic Grid Layout */
        .mosaic-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          height: 200px;
        }

        .mosaic-item {
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 500;
          font-size: 12px;
        }

        .mosaic-large {
          grid-row: span 2;
        }

        .mosaic-wide {
          grid-column: span 2;
        }

        /* Dashboard Widget */
        .dashboard-widget {
          padding: 16px;
          border-radius: 12px;
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .dashboard-main {
          grid-row: span 2;
        }

        .dashboard-widget span {
          font-size: 12px;
          opacity: 0.9;
        }

        .dashboard-widget strong {
          font-size: 28px;
          font-weight: 600;
        }

        /* Form Validation */
        .validation-error input {
          border-color: #ef4444;
          background: #fef2f2;
        }

        .validation-error .error-msg {
          font-size: 10px;
          color: #ef4444;
          margin-top: 4px;
        }

        /* View Toggle */
        .view-toggle {
          display: flex;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
        }

        .view-toggle-btn {
          flex: 1;
          padding: 8px;
          border: none;
          background: transparent;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .view-toggle-btn.active {
          background: var(--px-theme-clr, #ff6b6b);
          color: white;
        }

        .view-toggle-btn:not(.active) {
          color: #6b7280;
        }

        /* Code Snippet */
        .code-snippet {
          background: #1f2937;
          color: #e5e7eb;
          font-family: monospace;
          font-size: 11px;
          padding: 12px;
          border-radius: 8px;
          position: relative;
        }

        .code-snippet code {
          display: block;
        }

        /* File List */
        .file-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .file-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .file-item:hover {
          background: #f9fafb;
        }

        .file-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: #eff6ff;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--px-theme-clr, #ff6b6b);
        }

        .file-info {
          flex: 1;
          min-width: 0;
        }

        .file-name {
          font-size: 12px;
          font-weight: 500;
          color: #111827;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .file-meta {
          font-size: 10px;
          color: #9ca3af;
        }

        /* System Alert */
        .system-alert {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px 16px;
          background: #eff6ff;
          border: 1px solid #dbeafe;
          border-radius: 12px;
        }

        .system-alert .material-icons {
          color: var(--px-theme-clr, #ff6b6b);
          font-size: 20px;
        }

        .system-alert h4 {
          font-size: 13px;
          font-weight: 600;
          color: #111827;
        }

        .system-alert p {
          font-size: 11px;
          color: #6b7280;
          margin-top: 2px;
        }

        /* Layout Settings */
        .layout-settings {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
        }

        .layout-settings-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          background: #f9fafb;
          cursor: pointer;
        }

        .layout-settings-header:hover {
          background: #f3f4f6;
        }

        .layout-settings-title {
          font-size: 13px;
          font-weight: 500;
          color: #111827;
        }

        .layout-settings-content {
          padding: 12px;
          font-size: 12px;
          color: #6b7280;
        }

        /* Kanban Card */
        .kanban-card {
          display: flex;
          gap: 8px;
          height: 100%;
          overflow: hidden;
        }

        .kanban-column {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .kanban-label {
          font-size: 10px;
          font-weight: 600;
          color: #9ca3af;
          text-transform: uppercase;
        }

        .kanban-item {
          padding: 8px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 10px;
          color: #374151;
        }

        .kanban-item.active {
          background: #eff6ff;
          border-color: #dbeafe;
          color: var(--px-theme-clr, #ff6b6b);
        }

        /* Status Chips */
        .status-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          align-items: center;
        }

        .status-chip {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 8px;
          background: #f3f4f6;
          border-radius: 4px;
          font-size: 11px;
          color: #374151;
          border: 1px solid #e5e7eb;
        }

        .status-chip .material-icons {
          font-size: 14px;
          cursor: pointer;
        }

        .status-chip .material-icons:hover {
          color: #ef4444;
        }

        /* Notification Toast */
        .notification-toast {
          background: rgba(255, 107, 107, 0.05);
          border: 1px solid rgba(255, 107, 107, 0.2);
          padding: 12px;
          border-radius: 8px;
        }

        .notification-toast-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .notification-toast-title {
          font-size: 12px;
          font-weight: 600;
          color: #111827;
        }

        .notification-toast-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--px-theme-clr, #ff6b6b);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .notification-toast-body {
          font-size: 11px;
          color: #6b7280;
          padding-bottom: 8px;
          border-bottom: 1px solid #e5e7eb;
        }

        /* Login Form */
        .login-form {
          padding: 24px;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
        }

        .login-form h3 {
          font-size: 14px;
          font-weight: 600;
          color: #111827;
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .login-input-group {
          margin-bottom: 12px;
          position: relative;
        }

        .login-input-group .material-icons {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          font-size: 18px;
        }

        .login-input {
          width: 100%;
          padding: 10px 12px 10px 40px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 14px;
          background: #f9fafb;
        }

        .login-btn {
          width: 100%;
          padding: 10px;
          background: var(--px-theme-clr, #ff6b6b);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .login-btn:hover {
          background: #ff5252;
        }

        /* Badge Group */
        .badge-group {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }

        .badge-primary {
          background: #eff6ff;
          color: #3b82f6;
        }

        .badge-success {
          background: #dcfce7;
          color: #16a34a;
        }

        .badge-warning {
          background: #fef3c7;
          color: #d97706;
        }

        .badge-error {
          background: #fee2e2;
          color: #dc2626;
        }

        @media (max-width: 768px) {
          .masonry-grid {
            columns: 1;
          }

          .component-card {
            margin-bottom: 16px;
          }
        }
      `}</style>

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wide mb-4">UI Kit</span>
        <h2>设计系统组件库</h2>
        <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
          精心打造的原子化组件集合，支持深色模式、响应式布局和无障碍访问，助力快速构建现代化的数据密集型应用界面。
        </p>
      </div>

      {/* Tabs */}
      <div className="ds-tabs">
        <button
          className={`ds-tab ${activeSection === 'components' ? 'active' : ''}`}
          onClick={() => setActiveSection('components')}
        >
          Components
        </button>
        <button
          className={`ds-tab ${activeSection === 'charts' ? 'active' : ''}`}
          onClick={() => setActiveSection('charts')}
        >
          Data Visualization
        </button>
        <button
          className={`ds-tab ${activeSection === 'layout' ? 'active' : ''}`}
          onClick={() => setActiveSection('layout')}
        >
          Layout System
        </button>
      </div>

      {activeSection === 'components' && (
        <div className="masonry-grid">
          {/* Formatting Toolbar */}
          <div className={`${cardClass} transform transition-all hover:scale-[1.02] hover:shadow-md`}>
            <div style={{display: 'flex', alignItems: 'center', gap: '4px', padding: '8px', borderBottom: '1px solid #e5e7eb', background: '#f9fafb'}}>
              {['bold', 'italic', 'link', 'list'].map((tool) => (
                <button
                  key={tool}
                  onClick={() => toggleFormatting(tool as any)}
                  style={{
                    padding: '6px',
                    borderRadius: '4px',
                    transition: 'all 0.2s ease',
                    background: formatting[tool as keyof typeof formatting] ? '#e5e7eb' : 'transparent',
                    color: formatting[tool as keyof typeof formatting] ? '#111827' : '#9ca3af',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <span className="material-icons-round" style={{fontSize: '18px'}}>
                    {tool === 'list' ? 'format_list_bulleted' : tool === 'bold' ? 'format_bold' : tool === 'italic' ? 'format_italic' : 'link'}
                  </span>
                </button>
              ))}
            </div>
            <div style={{padding: '16px'}}>
              <div style={{
                fontSize: '14px',
                color: '#6b7280',
                lineHeight: '1.6',
                fontWeight: formatting.bold ? '600' : '400',
                fontStyle: formatting.italic ? 'italic' : 'normal'
              }}>
                <span style={{fontWeight: '600', color: '#111827'}}>v2.0 Released</span><br/>
                New components available in the dashboard...
              </div>
            </div>
          </div>

          {/* Standard Input */}
          <div className="component-card">
            <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px'}}>
              <span style={{fontSize: '14px', fontWeight: '500', color: '#374151'}}>Input Label</span>
              <span className="material-icons-round" style={{fontSize: '16px', color: '#9ca3af', cursor: 'pointer'}}>help_outline</span>
            </div>
            <input
              className="ds-input"
              placeholder="Type something..."
              type="text"
            />
          </div>

          {/* Tag Input */}
          <div className="component-card">
            <label style={{display: 'block', fontSize: '12px', fontWeight: '600', color: '#6b7280', marginBottom: '8px', textTransform: 'uppercase'}}>Tag Input</label>
            <div className="tag-container">
              {tags.map((tag, idx) => (
                <span key={idx} className={`tag ${idx % 2 === 0 ? 'tag-blue' : 'tag-purple'}`}>
                  {tag}
                  <span className="tag-remove material-icons-round" style={{fontSize: '14px'}} onClick={() => removeTag(tag)}>close</span>
                </span>
              ))}
              <input
                className="tag-input"
                placeholder="Add tag..."
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
              />
            </div>
          </div>

          {/* Button Group */}
          <div className="component-card">
            <div style={{display: 'inline-flex', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
              {['First', 'Second', 'Third'].map((label, index) => (
                <button
                  key={index}
                  style={{
                    padding: '10px 20px',
                    border: '1px solid #e5e7eb',
                    borderLeft: index > 0 ? 'none' : '1px solid #e5e7eb',
                    background: index === 0 ? 'var(--px-theme-clr, #ff6b6b)' : 'white',
                    color: index === 0 ? 'white' : '#374151',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Toggle Group */}
          <div className="component-card">
            <div className="toggle-group">
              {['Daily', 'Weekly', 'Monthly'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`toggle-group-btn ${timeRange === range ? 'active' : ''}`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* Settings Card */}
          <div className={`${cardClass} p-5 space-y-4`}>
            <div className="toggle-container">
              <span className="toggle-label">Email Alerts</span>
              <label className="toggle-switch">
                <input type="checkbox" checked={emailAlerts} onChange={() => setEmailAlerts(!emailAlerts)} />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="toggle-container">
              <span className="toggle-label">SMS Alerts</span>
              <label className="toggle-switch">
                <input type="checkbox" checked={smsAlerts} onChange={() => setSmsAlerts(!smsAlerts)} />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div style={{borderTop: '1px solid #e5e7eb', paddingTop: '12px', marginTop: '4px'}}>
              <label className="radio-item">
                <input type="radio" name="plan" checked={plan === 'pro'} onChange={() => setPlan('pro')} />
                <span>Pro Plan</span>
              </label>
              <label className="radio-item" style={{marginTop: '8px'}}>
                <input type="radio" name="plan" checked={plan === 'enterprise'} onChange={() => setPlan('enterprise')} />
                <span>Enterprise</span>
              </label>
            </div>
          </div>

          {/* Progress Bars & Volume */}
          <div className="component-card">
            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6b7280', marginBottom: '8px'}}>
              <span>Volume</span>
              <span>{volume}%</span>
            </div>
            <div className="progress-container" onClick={handleVolumeClick}>
              <div className="progress-bar" style={{width: `${volume}%`}}></div>
              <div className="progress-thumb" style={{left: `${volume}%`}}></div>
            </div>
          </div>

          {/* Login Form */}
          <div className={`${cardClass} space-y-4 login-form`}>
            <h3>Authentication</h3>
            <div className="login-input-group">
              <span className="material-icons-round">person_outline</span>
              <input className="login-input" placeholder="Username" type="text"/>
            </div>
            <div className="login-input-group">
              <input className="login-input" placeholder="Password" type="password" style={{paddingLeft: '12px'}}/>
            </div>
            <button className="login-btn">Log in</button>
          </div>

          {/* Calendar */}
          <div className={`${cardClass} p-4`}>
            <div className="calendar-header">
              <button className="calendar-nav"><span className="material-icons-round" style={{fontSize: '18px'}}>chevron_left</span></button>
              <span className="calendar-month">October 2023</span>
              <button className="calendar-nav"><span className="material-icons-round" style={{fontSize: '18px'}}>chevron_right</span></button>
            </div>
            <div className="calendar-grid">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                <span key={day} className="calendar-day-header">{day}</span>
              ))}
              {[29, 30].map(d => (
                <span key={`prev-${d}`} className="calendar-day other-month">{d}</span>
              ))}
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].slice(0, 12).map(d => (
                <button
                  key={d}
                  onClick={() => setCalendarDate(d)}
                  className={`calendar-day ${calendarDate === d ? 'active' : ''}`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Notification Card */}
          <div className={`${cardClass} notification-card`}>
            <div className="notification-icon">
              <span className="material-icons-round" style={{fontSize: '18px'}}>info</span>
            </div>
            <div className="notification-content">
              <h4>Notification title</h4>
              <p>Interactively monetize corporate alignments and fully tested niche markets.</p>
              <div className="notification-actions">
                <button className="notification-btn notification-btn-secondary">Dismiss</button>
                <button className="notification-btn notification-btn-primary">Review</button>
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className={`${cardClass} overflow-hidden`}>
            <div style={{padding: '12px 16px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f9fafb'}}>
              <h3 style={{fontSize: '14px', fontWeight: '600', color: '#111827'}}>Recent Users</h3>
              <span style={{fontSize: '12px', color: 'var(--px-theme-clr)', cursor: 'pointer'}}>View All</span>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Sophie M.</td>
                  <td><span className="status-badge status-active">Active</span></td>
                </tr>
                <tr>
                  <td>James L.</td>
                  <td><span className="status-badge status-offline">Offline</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Search Input */}
          <div className="component-card">
            <label style={{display: 'block', fontSize: '12px', fontWeight: '600', color: '#6b7280', marginBottom: '8px', textTransform: 'uppercase'}}>Input Field</label>
            <div className="search-container">
              <span className="material-icons-round search-icon" style={{fontSize: '18px'}}>search</span>
              <input className="search-input" placeholder="Search data..." type="text"/>
              <kbd className="search-kbd">⌘K</kbd>
            </div>
          </div>

          {/* Storage */}
          <div className="component-card">
            <div className="storage-card">
              <div className="storage-ring">
                <svg viewBox="0 0 36 36" style={{width: '48px', height: '48px'}}>
                  <path className="storage-ring-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3"></path>
                  <path className="storage-ring-progress" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3"></path>
                </svg>
                <div className="storage-ring-text">75%</div>
              </div>
              <div>
                <span style={{fontSize: '14px', fontWeight: '600', color: '#111827'}}>Storage Capacity</span>
                <p style={{fontSize: '10px', color: '#9ca3af'}}>15GB used of 20GB</p>
              </div>
            </div>
          </div>

          {/* System Alert */}
          <div className="system-alert">
            <span className="material-icons-round">info</span>
            <div>
              <h4>System Update</h4>
              <p>Scheduled maintenance in 2 hours.</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="component-card">
            <div className="timeline">
              <div className="timeline-item">
                <p className="timeline-title">Project Launched</p>
                <p className="timeline-time">10:45 AM</p>
              </div>
              <div className="timeline-item success">
                <p className="timeline-title">CI/CD Passed</p>
                <p className="timeline-time">09:12 AM</p>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="component-card">
            <div className="steps-container">
              <div className="step step-active">1</div>
              <div className="step-line step-line-active"></div>
              <div className="step step-active">2</div>
              <div className="step-line step-line-inactive"></div>
              <div className="step step-inactive">3</div>
            </div>
          </div>

          {/* Code Snippet */}
          <div className="code-snippet">
            <code>npm install @kit/ui</code><br/>
            <code>import &#123; Button &#125;...</code>
          </div>

          {/* File List */}
          <div className="component-card">
            <div className="file-list">
              <div className="file-item">
                <div className="file-icon">
                  <span className="material-icons-round" style={{fontSize: '18px'}}>description</span>
                </div>
                <div className="file-info">
                  <p className="file-name">Quarterly_Report.pdf</p>
                  <p className="file-meta">Updated 2h ago</p>
                </div>
              </div>
              <div className="file-item">
                <div className="file-icon">
                  <span className="material-icons-round" style={{fontSize: '18px'}}>folder</span>
                </div>
                <div className="file-info">
                  <p className="file-name">Design Assets</p>
                  <p className="file-meta">124 items</p>
                </div>
              </div>
            </div>
          </div>

          {/* View Toggle */}
          <div className="component-card">
            <div className="view-toggle">
              <button className="view-toggle-btn active">List</button>
              <button className="view-toggle-btn">Grid</button>
            </div>
          </div>

          {/* Radio Group */}
          <div className="component-card">
            <div className="radio-group">
              <label className="radio-item">
                <input type="radio" name="demo" defaultChecked />
                <span>Standard Delivery</span>
              </label>
              <label className="radio-item" style={{marginTop: '8px'}}>
                <input type="radio" name="demo" />
                <span>Express</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'charts' && (
        <div className="masonry-grid">
          {/* Line Chart */}
          <div className="chart-card">
            <h3><span className="material-icons-round">trending_up</span>User Growth Trend</h3>
            <div className="chart-container">
              <svg className="line-chart-svg" viewBox="0 0 400 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255, 107, 107, 0.3)" />
                    <stop offset="100%" stopColor="rgba(255, 107, 107, 0)" />
                  </linearGradient>
                </defs>
                <path d="M0,150 Q100,120 150,100 T250,80 T400,40" fill="url(#lineGradient)" stroke="none" />
                <path d="M0,150 Q100,120 150,100 T250,80 T400,40" fill="none" stroke="var(--px-theme-clr, #ff6b6b)" strokeWidth="3" />
                <circle cx="0" cy="150" r="5" fill="var(--px-theme-clr, #ff6b6b)" />
                <circle cx="150" cy="100" r="5" fill="var(--px-theme-clr, #ff6b6b)" />
                <circle cx="250" cy="80" r="5" fill="var(--px-theme-clr, #ff6b6b)" />
                <circle cx="400" cy="40" r="5" fill="var(--px-theme-clr, #ff6b6b)" />
              </svg>
            </div>
          </div>

          {/* Area Chart */}
          <div className="chart-card">
            <h3><span className="material-icons-round">payments</span>Revenue Stream</h3>
            <div className="chart-container">
              <svg className="line-chart-svg" viewBox="0 0 400 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="areaGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(139, 92, 246, 0.3)" />
                    <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
                  </linearGradient>
                </defs>
                <path d="M0,180 L50,140 L100,160 L150,100 L200,120 L250,80 L300,60 L350,100 L400,40 L400,200 L0,200 Z" fill="url(#areaGradient2)" />
                <path d="M0,180 L50,140 L100,160 L150,100 L200,120 L250,80 L300,60 L350,100 L400,40" fill="none" stroke="#8b5cf6" strokeWidth="2" />
              </svg>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="chart-card">
            <h3><span className="material-icons-round">bar_chart</span>Traffic Sources</h3>
            <div className="chart-container">
              <div className="bar-chart">
                <div className="bar-group">
                  <div className="bar bar-primary" style={{height: '40%'}}></div>
                  <div className="bar bar-secondary" style={{height: '60%'}}></div>
                </div>
                <div className="bar-group">
                  <div className="bar bar-primary" style={{height: '60%'}}></div>
                  <div className="bar bar-secondary" style={{height: '30%'}}></div>
                </div>
                <div className="bar-group">
                  <div className="bar bar-primary" style={{height: '90%'}}></div>
                  <div className="bar bar-secondary" style={{height: '50%'}}></div>
                </div>
                <div className="bar-group">
                  <div className="bar bar-primary" style={{height: '50%'}}></div>
                  <div className="bar bar-secondary" style={{height: '75%'}}></div>
                </div>
                <div className="bar-group">
                  <div className="bar bar-primary" style={{height: '75%'}}></div>
                  <div className="bar bar-secondary" style={{height: '45%'}}></div>
                </div>
                <div className="bar-group">
                  <div className="bar bar-primary" style={{height: '30%'}}></div>
                  <div className="bar bar-secondary" style={{height: '85%'}}></div>
                </div>
                <div className="bar-group">
                  <div className="bar bar-primary" style={{height: '85%'}}></div>
                  <div className="bar bar-secondary" style={{height: '55%'}}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Donut Chart */}
          <div className="chart-card">
            <h3><span className="material-icons-round">pie_chart</span>Device Usage</h3>
            <div className="chart-container" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <div className="donut-container">
                <svg className="donut-chart" viewBox="0 0 36 36">
                  <path className="text-gray-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4"></path>
                  <path className="text-primary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="60, 100" strokeWidth="4"></path>
                  <path className="text-purple-500" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="25, 100" strokeDashoffset="-60" strokeWidth="4"></path>
                </svg>
                <div className="donut-center">
                  <span className="donut-value">85%</span>
                </div>
              </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '8px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                <div style={{width: '8px', height: '8px', borderRadius: '50%', background: 'var(--px-theme-clr, #ff6b6b)'}}></div>
                <span style={{fontSize: '12px', color: '#6b7280'}}>Desktop</span>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                <div style={{width: '8px', height: '8px', borderRadius: '50%', background: '#8b5cf6'}}></div>
                <span style={{fontSize: '12px', color: '#6b7280'}}>Mobile</span>
              </div>
            </div>
          </div>

          {/* Radar Chart */}
          <div className="chart-card">
            <h3><span className="material-icons-round">radar</span>Performance Metrics</h3>
            <div className="chart-container">
              <svg viewBox="0 0 200 200" style={{width: '100%', height: '100%'}}>
                <polygon points="100,20 170,60 150,140 50,140 30,60" fill="rgba(255, 107, 107, 0.1)" stroke="var(--px-theme-clr, #ff6b6b)" strokeWidth="2" />
                <polygon points="100,50 150,70 135,130 65,130 50,70" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2" />
              </svg>
            </div>
          </div>

          {/* Weekly Volume */}
          <div className="chart-card">
            <h3><span className="material-icons-round">bar_chart</span>Weekly Volume</h3>
            <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '120px', gap: '4px'}}>
              <div style={{flex: 1, background: 'rgba(255, 107, 107, 0.2)', borderRadius: '4px 4px 0 0', height: '40%'}}></div>
              <div style={{flex: 1, background: 'rgba(255, 107, 107, 0.4)', borderRadius: '4px 4px 0 0', height: '60%'}}></div>
              <div style={{flex: 1, background: 'var(--px-theme-clr, #ff6b6b)', borderRadius: '4px 4px 0 0', height: '90%'}}></div>
              <div style={{flex: 1, background: 'rgba(255, 107, 107, 0.6)', borderRadius: '4px 4px 0 0', height: '50%'}}></div>
              <div style={{flex: 1, background: 'rgba(255, 107, 107, 0.3)', borderRadius: '4px 4px 0 0', height: '75%'}}></div>
              <div style={{flex: 1, background: 'rgba(255, 107, 107, 0.5)', borderRadius: '4px 4px 0 0', height: '30%'}}></div>
              <div style={{flex: 1, background: 'rgba(255, 107, 107, 0.8)', borderRadius: '4px 4px 0 0', height: '85%'}}></div>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '10px', color: '#9ca3af', fontWeight: '600', textTransform: 'uppercase'}}>
              <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'layout' && (
        <div className="masonry-grid">
          {/* Mosaic Grid */}
          <div className="chart-card">
            <h3><span className="material-icons-round">grid_view</span>Mosaic Grid</h3>
            <div className="mosaic-grid">
              <div className="mosaic-item mosaic-large" style={{background: 'linear-gradient(135deg, var(--px-theme-clr, #ff6b6b), #ff8a8a)'}}>Large</div>
              <div className="mosaic-item" style={{background: 'linear-gradient(135deg, #8b5cf6, #a78bfa)'}}>Small</div>
              <div className="mosaic-item" style={{background: 'linear-gradient(135deg, #10b981, #34d399)'}}>Small</div>
              <div className="mosaic-item mosaic-wide" style={{background: 'linear-gradient(135deg, #3b82f6, #60a5fa)'}}>Wide</div>
            </div>
          </div>

          {/* Floating Dashboard */}
          <div className="chart-card">
            <h3><span className="material-icons-round">dashboard</span>Floating Dashboard</h3>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', height: '200px'}}>
              <div className="dashboard-widget dashboard-main" style={{background: 'linear-gradient(135deg, var(--px-theme-clr, #ff6b6b), #ff8a8a)'}}>
                <span>Main Metric</span>
                <strong>1,234</strong>
              </div>
              <div className="dashboard-widget" style={{background: 'linear-gradient(135deg, #8b5cf6, #a78bfa)'}}>
                <span>Metric 2</span>
                <strong>567</strong>
              </div>
              <div className="dashboard-widget" style={{background: 'linear-gradient(135deg, #10b981, #34d399)'}}>
                <span>Metric 3</span>
                <strong>890</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export { DesignSystemShowcase }
export default DesignSystemShowcase
