import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Play, 
  Code, 
  Layers, 
  Palette, 
  Cpu, 
  Sparkles, 
  RefreshCw, 
  Download, 
  Terminal, 
  Box,
  FileCode,
  Sliders,
  ExternalLink
} from 'lucide-react';

interface InstantClonerToolProps {
  onExport: () => void;
}

export const InstantClonerTool: React.FC<InstantClonerToolProps> = ({ onExport }) => {
  const [targetUrl, setTargetUrl] = useState<string>(
    'https://ai.studio/apps/8f0fbe86-cf24-4999-8ccc-f5259a5ba662'
  );
  const [customPrompt, setCustomPrompt] = useState<string>(
    'Replicate full responsive multi-clone architecture: Natural Scene BD with Web Audio, AI persona synthesizer, SaaS board, and E-commerce store.'
  );
  const [isCloning, setIsCloning] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'hierarchy' | 'code' | 'tokens' | 'logs'>('hierarchy');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const sampleGeneratedCode = `import React, { useState } from 'react';
import { Layers, Sparkles, MapPin, Star } from 'lucide-react';

// Cloned from https://ai.studio/apps/8f0fbe86-cf24-4999-8ccc-f5259a5ba662
// Synthesized by CloneStudio Engine (React 19 + Tailwind v4)

export default function ClonedApplet() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <header className="max-w-6xl mx-auto flex items-center justify-between border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Cloned Application Studio</h1>
        </div>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-xs font-semibold">
          Explore Clones
        </button>
      </header>

      <main className="max-w-6xl mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card replicated with exact styling */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all">
            <h3 className="font-semibold text-white mb-2">Natural Scene BD Sub-Module</h3>
            <p className="text-xs text-slate-400">Bangladesh landscape explorer with audio soundscapes.</p>
          </div>
        </div>
      </main>
    </div>
  );
}`;

  const componentNodes = [
    { name: '<AppContainer />', type: 'Root Scaffold', depth: 0, status: 'Synced' },
    { name: '  <HeaderBar />', type: 'Navigation & Sync State', depth: 1, status: 'Synced' },
    { name: '  <CloneSelectorBar />', type: 'Interactive Tab Switcher', depth: 1, status: 'Synced' },
    { name: '    <NaturalSceneBDClone />', type: 'Bangladesh Nature & Soundscapes', depth: 2, status: 'Active (Creator Match)' },
    { name: '      <ProceduralSoundEngine />', type: 'Web Audio API Synthesizer', depth: 3, status: 'Running' },
    { name: '      <ScenicSpotGrid />', type: 'Photo & Travel Destination Cards', depth: 3, status: 'Rendered' },
    { name: '      <TourBudgetEstimator />', type: 'Cost & Itinerary Calculator', depth: 3, status: 'Calculated' },
    { name: '    <AIPersonaClone />', type: 'Voice & Digital Twin Synthesizer', depth: 2, status: 'Ready' },
    { name: '    <EcommerceClone />', type: 'NovaStore Marketplace', depth: 2, status: 'Ready' },
    { name: '    <SocialFeedClone />', type: 'Pulse Social Media', depth: 2, status: 'Ready' },
    { name: '    <KanbanDashboardClone />', type: 'TaskFlow Agile Board', depth: 2, status: 'Ready' },
    { name: '  <ExportModal />', type: 'Code & TSX Exporter', depth: 1, status: 'Ready' }
  ];

  const designTokens = [
    { label: 'Surface Primary', hex: '#020617', name: 'slate-950' },
    { label: 'Surface Secondary', hex: '#0f172a', name: 'slate-900' },
    { label: 'Accent Brand', hex: '#4f46e5', name: 'indigo-600' },
    { label: 'Nature Accent', hex: '#059669', name: 'emerald-600' },
    { label: 'Border Highlight', hex: '#1e293b', name: 'slate-800' },
    { label: 'Text Primary', hex: '#f8fafc', name: 'slate-50' }
  ];

  const handleRunClone = () => {
    setIsCloning(true);
    setTimeout(() => {
      setIsCloning(false);
    }, 1200);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(sampleGeneratedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Cloner Control Panel */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
                  <Copy className="w-4 h-4" />
                </span>
                <h2 className="text-xl font-bold text-white tracking-tight">App Cloner & Code Synthesizer</h2>
              </div>
              <p className="text-xs text-slate-400">
                Reverse-engineers and synthesizes pixel-accurate React 19 + Tailwind v4 clones.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleRunClone}
                disabled={isCloning}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-semibold shadow-lg shadow-indigo-600/25 active:scale-95 transition-all disabled:opacity-50"
              >
                {isCloning ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Analyzing & Synthesizing...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Re-Run Clone Analysis</span>
                  </>
                )}
              </button>
              <button
                onClick={onExport}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Project</span>
              </button>
            </div>
          </div>

          {/* Target URL Input */}
          <div className="mt-5 space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Target Applet / URL
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={targetUrl}
                    onChange={(e) => setTargetUrl(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-xs text-slate-100 font-mono focus:outline-none transition-colors"
                    placeholder="https://ai.studio/apps/..."
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono border border-emerald-500/30">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Replication Directives / Prompt
              </label>
              <textarea
                rows={2}
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-2 text-xs text-slate-200 focus:outline-none resize-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Cloner Inspection Tabs */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2.5 bg-slate-950/60">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab('hierarchy')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'hierarchy'
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Component Tree ({componentNodes.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'code'
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>Synthesized TSX</span>
              </button>
              <button
                onClick={() => setActiveTab('tokens')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'tokens'
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Design Tokens</span>
              </button>
              <button
                onClick={() => setActiveTab('logs')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'logs'
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Engine Logs</span>
              </button>
            </div>

            {activeTab === 'code' && (
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition-colors"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
              </button>
            )}
          </div>

          <div className="p-6">
            {activeTab === 'hierarchy' && (
              <div className="space-y-2">
                <div className="text-xs text-slate-400 mb-3">
                  Parsed AST structure for target app: <strong className="text-slate-200 font-mono">{targetUrl}</strong>
                </div>
                <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs space-y-1.5 overflow-x-auto">
                  {componentNodes.map((node, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-1.5 rounded hover:bg-slate-900/80 transition-colors group"
                    >
                      <div className="flex items-center gap-2">
                        <Box className="w-3.5 h-3.5 text-indigo-400" />
                        <span className="text-indigo-300 font-semibold">{node.name}</span>
                        <span className="text-[11px] text-slate-500">// {node.type}</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 group-hover:border-indigo-500/30">
                        {node.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'code' && (
              <div className="relative">
                <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-indigo-200 overflow-x-auto leading-relaxed">
                  {sampleGeneratedCode}
                </pre>
              </div>
            )}

            {activeTab === 'tokens' && (
              <div>
                <div className="text-xs text-slate-400 mb-4">
                  Extracted CSS variables, Tailwind palettes, and typography metrics:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {designTokens.map((token, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col gap-2"
                    >
                      <div
                        className="w-full h-12 rounded-lg border border-white/10 shadow-inner"
                        style={{ backgroundColor: token.hex }}
                      />
                      <div>
                        <span className="text-xs font-semibold text-white block">{token.label}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{token.name}</span>
                        <span className="text-[10px] text-indigo-400 font-mono block">{token.hex}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'logs' && (
              <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-[11px] space-y-1 text-slate-400">
                <div className="text-emerald-400">[INFO] Connected to runner environment (Node 22, React 19).</div>
                <div className="text-cyan-400">[PARSER] Reading target blueprint: https://ai.studio/apps/8f0fbe86-cf24-4999-8ccc-f5259a5ba662</div>
                <div className="text-slate-400">[SYNTH] Generating 6 sub-clone suites: Natural Scene BD, AI Persona, Store, Social, Kanban, Cloner.</div>
                <div className="text-emerald-400">[AUDIO] Initialized procedural Web Audio API synthesis engine (zero MP3 dependencies).</div>
                <div className="text-indigo-400">[CSS] Tailwind CSS v4 compiler loaded with responsive breakpoints (Desktop, Tablet, Mobile).</div>
                <div className="text-emerald-400">[STATUS] All clone components mounted with 0 fatal errors. Ready for live interaction.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
