import { VoiceConfig, VoicePreset } from '../types/voice';

export const VOICES: VoiceConfig[] = [
  {
    id: 'Chuck-Miller',
    name: 'Chuck Miller (ElevenLabs Deep & Raspy)',
    gender: 'Male',
    description: 'The iconic deep, raspy, seasoned American voice from ElevenLabs. Gritty, weathered baritone with authentic gravitas for Westerns, thrillers, hardboiled narration, and gritty character reads.',
    avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=200&q=80',
    accent: 'Deep Raspy American',
    category: 'Storyteller',
    isCloned: true,
    source: 'ElevenLabs Preset',
    baseVoice: 'Charon',
    tonePrompt: 'Deep raspy American male voice, gritty weathered baritone texture, authentic American drawl, deliberate narrative cadence with seasoned gravitas, gravelly resonance'
  },
  {
    id: 'Adam-Storyteller',
    name: 'Adam (ElevenLabs Warm Storyteller)',
    gender: 'Male',
    description: 'The iconic deep, warm, middle-aged narrative voice from ElevenLabs. Textured, soothing, and resonant for bedtime stories, audiobooks, and documentaries.',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    accent: 'Warm American Mid-Atlantic',
    category: 'Storyteller',
    isCloned: true,
    source: 'ElevenLabs Preset',
    baseVoice: 'Charon',
    tonePrompt: 'Middle-aged warm narrative storyteller, rich baritone, gentle cadence, comforting and wise, classic audiobook narrator'
  },
  {
    id: 'Brian-MiddleAged',
    name: 'Brian (ElevenLabs Deep Narrative)',
    gender: 'Male',
    description: 'Middle-aged, thoughtful, and resonant voice with natural pauses and warm baritone inflections.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    accent: 'Warm British/Transatlantic',
    category: 'Storyteller',
    isCloned: true,
    source: 'ElevenLabs Preset',
    baseVoice: 'Fenrir',
    tonePrompt: 'Middle-aged warm British gentleman, rich storyteller tone, articulate, calm and atmospheric'
  },
  {
    id: 'Kore',
    name: 'Kore',
    gender: 'Female',
    description: 'Warm, balanced, natural, and crystal clear. Perfect for audiobooks, guides, and corporate videos.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    accent: 'Neutral Global',
    category: 'Warm',
    source: 'Gemini Studio',
    baseVoice: 'Kore'
  },
  {
    id: 'Puck',
    name: 'Puck',
    gender: 'Male',
    description: 'Dynamic, friendly, engaging, and animated. Ideal for podcasts, game characters, and explainer reels.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    accent: 'Expressive American',
    category: 'Energetic',
    source: 'Gemini Studio',
    baseVoice: 'Puck'
  },
  {
    id: 'Zephyr',
    name: 'Zephyr',
    gender: 'Female',
    description: 'Crisp, articulate, soothing, and sophisticated. Excellent for meditations, tech narration, and UI voices.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    accent: 'Polished Studio',
    category: 'Conversational',
    source: 'Gemini Studio',
    baseVoice: 'Zephyr'
  },
  {
    id: 'Charon',
    name: 'Charon',
    gender: 'Male',
    description: 'Deep, resonant, cinematic, and authoritative. Superb for movie trailers, documentaries, and drama.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    accent: 'Cinematic Deep',
    category: 'Authoritative',
    source: 'Gemini Studio',
    baseVoice: 'Charon'
  },
  {
    id: 'Fenrir',
    name: 'Fenrir',
    gender: 'Male',
    description: 'Confident, smooth, grounded, and modern. Great for tech keynotes, commercial ads, and news.',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
    accent: 'Neutral Commercial',
    category: 'Narrator',
    source: 'Gemini Studio',
    baseVoice: 'Fenrir'
  }
];

export const VOICE_PRESETS: VoicePreset[] = [
  {
    id: 'elevenlabs-chuck-miller-story',
    title: 'Chuck Miller - Deep, Raspy, American (ElevenLabs)',
    text: 'Out on the high desert plains, nightfall comes without an apology. The engine ticks cold under the hood, and the asphalt stretches out into the dark like a ribbon into nowhere. Out here, a man remembers what he was running from.',
    recommendedVoice: 'Chuck-Miller',
    style: 'Deep raspy American baritone, gritty and weathered gravitas, deliberate cinematic storytelling cadence',
    tag: 'ElevenLabs'
  },
  {
    id: 'elevenlabs-adam-story',
    title: 'Warm Middle-Aged Storytelling (ElevenLabs)',
    text: 'It was a quiet autumn evening when the old train finally pulled into the station. The rain had softened to a gentle mist, and through the amber streetlamps, memories of a forgotten summer returned like an old friend.',
    recommendedVoice: 'Adam-Storyteller',
    style: 'Warm, deep, middle-aged storytelling narrator with comforting pauses and rich baritone cadence',
    tag: 'ElevenLabs'
  },
  {
    id: 'intro',
    title: 'Studio Welcome Greeting',
    text: 'Welcome to VoxStudio, the premier AI speech to voice generation platform. Powered by Gemini TTS, you can synthesize studio-quality speech with lifelike human emotion in seconds.',
    recommendedVoice: 'Kore',
    style: 'Warm, welcoming and professional',
    tag: 'Welcome'
  },
  {
    id: 'nature-documentary',
    title: 'Scenic Nature Documentary',
    text: 'Dawn breaks over the Sundarbans mangrove wilderness. Kingfishers sweep across the emerald river, and mist rolls through the ancient canopies in complete, serene silence.',
    recommendedVoice: 'Charon',
    style: 'Deep, cinematic, contemplative documentary narrator',
    tag: 'Nature'
  },
  {
    id: 'tech-launch',
    title: 'Modern Product Announcement',
    text: 'Today, we are thrilled to unveil our next-generation neural voice architecture. Zero latency, hyper-expressive cadence, and instant studio deployment across every screen.',
    recommendedVoice: 'Fenrir',
    style: 'Confident, inspiring tech keynote speaker',
    tag: 'Tech'
  },
  {
    id: 'meditation',
    title: 'Mindful Breathing & Calm',
    text: 'Gently close your eyes. Take a deep, slow breath in through your nose, hold for a brief moment, and exhale completely. Let any tension melt away into stillness.',
    recommendedVoice: 'Zephyr',
    style: 'Soft, whispery, serene meditation instructor',
    tag: 'Wellness'
  },
  {
    id: 'hype-podcast',
    title: 'Podcast Teaser Intro',
    text: "What is going on everyone! Welcome back to the show! Today we have an unbelievable episode lined up that is going to completely blow your mind.",
    recommendedVoice: 'Puck',
    style: 'High-energy, upbeat podcast host',
    tag: 'Podcast'
  }
];

export const STYLE_PROMPTS = [
  'Natural, clear and friendly',
  'Deep, dramatic and cinematic',
  'Warm, soothing bedtime storyteller',
  'Fast-paced, energetic sports announcer',
  'Professional news anchor with crisp diction',
  'Intimate, soft whisper and meditative',
  'Sarcastic and humorous comedy host'
];
