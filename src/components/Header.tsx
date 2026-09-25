import React from 'react';
import { 
  Laptop, 
  Tablet, 
  Smartphone, 
  Code2, 
  Eye, 
  Columns, 
  Download, 
  Sparkles, 
  ExternalLink,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { CloneId } from '../types';
import { CLONES_LIST } from '../data/clonesData';

interface HeaderProps {
  activeCloneId: CloneId;
  viewMode: 'preview' | 'split' | 'code';
  setViewMode: (mode: 'preview' | 'split' | 'code') => void;
  viewport: 'desktop' | 'tablet' | 'mobile';
  setViewport: (vp: 'desktop' | 'tablet' | 'mobile') => void;
  onOpenExport: () => void;
  onSwitchClone: (id: CloneId) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeCloneId,
  viewMode,
  setViewMode,
  viewport,
  setViewport,
  onOpenExport,
  onSwitchClone,
}) => {
  const currentClone = CLONES_LIST.find((c) => c.id === activeCloneId);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/85 backdrop-blur-md">
      {/* Top Banner indicating sync with user requested app URL */}
      <div className="bg-gradient-to-r from-indigo-950/80 via-slate-900 to-emerald-950/80 px-4 py-1.5 text-xs border-b border-indigo-500/20 text-slate-300 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Synced Target
          </span>
          <span className="font-mono text-slate-300 hidden sm:inline">
            https://ai.studio/apps/8f0fbe86-cf24-4999-8ccc-f5259a5ba662
          </span>
          <span className="font-mono text-slate-400 text-[11px] sm:hidden">
            app/8f0fbe86-cf24...
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="text-slate-400">All 6 Sub-Clones Ready</span>
          <button
            onClick={() => onSwitchClone('instant-cloner')}
            className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 hover:underline transition-colors"
          >
            <span>Cloner Engine</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo & Current App Identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 ring-1 ring-white/20">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-base text-white tracking-tight flex items-center gap-1.5">
                CloneStudio
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">
                  v2.4
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-400 truncate max-w-[200px] sm:max-w-xs">
              {currentClone?.name}: {currentClone?.tagline}
            </p>
          </div>
        </div>

        {/* Viewport switchers (hidden on small screens or when code-only) */}
        <div className="hidden md:flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 text-slate-400">
          <button
            title="Desktop 100%"
            onClick={() => setViewport('desktop')}
            className={`p-1.5 rounded transition-all ${
              viewport === 'desktop'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Laptop className="w-4 h-4" />
          </button>
          <button
            title="Tablet 768px"
            onClick={() => setViewport('tablet')}
            className={`p-1.5 rounded transition-all ${
              viewport === 'tablet'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            title="Mobile 375px"
            onClick={() => setViewport('mobile')}
            className={`p-1.5 rounded transition-all ${
              viewport === 'mobile'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        {/* View mode toggle & Export Code button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mode switch */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 text-slate-400">
            <button
              onClick={() => setViewMode('preview')}
              className={`px-2.5 py-1 text-xs font-medium rounded flex items-center gap-1.5 transition-all ${
                viewMode === 'preview'
                  ? 'bg-slate-800 text-indigo-400 shadow-sm'
                  : 'hover:text-slate-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Preview</span>
            </button>
            <button
              onClick={() => setViewMode('split')}
              className={`px-2.5 py-1 text-xs font-medium rounded flex items-center gap-1.5 transition-all hidden lg:flex ${
                viewMode === 'split'
                  ? 'bg-slate-800 text-indigo-400 shadow-sm'
                  : 'hover:text-slate-200'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Split</span>
            </button>
            <button
              onClick={() => setViewMode('code')}
              className={`px-2.5 py-1 text-xs font-medium rounded flex items-center gap-1.5 transition-all ${
                viewMode === 'code'
                  ? 'bg-slate-800 text-indigo-400 shadow-sm'
                  : 'hover:text-slate-200'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Code</span>
            </button>
          </div>

          {/* Export action */}
          <button
            onClick={onOpenExport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-medium shadow-md shadow-indigo-600/20 border border-indigo-400/20 active:scale-95 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export Code</span>
            <span className="sm:hidden">Export</span>
          </button>
        </div>
      </div>
    </header>
  );
};
