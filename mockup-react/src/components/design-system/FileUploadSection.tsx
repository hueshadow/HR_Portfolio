import React from 'react';

interface FileUploadSectionProps {
  isEmbedded?: boolean;
}

const FileUploadSection: React.FC<FileUploadSectionProps> = ({ isEmbedded = false }) => {
  const containerClass = isEmbedded
    ? "contents"
    : "w-full min-h-screen snap-start shrink-0 overflow-y-auto bg-[var(--background-light)] dark:bg-[var(--background-dark)] relative py-20 lg:py-32";

  const innerWrapperClass = isEmbedded
    ? "contents"
    : "max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8";

  const cardClass = "bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 break-inside-avoid mb-6 transition-all hover:shadow-md";

  // 直接渲染组件内容
  const renderContent = () => (
    <>
      {!isEmbedded && (
        <header className="mb-12 text-center col-span-full">
          <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">File Upload Component Kit</h1>
          <p className="text-slate-500 dark:text-slate-400">A clean, systematic collection of file upload UI patterns.</p>
        </header>
      )}

      {/* Simple Upload */}
      <div className={cardClass}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">Simple Upload</h3>
        </div>
        <div className="border-2 border-dashed border-slate-200 dark:border-slate-600 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-[var(--primary)] transition-colors cursor-pointer group">
          <span className="material-icons-outlined text-slate-400 group-hover:text-[var(--primary)] mb-3 text-4xl">cloud_upload</span>
          <p className="text-sm font-medium text-slate-900 dark:text-white">Drag and drop your files, or <span className="text-[var(--primary)] font-bold">browse</span></p>
          <p className="text-xs text-slate-400 mt-2">Supported format: PDF, DOC</p>
        </div>
      </div>

      {/* Upload Status */}
      <div className={cardClass}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">Upload Status</h3>
          <span className="text-xs font-medium text-slate-400">2 files</span>
        </div>
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-700">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded mr-3">
              <span className="material-icons-outlined text-blue-600 text-sm">description</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate text-slate-900 dark:text-white">Sales_Report_2024.csv</p>
              <p className="text-xs text-slate-400">1.2 MB • Completed</p>
            </div>
            <button className="text-slate-400 hover:text-[var(--primary)]"><span className="material-icons-outlined text-lg">download</span></button>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-700">
            <div className="flex items-center mb-2">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded mr-3">
                <span className="material-icons-outlined text-purple-600 text-sm">image</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate text-slate-900 dark:text-white">Company_Logo.svg</p>
                <p className="text-xs text-slate-400">450 KB • Uploading...</p>
              </div>
              <button className="text-slate-400 hover:text-red-500"><span className="material-icons-outlined text-lg">close</span></button>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[var(--primary)] h-full rounded-full transition-all duration-300" style={{ width: '65%' }}></div>
            </div>
          </div>
        </div>
        <button className="w-full mt-4 py-2 bg-[var(--primary)] text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">Upload Files</button>
      </div>

      {/* Local vs Dropbox */}
      <div className={cardClass}>
        <div className="flex border-b border-slate-100 dark:border-slate-700 mb-6">
          <button className="px-4 py-2 text-sm font-semibold border-b-2 border-[var(--primary)] text-[var(--primary)]">Local</button>
          <button className="px-4 py-2 text-sm font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">Dropbox</button>
        </div>
        <div className="border-2 border-dashed border-slate-200 dark:border-slate-600 rounded-xl p-6 text-center">
          <span className="material-icons-outlined text-slate-300 text-4xl mb-2">upload_file</span>
          <p className="text-sm font-medium mb-1 text-slate-900 dark:text-white">Drag your files here, or <span className="text-[var(--primary)] font-bold">choose file</span></p>
          <p className="text-[10px] text-slate-400 uppercase">MAX. 5 MB</p>
        </div>
        <div className="mt-6 flex gap-3">
          <button className="flex-1 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-sm font-medium text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">Cancel</button>
          <button className="flex-1 py-2 bg-[var(--primary)] text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">Upload</button>
        </div>
      </div>

      {/* Upload Image */}
      <div className={cardClass}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-base text-slate-900 dark:text-white">Upload image</h3>
          <button className="text-slate-400 hover:text-slate-600"><span className="material-icons-outlined">close</span></button>
        </div>
        <div className="border-2 border-dashed border-slate-200 dark:border-slate-600 rounded-xl py-6 flex flex-col items-center justify-center bg-slate-50/50 dark:bg-slate-900/20">
          <span className="material-icons-outlined text-slate-400 mb-2">image</span>
          <p className="text-sm font-medium text-slate-900 dark:text-white">Drag your image or <span className="text-[var(--primary)] font-bold">browse</span></p>
        </div>
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100 dark:border-slate-700"></div></div>
          <span className="relative bg-white dark:bg-slate-800 px-2 text-[10px] text-slate-400 font-bold tracking-widest uppercase">OR</span>
        </div>
        <div className="flex gap-2">
          <input className="flex-1 text-sm rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-[var(--primary)] focus:border-[var(--primary)] text-slate-900 dark:text-white" placeholder="Paste image link" type="text"/>
          <button className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-600">Search</button>
        </div>
      </div>

      {/* Circular Progress */}
      <div className={`${cardClass} flex flex-col items-center justify-center min-h-[350px]`}>
        <h3 className="font-semibold text-lg mb-8 text-slate-900 dark:text-white">Uploading 3 files</h3>
        <div className="relative flex items-center justify-center mb-8">
          <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 128 128">
            <circle className="text-slate-100 dark:text-slate-700" cx="64" cy="64" fill="transparent" r="56" stroke="currentColor" strokeWidth="8"></circle>
            <circle className="text-[var(--primary)]" cx="64" cy="64" fill="transparent" r="56" stroke="currentColor" strokeDasharray="351.85" strokeDashoffset="63.3" strokeWidth="8" strokeLinecap="round"></circle>
          </svg>
          <span className="absolute text-4xl font-bold text-slate-900 dark:text-white">82%</span>
        </div>
        <p className="text-sm text-slate-500 mb-8">32 MB from 40 MB uploaded</p>
        <button className="px-8 py-2.5 border border-slate-200 dark:border-slate-700 rounded-full text-sm font-medium text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">Cancel</button>
      </div>

      {/* Error State */}
      <div className={cardClass}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-base text-slate-900 dark:text-white">Media Upload</h3>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/40 rounded-lg p-3 mb-4 flex items-center gap-3">
          <span className="material-icons-outlined text-red-500">error_outline</span>
          <div>
            <p className="text-xs font-bold text-red-800 dark:text-red-400">File too large</p>
            <p className="text-[10px] text-red-700 dark:text-red-500/80">Video_presentation.mp4 exceeds 50MB limit.</p>
          </div>
        </div>
        <div className="border-2 border-dashed border-red-200 dark:border-red-900/30 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-red-50/10">
          <span className="material-icons-outlined text-red-300 mb-3 text-4xl">warning_amber</span>
          <p className="text-sm font-medium text-slate-900 dark:text-white">Try another file</p>
          <button className="mt-4 text-xs font-bold text-[var(--primary)] hover:underline">BROWSE FILES</button>
        </div>
        <div className="mt-6 flex justify-between items-center">
          <button className="text-xs text-slate-400 flex items-center gap-1 hover:text-slate-600"><span className="material-icons-outlined text-sm">help_outline</span> Help center</button>
          <button className="px-6 py-2 bg-[var(--primary)] text-white rounded-lg text-sm font-medium shadow-lg shadow-blue-500/20 opacity-50 cursor-not-allowed">Upload</button>
        </div>
      </div>

      {/* Attach Documents */}
      <div className={cardClass}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-full">
              <span className="material-icons-outlined text-slate-500 dark:text-slate-300">attach_file</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Attach documents</p>
              <p className="text-xs text-slate-400">PDF, JPG, or PNG (Max 10MB)</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800 bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-700">PDF</div>
              <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800 bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-700">IMG</div>
            </div>
            <button className="px-4 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-xs font-bold hover:opacity-90 transition-opacity">Select Files</button>
          </div>
        </div>
      </div>
    </>
  );

  if (isEmbedded) { return renderContent(); }

  return (
    <div className={containerClass}>
      <div className={innerWrapperClass}>
        {renderContent()}
      </div>
    </div>
  );
};

export default FileUploadSection;
