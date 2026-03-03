'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Loader2 } from 'lucide-react';

const EXAMPLE_GOALS = [
  'Optimize Q3 Mumbai–Chennai lanes for 15% lower carbon footprint',
  'Find lowest-cost carrier for 200 TEUs Delhi→Mundra this week',
  'Predict demand surge for Bangalore warehouse Q4 2026',
];

export default function HeroGlassBox() {
  const [goal, setGoal] = useState('');
  const [traces, setTraces] = useState([]);
  const [streaming, setStreaming] = useState(false);
  const traceEndRef = useRef(null);

  const scrollToBottom = () => {
    traceEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [traces]);

  const runReasoning = useCallback(async () => {
    const input = goal.trim() || EXAMPLE_GOALS[0];
    setStreaming(true);
    setTraces([]);

    try {
      const res = await fetch('/api/agent/reasoning', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal: input }),
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split('\n');
        buffer = lines.pop(); // keep incomplete line

        for (const line of lines) {
          if (line.trim()) {
            try {
              const step = JSON.parse(line);
              setTraces((prev) => [...prev, step]);
            } catch {}
          }
        }
      }
    } catch (err) {
      setTraces((prev) => [
        ...prev,
        { phase: 'observation', label: 'Error', content: 'Connection to LoRRI agents failed. Retrying...', confidence: 0 },
      ]);
    }

    setStreaming(false);
  }, [goal]);

  const phaseColors = {
    thought: { border: 'border-l-cyan', badge: 'bg-cyan-dim text-cyan', icon: '🧠' },
    action: { border: 'border-l-purple', badge: 'bg-purple-dim text-purple', icon: '⚡' },
    observation: { border: 'border-l-green', badge: 'bg-green-dim text-green', icon: '👁' },
  };

  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-7xl mx-auto">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-glass-border bg-glass text-xs font-medium text-text-secondary mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
            AI-Native Logistics Command Center
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-4">
            Don't just manage freight.
            <br />
            <span className="gradient-text">Deploy agents that solve it.</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            The <strong className="text-text-primary">Global Smart Logistics Grid</strong> — 50,000+ lanes, ₹12.5 Lakh Cr
            real-time intelligence, rates within ±5% of market median.
          </p>
        </motion.div>

        {/* Split Glass Box */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="grid lg:grid-cols-2 gap-0 glass-panel overflow-hidden"
        >
          {/* LEFT — Input */}
          <div className="p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-glass-border flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-cyan" />
              <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">Natural Language Input</span>
            </div>
            <textarea
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder={EXAMPLE_GOALS[0]}
              rows={4}
              className="flex-1 w-full bg-transparent border border-glass-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-dim focus:outline-none focus:border-cyan/30 resize-none font-trace transition"
            />
            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={runReasoning}
                disabled={streaming}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan to-purple text-white font-semibold text-sm hover:shadow-[0_0_30px_rgba(0,240,255,0.25)] transition disabled:opacity-50 disabled:cursor-wait"
              >
                {streaming ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                {streaming ? 'Agents Working...' : 'Deploy Agents'}
              </button>
              <span className="text-[11px] text-text-dim">
                ReAct Loop: Thought → Action → Observation
              </span>
            </div>
            {/* Quick examples */}
            <div className="mt-4 flex flex-wrap gap-2">
              {EXAMPLE_GOALS.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setGoal(g)}
                  className="text-[11px] px-3 py-1.5 rounded-lg border border-glass-border text-text-muted hover:text-cyan hover:border-cyan/20 transition truncate max-w-[260px]"
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT — Reasoning Trace */}
          <div className="p-6 lg:p-8 flex flex-col max-h-[480px]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">Live Reasoning Trace</span>
              {streaming && (
                <span className="flex items-center gap-1.5 text-[11px] text-cyan">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
                  Streaming
                </span>
              )}
            </div>
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              <AnimatePresence mode="popLayout">
                {traces.map((t, i) => {
                  const style = phaseColors[t.phase] || phaseColors.observation;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20, height: 0 }}
                      animate={{ opacity: 1, x: 0, height: 'auto' }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className={`border-l-2 ${style.border} pl-4 py-2`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md ${style.badge}`}>
                          {style.icon} {t.phase}
                        </span>
                        <span className="text-[10px] text-text-dim font-trace">{t.label}</span>
                        {t.confidence > 0 && (
                          <span className="ml-auto text-[10px] text-text-dim">
                            {Math.round(t.confidence * 100)}% conf
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-text-secondary leading-relaxed font-trace">{t.content}</p>
                      {t.duration && (
                        <span className="text-[9px] text-text-dim mt-1 inline-block">{t.duration}</span>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              <div ref={traceEndRef} />
              {traces.length === 0 && !streaming && (
                <div className="flex flex-col items-center justify-center h-full text-center py-12 opacity-40">
                  <Sparkles className="w-8 h-8 text-text-dim mb-3" />
                  <p className="text-sm text-text-dim">Enter a logistics goal and deploy agents to see<br />the ReAct reasoning trace here.</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
