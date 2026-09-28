import React, { useState } from 'react';
import { Copy, Check, FileCode } from 'lucide-react';
import { CloneId } from '../types';

interface CodeViewerProps {
  activeCloneId: CloneId;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ activeCloneId }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const getSourceCode = () => {
    switch (activeCloneId) {
      case 'natural-scene-bd':
        return `// NaturalSceneBDClone.tsx
// Bangladesh Nature & Eco-Tourism Explorer with Web Audio Procedural Soundscapes
import React, { useState, useEffect } from 'react';
import { NATURAL_SPOTS } from '../../data/clonesData';
import { soundEngine } from '../../utils/soundEngine';

export const NaturalSceneBDClone: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeSound, setActiveSound] = useState<string | null>(null);

  const toggleSound = (soundType: 'rain' | 'waves' | 'breeze' | 'birds') => {
    if (activeSound === soundType) {
      soundEngine.stop();
      setActiveSound(null);
    } else {
      soundEngine.play(soundType);
      setActiveSound(soundType);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Bangladesh Scenic Showcase, Soundscape Generator, and Itinerary Estimator */}
    </div>
  );
};`;
      case 'ai-persona-clone':
        return `// AIPersonaClone.tsx
// Digital Persona & Voice Clone Synthesizer
import React, { useState } from 'react';
import { AI_PERSONAS } from '../../data/clonesData';

export const AIPersonaClone: React.FC = () => {
  const [pitch, setPitch] = useState(1.0);
  const [speed, setSpeed] = useState(1.0);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = pitch;
      utterance.rate = speed;
      window.speechSynthesis.speak(utterance);
    }
  };

  return <div className="p-8">AI Voice & Persona Studio</div>;
};`;
      case 'ecommerce-clone':
        return `// EcommerceClone.tsx
// NovaStore Marketplace with Cart, Promo Vouchers & Quick Checkout
import React, { useState } from 'react';
import { ECOMMERCE_PRODUCTS } from '../../data/clonesData';

export const EcommerceClone: React.FC = () => {
  const [cart, setCart] = useState([]);
  return <div className="p-8">Store Catalog & Cart Drawer</div>;
};`;
      case 'social-clone':
        return `// SocialFeedClone.tsx
// Pulse Social Media & Community Feed
import React, { useState } from 'react';
import { SOCIAL_POSTS } from '../../data/clonesData';

export const SocialFeedClone: React.FC = () => {
  const [posts, setPosts] = useState(SOCIAL_POSTS);
  return <div className="p-8">Stories & Feed Timeline</div>;
};`;
      case 'kanban-clone':
        return `// KanbanClone.tsx
// TaskFlow Agile Sprint Board & Metrics
import React, { useState } from 'react';
import { KANBAN_TASKS } from '../../data/clonesData';

export const KanbanClone: React.FC = () => {
  const [tasks, setTasks] = useState(KANBAN_TASKS);
  return <div className="p-8">Kanban Sprint Columns</div>;
};`;
      case 'instant-cloner':
      default:
        return `// InstantClonerTool.tsx
// App Cloner & Code Synthesizer Engine
export const InstantClonerTool = () => {
  // Parsed AST & AST generator
};`;
    }
  };

  const code = getSourceCode();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full bg-slate-950 border-l border-slate-800 flex flex-col font-mono text-xs">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800">
        <div className="flex items-center gap-2 text-slate-300">
          <FileCode className="w-4 h-4 text-indigo-400" />
          <span className="font-semibold text-white">{activeCloneId}.tsx</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy Code'}</span>
        </button>
      </div>

      <pre className="flex-1 p-6 overflow-auto text-indigo-200 leading-relaxed bg-slate-950">
        {code}
      </pre>
    </div>
  );
};
