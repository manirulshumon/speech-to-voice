import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Download, Volume2, VolumeX, Gauge } from 'lucide-react';
import { ElevenLabsVoiceSettings } from '../types/voice';

interface AudioWaveformPlayerProps {
  audioUrl: string;
  voiceName?: string;
  title?: string;
  autoPlay?: boolean;
  settings?: ElevenLabsVoiceSettings;
  initialSpeed?: number;
}

export const AudioWaveformPlayer: React.FC<AudioWaveformPlayerProps> = ({
  audioUrl,
  voiceName,
  title,
  autoPlay = true,
  settings,
  initialSpeed = 1.0,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(settings?.speed || initialSpeed || 1.0);

  useEffect(() => {
    const desiredSpeed = settings?.speed || initialSpeed || 1.0;
    setPlaybackSpeed(desiredSpeed);
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.playbackRate = desiredSpeed;
      if (autoPlay) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  }, [audioUrl, autoPlay, settings?.speed, initialSpeed]);

  const changeSpeed = (speed: number) => {
    setPlaybackSpeed(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-md">
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      {/* Track Info */}
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-indigo-500/25">
            <Volume2 className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs sm:text-sm font-bold text-white truncate">
              {title || 'Synthesized Voice Track'}
            </h4>
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
              {voiceName && (
                <span className="font-semibold text-indigo-400 font-mono">
                  Voice: {voiceName}
                </span>
              )}
              <span>•</span>
              <span className="text-emerald-400 font-mono text-[10px] bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                24kHz Gemini Studio
              </span>
              {settings && (
                <div className="flex flex-wrap items-center gap-1 text-[10px] font-mono">
                  <span className="px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    Spd: {playbackSpeed.toFixed(2)}x
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    Stab: {settings.stability}%
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    Sim: {settings.similarity}%
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    Exag: {settings.styleExaggeration}%
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <a
          href={audioUrl}
          download={`voxstudio-speech-${Date.now()}.wav`}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Download WAV</span>
        </a>
      </div>

      {/* Animated Waveform Visualization */}
      <div className="relative w-full h-12 bg-slate-950/80 rounded-xl border border-slate-800/80 flex items-center justify-center px-4 overflow-hidden mb-3">
        {/* Visual Waveform bars */}
        <div className="w-full flex items-center justify-between gap-0.5 sm:gap-1 h-8">
          {Array.from({ length: 42 }).map((_, idx) => {
            const barProgress = (idx / 42) * 100;
            const isPassed = barProgress <= progressPercent;
            // Procedural bar height simulating audio spectrum
            const pseudoHeight = Math.sin(idx * 0.45) * 35 + Math.cos(idx * 0.9) * 20 + 45;
            const activePulse = isPlaying ? (idx % 2 === 0 ? 'scale-y-110' : 'scale-y-90') : '';
            return (
              <div
                key={idx}
                className={`w-1 rounded-full transition-all duration-150 ${activePulse} ${
                  isPassed
                    ? 'bg-gradient-to-t from-indigo-500 to-cyan-400 shadow-sm shadow-indigo-500/40'
                    : 'bg-slate-800'
                }`}
                style={{ height: `${Math.max(15, Math.min(100, pseudoHeight))}%` }}
              />
            );
          })}
        </div>

        {/* Scrub Overlay Input */}
        <input
          type="range"
          min="0"
          max={duration || 100}
          step="0.01"
          value={currentTime}
          onChange={handleSeek}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
      </div>

      {/* Controls & Scrubber */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 active:scale-95 transition-all"
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
          </button>

          <button
            onClick={() => {
              if (audioRef.current) {
                audioRef.current.currentTime = 0;
                setCurrentTime(0);
              }
            }}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Restart"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <span className="text-xs font-mono text-slate-400">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          {/* Quick Speed Pills */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-950/70 p-1 rounded-lg border border-slate-800 ml-2">
            {[0.8, 1.0, 1.25, 1.5].map((spd) => (
              <button
                key={spd}
                type="button"
                onClick={() => changeSpeed(spd)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors ${
                  Math.abs(playbackSpeed - spd) < 0.05
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const muted = !isMuted;
              setIsMuted(muted);
              if (audioRef.current) {
                audioRef.current.muted = muted;
              }
            }}
            className="text-slate-400 hover:text-white"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4 text-rose-400" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              setVolume(val);
              setIsMuted(false);
              if (audioRef.current) {
                audioRef.current.volume = val;
                audioRef.current.muted = false;
              }
            }}
            className="w-16 sm:w-20 accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
