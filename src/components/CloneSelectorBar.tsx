import React from 'react';
import { 
  Palmtree, 
  Bot, 
  ShoppingBag, 
  MessageSquareShare, 
  LayoutDashboard, 
  Copy,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { CloneId } from '../types';
import { CLONES_LIST } from '../data/clonesData';

interface CloneSelectorBarProps {
  activeCloneId: CloneId;
  onSelectClone: (id: CloneId) => void;
}

export const CloneSelectorBar: React.FC<CloneSelectorBarProps> = ({
  activeCloneId,
  onSelectClone,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Palmtree':
        return <Palmtree className="w-4 h-4" />;
      case 'Bot':
        return <Bot className="w-4 h-4" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-4 h-4" />;
      case 'MessageSquareShare':
        return <MessageSquareShare className="w-4 h-4" />;
      case 'LayoutDashboard':
        return <LayoutDashboard className="w-4 h-4" />;
      case 'Copy':
      default:
        return <Copy className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full bg-slate-900/90 border-b border-slate-800/80 px-4 py-2 sticky top-[89px] z-30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto no-scrollbar py-0.5">
        <div className="flex items-center gap-1.5 min-w-max">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider pr-2 hidden sm:flex items-center gap-1">
            <span>Clones ({CLONES_LIST.length})</span>
            <ChevronRight className="w-3 h-3 text-slate-500" />
          </div>

          {CLONES_LIST.map((clone) => {
            const isActive = clone.id === activeCloneId;
            return (
              <button
                key={clone.id}
                onClick={() => onSelectClone(clone.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <span className={isActive ? 'text-indigo-400' : 'text-slate-400'}>
                  {getIcon(clone.iconName)}
                </span>
                <span>{clone.name}</span>
                {clone.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                      clone.badge === 'Creator Match'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    }`}
                  >
                    {clone.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
