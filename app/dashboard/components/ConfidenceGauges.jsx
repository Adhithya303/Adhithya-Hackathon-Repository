'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const confidenceStreams = [
  { label: 'Freight Rate Confidence', agent: 'Procurement', base: 91 },
  { label: 'Demand Forecast Accuracy', agent: 'Optimization', base: 92 },
  { label: 'Route Carbon Score', agent: 'Sustainability', base: 88 },
  { label: 'Disruption Detection', agent: 'Self-Healing', base: 85 },
];

const colorForValue = (v) => {
  if (v >= 90) return 'from-green to-green';
  if (v >= 80) return 'from-cyan to-cyan';
  if (v >= 70) return 'from-amber to-amber';
  return 'from-red to-red';
};

export default function ConfidenceGauges() {
  const [values, setValues] = useState(confidenceStreams.map((s) => s.base));

  useEffect(() => {
    const interval = setInterval(() => {
      setValues((prev) =>
        prev.map((v, i) => {
          const delta = (Math.random() - 0.48) * 3;
          return Math.min(99, Math.max(70, Math.round(v + delta)));
        })
      );
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative z-10 px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            Confidence <span className="gradient-text">Indicators</span>
          </h2>
          <p className="text-text-secondary text-sm max-w-lg mx-auto">
            Real-time certainty levels for AI-driven logistics strategies — the Glass Box shows what the agents know.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {confidenceStreams.map((stream, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-sm font-medium text-text-primary">{stream.label}</div>
                  <div className="text-[10px] text-text-dim uppercase tracking-wider">{stream.agent} Agent</div>
                </div>
                <span className={`text-2xl font-bold ${values[i] >= 90 ? 'text-green' : values[i] >= 80 ? 'text-cyan' : 'text-amber'}`}>
                  {values[i]}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-glass-border overflow-hidden">
                <motion.div
                  animate={{ width: `${values[i]}%` }}
                  transition={{ duration: 1, ease: 'easeInOut' }}
                  className={`h-full rounded-full bg-gradient-to-r ${colorForValue(values[i])}`}
                  style={{
                    boxShadow: values[i] >= 90 ? '0 0 12px rgba(16,185,129,0.4)' : values[i] >= 80 ? '0 0 12px rgba(0,240,255,0.3)' : 'none',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
