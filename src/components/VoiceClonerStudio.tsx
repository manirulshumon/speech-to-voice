import React, { useState, useRef } from 'react';
import { 
  Sparkles, 
  Mic, 
  Upload, 
  Volume2, 
  Play, 
  Square, 
  Check, 
  Sliders, 
  Layers,
  Wand2,
  Trash2,
  AlertCircle,
  Link2,
  Globe,
  ExternalLink,
  CheckCircle2,
  Loader2,
  VolumeX
} from 'lucide-react';
import { VoiceConfig } from '../types/voice';

interface VoiceClonerStudioProps {
  onVoiceCreated: (newVoice: VoiceConfig) => void;
  onSelectAndTest: (voice: VoiceConfig) => void;
}

export const VoiceClonerStudio: React.FC<VoiceClonerStudioProps> = ({
  onVoiceCreated,
  onSelectAndTest,
}) => {
  const [cloneMode, setCloneMode] = useState<'elevenlabs-url' | 'upload' | 'profile' | 'record'>('elevenlabs-url');
  const [elevenLabsUrl, setElevenLabsUrl] = useState<string>('https://elevenlabs.io/voices/UmQN7jS1Ee8B1czsUtQh');
  const [isCloningUrl, setIsCloningUrl] = useState<boolean>(false);
  const [clonedFromUrlResult, setClonedFromUrlResult] = useState<{
    voice: VoiceConfig;
    recommendedSettings: any;
    previewAudioUrl?: string | null;
  } | null>(null);
  const [urlCloneError, setUrlCloneError] = useState<string | null>(null);
  const [isPlayingPreview, setIsPlayingPreview] = useState<boolean>(false);
  const previewAudioRef = useRef<HTMLAudioElement | null>(null);

  const [voiceName, setVoiceName] = useState<string>('Theo Silk (ElevenLabs Calm British Narrator)');
  const [selectedArchetype, setSelectedArchetype] = useState<string>('theo-silk-calm');
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  const [accent, setAccent] = useState<string>('Calm British / RP');
  const [toneDescription, setToneDescription] = useState<string>(
    'Profoundly calm and grounding British gentleman narrator, low-register gentle baritone, slow-paced soothing cadence, peaceful, reassuring and intimate, maximum vocal stability and velvety warmth for sleep stories, luxury documentaries, and bedtime audiobooks'
  );
  const [baseVoice, setBaseVoice] = useState<'Charon' | 'Fenrir' | 'Kore' | 'Zephyr' | 'Puck'>('Fenrir');

  // File Upload State
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedAudioUrl, setUploadedAudioUrl] = useState<string | null>(null);
  const [isAnalyzingFile, setIsAnalyzingFile] = useState<boolean>(false);
  const [analysisDetails, setAnalysisDetails] = useState<any>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Recording State
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioBlobUrl, setAudioBlobUrl] = useState<string | null>(null);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [cloneSuccess, setCloneSuccess] = useState<boolean>(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const archetypes = [
    {
      id: 'theo-silk-calm',
      title: 'Theo Silk - Calm British Narrator (ElevenLabs)',
      desc: 'Profoundly calm, slow-paced, low-register gentle British voice engineered for maximum stability and soothing depth. Ideal for bedtime stories and documentaries.',
      gender: 'Male',
      base: 'Fenrir',
      prompt: 'Profoundly calm and grounding British gentleman narrator, low-register gentle baritone, slow-paced soothing cadence, peaceful, reassuring and intimate, maximum vocal stability and velvety warmth for sleep stories, luxury documentaries, and bedtime audiobooks'
    },
    {
      id: 'chuck-miller-raspy',
      title: 'Chuck Miller - Deep, Raspy, American (ElevenLabs)',
      desc: 'Iconic deep, raspy, seasoned American baritone with gritty gravitas. Ideal for Westerns, thrillers, and hardboiled narration.',
      gender: 'Male',
      base: 'Charon',
      prompt: 'Deep raspy American male voice, gritty weathered baritone texture, authentic American drawl, deliberate narrative cadence with seasoned gravitas, gravelly resonance'
    },
    {
      id: 'warm-middle-aged',
      title: 'Warm Middle-Aged Storyteller (Adam ElevenLabs Style)',
      desc: 'Rich, comforting, textured baritone voice designed for bedtime stories, classic narration, and audiobooks.',
      gender: 'Male',
      base: 'Charon',
      prompt: 'Middle-aged warm narrative storyteller, rich baritone, gentle cadence, comforting and wise, classic audiobook narrator'
    },
    {
      id: 'cinematic-elder',
      title: 'Cinematic Deep Narrator',
      desc: 'Authoritative, resonant, and cinematic tone like a classic movie trailer or epic documentary.',
      gender: 'Male',
      base: 'Charon',
      prompt: 'Epic movie documentary narrator, deep gravel baritone, dramatic and solemn cadence'
    },
    {
      id: 'warm-maternal',
      title: 'Gentle Warm Guide (Female)',
      desc: 'Soft, empathetic, reassuring storyteller voice for guided meditation and gentle tales.',
      gender: 'Female',
      base: 'Kore',
      prompt: 'Warm, gentle maternal storyteller, soothing cadence, intimate and comforting tone'
    },
    {
      id: 'classic-british-gentleman',
      title: 'Classic British Storyteller',
      desc: 'Articulate, thoughtful gentleman with a refined narrative cadence.',
      gender: 'Male',
      base: 'Fenrir',
      prompt: 'Distinguished middle-aged British storyteller, articulate, calm, atmospheric and nostalgic'
    }
  ];

  const handleApplyArchetype = (arch: typeof archetypes[0]) => {
    setSelectedArchetype(arch.id);
    setVoiceName(arch.title);
    setGender(arch.gender as any);
    setBaseVoice(arch.base as any);
    setToneDescription(arch.prompt);
  };

  const handleCloneFromElevenLabsUrl = async () => {
    if (!elevenLabsUrl.trim()) return;
    setIsCloningUrl(true);
    setUrlCloneError(null);
    try {
      const response = await fetch('/api/voice/clone-elevenlabs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: elevenLabsUrl.trim() }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to clone voice from ElevenLabs URL.');
      }

      setClonedFromUrlResult(data);
      setVoiceName(data.voice.name);
      setGender(data.voice.gender);
      setAccent(data.voice.accent);
      setBaseVoice(data.voice.baseVoice);
      setToneDescription(data.voice.tonePrompt);

      // Register into available voices
      onVoiceCreated(data.voice);
      setCloneSuccess(true);
      setTimeout(() => setCloneSuccess(false), 4000);
    } catch (err: any) {
      console.error('URL clone error:', err);
      setUrlCloneError(err.message || 'Could not fetch or clone voice from this URL.');
    } finally {
      setIsCloningUrl(false);
    }
  };

  const togglePreviewPlay = () => {
    if (!previewAudioRef.current) return;
    if (isPlayingPreview) {
      previewAudioRef.current.pause();
      setIsPlayingPreview(false);
    } else {
      previewAudioRef.current.play().then(() => setIsPlayingPreview(true)).catch(() => {});
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;
    setUploadError(null);
    setUploadedFile(file);
    const audioUrl = URL.createObjectURL(file);
    setUploadedAudioUrl(audioUrl);
    setIsAnalyzingFile(true);

    try {
      // Read file as base64
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = (reader.result as string).split(',')[1];
        try {
          const res = await fetch('/api/voice/analyze-audio', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              audioBase64: base64Data,
              mimeType: file.type || 'audio/wav',
              fileName: file.name
            })
          });

          const data = await res.json();
          if (data.analysis) {
            setAnalysisDetails(data.analysis);
            if (data.analysis.suggestedName) {
              setVoiceName(data.analysis.suggestedName);
            }
            if (data.analysis.detectedGender) {
              setGender(data.analysis.detectedGender);
            }
            if (data.analysis.recommendedBaseVoice) {
              setBaseVoice(data.analysis.recommendedBaseVoice);
            }
            if (data.analysis.suggestedPrompt) {
              setToneDescription(data.analysis.suggestedPrompt);
            }
          }
        } catch (err: any) {
          console.error('Audio file analysis error:', err);
          setUploadError('Failed to analyze audio file. Using fallback profile.');
        } finally {
          setIsAnalyzingFile(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      console.error('File read error:', err);
      setIsAnalyzingFile(false);
      setUploadError('Could not process audio file.');
    }
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        const url = URL.createObjectURL(blob);
        setAudioBlobUrl(url);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);
      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Microphone error:', err);
      alert('Could not access microphone. You can still clone using the Voice Archetype and Audio Profile builder!');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const handleCreateClonedVoice = () => {
    const avatarUrl =
      gender === 'Male'
        ? 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80'
        : 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80';

    const newVoice: VoiceConfig = {
      id: `clone-${Date.now()}`,
      name: voiceName.trim() || 'Custom Cloned Voice',
      gender,
      description: toneDescription,
      avatar: avatarUrl,
      accent,
      category: 'Storyteller',
      isCloned: true,
      source: 'Custom Cloned',
      baseVoice,
      tonePrompt: toneDescription
    };

    onVoiceCreated(newVoice);
    setCloneSuccess(true);
    setTimeout(() => setCloneSuccess(false), 3500);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Instant Voice Clone & Persona Synthesizer
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Clone Any Voice & Storytelling Persona
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Create ElevenLabs-style warm middle-aged voices, clone vocal textures, or synthesize new custom voice profiles.
            </p>
          </div>

          <div className="flex flex-wrap items-center bg-slate-950 border border-slate-800 rounded-xl p-1 text-xs gap-1">
            <button
              onClick={() => setCloneMode('elevenlabs-url')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                cloneMode === 'elevenlabs-url'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Link2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Clone from ElevenLabs Link</span>
            </button>
            <button
              onClick={() => setCloneMode('upload')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                cloneMode === 'upload'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Audio</span>
            </button>
            <button
              onClick={() => setCloneMode('profile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                cloneMode === 'profile'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Voice Archetypes</span>
            </button>
            <button
              onClick={() => setCloneMode('record')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                cloneMode === 'record'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Mic Record</span>
            </button>
          </div>
        </div>

        {/* Clone from ElevenLabs Link Section */}
        {cloneMode === 'elevenlabs-url' && (
          <div className="space-y-4 bg-slate-950/70 border border-indigo-500/20 rounded-2xl p-5 shadow-lg">
            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <label className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-cyan-400" />
                  ElevenLabs Voice URL or Voice ID
                </label>
                <span className="text-[11px] text-cyan-400 font-mono">
                  Direct Neural Acoustic Cloning
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-3">
                Paste any ElevenLabs voice link. The engine extracts the acoustic identity, timbre profile, and optimal baseline for Gemini TTS.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={elevenLabsUrl}
                  onChange={(e) => setElevenLabsUrl(e.target.value)}
                  placeholder="https://elevenlabs.io/voices/UmQN7jS1Ee8B1czsUtQh"
                  className="w-full bg-slate-900 border border-slate-700 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 placeholder-slate-500 font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <button
                type="button"
                onClick={handleCloneFromElevenLabsUrl}
                disabled={isCloningUrl || !elevenLabsUrl.trim()}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-md shadow-indigo-600/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"
              >
                {isCloningUrl ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Cloning Voice...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                    <span>Clone & Import Voice</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Link Badge for Theo Silk */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Target Voice:</span>
              <button
                type="button"
                onClick={() => setElevenLabsUrl('https://elevenlabs.io/voices/UmQN7jS1Ee8B1czsUtQh')}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 font-mono text-[11px] transition-colors"
              >
                <span>Theo Silk (UmQN7jS1Ee8B1czsUtQh)</span>
                <ExternalLink className="w-3 h-3 text-indigo-400" />
              </button>
            </div>

            {urlCloneError && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{urlCloneError}</span>
              </div>
            )}

            {/* Cloned Voice Card Card */}
            {clonedFromUrlResult && (
              <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-4 space-y-3 mt-3 shadow-lg">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={clonedFromUrlResult.voice.avatar}
                      alt={clonedFromUrlResult.voice.name}
                      className="w-12 h-12 rounded-xl object-cover ring-2 ring-emerald-500/30"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">
                          {clonedFromUrlResult.voice.name}
                        </h4>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          Cloned Successfully
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                        <span className="text-indigo-400 font-mono">{clonedFromUrlResult.voice.accent}</span>
                        <span>•</span>
                        <span>{clonedFromUrlResult.voice.gender}</span>
                        <span>•</span>
                        <span className="font-mono text-cyan-400">Base: {clonedFromUrlResult.voice.baseVoice}</span>
                      </div>
                    </div>
                  </div>

                  {clonedFromUrlResult.previewAudioUrl && (
                    <div className="flex items-center gap-2">
                      <audio
                        ref={previewAudioRef}
                        src={clonedFromUrlResult.previewAudioUrl}
                        onEnded={() => setIsPlayingPreview(false)}
                      />
                      <button
                        type="button"
                        onClick={togglePreviewPlay}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
                      >
                        {isPlayingPreview ? (
                          <>
                            <Square className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                            <span>Stop Sample</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                            <span>Play Sample</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                <p className="text-xs text-slate-300 italic border-l-2 border-indigo-500/50 pl-3 py-0.5">
                  "{clonedFromUrlResult.voice.description}"
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800 text-[11px]">
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="text-slate-400">Recommended ElevenLabs Settings:</span>
                    <span className="font-mono text-cyan-300">{clonedFromUrlResult.recommendedSettings.speed}x Speed</span>
                    <span>•</span>
                    <span className="font-mono text-emerald-300">{clonedFromUrlResult.recommendedSettings.stability}% Stability</span>
                    <span>•</span>
                    <span className="font-mono text-indigo-300">{clonedFromUrlResult.recommendedSettings.similarity}% Similarity</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onVoiceCreated(clonedFromUrlResult.voice);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Select & Go to Generator</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Upload Audio File Section */}
        {cloneMode === 'upload' && (
          <div className="space-y-4">
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-800 hover:border-indigo-500/70 bg-slate-950/60 hover:bg-slate-950 rounded-2xl p-8 text-center cursor-pointer transition-all group flex flex-col items-center justify-center space-y-3"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*,.wav,.mp3,.m4a,.aac,.ogg,.flac"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
              />

              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6" />
              </div>

              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {uploadedFile ? uploadedFile.name : 'Upload Audio File to Clone Voice'}
                </h4>
                <p className="text-xs text-slate-400 mt-1 max-w-md">
                  Drop any clear voice clip, story sample, or ElevenLabs speech sample (.wav, .mp3, .m4a). 5–30 seconds works best.
                </p>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                <span>Supports MP3, WAV, M4A, AAC</span>
                <span>•</span>
                <span>Up to 25MB</span>
              </div>
            </div>

            {/* Uploaded Audio Preview Player & Analysis */}
            {uploadedAudioUrl && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center shrink-0">
                    <Volume2 className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-white truncate">
                      {uploadedFile?.name}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {uploadedFile ? `${(uploadedFile.size / 1024 / 1024).toFixed(2)} MB` : ''}
                    </p>
                  </div>
                </div>

                <audio controls src={uploadedAudioUrl} className="h-8 max-w-xs" />
              </div>
            )}

            {isAnalyzingFile && (
              <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs flex items-center gap-2 animate-pulse">
                <Wand2 className="w-4 h-4 animate-spin text-cyan-300" />
                <span>Extracting vocal resonance, middle-aged warmth, timbre, and acoustic cadence...</span>
              </div>
            )}

            {analysisDetails && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-400">
                  <Check className="w-4 h-4" />
                  <span>Acoustic Profile Extracted Successfully</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-300 pt-1">
                  <div>
                    <span className="text-slate-500 block">Gender:</span>
                    <span className="font-semibold text-white">{analysisDetails.detectedGender}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Age Profile:</span>
                    <span className="font-semibold text-white">{analysisDetails.detectedAge}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Base Engine:</span>
                    <span className="font-semibold text-indigo-300">{analysisDetails.recommendedBaseVoice}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Timbre:</span>
                    <span className="font-semibold text-white truncate">{analysisDetails.timbre}</span>
                  </div>
                </div>
              </div>
            )}

            {uploadError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                {uploadError}
              </div>
            )}
          </div>
        )}

        {/* Popular Warm Storytelling Archetypes */}
        {cloneMode === 'profile' && (
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Wand2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Select Popular Voice Archetype</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {archetypes.map((arch) => {
              const isSelected = selectedArchetype === arch.id;
              return (
                <div
                  key={arch.id}
                  onClick={() => handleApplyArchetype(arch)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-indigo-950/40 border-indigo-500/60 ring-1 ring-indigo-500/30'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-300 font-mono">
                        {arch.gender}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] text-emerald-400 font-bold">Selected</span>
                      )}
                    </div>
                    <h5 className="text-xs font-bold text-white mb-1">{arch.title}</h5>
                    <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-3">
                      {arch.desc}
                    </p>
                  </div>

                  <div className="text-[10px] text-slate-500 font-mono mt-3 pt-2 border-t border-slate-800/80">
                    Acoustic Base: {arch.base}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        )}

        {/* Microphone Recording Option */}
        {cloneMode === 'record' && (
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Mic className="w-4 h-4 text-rose-500" />
                  Voice Sample Recording & Acoustic Analysis
                </h4>
                <p className="text-xs text-slate-400">
                  Read a sample paragraph for 5–15 seconds to clone rhythm, pitch, and cadence.
                </p>
              </div>

              {isRecording && (
                <div className="flex items-center gap-2 text-rose-400 text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  <span>Recording: {recordingSeconds}s</span>
                </div>
              )}
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800/80 text-xs text-slate-300 italic leading-relaxed">
              "Once upon a quiet autumn twilight, the grandfather clock in the quiet hall struck seven, reminding us that every story has a beginning."
            </div>

            <div className="flex items-center gap-3">
              {!isRecording ? (
                <button
                  onClick={startRecording}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-rose-600/20 active:scale-95 transition-all"
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>Start Mic Recording</span>
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg active:scale-95 transition-all"
                >
                  <Square className="w-3.5 h-3.5 fill-white" />
                  <span>Stop & Process Sample</span>
                </button>
              )}

              {audioBlobUrl && (
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
                  <Check className="w-4 h-4" />
                  <span>Voice sample analyzed & timbre profile extracted!</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Customization Details Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Cloned Voice Name
            </label>
            <input
              type="text"
              value={voiceName}
              onChange={(e) => setVoiceName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              placeholder="e.g. Adam (Warm Storyteller)"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Gender & Acoustic Base
            </label>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              <select
                value={baseVoice}
                onChange={(e) => setBaseVoice(e.target.value as any)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Charon">Charon (Deep & Resonant)</option>
                <option value="Fenrir">Fenrir (Smooth & Grounded)</option>
                <option value="Kore">Kore (Warm & Natural)</option>
                <option value="Zephyr">Zephyr (Crisp & Articulate)</option>
                <option value="Puck">Puck (Lively & Dynamic)</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            Voice Cadence & Storytelling Prompt Directive
          </label>
          <textarea
            rows={3}
            value={toneDescription}
            onChange={(e) => setToneDescription(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500 font-sans leading-relaxed resize-none"
            placeholder="Describe the tone, age, accent, emotion, and pace..."
          />
        </div>

        {cloneSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Cloned voice added to your active Voice Cast! You can now select it in the Speech Generator.</span>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={handleCreateClonedVoice}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/25 active:scale-95 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-emerald-200" />
            <span>Create & Activate Cloned Voice</span>
          </button>
        </div>
      </div>
    </div>
  );
};
