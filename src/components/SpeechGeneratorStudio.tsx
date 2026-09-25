import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  RefreshCw, 
  Volume2, 
  Check, 
  Sliders, 
  Mic, 
  Copy, 
  Wand2, 
  Layers, 
  HelpCircle,
  FileText
} from 'lucide-react';
import { VOICES, VOICE_PRESETS, STYLE_PROMPTS } from '../data/voicesData';
import { VoiceConfig, VoicePreset, GenerationHistoryItem } from '../types/voice';
import { AudioWaveformPlayer } from './AudioWaveformPlayer';

interface SpeechGeneratorStudioProps {
  onGenerated: (item: GenerationHistoryItem) => void;
  currentAudioUrl: string | null;
  currentVoiceName: string;
  availableVoices: VoiceConfig[];
  onGoToCloner?: () => void;
}

export const SpeechGeneratorStudio: React.FC<SpeechGeneratorStudioProps> = ({
  onGenerated,
  currentAudioUrl,
  currentVoiceName,
  availableVoices,
  onGoToCloner,
}) => {
  const [inputText, setInputText] = useState<string>(
    'It was a quiet autumn evening when the old train finally pulled into the station. The rain had softened to a gentle mist, and through the amber streetlamps, memories of a forgotten summer returned like an old friend.'
  );
  const [selectedVoice, setSelectedVoice] = useState<VoiceConfig>(availableVoices[0]);
  const [stylePrompt, setStylePrompt] = useState<string>('Warm, deep, middle-aged storytelling narrator with comforting pauses and rich baritone cadence');
  const [modelType, setModelType] = useState<'gemini-3.8-flash-lite-tts' | 'gemini-3.8-flash-tts'>(
    'gemini-3.8-flash-lite-tts'
  );
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<boolean>(false);

  // Character counter
  const charCount = inputText.length;
  const estimatedSeconds = Math.max(1, Math.round(charCount / 14));

  const handleApplyPreset = (preset: VoicePreset) => {
    setInputText(preset.text);
    setStylePrompt(preset.style);
    const foundVoice = VOICES.find((v) => v.id === preset.recommendedVoice);
    if (foundVoice) {
      setSelectedVoice(foundVoice);
    }
  };

  const handleGenerateSpeech = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    setIsGenerating(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/tts/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: inputText.trim(),
          voice: selectedVoice.id,
          style: stylePrompt.trim(),
          model: modelType,
          baseVoiceOverride: selectedVoice.baseVoice,
          customStylePrompt: selectedVoice.tonePrompt
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.audioBase64) {
        throw new Error(data.error || 'Failed to synthesize voice audio.');
      }

      // Convert base64 into Blob URL
      const byteCharacters = atob(data.audioBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: data.mimeType || 'audio/wav' });
      const audioUrl = URL.createObjectURL(blob);

      const historyItem: GenerationHistoryItem = {
        id: `gen-${Date.now()}`,
        text: inputText.trim(),
        voice: selectedVoice.name,
        model: modelType,
        style: stylePrompt.trim(),
        audioUrl,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        charCount: inputText.trim().length,
        duration: estimatedSeconds
      };

      onGenerated(historyItem);
      setSuccessNotice(true);
      setTimeout(() => setSuccessNotice(false), 3000);
    } catch (err: any) {
      console.error('Speech generation error:', err);
      setErrorMessage(err.message || 'Error communicating with Gemini TTS server.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Studio Banner & Presets Carousel */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Quick Inspiration & Production Presets
            </h3>
            <p className="text-xs text-slate-300">
              One-click scripts configured with recommended voices and director styles
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {VOICE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleApplyPreset(preset)}
              className="text-left p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-indigo-500/50 hover:bg-slate-900 transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-mono mb-1.5 inline-block">
                  {preset.tag}
                </span>
                <h5 className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {preset.title}
                </h5>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                  "{preset.text}"
                </p>
              </div>
              <div className="text-[10px] text-slate-500 mt-2 font-mono flex items-center justify-between">
                <span>Voice: {preset.recommendedVoice}</span>
                <span className="text-indigo-400 group-hover:translate-x-0.5 transition-transform">→</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Studio Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Script / Text Input & Style Directives */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                <label className="text-xs font-bold text-white uppercase tracking-wider">
                  Script to Voice (Text Input)
                </label>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span>{charCount} characters</span>
                <span>•</span>
                <span className="text-indigo-400 font-mono">~{estimatedSeconds}s audio</span>
              </div>
            </div>

            {/* Large Text Area */}
            <div className="relative">
              <textarea
                rows={6}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type or paste your text here to convert into lifelike AI speech..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 leading-relaxed font-sans resize-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setInputText('')}
                className="absolute right-3 bottom-3 text-[11px] text-slate-500 hover:text-slate-300 font-mono"
              >
                Clear
              </button>
            </div>

            {/* Voice Style & Tone Direction */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Wand2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Speech Style & Performance Direction</span>
                </label>
                <span className="text-[11px] text-slate-500">Gemini SpeechMetadata</span>
              </div>
              <input
                type="text"
                value={stylePrompt}
                onChange={(e) => setStylePrompt(e.target.value)}
                placeholder="e.g. Deep, dramatic and cinematic trailer voice"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />

              {/* Quick style tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {STYLE_PROMPTS.slice(0, 4).map((style, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setStylePrompt(style)}
                    className={`text-[11px] px-2.5 py-1 rounded-lg transition-all ${
                      stylePrompt === style
                        ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/50'
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Error & Success Messages */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                {errorMessage}
              </div>
            )}
            {successNotice && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Voice synthesized successfully! Playing preview below.</span>
              </div>
            )}

            {/* Action Bar */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Selected Voice:</span>
                <span className="text-xs font-bold text-white bg-slate-800 px-2 py-0.5 rounded flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-indigo-400" />
                  {selectedVoice.name} ({selectedVoice.gender})
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleGenerateSpeech()}
                disabled={isGenerating || !inputText.trim()}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Synthesizing Voice Audio...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-cyan-300" />
                    <span>Generate Speech Audio</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Active Player Preview */}
          {currentAudioUrl && (
            <div>
              <AudioWaveformPlayer
                audioUrl={currentAudioUrl}
                voiceName={currentVoiceName}
                title="Current Generated Voice Track"
                autoPlay={true}
              />
            </div>
          )}
        </div>

        {/* Right Column: AI Voice Cast Selection */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-indigo-400" />
                Select Voice Talent ({VOICES.length})
              </h4>
              <p className="text-[11px] text-slate-400">Gemini Neural Voice Cast</p>
            </div>

            {/* Model switch */}
            <select
              value={modelType}
              onChange={(e) => setModelType(e.target.value as any)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-[11px] text-indigo-300 font-mono focus:outline-none"
            >
              <option value="gemini-3.8-flash-lite-tts">Flash Lite TTS</option>
              <option value="gemini-3.8-flash-tts">Flash TTS (Flagship)</option>
            </select>
          </div>

          {/* Voice Cards */}
          <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
            {availableVoices.map((v) => {
              const isSelected = v.id === selectedVoice.id;
              return (
                <div
                  key={v.id}
                  onClick={() => {
                    setSelectedVoice(v);
                    if (v.tonePrompt) {
                      setStylePrompt(v.tonePrompt);
                    }
                  }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                    isSelected
                      ? 'bg-indigo-950/40 border-indigo-500/60 shadow-md shadow-indigo-950/50 ring-1 ring-indigo-500/30'
                      : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700 hover:bg-slate-950'
                  }`}
                >
                  <img
                    src={v.avatar}
                    alt={v.name}
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-indigo-500/20 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <h5 className="text-xs font-bold text-white truncate">{v.name}</h5>
                        {v.isCloned && (
                          <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono shrink-0">
                            Cloned
                          </span>
                        )}
                      </div>
                      {isSelected ? (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30 shrink-0 ml-1">
                          Active
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-500 font-mono shrink-0 ml-1">{v.category}</span>
                      )}
                    </div>

                    <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2 mb-2">
                      {v.description}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                      <span className="truncate">{v.accent || v.source}</span>
                      <span className="text-indigo-400 flex items-center gap-1 shrink-0">
                        <Volume2 className="w-3 h-3" /> Select
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
