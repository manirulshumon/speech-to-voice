import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Plus, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  ArrowLeft, 
  Tag, 
  SlidersHorizontal,
  X
} from 'lucide-react';
import { KANBAN_TASKS } from '../../data/clonesData';
import { KanbanTask } from '../../types';

export const KanbanClone: React.FC = () => {
  const [tasks, setTasks] = useState<KanbanTask[]>(KANBAN_TASKS);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newDesc, setNewDesc] = useState<string>('');
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');

  const columns: Array<{ id: KanbanTask['column']; label: string; color: string }> = [
    { id: 'backlog', label: 'Backlog', color: 'border-slate-700' },
    { id: 'in-progress', label: 'In Progress', color: 'border-indigo-500' },
    { id: 'review', label: 'In Review', color: 'border-amber-500' },
    { id: 'done', label: 'Completed', color: 'border-emerald-500' }
  ];

  const moveTask = (taskId: string, direction: 'prev' | 'next') => {
    const colOrder: KanbanTask['column'][] = ['backlog', 'in-progress', 'review', 'done'];
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const currentIndex = colOrder.indexOf(t.column);
          const nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
          if (nextIndex >= 0 && nextIndex < colOrder.length) {
            return { ...t, column: colOrder[nextIndex] };
          }
        }
        return t;
      })
    );
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: KanbanTask = {
      id: `task-${Date.now()}`,
      title: newTitle,
      description: newDesc,
      column: 'backlog',
      priority: newPriority,
      assignee: {
        name: 'Tanvir Lead',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
      },
      dueDate: 'Oct 02',
      tags: ['Sprint', 'Cloner']
    };

    setTasks([...tasks, newTask]);
    setNewTitle('');
    setNewDesc('');
    setIsModalOpen(false);
  };

  const completedCount = tasks.filter((t) => t.column === 'done').length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  const getPriorityColor = (p: string) => {
    switch (p) {
      case 'urgent':
        return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
      case 'high':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'medium':
        return 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30';
      default:
        return 'bg-slate-500/15 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header & Metrics */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <LayoutDashboard className="w-3.5 h-3.5" />
              TaskFlow Sprint Analytics & Board
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Engineering Sprint Dashboard
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Tracking replication milestones, token extraction, and Bangladesh nature asset pipelines.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Progress metric */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 min-w-[180px]">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Sprint Progress</span>
                <span className="font-bold text-emerald-400">{progressPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/25 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Create Task</span>
            </button>
          </div>
        </div>

        {/* Board Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map((col) => {
            const colTasks = tasks.filter((t) => t.column === col.id);
            return (
              <div
                key={col.id}
                className="bg-slate-900/60 rounded-2xl border border-slate-800/80 p-4 flex flex-col min-h-[500px]"
              >
                {/* Column header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full border-2 ${col.color}`} />
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">{col.label}</h4>
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-semibold">
                    {colTasks.length}
                  </span>
                </div>

                {/* Column task items */}
                <div className="space-y-3 flex-1 overflow-y-auto">
                  {colTasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-slate-950 p-4 rounded-xl border border-slate-800/90 hover:border-indigo-500/40 transition-all flex flex-col justify-between gap-3 shadow-md group"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded font-mono uppercase font-bold border ${getPriorityColor(
                              task.priority
                            )}`}
                          >
                            {task.priority}
                          </span>
                          <span className="text-[10px] text-slate-500 flex items-center gap-1 font-mono">
                            <Clock className="w-3 h-3" />
                            {task.dueDate}
                          </span>
                        </div>
                        <h5 className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                          {task.title}
                        </h5>
                        <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                          {task.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={task.assignee.avatar}
                            alt={task.assignee.name}
                            className="w-5 h-5 rounded-full object-cover"
                          />
                          <span className="text-[10px] text-slate-400 truncate max-w-[90px]">
                            {task.assignee.name}
                          </span>
                        </div>

                        {/* Move task arrows */}
                        <div className="flex items-center gap-1">
                          {col.id !== 'backlog' && (
                            <button
                              onClick={() => moveTask(task.id, 'prev')}
                              title="Move back"
                              className="p-1 rounded hover:bg-slate-800 text-slate-500 hover:text-white"
                            >
                              <ArrowLeft className="w-3 h-3" />
                            </button>
                          )}
                          {col.id !== 'done' && (
                            <button
                              onClick={() => moveTask(task.id, 'next')}
                              title="Move forward"
                              className="p-1 rounded hover:bg-slate-800 text-slate-500 hover:text-white"
                            >
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* New Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-base font-bold text-white mb-1">Create Kanban Task</h3>
            <p className="text-xs text-slate-400 mb-4">Add a new action item to the sprint board</p>

            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Optimize audio streaming in Sreemangal"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Details and criteria..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Priority</label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
