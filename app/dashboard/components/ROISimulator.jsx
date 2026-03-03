'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Leaf, Zap, Clock, Loader2 } from 'lucide-react';

export default function ROISimulator() {
  const [spend, setSpend] = useState(500_000_000); // ₹50 Cr default
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const formatSliderLabel = (v) => {
    if (v >= 1e9) return `₹${(v / 1e9).toFixed(1)}B`;
    if (v >= 1e7) return `₹${(v / 1e7).toFixed(0)} Cr`;
    if (v >= 1e5) return `₹${(v / 1e5).toFixed(0)} L`;
    return `₹${v.toLocaleString('en-IN')}`;
  };

  const calculate = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/simulator/roi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ annualSpend: spend }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setResult(null);
    }
    setLoading(false);
  }, [spend]);

  const metrics = result
    ? [
        { icon: TrendingUp, label: 'Net Savings', value: result.savings.formatted, color: 'text-cyan', sub: result.savings.rate + ' cost reduction' },
        { icon: Zap, label: 'ROI', value: result.roi.formatted, color: 'text-purple', sub: `on ${result.implementationCost.formatted} investment` },
        { icon: Leaf, label: 'CO₂ Avoided', value: result.sustainability.formatted, color: 'text-green', sub: 'annually' },
        { icon: Clock, label: 'Payback', value: result.payback.description, color: 'text-amber', sub: result.efficiency.rfqSpeed },
      ]
    : [];

  return (
    <section className="relative z-10 px-4 py-20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            ROI <span className="gradient-text">Simulator</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto text-sm">
            See projected savings from LoRRI's autonomous freight layer based on your annual logistics spend.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass-panel p-8"
        >
          {/* Slider */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm text-text-secondary font-medium">Annual Logistics Spend</label>
              <span className="text-xl font-bold gradient-text">{formatSliderLabel(spend)}</span>
            </div>
            <input
              type="range"
              min={10_000_000}
              max={50_000_000_000}
              step={10_000_000}
              value={spend}
              onChange={(e) => setSpend(Number(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-glass-border [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-cyan [&::-webkit-slider-thumb]:to-purple [&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(0,240,255,0.4)]"
            />
            <div className="flex justify-between text-[10px] text-text-dim mt-1">
              <span>₹1 Cr</span>
              <span>₹5,000 Cr</span>
            </div>
          </div>

          {/* Calculate Button */}
          <button
            onClick={calculate}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan to-purple text-white font-semibold text-sm hover:shadow-[0_0_40px_rgba(0,240,255,0.2)] transition disabled:opacity-50 disabled:cursor-wait flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <TrendingUp className="w-4 h-4" />}
            {loading ? 'Calculating...' : 'Calculate ROI'}
          </button>

          {/* Results */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {metrics.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-panel p-4 text-center"
                >
                  <m.icon className={`w-5 h-5 ${m.color} mx-auto mb-2`} />
                  <div className={`text-lg font-bold ${m.color}`}>{m.value}</div>
                  <div className="text-[11px] text-text-secondary mt-0.5">{m.label}</div>
                  <div className="text-[10px] text-text-dim mt-1">{m.sub}</div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* ROI Formula */}
          <div className="mt-6 text-center">
            <p className="text-[10px] text-text-dim font-trace">
              ROI (%) = (Net Gain from AI Investment / Cost of AI Investment) × 100
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
