import React, { useState } from 'react';
import { 
  Users, 
  Sparkles, 
  Play, 
  Plus, 
  Trash2, 
  RefreshCw, 
  Mic2, 
  Volume2, 
  MessageSquare,
  Check,
  FileSpreadsheet
} from 'lucide-react';
import { VOICES } from '../data/voicesData';
import { DialogueLine, GenerationHistoryItem } from '../types/voice';
import { AudioWaveformPlayer } from './AudioWaveformPlayer';

interface MultiSpeakerStudioProps {
  onGenerated: (item: GenerationHistoryItem) => void;
}

export const MultiSpeakerStudio: React.FC<MultiSpeakerStudioProps> = ({ onGenerated }) => {
  const [speaker1Voice, setSpeaker1Voice] = useState<string>('Puck');
  const [speaker2Voice, setSpeaker2Voice] = useState<string>('Kore');
  const [dialogueLines, setDialogueLines] = useState<DialogueLine[]>([
    {
      id: 'l1',
      speaker: 'Speaker 1',
      text: "Welcome back everyone! Today we're testing the multi-speaker dual podcast generator.",
      style: 'Enthusiastic podcast host'
    },
    {
      id: 'l2',
      speaker: 'Speaker 2',
      text: "That's right! Gemini TTS synthesizes natural backchanneling and conversational cadence effortlessly.",
      style: 'Engaged, articulate co-host'
    },
    {
      id: 'l3',
      speaker: 'Speaker 1',
      text: "Notice how both voices stay seamlessly distinct throughout the entire dialogue track.",
      style: 'Excited, warm'
    }
  ]);

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const addLine = () => {
    const lastSpeaker = dialogueLines.length > 0 ? dialogueLines[dialogueLines.length - 1].speaker : 'Speaker 2';
    const nextSpeaker = lastSpeaker === 'Speaker 1' ? 'Speaker 2' : 'Speaker 1';
    setDialogueLines([
      ...dialogueLines,
      {
        id: `line-${Date.now()}`,
        speaker: nextSpeaker,
        text: '',
        style: 'Natural'
      }
    ]);
  };

  const removeLine = (id: string) => {
    if (dialogueLines.length <= 1) return;
    setDialogueLines(dialogueLines.filter(l => l.id !== id));
  };

  const updateLine = (id: string, updates: Partial<DialogueLine>) => {
    setDialogueLines(dialogueLines.map(l => l.id === id ? { ...l, ...updates } : l));
  };

  const handleGenerateDialogue = async () => {
    const validLines = dialogueLines.filter(l => l.text.trim().length > 0);
    if (validLines.length === 0) {
      setErrorMessage('Please enter at least one line of dialogue text.');
      return;
    }

    setIsGenerating(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/tts/dialogue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lines: validLines,
          speaker1Voice,
          speaker2Voice
        })
      });

      const data = await response.json();
      if (!response.ok || !data.audioBase64) {
        throw new Error(data.error || 'Failed to synthesize multi-speaker dialogue.');
      }

      // Base64 to Blob URL
      const byteCharacters = atob(data.audioBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: data.mimeType || 'audio/wav' });
      const newAudioUrl = URL.createObjectURL(blob);

      setAudioUrl(newAudioUrl);

      const historyItem: GenerationHistoryItem = {
        id: `dialogue-${Date.now()}`,
        text: `Dialogue (${validLines.length} lines): "${validLines[0].text.substring(0, 50)}..."`,
        voice: `${speaker1Voice} & ${speaker2Voice}`,
        model: 'gemini-3.8-flash-tts',
        style: 'Dual-Speaker Dialogue',
        audioUrl: newAudioUrl,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        charCount: validLines.reduce((acc, l) => acc + l.text.length, 0)
      };

      onGenerated(historyItem);
    } catch (err: any) {
      console.error('Dialogue error:', err);
      setErrorMessage(err.message || 'Error synthesizing dual dialogue.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Users className="w-3.5 h-3.5" />
              Gemini Flagship Multi-Speaker Engine
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Dual-Speaker Dialogue & Podcast Generator
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Direct two distinct voice actors in a single script with customized emotions, pauses, and backchanneling.
            </p>
          </div>

          <button
            onClick={handleGenerateDialogue}
            disabled={isGenerating}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Synthesizing Podcast Audio...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span>Generate Dual Dialogue</span>
              </>
            )}
          </button>
        </div>

        {/* Speaker Cast Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
          {/* Speaker 1 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                <Mic2 className="w-3.5 h-3.5" />
                Speaker 1 Actor
              </span>
              <span className="text-[11px] text-slate-500 font-mono">Lead Host</span>
            </div>
            <select
              value={speaker1Voice}
              onChange={(e) => setSpeaker1Voice(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              {VOICES.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} ({v.gender} - {v.category})
                </option>
              ))}
            </select>
          </div>

          {/* Speaker 2 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                <Mic2 className="w-3.5 h-3.5" />
                Speaker 2 Actor
              </span>
              <span className="text-[11px] text-slate-500 font-mono">Co-Host / Guest</span>
            </div>
            <select
              value={speaker2Voice}
              onChange={(e) => setSpeaker2Voice(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              {VOICES.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} ({v.gender} - {v.category})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Script Screenplay Editor */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
              Dialogue Screenplay Lines ({dialogueLines.length})
            </h4>
            <button
              onClick={addLine}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Dialogue Line</span>
            </button>
          </div>

          <div className="space-y-3">
            {dialogueLines.map((line, idx) => {
              const isSpeaker1 = line.speaker === 'Speaker 1';
              return (
                <div
                  key={line.id}
                  className={`p-4 rounded-xl border flex flex-col sm:flex-row gap-3 transition-all ${
                    isSpeaker1
                      ? 'bg-slate-950/90 border-indigo-500/30'
                      : 'bg-slate-950/90 border-purple-500/30'
                  }`}
                >
                  {/* Speaker Selector & Line index */}
                  <div className="flex sm:flex-col items-center sm:items-start justify-between gap-2 shrink-0 sm:w-36">
                    <span className="text-[10px] text-slate-500 font-mono">#{idx + 1}</span>
                    <select
                      value={line.speaker}
                      onChange={(e) => updateLine(line.id, { speaker: e.target.value as any })}
                      className={`text-xs font-bold rounded-lg px-2.5 py-1 focus:outline-none border ${
                        isSpeaker1
                          ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'
                          : 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                      }`}
                    >
                      <option value="Speaker 1">Speaker 1 ({speaker1Voice})</option>
                      <option value="Speaker 2">Speaker 2 ({speaker2Voice})</option>
                    </select>
                  </div>

                  {/* Text & Style Inputs */}
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={line.text}
                      onChange={(e) => updateLine(line.id, { text: e.target.value })}
                      placeholder={`Enter line for ${line.speaker}...`}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 shrink-0">Style Direction:</span>
                      <input
                        type="text"
                        value={line.style || ''}
                        onChange={(e) => updateLine(line.id, { style: e.target.value })}
                        placeholder="e.g. Enthusiastic, thoughtful, curious"
                        className="flex-1 bg-slate-900/60 border border-slate-800 rounded-lg px-2.5 py-1 text-[11px] text-slate-300 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Delete button */}
                  {dialogueLines.length > 1 && (
                    <button
                      onClick={() => removeLine(line.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 self-center transition-colors"
                      title="Delete line"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
            {errorMessage}
          </div>
        )}

        {/* Player Result */}
        {audioUrl && (
          <div className="pt-4 border-t border-slate-800">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
              Synthesized Dialogue Audio Track
            </h4>
            <AudioWaveformPlayer
              audioUrl={audioUrl}
              voiceName={`${speaker1Voice} & ${speaker2Voice}`}
              title="Dual-Speaker Podcast Audio"
              autoPlay={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};
