import React from 'react';
import { Sliders, RotateCcw, Zap, Sparkles, Gauge, ShieldCheck, Activity, Flame, Info } from 'lucide-react';
import { ElevenLabsVoiceSettings, DEFAULT_VOICE_SETTINGS } from '../types/voice';

interface VoiceSettingsPanelProps {
  settings: ElevenLabsVoiceSettings;
  onChange: (settings: ElevenLabsVoiceSettings) => void;
  isOpen?: boolean;
  onToggleOpen?: () => void;
}

export const VoiceSettingsPanel: React.FC<VoiceSettingsPanelProps> = ({
  settings,
  onChange,
  isOpen = true,
  onToggleOpen,
}) => {
  const handleUpdate = <K extends keyof ElevenLabsVoiceSettings>(
    key: K,
    value: ElevenLabsVoiceSettings[K]
  ) => {
    onChange({
      ...settings,
      [key]: value,
    });
  };

  const handleResetDefaults = () => {
    onChange({ ...DEFAULT_VOICE_SETTINGS });
  };

  const presets = [
    {
      name: 'Default Balanced',
      desc: 'Standard ElevenLabs benchmark',
      settings: { speed: 1.0, stability: 50, similarity: 75, styleExaggeration: 15 },
    },
    {
      name: 'Audiobook & Story',
      desc: 'High consistency & grounded pacing',
      settings: { speed: 0.95, stability: 75, similarity: 85, styleExaggeration: 10 },
    },
    {
      name: 'Dramatic & Expressive',
      desc: 'Dynamic emotion & vivid inflections',
      settings: { speed: 1.0, stability: 30, similarity: 75, styleExaggeration: 55 },
    },
    {
      name: 'Brisk Tech / News',
      desc: 'Crisp articulation & swift tempo',
      settings: { speed: 1.15, stability: 65, similarity: 80, styleExaggeration: 20 },
    },
  ];

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 sm:p-5 shadow-xl transition-all">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                Voice Settings
                <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  ElevenLabs Mode
                </span>
              </h4>
            </div>
            <p className="text-xs text-slate-400">
              Fine-tune speed, stability, likeness fidelity, and emotional style
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-400 hover:text-slate-100 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors"
            title="Reset to recommended ElevenLabs default values"
          >
            <RotateCcw className="w-3 h-3 text-slate-400" />
            <span>Reset Defaults</span>
          </button>
        </div>
      </div>

      {/* Preset Quick Selectors */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
        {presets.map((preset) => {
          const isSelected =
            settings.speed === preset.settings.speed &&
            settings.stability === preset.settings.stability &&
            settings.similarity === preset.settings.similarity &&
            settings.styleExaggeration === preset.settings.styleExaggeration;

          return (
            <button
              key={preset.name}
              type="button"
              onClick={() => onChange(preset.settings)}
              className={`p-2 rounded-xl text-left border transition-all text-xs ${
                isSelected
                  ? 'bg-indigo-600/20 border-indigo-500/60 text-white shadow-sm shadow-indigo-500/10'
                  : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/60 hover:border-slate-700'
              }`}
            >
              <div className="font-semibold text-[11px] truncate flex items-center justify-between">
                <span>{preset.name}</span>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />}
              </div>
              <p className="text-[10px] text-slate-400 truncate mt-0.5">{preset.desc}</p>
            </button>
          );
        })}
      </div>

      {/* The 4 Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* 1. Speed */}
        <div className="bg-slate-950/50 p-3.5 rounded-xl border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-cyan-400" />
              <span>Speed</span>
            </label>
            <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">
              {settings.speed.toFixed(2)}x
            </span>
          </div>

          <input
            type="range"
            min="0.70"
            max="1.50"
            step="0.05"
            value={settings.speed}
            onChange={(e) => handleUpdate('speed', parseFloat(e.target.value))}
            className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
          />

          <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
            <span>Slower (0.70x)</span>
            <span className="text-slate-400">Normal (1.00x)</span>
            <span>Faster (1.50x)</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">
            Adjusts pacing and tempo without unnatural pitch distortion.
          </p>
        </div>

        {/* 2. Stability */}
        <div className="bg-slate-950/50 p-3.5 rounded-xl border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>Stability</span>
            </label>
            <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
              {settings.stability}%
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={settings.stability}
            onChange={(e) => handleUpdate('stability', parseInt(e.target.value, 10))}
            className="w-full accent-emerald-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
          />

          <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
            <span>More variable (0%)</span>
            <span className="text-slate-400">Balanced (50%)</span>
            <span>More stable (100%)</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">
            Increasing stability keeps the voice consistent and calm; lowering it introduces emotional variations.
          </p>
        </div>

        {/* 3. Similarity / Clarity */}
        <div className="bg-slate-950/50 p-3.5 rounded-xl border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Similarity & Clarity</span>
            </label>
            <span className="font-mono text-xs font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">
              {settings.similarity}%
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={settings.similarity}
            onChange={(e) => handleUpdate('similarity', parseInt(e.target.value, 10))}
            className="w-full accent-indigo-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
          />

          <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
            <span>Low (0%)</span>
            <span className="text-slate-400">Default (75%)</span>
            <span>Max Fidelity (100%)</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">
            Enhances voice likeness, acoustic texture fidelity, and studio clarity.
          </p>
        </div>

        {/* 4. Style Exaggeration */}
        <div className="bg-slate-950/50 p-3.5 rounded-xl border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Style Exaggeration</span>
            </label>
            <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
              {settings.styleExaggeration}%
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={settings.styleExaggeration}
            onChange={(e) => handleUpdate('styleExaggeration', parseInt(e.target.value, 10))}
            className="w-full accent-amber-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
          />

          <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
            <span>None (0%)</span>
            <span className="text-slate-400">Subtle (15%)</span>
            <span>Exaggerated (100%)</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">
            Amplifies emotional delivery, theatrical intensity, and expressive inflections.
          </p>
        </div>
      </div>
    </div>
  );
};
