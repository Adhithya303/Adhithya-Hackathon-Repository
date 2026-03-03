'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, X, Sparkles, BarChart3, Route, Shield, Zap } from 'lucide-react';

const commands = [
  { label: 'Optimize freight lanes', tag: 'Agent', description: 'Deploy procurement agent on selected corridors', icon: Route },
  { label: 'Show live rate intelligence', tag: 'Data', description: 'Real-time market rates across 50,000+ lanes', icon: BarChart3 },
  { label: 'Run sustainability audit', tag: 'ESG', description: 'Carbon footprint analysis for active routes', icon: Shield },
  { label: 'Predict next disruption', tag: 'AI', description: 'Self-healing logic scans for weather, strikes, congestion', icon: Zap },
  { label: 'Calculate ROI for Q3', tag: 'Finance', description: 'Projected savings and cost reduction forecast', icon: BarChart3 },
  { label: 'Deploy all agents', tag: 'System', description: 'Activate procurement, sustainability, and optimization agents', icon: Sparkles },
];

export default function CommandBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const [insight, setInsight] = useState(null);
  const inputRef = useRef(null);

  const filtered = commands.filter(
    (c) =>
      c.label.toLowerCase().includes(query.toLowerCase()) ||
      c.tag.toLowerCase().includes(query.toLowerCase()) ||
      c.description.toLowerCase().includes(query.toLowerCase())
  );

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Focus input on open
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setSelected(0);
      setInsight(null);
    }
  }, [open]);

  // Keyboard navigation
  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected((s) => Math.min(s + 1, filtered.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)); }
    if (e.key === 'Enter' && filtered[selected]) {
      e.preventDefault();
      runCommand(filtered[selected]);
    }
  };

  const runCommand = (cmd) => {
    setInsight({
      label: cmd.label,
      tag: cmd.tag,
      response: `LoRRI agent "${cmd.tag}" activated → ${cmd.description}. Processing across ₹12.5 Lakh Cr market dataset...`,
    });
    setTimeout(() => setOpen(false), 2000);
  };

  return (
    <>
      {/* Persistent Bottom Trigger */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-3 px-5 py-2.5 rounded-2xl glass-panel border-glass-border hover:border-glass-highlight text-text-muted hover:text-text-secondary transition group"
        >
          <Search className="w-4 h-4" />
          <span className="text-sm">Ask LoRRI anything...</span>
          <kbd className="text-[10px] px-1.5 py-0.5 rounded-md bg-glass border border-glass-border text-text-dim ml-4">⌘K</kbd>
        </button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[101] w-[90%] max-w-xl"
            >
              <div className="glass-panel shadow-[0_24px_80px_rgba(0,0,0,0.5)] overflow-hidden">
                {/* Search Input */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-glass-border">
                  <Search className="w-4 h-4 text-text-dim shrink-0" />
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setSelected(0); }}
                    onKeyDown={onKeyDown}
                    placeholder="Search commands, ask questions..."
                    className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-dim focus:outline-none"
                  />
                  <button onClick={() => setOpen(false)} className="text-text-dim hover:text-text-secondary">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Insight Banner */}
                <AnimatePresence>
                  {insight && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-5 py-3 bg-cyan-dim border-b border-glass-border"
                    >
                      <div className="flex items-center gap-2 text-xs text-cyan">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span className="font-semibold">{insight.label}</span>
                      </div>
                      <p className="text-[11px] text-text-secondary mt-1 font-trace">{insight.response}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Command List */}
                <div className="max-h-[300px] overflow-y-auto py-2">
                  {filtered.map((cmd, i) => {
                    const Icon = cmd.icon;
                    return (
                      <button
                        key={i}
                        onClick={() => runCommand(cmd)}
                        onMouseEnter={() => setSelected(i)}
                        className={`w-full flex items-center gap-3 px-5 py-2.5 text-left transition ${
                          i === selected ? 'bg-glass-highlight' : ''
                        }`}
                      >
                        <Icon className="w-4 h-4 text-text-dim shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-text-primary truncate">{cmd.label}</div>
                          <div className="text-[11px] text-text-dim truncate">{cmd.description}</div>
                        </div>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-glass border border-glass-border text-text-dim uppercase tracking-wider shrink-0">
                          {cmd.tag}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-text-dim opacity-0 group-hover:opacity-100" />
                      </button>
                    );
                  })}
                  {filtered.length === 0 && (
                    <div className="px-5 py-8 text-center text-sm text-text-dim">No commands match "{query}"</div>
                  )}
                </div>

                {/* Footer Hints */}
                <div className="flex items-center gap-4 px-5 py-2.5 border-t border-glass-border text-[10px] text-text-dim">
                  <span>↑↓ Navigate</span>
                  <span>↵ Select</span>
                  <span>Esc Close</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
