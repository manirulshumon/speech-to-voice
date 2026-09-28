import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Download, 
  Code, 
  FileJson, 
  Layers, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { CloneId } from '../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeCloneId: CloneId;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, activeCloneId }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'app' | 'manifest'>('app');

  if (!isOpen) return null;

  const manifestJson = JSON.stringify(
    {
      sourceAppUrl: 'https://ai.studio/apps/8f0fbe86-cf24-4999-8ccc-f5259a5ba662',
      clonedAt: '2026-09-24T07:50:38Z',
      framework: 'React 19 + Tailwind CSS v4 + TypeScript',
      activeClone: activeCloneId,
      clonesIncluded: [
        'Natural Scene BD (Nature & Soundscapes)',
        'App Cloner Studio (Replication Engine)',
        'AI Persona & Voice Synthesizer',
        'NovaStore E-Commerce',
        'Pulse Social Feed',
        'TaskFlow Agile Kanban'
      ],
      soundEngine: 'Web Audio API procedural sound synthesizers (zero external assets)',
      dependencies: {
        react: '^19.0.0',
        'lucide-react': '^0.546.0',
        tailwindcss: '^4.3.3'
      }
    },
    null,
    2
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(manifestJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([manifestJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `clonestudio-export-${activeCloneId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative space-y-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Export Cloned Application</h3>
            <p className="text-xs text-slate-400">
              Download bundle blueprint synced with 8f0fbe86-cf24-4999-8ccc-f5259a5ba662
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab('app')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'app'
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Architecture Specs</span>
          </button>
          <button
            onClick={() => setActiveTab('manifest')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'manifest'
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileJson className="w-3.5 h-3.5" />
            <span>Manifest JSON</span>
          </button>
        </div>

        {activeTab === 'app' ? (
          <div className="space-y-3 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>All Clones Fully Embedded</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                This project includes all 6 standalone functional clones in one unified interface.
                Natural Scene BD contains procedural soundscapes that synthesize ambient rain, wind, waves, and forest birds on the fly.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block">Target URL</span>
                <span className="font-mono text-indigo-300 truncate block">...8f0fbe86-cf24</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block">Total Clones</span>
                <span className="font-bold text-emerald-400">6 Sub-Modules Ready</span>
              </div>
            </div>
          </div>
        ) : (
          <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-indigo-200 max-h-56 overflow-y-auto">
            {manifestJson}
          </pre>
        )}

        <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Manifest'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download JSON</span>
          </button>
        </div>
      </div>
    </div>
  );
};
