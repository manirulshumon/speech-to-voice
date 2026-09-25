import React from 'react';
import { Play, Download, Trash2, Clock, Volume2, Sparkles, FileAudio } from 'lucide-react';
import { GenerationHistoryItem } from '../types/voice';

interface VoiceHistoryDrawerProps {
  history: GenerationHistoryItem[];
  onSelectTrack: (item: GenerationHistoryItem) => void;
  onClearHistory: () => void;
  activeAudioUrl: string | null;
}

export const VoiceHistoryDrawer: React.FC<VoiceHistoryDrawerProps> = ({
  history,
  onSelectTrack,
  onClearHistory,
  activeAudioUrl,
}) => {
  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-indigo-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Generation History & Library ({history.length})
          </h3>
        </div>

        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="text-[11px] text-slate-500 hover:text-rose-400 flex items-center gap-1 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-12 text-slate-500 text-xs">
          <FileAudio className="w-8 h-8 mx-auto mb-2 text-slate-600" />
          <p>No audio generated yet.</p>
          <p className="text-[11px] text-slate-600 mt-1">
            Type your script and click Generate Speech to populate your library.
          </p>
        </div>
      ) : (
        <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
          {history.map((item) => {
            const isActive = activeAudioUrl === item.audioUrl;
            return (
              <div
                key={item.id}
                className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                  isActive
                    ? 'bg-indigo-950/40 border-indigo-500/50 shadow-md ring-1 ring-indigo-500/30'
                    : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div
                  onClick={() => onSelectTrack(item)}
                  className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                >
                  <button
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isActive
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </button>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-white truncate">
                      "{item.text}"
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                      <span className="font-mono text-indigo-300">
                        Voice: {item.voice}
                      </span>
                      <span>•</span>
                      <span>{item.charCount} chars</span>
                      <span>•</span>
                      <span className="text-slate-500">{item.timestamp}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <a
                    href={item.audioUrl}
                    download={`voxstudio-${item.voice.toLowerCase()}-${Date.now()}.wav`}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                    title="Download audio WAV"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
