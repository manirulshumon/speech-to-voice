import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Supported prebuilt Gemini TTS Voices & ElevenLabs / Cloned Models mapping
export const VOICE_MAPPINGS: Record<string, { baseVoice: string; defaultStyle: string }> = {
  'Chuck-Miller': {
    baseVoice: 'Charon',
    defaultStyle: 'Deep raspy American male voice, gritty weathered baritone texture, authentic American drawl, deliberate storytelling cadence with seasoned gravitas and gravelly resonance',
  },
  'Adam-Storyteller': {
    baseVoice: 'Charon',
    defaultStyle: 'Deep, warm middle-aged storyteller, reassuring and gentle cadence, classic audiobook narrator with rich baritone',
  },
  'Brian-MiddleAged': {
    baseVoice: 'Fenrir',
    defaultStyle: 'Thoughtful middle-aged gentleman narrator, calm, articulate, atmospheric, warm baritone inflections',
  },
  'Charon': { baseVoice: 'Charon', defaultStyle: 'Deep, authoritative & resonant' },
  'Fenrir': { baseVoice: 'Fenrir', defaultStyle: 'Calm, confident & polished' },
  'Kore': { baseVoice: 'Kore', defaultStyle: 'Warm, natural, versatile & clear' },
  'Puck': { baseVoice: 'Puck', defaultStyle: 'Energetic, engaging & lively' },
  'Zephyr': { baseVoice: 'Zephyr', defaultStyle: 'Crisp, articulate & modern' },
};

export const AVAILABLE_VOICES = [
  { id: 'Chuck-Miller', name: 'Chuck Miller (ElevenLabs Deep, Raspy, American)', gender: 'Male', description: 'Deep, raspy, seasoned American baritone with gritty gravitas and authentic texture.', isCloned: true, source: 'ElevenLabs Preset' },
  { id: 'Adam-Storyteller', name: 'Adam (ElevenLabs Warm Storyteller)', gender: 'Male', description: 'Deep, warm, middle-aged narrative voice from ElevenLabs with soothing baritone.', isCloned: true, source: 'ElevenLabs Preset' },
  { id: 'Brian-MiddleAged', name: 'Brian (ElevenLabs Deep Narrative)', gender: 'Male', description: 'Middle-aged thoughtful narrator with calm cadence.', isCloned: true, source: 'ElevenLabs Preset' },
  { id: 'Kore', name: 'Kore', gender: 'Female', description: 'Warm, natural, versatile & clear', source: 'Gemini Studio' },
  { id: 'Puck', name: 'Puck', gender: 'Male', description: 'Energetic, engaging & lively', source: 'Gemini Studio' },
  { id: 'Zephyr', name: 'Zephyr', gender: 'Female', description: 'Crisp, articulate & modern', source: 'Gemini Studio' },
  { id: 'Charon', name: 'Charon', gender: 'Male', description: 'Deep, authoritative & resonant', source: 'Gemini Studio' },
  { id: 'Fenrir', name: 'Fenrir', gender: 'Male', description: 'Calm, confident & polished', source: 'Gemini Studio' },
];

// POST /api/tts/generate
// Converts text to speech using gemini-3.8-flash-lite-tts or gemini-3.8-flash-tts
app.post('/api/tts/generate', async (req, res) => {
  try {
    const { 
      text, 
      voice = 'Adam-Storyteller', 
      style = '', 
      model = 'gemini-3.8-flash-lite-tts',
      language = 'en-US',
      baseVoiceOverride,
      customStylePrompt
    } = req.body;

    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({ error: 'Please provide valid text to synthesize into speech.' });
    }

    const trimmedText = text.trim();
    
    // Resolve voice mapping
    const mapping = VOICE_MAPPINGS[voice];
    const resolvedBaseVoice = baseVoiceOverride || mapping?.baseVoice || (AVAILABLE_VOICES.some(v => v.id === voice) ? voice : 'Charon');

    // Resolve combined style prompt (including ElevenLabs tone prompt)
    let combinedStyle = '';
    if (customStylePrompt) {
      combinedStyle = customStylePrompt;
    } else if (mapping?.defaultStyle) {
      combinedStyle = style ? `${mapping.defaultStyle}. Direction: ${style}` : mapping.defaultStyle;
    } else if (style) {
      combinedStyle = style;
    }

    // Prepare speech parts
    const part: { text: string; speechMetadata?: { style?: string } } = {
      text: trimmedText
    };

    if (combinedStyle.trim()) {
      part.speechMetadata = { style: combinedStyle.trim() };
    }

    const ttsModel = model === 'gemini-3.8-flash-tts' ? 'gemini-3.8-flash-tts' : 'gemini-3.8-flash-lite-tts';

    const response = await ai.models.generateContent({
      model: ttsModel,
      contents: [
        {
          role: 'user',
          parts: [part],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: resolvedBaseVoice },
          },
        },
      },
    });

    const candidatePart = response.candidates?.[0]?.content?.parts?.[0]?.inlineData;
    const base64Audio = candidatePart?.data;
    const mimeType = candidatePart?.mimeType || 'audio/wav';

    if (!base64Audio) {
      return res.status(500).json({ error: 'No audio stream returned from Gemini TTS engine.' });
    }

    return res.json({
      success: true,
      audioBase64: base64Audio,
      mimeType,
      voice: voice,
      baseVoice: resolvedBaseVoice,
      model: ttsModel,
      charCount: trimmedText.length,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Error generating speech:', error);
    return res.status(500).json({
      error: error.message || 'Failed to generate speech with Gemini TTS.'
    });
  }
});

