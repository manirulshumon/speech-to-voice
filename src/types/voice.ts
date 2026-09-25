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
