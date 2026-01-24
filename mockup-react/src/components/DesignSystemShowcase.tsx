import { useState, useEffect, useRef } from 'react'

interface ComponentShowcase {
  name: string
  category: string
  preview: React.ReactNode
  code: string
}

const DesignSystemShowcase = () => {
  const [activeTab, setActiveTab] = useState<'components' | 'charts' | 'layout'>('components')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Form Components Showcase
  const FormComponents = () => (
    <div className="component-grid">
      <div className="component-card">
        <h4>Text Input</h4>
        <div className="component-preview">
          <input type="text" placeholder="Enter text..." className="px-input" />
        </div>
      </div>
      <div className="component-card">
        <h4>Password Input</h4>
        <div className="component-preview">
          <input type="password" placeholder="Enter password..." className="px-input" />
        </div>
      </div>
      <div className="component-card">
        <h4>Textarea</h4>
        <div className="component-preview">
          <textarea placeholder="Enter message..." className="px-textarea" rows={3}></textarea>
        </div>
      </div>
      <div className="component-card">
        <h4>Select</h4>
        <div className="component-preview">
          <select className="px-select">
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>
        </div>
      </div>
      <div className="component-card">
        <h4>Checkbox</h4>
        <div className="component-preview">
          <label className="px-checkbox">
            <input type="checkbox" />
            <span className="checkmark"></span>
            Option 1
          </label>
        </div>
      </div>
      <div className="component-card">
        <h4>Radio</h4>
        <div className="component-preview">
          <label className="px-radio">
            <input type="radio" name="radio-demo" />
            <span className="radio-mark"></span>
            Option 1
          </label>
        </div>
      </div>
      <div className="component-card">
        <h4>Switch</h4>
        <div className="component-preview">
          <label className="px-switch">
            <input type="checkbox" />
            <span className="slider"></span>
          </label>
        </div>
      </div>
      <div className="component-card">
        <h4>Button Primary</h4>
        <div className="component-preview">
          <button className="px-btn px-btn-primary">Primary</button>
        </div>
      </div>
      <div className="component-card">
        <h4>Button Secondary</h4>
        <div className="component-preview">
          <button className="px-btn px-btn-secondary">Secondary</button>
        </div>
      </div>
      <div className="component-card">
        <h4>Button Outline</h4>
        <div className="component-preview">
          <button className="px-btn px-btn-outline">Outline</button>
        </div>
      </div>
    </div>
  )

  // Navigation Components Showcase
  const NavigationComponents = () => (
    <div className="component-grid">
      <div className="component-card">
        <h4>Tabs</h4>
        <div className="component-preview">
          <div className="px-tabs">
            <button className="px-tab active">Tab 1</button>
            <button className="px-tab">Tab 2</button>
            <button className="px-tab">Tab 3</button>
          </div>
        </div>
      </div>
      <div className="component-card">
        <h4>Breadcrumb</h4>
        <div className="component-preview">
          <nav className="px-breadcrumb">
            <a href="#">Home</a>
            <span>/</span>
            <a href="#">Category</a>
            <span>/</span>
            <span>Current</span>
          </nav>
        </div>
      </div>
      <div className="component-card">
        <h4>Pagination</h4>
        <div className="component-preview">
          <div className="px-pagination">
            <button className="px-page-btn">&lt;</button>
            <button className="px-page-btn active">1</button>
            <button className="px-page-btn">2</button>
            <button className="px-page-btn">3</button>
            <button className="px-page-btn">&gt;</button>
          </div>
        </div>
      </div>
      <div className="component-card">
        <h4>Steps</h4>
        <div className="component-preview">
          <div className="px-steps">
            <div className="px-step completed">1</div>
            <div className="px-step completed">2</div>
            <div className="px-step active">3</div>
            <div className="px-step">4</div>
          </div>
        </div>
      </div>
    </div>
  )

  // Data Display Components Showcase
  const DataDisplayComponents = () => (
    <div className="component-grid">
      <div className="component-card">
        <h4>Avatar</h4>
        <div className="component-preview">
          <div className="px-avatar-group">
            <div className="px-avatar" style={{background: 'linear-gradient(135deg, #667eea, #764ba2)'}}>A</div>
            <div className="px-avatar" style={{background: 'linear-gradient(135deg, #f093fb, #f5576c)'}}>B</div>
            <div className="px-avatar" style={{background: 'linear-gradient(135deg, #4facfe, #00f2fe)'}}>C</div>
          </div>
        </div>
      </div>
      <div className="component-card">
        <h4>Badge</h4>
        <div className="component-preview">
          <div className="px-badge-group">
            <span className="px-badge px-badge-primary">Primary</span>
            <span className="px-badge px-badge-success">Success</span>
            <span className="px-badge px-badge-warning">Warning</span>
            <span className="px-badge px-badge-danger">Danger</span>
          </div>
        </div>
      </div>
      <div className="component-card">
        <h4>Tag</h4>
        <div className="component-preview">
          <div className="px-tag-group">
            <span className="px-tag">Default</span>
            <span className="px-tag px-tag-rounded">Rounded</span>
            <span className="px-tag px-tag-closable">Closable ×</span>
          </div>
        </div>
      </div>
      <div className="component-card">
        <h4>Progress Bar</h4>
        <div className="component-preview">
          <div className="px-progress">
            <div className="px-progress-bar" style={{width: '75%'}}></div>
          </div>
        </div>
      </div>
      <div className="component-card">
        <h4>Spinner</h4>
        <div className="component-preview">
          <div className="px-spinner"></div>
        </div>
      </div>
      <div className="component-card">
        <h4>Empty State</h4>
        <div className="component-preview">
          <div className="px-empty">
            <div className="px-empty-icon">📭</div>
            <p>No data available</p>
          </div>
        </div>
      </div>
    </div>
  )

  // Charts Showcase
  const ChartsShowcase = () => (
    <div className="charts-grid">
      <div className="chart-card">
        <h4>Line Chart</h4>
        <div className="chart-preview">
          <svg viewBox="0 0 400 200" className="px-line-chart">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(102, 126, 234, 0.3)" />
                <stop offset="100%" stopColor="rgba(102, 126, 234, 0)" />
              </linearGradient>
            </defs>
            <path d="M0,150 Q100,120 150,100 T250,80 T400,40" fill="url(#lineGradient)" stroke="none" />
            <path d="M0,150 Q100,120 150,100 T250,80 T400,40" fill="none" stroke="#667eea" strokeWidth="3" />
            <circle cx="0" cy="150" r="5" fill="#667eea" />
            <circle cx="150" cy="100" r="5" fill="#667eea" />
            <circle cx="250" cy="80" r="5" fill="#667eea" />
            <circle cx="400" cy="40" r="5" fill="#667eea" />
          </svg>
        </div>
      </div>
      <div className="chart-card">
        <h4>Area Chart</h4>
        <div className="chart-preview">
          <svg viewBox="0 0 400 200" className="px-area-chart">
            <defs>
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(245, 87, 108, 0.6)" />
                <stop offset="100%" stopColor="rgba(245, 87, 108, 0)" />
              </linearGradient>
            </defs>
            <path d="M0,180 L50,140 L100,160 L150,100 L200,120 L250,80 L300,60 L350,100 L400,40 L400,200 L0,200 Z" fill="url(#areaGradient)" />
            <path d="M0,180 L50,140 L100,160 L150,100 L200,120 L250,80 L300,60 L350,100 L400,40" fill="none" stroke="#f5576c" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="chart-card">
        <h4>Bar Chart</h4>
        <div className="chart-preview">
          <svg viewBox="0 0 400 200" className="px-bar-chart">
            <rect x="20" y="120" width="40" height="80" fill="#4facfe" rx="4" />
            <rect x="80" y="80" width="40" height="120" fill="#00f2fe" rx="4" />
            <rect x="140" y="100" width="40" height="100" fill="#667eea" rx="4" />
            <rect x="200" y="60" width="40" height="140" fill="#764ba2" rx="4" />
            <rect x="260" y="90" width="40" height="110" fill="#f093fb" rx="4" />
            <rect x="320" y="40" width="40" height="160" fill="#f5576c" rx="4" />
          </svg>
        </div>
      </div>
      <div className="chart-card">
        <h4>Pie Chart</h4>
        <div className="chart-preview">
          <svg viewBox="0 0 200 200" className="px-pie-chart">
            <circle cx="100" cy="100" r="80" fill="transparent" stroke="#667eea" strokeWidth="40" strokeDasharray="125.6 502.4" />
            <circle cx="100" cy="100" r="80" fill="transparent" stroke="#f5576c" strokeWidth="40" strokeDasharray="100.5 502.4" strokeDashoffset="-125.6" />
            <circle cx="100" cy="100" r="80" fill="transparent" stroke="#4facfe" strokeWidth="40" strokeDasharray="150.8 502.4" strokeDashoffset="-226.1" />
            <circle cx="100" cy="100" r="80" fill="transparent" stroke="#00f2fe" strokeWidth="40" strokeDasharray="125.3 502.4" strokeDashoffset="-376.9" />
          </svg>
        </div>
      </div>
      <div className="chart-card">
        <h4>Radar Chart</h4>
        <div className="chart-preview">
          <svg viewBox="0 0 200 200" className="px-radar-chart">
            <polygon points="100,20 170,60 150,140 50,140 30,60" fill="rgba(102, 126, 234, 0.2)" stroke="#667eea" strokeWidth="2" />
            <polygon points="100,50 150,70 135,130 65,130 50,70" fill="rgba(245, 87, 108, 0.4)" stroke="#f5576c" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="chart-card">
        <h4>Donut Chart</h4>
        <div className="chart-preview">
          <svg viewBox="0 0 200 200" className="px-donut-chart">
            <circle cx="100" cy="100" r="60" fill="transparent" stroke="#667eea" strokeWidth="30" strokeDasharray="94.2 565.5" />
            <circle cx="100" cy="100" r="60" fill="transparent" stroke="#f5576c" strokeWidth="30" strokeDasharray="188.5 565.5" strokeDashoffset="-94.2" />
            <circle cx="100" cy="100" r="60" fill="transparent" stroke="#4facfe" strokeWidth="30" strokeDasharray="141.4 565.5" strokeDashoffset="-282.7" />
            <text x="100" y="105" textAnchor="middle" className="donut-text">75%</text>
          </svg>
        </div>
      </div>
    </div>
  )

  // Layout Components Showcase
  const LayoutComponents = () => (
    <div className="layout-grid">
      <div className="layout-card">
        <h4>Mosaic Grid</h4>
        <div className="layout-preview">
          <div className="px-mosaic-grid">
            <div className="mosaic-item item-large" style={{background: 'linear-gradient(135deg, #667eea, #764ba2)'}}>Large</div>
            <div className="mosaic-item" style={{background: 'linear-gradient(135deg, #f093fb, #f5576c)'}}>Small</div>
            <div className="mosaic-item" style={{background: 'linear-gradient(135deg, #4facfe, #00f2fe)'}}>Small</div>
            <div className="mosaic-item item-wide" style={{background: 'linear-gradient(135deg, #f5576c, #f5a623)'}}>Wide</div>
          </div>
        </div>
      </div>
      <div className="layout-card">
        <h4>Floating Dashboard</h4>
        <div className="layout-preview">
          <div className="px-dashboard">
            <div className="dashboard-widget widget-main" style={{background: 'linear-gradient(135deg, #667eea, #764ba2)'}}>
              <span>Main Metric</span>
              <strong>1,234</strong>
            </div>
            <div className="dashboard-widget" style={{background: 'linear-gradient(135deg, #f093fb, #f5576c)'}}>
              <span>Metric 2</span>
              <strong>567</strong>
            </div>
            <div className="dashboard-widget" style={{background: 'linear-gradient(135deg, #4facfe, #00f2fe)'}}>
              <span>Metric 3</span>
              <strong>890</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

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

        .category-filters {
          display: flex;
          gap: 10px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .category-filter {
          padding: 8px 16px;
          border: 1px solid #e0e0e0;
          background: white;
          color: #666;
          font-size: 13px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .category-filter:hover {
          border-color: var(--px-theme-clr, #ff6b6b);
          color: var(--px-theme-clr, #ff6b6b);
        }

        .category-filter.active {
          background: var(--px-theme-clr, #ff6b6b);
          border-color: var(--px-theme-clr, #ff6b6b);
          color: white;
        }

        .component-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
        }

        .component-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
        }

        .component-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }

        .component-card h4 {
          margin: 0 0 16px 0;
          font-size: 13px;
          color: #888;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .component-preview {
          min-height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Form Components */
        .px-input {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .px-input:focus {
          outline: none;
          border-color: var(--px-theme-clr, #ff6b6b);
          box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1);
        }

        .px-textarea {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          font-size: 14px;
          resize: none;
          transition: all 0.3s ease;
        }

        .px-textarea:focus {
          outline: none;
          border-color: var(--px-theme-clr, #ff6b6b);
        }

        .px-select {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          font-size: 14px;
          background: white;
          cursor: pointer;
        }

        .px-checkbox {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-size: 14px;
        }

        .px-checkbox input {
          display: none;
        }

        .checkmark {
          width: 18px;
          height: 18px;
          border: 2px solid #e0e0e0;
          border-radius: 4px;
          position: relative;
          transition: all 0.3s ease;
        }

        .px-checkbox input:checked + .checkmark {
          background: var(--px-theme-clr, #ff6b6b);
          border-color: var(--px-theme-clr, #ff6b6b);
        }

        .px-checkbox input:checked + .checkmark::after {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 12px;
        }

        .px-radio {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-size: 14px;
        }

        .px-radio input {
          display: none;
        }

        .radio-mark {
          width: 18px;
          height: 18px;
          border: 2px solid #e0e0e0;
          border-radius: 50%;
          position: relative;
          transition: all 0.3s ease;
        }

        .px-radio input:checked + .radio-mark {
          border-color: var(--px-theme-clr, #ff6b6b);
        }

        .px-radio input:checked + .radio-mark::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 8px;
          height: 8px;
          background: var(--px-theme-clr, #ff6b6b);
          border-radius: 50%;
        }

        .px-switch {
          position: relative;
          display: inline-block;
          width: 48px;
          height: 26px;
        }

        .px-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #e0e0e0;
          transition: 0.3s;
          border-radius: 26px;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 20px;
          width: 20px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: 0.3s;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .px-switch input:checked + .slider {
          background: var(--px-theme-clr, #ff6b6b);
        }

        .px-switch input:checked + .slider:before {
          transform: translateX(22px);
        }

        .px-btn {
          padding: 10px 24px;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .px-btn-primary {
          background: var(--px-theme-clr, #ff6b6b);
          color: white;
        }

        .px-btn-primary:hover {
          background: #ff5252;
          transform: translateY(-1px);
        }

        .px-btn-secondary {
          background: #6c757d;
          color: white;
        }

        .px-btn-secondary:hover {
          background: #5a6268;
        }

        .px-btn-outline {
          background: transparent;
          border: 2px solid var(--px-theme-clr, #ff6b6b);
          color: var(--px-theme-clr, #ff6b6b);
        }

        .px-btn-outline:hover {
          background: var(--px-theme-clr, #ff6b6b);
          color: white;
        }

        /* Navigation Components */
        .px-tabs {
          display: flex;
          gap: 4px;
          background: #f5f5f5;
          padding: 4px;
          border-radius: 10px;
        }

        .px-tab {
          padding: 8px 16px;
          border: none;
          background: transparent;
          color: #666;
          font-size: 14px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .px-tab.active {
          background: white;
          color: var(--px-theme-clr, #ff6b6b);
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .px-breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
        }

        .px-breadcrumb a {
          color: var(--px-theme-clr, #ff6b6b);
          text-decoration: none;
          transition: opacity 0.3s ease;
        }

        .px-breadcrumb a:hover {
          opacity: 0.8;
        }

        .px-breadcrumb span:not(:last-child) {
          color: #999;
        }

        .px-pagination {
          display: flex;
          gap: 4px;
        }

        .px-page-btn {
          width: 36px;
          height: 36px;
          border: 1px solid #e0e0e0;
          background: white;
          border-radius: 8px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .px-page-btn:hover {
          border-color: var(--px-theme-clr, #ff6b6b);
          color: var(--px-theme-clr, #ff6b6b);
        }

        .px-page-btn.active {
          background: var(--px-theme-clr, #ff6b6b);
          border-color: var(--px-theme-clr, #ff6b6b);
          color: white;
        }

        .px-steps {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .px-step {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #e0e0e0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 600;
          color: #999;
          transition: all 0.3s ease;
        }

        .px-step.completed {
          background: var(--px-theme-clr, #ff6b6b);
          color: white;
        }

        .px-step.active {
          background: var(--px-theme-clr, #ff6b6b);
          color: white;
          box-shadow: 0 0 0 4px rgba(255, 107, 107, 0.2);
        }

        /* Data Display Components */
        .px-avatar-group {
          display: flex;
        }

        .px-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 16px;
          margin-left: -10px;
          border: 2px solid white;
        }

        .px-avatar:first-child {
          margin-left: 0;
        }

        .px-badge-group {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .px-badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }

        .px-badge-primary {
          background: rgba(102, 126, 234, 0.1);
          color: #667eea;
        }

        .px-badge-success {
          background: rgba(79, 172, 254, 0.1);
          color: #4facfe;
        }

        .px-badge-warning {
          background: rgba(245, 87, 108, 0.1);
          color: #f5576c;
        }

        .px-badge-danger {
          background: rgba(255, 107, 107, 0.1);
          color: #ff6b6b;
        }

        .px-tag-group {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .px-tag {
          padding: 4px 12px;
          background: #f5f5f5;
          border-radius: 6px;
          font-size: 13px;
          color: #666;
        }

        .px-tag-rounded {
          border-radius: 20px;
        }

        .px-tag-closable {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .px-progress {
          width: 100%;
          height: 8px;
          background: #e0e0e0;
          border-radius: 4px;
          overflow: hidden;
        }

        .px-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, var(--px-theme-clr, #ff6b6b), #ff8a8a);
          border-radius: 4px;
          transition: width 0.5s ease;
        }

        .px-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #e0e0e0;
          border-top-color: var(--px-theme-clr, #ff6b6b);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .px-empty {
          text-align: center;
          padding: 20px;
        }

        .px-empty-icon {
          font-size: 40px;
          margin-bottom: 10px;
          opacity: 0.5;
        }

        .px-empty p {
          margin: 0;
          color: #999;
          font-size: 14px;
        }

        /* Charts */
        .charts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }

        .chart-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }

        .chart-card h4 {
          margin: 0 0 16px 0;
          font-size: 14px;
          color: #666;
          font-weight: 500;
        }

        .chart-preview {
          height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .px-line-chart, .px-area-chart, .px-bar-chart {
          width: 100%;
          height: 100%;
        }

        .px-pie-chart, .px-donut-chart {
          width: 160px;
          height: 160px;
        }

        .donut-text {
          font-size: 24px;
          font-weight: 600;
          fill: #333;
        }

        .px-radar-chart {
          width: 160px;
          height: 160px;
        }

        /* Layout */
        .layout-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
        }

        .layout-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }

        .layout-card h4 {
          margin: 0 0 16px 0;
          font-size: 14px;
          color: #666;
          font-weight: 500;
        }

        .layout-preview {
          min-height: 200px;
        }

        .px-mosaic-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
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
          font-size: 14px;
        }

        .item-large {
          grid-row: span 2;
        }

        .item-wide {
          grid-column: span 2;
        }

        .px-dashboard {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          height: 200px;
        }

        .dashboard-widget {
          border-radius: 12px;
          padding: 16px;
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .widget-main {
          grid-row: span 2;
        }

        .dashboard-widget span {
          font-size: 13px;
          opacity: 0.9;
        }

        .dashboard-widget strong {
          font-size: 32px;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .component-grid {
            grid-template-columns: 1fr;
          }

          .charts-grid {
            grid-template-columns: 1fr;
          }

          .layout-grid {
            grid-template-columns: 1fr;
          }

          .ds-tabs {
            flex-wrap: wrap;
          }
        }
      `}</style>

      <div className="ds-tabs">
        <button
          className={`ds-tab ${activeTab === 'components' ? 'active' : ''}`}
          onClick={() => setActiveTab('components')}
        >
          Components
        </button>
        <button
          className={`ds-tab ${activeTab === 'charts' ? 'active' : ''}`}
          onClick={() => setActiveTab('charts')}
        >
          Data Visualization
        </button>
        <button
          className={`ds-tab ${activeTab === 'layout' ? 'active' : ''}`}
          onClick={() => setActiveTab('layout')}
        >
          Layout System
        </button>
      </div>

      {activeTab === 'components' && (
        <>
          <div className="category-filters">
            <button
              className={`category-filter ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              All
            </button>
            <button
              className={`category-filter ${selectedCategory === 'form' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('form')}
            >
              Form
            </button>
            <button
              className={`category-filter ${selectedCategory === 'navigation' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('navigation')}
            >
              Navigation
            </button>
            <button
              className={`category-filter ${selectedCategory === 'data' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('data')}
            >
              Data Display
            </button>
          </div>

          {(selectedCategory === 'all' || selectedCategory === 'form') && <FormComponents />}
          {(selectedCategory === 'all' || selectedCategory === 'navigation') && <NavigationComponents />}
          {(selectedCategory === 'all' || selectedCategory === 'data') && <DataDisplayComponents />}
        </>
      )}

      {activeTab === 'charts' && <ChartsShowcase />}

      {activeTab === 'layout' && <LayoutComponents />}
    </div>
  )
}

export { DesignSystemShowcase }
export default DesignSystemShowcase