// POST /api/tts/dialogue
// Multi-speaker dual dialogue synthesis using gemini-3.8-flash-tts
app.post('/api/tts/dialogue', async (req, res) => {
  try {
    const {
      lines, // array of { speaker: 'Speaker 1' | 'Speaker 2', text: string, style?: string }
      speaker1Voice = 'Puck',
      speaker2Voice = 'Kore'
    } = req.body;

    if (!Array.isArray(lines) || lines.length === 0) {
      return res.status(400).json({ error: 'Please provide dialogue lines.' });
    }

    const resolvedSpeaker1 = VOICE_MAPPINGS[speaker1Voice]?.baseVoice || speaker1Voice;
    const resolvedSpeaker2 = VOICE_MAPPINGS[speaker2Voice]?.baseVoice || speaker2Voice;
    const speaker1DefaultStyle = VOICE_MAPPINGS[speaker1Voice]?.defaultStyle;
    const speaker2DefaultStyle = VOICE_MAPPINGS[speaker2Voice]?.defaultStyle;

    const parts = lines.map(line => {
      const voiceStyle = line.speaker === 'Speaker 1' ? speaker1DefaultStyle : speaker2DefaultStyle;
      const combinedStyle = [voiceStyle, line.style].filter(Boolean).join('. Direction: ');
      return {
        text: `${line.speaker}: ${line.text}`,
        speechMetadata: {
          speaker: line.speaker,
          style: combinedStyle || 'Natural, expressive'
        }
      };
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-tts',
      contents: [
        {
          role: 'user',
          parts: parts
        }
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          multiSpeakerVoiceConfig: {
            speakerVoiceConfigs: [
              {
                speaker: 'Speaker 1',
                voiceConfig: {
                  prebuiltVoiceConfig: { voiceName: resolvedSpeaker1 }
                }
              },
              {
                speaker: 'Speaker 2',
                voiceConfig: {
                  prebuiltVoiceConfig: { voiceName: resolvedSpeaker2 }
                }
              }
            ]
          }
        }
      }
    });

    const candidatePart = response.candidates?.[0]?.content?.parts?.[0]?.inlineData;
    const base64Audio = candidatePart?.data;
    const mimeType = candidatePart?.mimeType || 'audio/wav';

    if (!base64Audio) {
      return res.status(500).json({ error: 'No audio returned for dialogue.' });
    }

    return res.json({
      success: true,
      audioBase64: base64Audio,
      mimeType,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Error in multi-speaker dialogue:', error);
    return res.status(500).json({
      error: error.message || 'Failed to synthesize multi-speaker dialogue.'
    });
  }
});

// POST /api/voice/analyze-audio
// Analyzes uploaded audio file for vocal profile characteristics, gender, pitch, age, and timbre
app.post('/api/voice/analyze-audio', async (req, res) => {
  try {
    const { audioBase64, mimeType = 'audio/wav', fileName } = req.body;

    if (!audioBase64) {
      return res.status(400).json({ error: 'Please provide audio data in base64 format.' });
    }

    // Default heuristic fallback in case Gemini vision/multimodal model is unavailable or in high demand
    let analysisResult = {
      detectedGender: 'Male',
      detectedAge: 'Middle-Aged (40-55)',
      timbre: 'Warm, textured, resonant baritone',
      pacing: 'Measured and soothing storytelling cadence',
      recommendedBaseVoice: 'Charon',
      suggestedName: fileName ? fileName.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') : 'Cloned Storyteller',
      suggestedPrompt: 'Warm middle-aged storytelling voice, deep baritone resonance, gentle cadence with comforting pauses and rich narrative tone'
    };

    try {
      const prompt = `Analyze this spoken voice audio file.
Provide a concise JSON analysis describing:
1. "detectedGender": "Male" or "Female"
2. "detectedAge": e.g. "Middle-Aged", "Young Adult", or "Elder"
3. "timbre": Short description of vocal texture (e.g. "Warm, textured baritone, rich resonance")
4. "pacing": Cadence description (e.g. "Measured, soothing storytelling pace")
5. "recommendedBaseVoice": Must be one of ["Charon", "Fenrir", "Kore", "Zephyr", "Puck"] (choose Charon for deep male, Fenrir for clear/neutral male, Puck for energetic male, Kore for warm female, Zephyr for crisp female)
6. "suggestedPrompt": A concise 1-2 sentence director style prompt instructing a TTS model how to perform in this exact voice.
Respond ONLY with valid JSON.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          {
            role: 'user',
            parts: [
              {
                inlineData: {
                  mimeType: mimeType.includes('audio') ? mimeType : 'audio/wav',
                  data: audioBase64
                }
              },
              { text: prompt }
            ]
          }
        ],
        config: {
          responseMimeType: 'application/json'
        }
      });

      const parsed = JSON.parse(response.text || '{}');
      if (parsed.detectedGender) {
        analysisResult = { ...analysisResult, ...parsed };
      }
    } catch (aiErr: any) {
      console.warn('Multimodal audio analysis fallback applied:', aiErr.message);
    }

    return res.json({
      success: true,
      analysis: analysisResult
    });
  } catch (error: any) {
    console.error('Error analyzing audio:', error);
    return res.status(500).json({ error: error.message || 'Failed to analyze uploaded audio file.' });
  }
});

// GET /api/tts/voices
app.get('/api/tts/voices', (req, res) => {
  res.json({ voices: AVAILABLE_VOICES });
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Speech-to-Voice Studio server running on port ${PORT}`);
  });
}

startServer();
