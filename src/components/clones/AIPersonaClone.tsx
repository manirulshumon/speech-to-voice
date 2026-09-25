import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Volume2, 
  Sliders, 
  Sparkles, 
  UserPlus, 
  RefreshCcw, 
  Check, 
  Headphones,
  MessageSquare
} from 'lucide-react';
import { AI_PERSONAS } from '../../data/clonesData';
import { AIPersona } from '../../types';

interface ChatMessage {
  sender: 'user' | 'persona';
  text: string;
  time: string;
}

export const AIPersonaClone: React.FC = () => {
  const [selectedPersona, setSelectedPersona] = useState<AIPersona>(AI_PERSONAS[0]);
  const [pitch, setPitch] = useState<number>(selectedPersona.pitch);
  const [speed, setSpeed] = useState<number>(selectedPersona.speed);
  const [voiceWarmth, setVoiceWarmth] = useState<'calm' | 'energetic' | 'authoritative'>('calm');
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'persona',
      text: `Hello! I am ${selectedPersona.name}. ${selectedPersona.sampleResponses[0]}`,
      time: 'Just now'
    }
  ]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const handleSelectPersona = (p: AIPersona) => {
    setSelectedPersona(p);
    setPitch(p.pitch);
    setSpeed(p.speed);
    setMessages([
      {
        sender: 'persona',
        text: `Hello! I am ${p.name}, your ${p.role}. How can I assist you today?`,
        time: 'Just now'
      }
    ]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userText, time: now }
    ]);
    setInputMessage('');

    // Generate intelligent simulated response tailored to persona
    setTimeout(() => {
      let reply = '';
      if (selectedPersona.id === 'eco-guide') {
        const bdReplies = [
          `In Bangladesh, nature changes with all 6 seasons! For example, right now the rivers are full, making it ideal for boating in Tanguar Haor or hiking to Sajek Valley.`,
          `If you are interested in photography, the morning golden hour over the Sreemangal tea hills or Kotka in Sundarbans produces world-class captures.`,
          `I always advise travelers to follow Leave No Trace ecotourism principles to keep our pristine forests beautiful.`
        ];
        reply = bdReplies[Math.floor(Math.random() * bdReplies.length)];
      } else if (selectedPersona.id === 'lead-dev') {
        reply = `That architecture approach is sound. By decoupling reactive state from presentation components, our clone achieves sub-16ms render times.`;
      } else {
        reply = `Words carry the resonance of our spirit, much like the gentle rhythm of the autumn rain touching the lotus leaves.`;
      }

      setMessages((prev) => [
        ...prev,
        { sender: 'persona', text: reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);

      // Speak using SpeechSynthesis
      speakText(reply);
    }, 600);
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = pitch;
      utterance.rate = speed;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Digital Persona & Voice Synthesizer
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            AI Persona & Audio Clone Studio
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Synthesize custom conversational clones with voice modulation and dynamic personalities.
          </p>
        </div>

        {/* Persona Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {AI_PERSONAS.map((p) => {
            const isSelected = p.id === selectedPersona.id;
            return (
              <div
                key={p.id}
                onClick={() => handleSelectPersona(p)}
                className={`cursor-pointer p-4 rounded-2xl border transition-all flex items-center gap-4 ${
                  isSelected
                    ? 'bg-indigo-950/40 border-indigo-500/60 shadow-lg shadow-indigo-950/50'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <img
                  src={p.avatar}
                  alt={p.name}
                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-indigo-500/30"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white truncate">{p.name}</h4>
                    {isSelected && <span className="text-[10px] text-indigo-400 font-mono">Active</span>}
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">{p.role}</p>
                  <span className="text-[10px] text-slate-500 font-mono block mt-1">
                    Voice: {p.voiceType}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Workspace: Modulation Controls & Interactive Chat */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Voice Synthesis Parameters */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Sliders className="w-4 h-4 text-indigo-400" />
                Voice Modulation Parameters
              </h3>
            </div>

            {/* Pitch slider */}
            <div>
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5">
                <span>Vocal Pitch</span>
                <span className="font-mono text-indigo-400">{pitch.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min="0.6"
                max="1.5"
                step="0.05"
                value={pitch}
                onChange={(e) => setPitch(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>Deep / Baritone</span>
                <span>Crisp / High</span>
              </div>
            </div>

            {/* Speed slider */}
            <div>
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5">
                <span>Speaking Rate</span>
                <span className="font-mono text-indigo-400">{speed.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min="0.75"
                max="1.4"
                step="0.05"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>Deliberate</span>
                <span>Brisk</span>
              </div>
            </div>

            {/* Personality tags */}
            <div>
              <span className="block text-xs font-semibold text-slate-300 mb-2">Persona Traits</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedPersona.personality.map((trait, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            {/* System Directives preview */}
            <div>
              <span className="block text-xs font-semibold text-slate-300 mb-1.5">System Prompt Directive</span>
              <p className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 leading-relaxed font-mono">
                {selectedPersona.systemPrompt}
              </p>
            </div>

            <button
              onClick={() => speakText(selectedPersona.sampleResponses[0])}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700 transition-all"
            >
              <Headphones className="w-4 h-4 text-indigo-400" />
              <span>Test Voice Audio Preview</span>
            </button>
          </div>

          {/* Right Column: Live Chat Interface */}
          <div className="lg:col-span-2 bg-slate-900/90 rounded-2xl border border-slate-800 flex flex-col h-[560px] overflow-hidden shadow-xl">
            {/* Chat header */}
            <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedPersona.avatar}
                  alt={selectedPersona.name}
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-500/30"
                />
                <div>
                  <h4 className="text-xs font-bold text-white">{selectedPersona.name}</h4>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Online & Synthesizing
                  </span>
                </div>
              </div>

              {isSpeaking && (
                <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-mono">
                  <Volume2 className="w-4 h-4 animate-bounce" />
                  <span>Speaking...</span>
                </div>
              )}
            </div>

            {/* Messages scroll area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-none shadow-md shadow-indigo-600/20'
                        : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-bl-none'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <span className="text-[10px] font-semibold opacity-70">
                        {m.sender === 'user' ? 'You' : selectedPersona.name}
                      </span>
                      <span className="text-[9px] opacity-50 font-mono">{m.time}</span>
                    </div>
                    <p>{m.text}</p>
                    {m.sender === 'persona' && (
                      <button
                        onClick={() => speakText(m.text)}
                        className="mt-2 text-[10px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>Replay audio</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input area */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={`Ask ${selectedPersona.name} about scenery, code, or ideas...`}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-600/30 active:scale-95 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
