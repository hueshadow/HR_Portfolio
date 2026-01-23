import React, { useState, useRef, useEffect } from 'react';

interface ComponentsPreviewProps {
  isEmbedded?: boolean;
}

const ComponentsPreview: React.FC<ComponentsPreviewProps> = ({ isEmbedded = false }) => {
  // Formatting Toolbar State
  const [formatting, setFormatting] = useState({ bold: false, italic: false, link: false, list: false });

  // Tag Input State
  const [tags, setTags] = useState(['UI Design', 'React']);
  const [tagInput, setTagInput] = useState('');

  // Multi-Select State
  const [isMultiSelectOpen, setIsMultiSelectOpen] = useState(false);
  const multiSelectRef = useRef<HTMLDivElement>(null);

  // Input State
  const [inputValue, setInputValue] = useState('');

  // Button Group State
  const [activeBtnGroup, setActiveBtnGroup] = useState(0);

  // Toggle Group State
  const [timeRange, setTimeRange] = useState('Daily');

  // Settings State
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [plan, setPlan] = useState('pro');

  // Volume State
  const [volume, setVolume] = useState(75);

  // Calendar State
  const [calendarDate, setCalendarDate] = useState(4);
  const [currentMonth, setCurrentMonth] = useState('October 2023');

  // Notifications State
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Notification title', desc: 'Interactively monetize corporate alignments and fully tested niche markets.', type: 'large' as const },
    { id: 2, title: 'Notification title', desc: 'Interactively monetize corporate alignments.', type: 'small' as const }
  ]);

  // Login Form State
  const [loginLoading, setLoginLoading] = useState(false);

  // Handlers
  const toggleFormatting = (key: keyof typeof formatting) => {
    setFormatting(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.min(100, Math.max(0, (x / rect.width) * 100));
    setVolume(Math.round(percentage));
  };

  const dismissNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleLogin = () => {
    setLoginLoading(true);
    setTimeout(() => setLoginLoading(false), 1500);
  };

  // Close multi-select on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (multiSelectRef.current && !multiSelectRef.current.contains(event.target as Node)) {
        setIsMultiSelectOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const cardClass = "break-inside-avoid mb-6 w-full";

  // 直接渲染组件内容
  const renderContent = () => (
    <>
      {/* Formatting Toolbar Card */}
      <div className={`${cardClass} design-card overflow-hidden transform transition-all hover:scale-[1.02] hover:shadow-md`}>
        <div className="flex items-center gap-1 p-2 border-b border-[var(--border-light)] dark:border-[var(--border-dark)] bg-slate-50 dark:bg-slate-800/50">
          {['bold', 'italic', 'link', 'list'].map((tool) => (
            <button
              key={tool}
              onClick={() => toggleFormatting(tool as any)}
              className={`p-1.5 rounded transition-colors ${formatting[tool as keyof typeof formatting] ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white' : 'hover:bg-slate-200 dark:hover:bg-slate-700 text-[var(--text-secondary-light)] dark:text-[var(--text-secondary-dark)]'}`}
            >
              <span className="material-icons-round text-lg">{tool === 'list' ? 'format_list_bulleted' : tool === 'bold' ? 'format_bold' : tool === 'italic' ? 'format_italic' : 'link'}</span>
            </button>
          ))}
        </div>
        <div className="p-4">
          <div className={`text-sm text-[var(--text-secondary-light)] dark:text-[var(--text-secondary-dark)] leading-relaxed ${formatting.bold ? 'font-bold' : ''} ${formatting.italic ? 'italic' : ''}`}>
            <span className="font-semibold text-slate-900 dark:text-white">v2.0 Released</span><br/>
            New components available in the dashboard...
          </div>
        </div>
      </div>

      {/* Standard Input */}
      <div className={cardClass}>
        <div className="flex items-center gap-2 mb-2 text-sm text-[var(--text-secondary-light)] dark:text-[var(--text-secondary-dark)]">
          <span className="font-medium text-slate-900 dark:text-white">Input Label</span>
          <div className="group relative">
            <span className="material-icons-round text-base cursor-pointer hover:text-[var(--primary)] transition-colors">help_outline</span>
          </div>
        </div>
        <input
          className="w-full px-4 py-2.5 rounded-lg border border-[var(--primary)] ring-1 ring-[var(--primary)] bg-[var(--surface-light)] dark:bg-[var(--surface-dark)] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)] shadow-sm transition-all"
          placeholder="Type something..."
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>

      {/* Tag Input */}
      <div className={cardClass}>
        <label className="block text-xs font-bold text-[var(--text-secondary-light)] dark:text-[var(--text-secondary-dark)] mb-2 uppercase tracking-wide">Tag Input</label>
        <div className="flex flex-wrap items-center gap-2 p-2 rounded-lg border border-[var(--border-light)] dark:border-[var(--border-dark)] bg-[var(--surface-light)] dark:bg-[var(--surface-dark)] shadow-sm focus-within:ring-2 focus-within:ring-[var(--primary)] transition-all">
          {tags.map((tag, idx) => (
            <span key={idx} className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border animate-in fade-in zoom-in duration-200 ${idx % 2 === 0 ? 'bg-blue-50 dark:bg-blue-900/30 text-[var(--primary)] dark:text-blue-400 border-blue-100 dark:border-blue-800' : 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-800'}`}>
              {tag}
              <button onClick={() => removeTag(tag)} className="ml-1 hover:opacity-75 flex items-center"><span className="material-icons-round text-sm">close</span></button>
            </span>
          ))}
          <input
            className="flex-1 min-w-[60px] bg-transparent border-none p-0 text-sm focus:ring-0 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
            placeholder="Add tag..."
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
          />
        </div>
      </div>

      {/* Multi Select */}
      <div className={cardClass}>
        <label className="block text-xs font-bold text-[var(--text-secondary-light)] dark:text-[var(--text-secondary-dark)] mb-2 uppercase tracking-wide">Multi-Select</label>
        <div className="relative group" ref={multiSelectRef}>
          <button
            onClick={() => setIsMultiSelectOpen(!isMultiSelectOpen)}
            className={`w-full flex items-center justify-between p-2.5 rounded-lg border bg-[var(--surface-light)] dark:bg-[var(--surface-dark)] shadow-sm transition-all text-left ${isMultiSelectOpen ? 'border-[var(--primary)] ring-2 ring-[var(--primary)]/20' : 'border-[var(--border-light)] dark:border-[var(--border-dark)] hover:border-[var(--primary)]'}`}
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="h-6 w-6 rounded-full ring-2 ring-white dark:ring-slate-800 bg-slate-200 dark:bg-slate-600 flex items-center justify-center text-[10px] font-bold text-slate-700 dark:text-slate-300">JD</div>
                <div className="h-6 w-6 rounded-full ring-2 ring-white dark:ring-slate-800 bg-slate-300 dark:bg-slate-500 flex items-center justify-center text-[10px] font-bold text-slate-700 dark:text-slate-200">AS</div>
                <div className="flex items-center justify-center h-6 w-6 rounded-full ring-2 ring-white dark:ring-slate-800 bg-slate-100 dark:bg-slate-700 text-[10px] font-bold text-slate-500 dark:text-slate-300">+3</div>
              </div>
              <span className="text-sm font-medium text-slate-900 dark:text-white">5 Selected</span>
            </div>
            <span className={`material-icons-round text-slate-400 transition-transform ${isMultiSelectOpen ? 'rotate-180 text-[var(--primary)]' : ''}`}>expand_more</span>
          </button>

          {isMultiSelectOpen && (
            <div className="absolute top-full left-0 w-full mt-2 bg-[var(--surface-light)] dark:bg-[var(--surface-dark)] border border-[var(--border-light)] dark:border-[var(--border-dark)] rounded-lg shadow-lg z-20 p-1 animate-in fade-in slide-in-from-top-2">
              {['John Doe', 'Alice Smith', 'Robert Johnson', 'Emily Davis', 'Michael Brown'].map((name, i) => (
                <div key={i} className="flex items-center gap-2 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded cursor-pointer">
                  <input type="checkbox" checked={true} readOnly className="rounded border-slate-300 text-[var(--primary)] focus:ring-[var(--primary)] dark:bg-slate-700 dark:border-slate-600" />
                  <span className="text-sm text-slate-900 dark:text-white">{name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Button Group */}
      <div className={cardClass}>
        <div className="inline-flex rounded-lg shadow-sm border border-[var(--border-light)] dark:border-[var(--border-dark)] bg-[var(--surface-light)] dark:bg-[var(--surface-dark)] overflow-hidden w-fit">
          {['First', 'Second', 'Third'].map((label, index) => (
            <button
              key={index}
              onClick={() => setActiveBtnGroup(index)}
              className={`px-5 py-2 text-sm font-medium transition-colors focus:z-10 focus:ring-2 focus:ring-[var(--primary)] border-l first:border-l-0 ${
                index === activeBtnGroup
                ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                : 'text-slate-900 dark:text-white bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800 border-[var(--border-light)] dark:border-[var(--border-dark)]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Toggle Group */}
      <div className={cardClass}>
        <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-lg inline-flex w-fit">
          {['Daily', 'Weekly', 'Monthly'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                timeRange === range
                ? 'bg-white dark:bg-[var(--surface-dark)] text-slate-900 dark:text-white shadow-sm scale-105'
                : 'text-[var(--text-secondary-light)] dark:text-[var(--text-secondary-dark)] hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Settings Card */}
      <div className={`${cardClass} p-5 design-card space-y-4`}>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-900 dark:text-white">Email Alerts</span>
          <button
            onClick={() => setEmailAlerts(!emailAlerts)}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 ${emailAlerts ? 'bg-[var(--primary)]' : 'bg-slate-200 dark:bg-slate-700)'}`}
          >
            <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${emailAlerts ? 'translate-x-5' : 'translate-x-0'}`}></span>
          </button>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-900 dark:text-white">SMS Alerts</span>
          <button
            onClick={() => setSmsAlerts(!smsAlerts)}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 ${smsAlerts ? 'bg-[var(--primary)]' : 'bg-slate-200 dark:bg-slate-700)'}`}
          >
            <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${smsAlerts ? 'translate-x-5' : 'translate-x-0'}`}></span>
          </button>
        </div>
        <div className="border-t border-[var(--border-light)] dark:border-[var(--border-dark)] pt-3 space-y-2">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="radio"
              name="plan"
              checked={plan === 'pro'}
              onChange={() => setPlan('pro')}
              className="h-4 w-4 border-slate-300 text-[var(--primary)] focus:ring-[var(--primary)] bg-slate-100 dark:bg-slate-800 dark:border-slate-600"
            />
            <span className="text-sm text-slate-900 dark:text-white group-hover:text-[var(--primary)] transition-colors">Pro Plan</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="radio"
              name="plan"
              checked={plan === 'enterprise'}
              onChange={() => setPlan('enterprise')}
              className="h-4 w-4 border-slate-300 text-[var(--primary)] focus:ring-[var(--primary)] bg-slate-100 dark:bg-slate-800 dark:border-slate-600"
            />
            <span className="text-sm text-slate-900 dark:text-white group-hover:text-[var(--primary)] transition-colors">Enterprise</span>
          </label>
        </div>
      </div>

      {/* Progress Bars & Volume */}
      <div className={`${cardClass} space-y-4`}>
        <div className="w-full design-card p-4 space-y-4">
          <div className="flex justify-between text-xs text-[var(--text-secondary-light)] dark:text-[var(--text-secondary-dark)] font-medium">
            <span>Volume</span>
            <span>{volume}%</span>
          </div>
          <div
            className="relative w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full cursor-pointer group"
            onClick={handleVolumeClick}
          >
            <div style={{ width: `${volume}%` }} className="absolute left-0 top-0 h-full bg-[var(--primary)] rounded-full transition-all duration-100"></div>
            <div
              style={{ left: `${volume}%` }}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white border border-slate-200 rounded-full shadow-sm cursor-grab active:cursor-grabbing hover:scale-125 transition-transform group-hover:scale-110"
            ></div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-8 bg-slate-200 dark:bg-slate-700 rounded-md overflow-hidden flex relative">
            <div className="absolute inset-0 w-full h-full bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[progress-bar-stripes_1s_linear_infinite] z-10 pointer-events-none opacity-30"></div>
            <div style={{ width: `${volume}%` }} className="h-full bg-[var(--primary)] border-r border-white/20 transition-all duration-300"></div>
          </div>
          <span className="text-xs font-medium text-[var(--text-secondary-light)] dark:text-[var(--text-secondary-dark)]">{volume}%</span>
        </div>
      </div>

      {/* Login Form */}
      <div className={`${cardClass} space-y-4 design-card p-6`}>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Authentication</h3>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="material-icons-round text-slate-400 group-focus-within:text-[var(--primary)] transition-colors">person_outline</span>
          </div>
          <input className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[var(--border-light)] dark:border-[var(--border-dark)] bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] shadow-sm transition-all" placeholder="Username" type="text"/>
        </div>
        <div className="relative group">
          <input className="w-full px-4 py-2.5 rounded-lg border border-[var(--border-light)] dark:border-[var(--border-dark)] bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] shadow-sm placeholder-slate-400 transition-all" placeholder="Password" type="password"/>
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-medium py-2.5 rounded-lg shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2"
          disabled={loginLoading}
        >
          {loginLoading ? 'Logging in...' : 'Log in'}
        </button>
      </div>

      {/* Calendar */}
      <div className={`${cardClass} p-4 design-card`}>
        <div className="flex justify-between items-center mb-4">
          <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-[var(--text-secondary-light)] dark:text-[var(--text-secondary-dark)] active:scale-95 transition-transform">
            <span className="material-icons-round text-sm">chevron_left</span>
          </button>
          <span className="text-sm font-semibold text-slate-900 dark:text-white select-none">{currentMonth}</span>
          <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-[var(--text-secondary-light)] dark:text-[var(--text-secondary-dark)] active:scale-95 transition-transform">
            <span className="material-icons-round text-sm">chevron_right</span>
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2 text-[var(--text-secondary-light)] dark:text-[var(--text-secondary-dark)] font-medium">
          <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {[29, 30].map(d => (
            <span key={`prev-${d}`} className="p-1.5 text-slate-300 dark:text-slate-600 cursor-default">{d}</span>
          ))}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].slice(0, 12).map(d => (
            <button
              key={d}
              onClick={() => setCalendarDate(d)}
              className={`p-1.5 rounded transition-all hover:scale-110 ${calendarDate === d ? 'bg-[var(--primary)] text-white font-bold shadow-md' : 'text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications */}
      {notifications.map(note => (
        <div key={note.id} className={`${cardClass} design-card p-5 relative transform transition-all duration-300 hover:-translate-y-1`}>
          <button onClick={() => dismissNotification(note.id)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
            <span className="material-icons-round text-xl">close</span>
          </button>
          <div className="flex gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center text-white shadow-lg shadow-[var(--primary)]/30">
                <span className="material-icons-round text-lg">info</span>
              </div>
            </div>
            <div>
              <h3 className={`${note.type === 'large' ? 'text-lg' : 'text-base'} font-semibold text-slate-900 dark:text-white mb-1`}>{note.title}</h3>
              <p className="text-sm text-[var(--text-secondary-light)] dark:text-[var(--text-secondary-dark)] mb-4 leading-relaxed">
                {note.desc}
              </p>
              {note.type === 'large' && (
                <div className="flex gap-3 justify-end">
                  <button className="text-sm font-medium text-[var(--primary)] hover:text-[var(--primary-hover)] px-3 py-1.5 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                    Dismiss
                  </button>
                  <button className="text-sm font-medium bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] px-4 py-1.5 rounded shadow-sm transition-colors active:scale-95">
                    Review
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Data Table */}
      <div className={`${cardClass} design-card overflow-hidden`}>
        <div className="px-4 py-3 border-b border-[var(--border-light)] dark:border-[var(--border-dark)] flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Recent Users</h3>
          <span className="text-xs text-[var(--primary)] font-medium cursor-pointer hover:underline">View All</span>
        </div>
        <table className="min-w-full divide-y divide-[var(--border-light)] dark:divide-[var(--border-dark)]">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-[var(--text-secondary-light)] dark:text-[var(--text-secondary-dark)] uppercase tracking-wider" scope="col">User</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-[var(--text-secondary-light)] dark:text-[var(--text-secondary-dark)] uppercase tracking-wider" scope="col">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-light)] dark:divide-[var(--border-dark)] bg-[var(--surface-light)] dark:bg-[var(--surface-dark)]">
            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <td className="px-4 py-2 whitespace-nowrap text-sm text-slate-900 dark:text-white">Sophie M.</td>
              <td className="px-4 py-2 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Active</span>
              </td>
            </tr>
            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <td className="px-4 py-2 whitespace-nowrap text-sm text-slate-900 dark:text-white">James L.</td>
              <td className="px-4 py-2 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300">Offline</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Badges & Buttons Gallery */}
      <div className={`${cardClass} p-5 design-card space-y-4`}>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Components</h3>
        <div className="flex flex-wrap gap-2 w-full">
          {['Neutral', 'Primary', 'Success', 'Warning', 'Error'].map((type) => {
            let classes = "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300";
            if (type === 'Primary') classes = "bg-[var(--primary)] text-white shadow-sm shadow-[var(--primary)]/30";
            if (type === 'Success') classes = "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-900/50";
            if (type === 'Warning') classes = "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-900/50";
            if (type === 'Error') classes = "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-900/50";

            return (
              <span key={type} className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-default hover:scale-105 transition-transform ${classes}`}>
                {type}
              </span>
            )
          })}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button className="bg-[var(--primary)] text-white text-xs font-bold py-2 rounded-lg shadow-sm">Action</button>
          <button className="bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white text-xs font-bold py-2 rounded-lg">Cancel</button>
        </div>
      </div>
    </>
  );

  if (isEmbedded) {
    return renderContent();
  }

  return (
    <div className="w-full h-screen snap-start shrink-0 overflow-y-auto bg-[var(--background-light)] dark:bg-[var(--background-dark)] relative py-20 lg:py-32">
      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ComponentsPreview;
