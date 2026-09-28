import React, { useState } from 'react';
import { 
  Sparkles, 
  Volume2, 
  Mic2, 
  Users, 
  Sliders, 
  CheckCircle2, 
  ExternalLink,
  Download,
  Info,
  Layers,
  FileCode,
  Radio
} from 'lucide-react';
import { SpeechGeneratorStudio } from './components/SpeechGeneratorStudio';
import { MultiSpeakerStudio } from './components/MultiSpeakerStudio';
import { VoiceClonerStudio } from './components/VoiceClonerStudio';
import { VoiceHistoryDrawer } from './components/VoiceHistoryDrawer';
import { GenerationHistoryItem, VoiceConfig } from './types/voice';
import { VOICES } from './data/voicesData';

export default function App() {
  const [activeTab, setActiveTab] = useState<'tts-generator' | 'voice-cloner' | 'multi-speaker'>('tts-generator');
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);
  const [currentVoiceName, setCurrentVoiceName] = useState<string>('Adam (ElevenLabs Warm Storyteller)');
  const [history, setHistory] = useState<GenerationHistoryItem[]>([]);
  const [availableVoices, setAvailableVoices] = useState<VoiceConfig[]>(VOICES);

  const handleGenerated = (item: GenerationHistoryItem) => {
    setCurrentAudioUrl(item.audioUrl);
    setCurrentVoiceName(item.voice);
    setHistory((prev) => [item, ...prev]);
  };

  const handleSelectTrack = (item: GenerationHistoryItem) => {
    setCurrentAudioUrl(item.audioUrl);
    setCurrentVoiceName(item.voice);
  };

  const handleVoiceCreated = (newVoice: VoiceConfig) => {
    setAvailableVoices((prev) => [newVoice, ...prev]);
    setCurrentVoiceName(newVoice.name);
    setActiveTab('tts-generator');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Bar with Target Link Sync Status */}
      <div className="bg-gradient-to-r from-indigo-950/80 via-slate-900 to-purple-950/80 px-4 py-1.5 text-xs border-b border-indigo-500/20 text-slate-300 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Speech to Voice Active
          </span>
          <span className="font-mono text-slate-300 hidden sm:inline">
            https://aistudio.google.com/apps/8f0fbe86-cf24-4999-8ccc-f5259a5ba662
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="text-slate-400">Gemini 3.8 Flash TTS Engine</span>
          <span className="text-indigo-400 font-mono">24kHz Studio Output</span>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 ring-1 ring-white/20">
              <Radio className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-base text-white tracking-tight flex items-center gap-1.5">
                  VoxStudio
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">
                    Speech to Voice
                  </span>
                </h1>
              </div>
              <p className="text-xs text-slate-400">
                AI Voice & Speech Synthesizer Platform
              </p>
            </div>
          </div>

          {/* Navigation Mode Tabs */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 text-slate-400">
            <button
              onClick={() => setActiveTab('tts-generator')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'tts-generator'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'hover:text-slate-200'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Speech Generator</span>
            </button>
            <button
              onClick={() => setActiveTab('voice-cloner')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'voice-cloner'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Voice Cloner (ElevenLabs)</span>
            </button>
            <button
              onClick={() => setActiveTab('multi-speaker')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'multi-speaker'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'hover:text-slate-200'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Dual Podcast Generator</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main App Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {activeTab === 'tts-generator' ? (
          <SpeechGeneratorStudio
            onGenerated={handleGenerated}
            currentAudioUrl={currentAudioUrl}
            currentVoiceName={currentVoiceName}
            availableVoices={availableVoices}
            onGoToCloner={() => setActiveTab('voice-cloner')}
          />
        ) : activeTab === 'voice-cloner' ? (
          <VoiceClonerStudio
            onVoiceCreated={handleVoiceCreated}
            onSelectAndTest={(v) => {
              setCurrentVoiceName(v.name);
              setActiveTab('tts-generator');
            }}
          />
        ) : (
          <MultiSpeakerStudio onGenerated={handleGenerated} />
        )}

        {/* History & Generated Audio Archive */}
        <VoiceHistoryDrawer
          history={history}
          onSelectTrack={handleSelectTrack}
          onClearHistory={() => setHistory([])}
          activeAudioUrl={currentAudioUrl}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 px-4 text-center text-xs text-slate-500">
        <p>VoxStudio Speech to Voice Generator • Synthesized via Gemini 3.8 Flash Lite TTS & Flash TTS API</p>
      </footer>
    </div>
  );
}
