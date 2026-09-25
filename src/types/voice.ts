export interface VoiceConfig {
  id: string;
  name: string;
  gender: 'Female' | 'Male';
  description: string;
  avatar: string;
  accent?: string;
  category: 'Narrator' | 'Conversational' | 'Warm' | 'Authoritative' | 'Energetic' | 'Storyteller';
  isCloned?: boolean;
  source?: 'Gemini Studio' | 'ElevenLabs Preset' | 'Custom Cloned';
  baseVoice?: string;
  pitchShift?: number;
  tonePrompt?: string;
}

export interface ElevenLabsVoiceSettings {
  speed: number;             // e.g. 0.70x to 1.50x, default: 1.00
  stability: number;         // 0% - 100%, default: 50%
  similarity: number;        // 0% - 100%, default: 75%
  styleExaggeration: number; // 0% - 100%, default: 15%
}

export const DEFAULT_VOICE_SETTINGS: ElevenLabsVoiceSettings = {
  speed: 1.0,
  stability: 50,
  similarity: 75,
  styleExaggeration: 15
};

export interface GenerationHistoryItem {
  id: string;
  text: string;
  voice: string;
  model: string;
  style?: string;
  audioUrl: string;
  timestamp: string;
  duration?: number;
  charCount: number;
  settings?: ElevenLabsVoiceSettings;
}

export interface DialogueLine {
  id: string;
  speaker: 'Speaker 1' | 'Speaker 2';
  text: string;
  style?: string;
}

export interface VoicePreset {
  id: string;
  title: string;
  text: string;
  recommendedVoice: string;
  style: string;
  tag: string;
}
