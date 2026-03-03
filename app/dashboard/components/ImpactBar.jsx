'use client';

import { motion } from 'framer-motion';
import { Activity, Globe, TrendingDown, Truck, Shield, BarChart3 } from 'lucide-react';

const stats = [
  { icon: Globe, label: 'Active Lanes', value: '50,000+', color: 'text-cyan' },
  { icon: BarChart3, label: 'Market Intelligence', value: '₹12.5L Cr', color: 'text-purple' },
  { icon: TrendingDown, label: 'Cost Reduction', value: '15–25%', color: 'text-green' },
  { icon: Truck, label: 'Rate Accuracy', value: '±5%', color: 'text-amber' },
  { icon: Shield, label: 'Match Ratio', value: '87%', color: 'text-cyan' },
  { icon: Activity, label: 'Asset Utilization', value: '+20%', color: 'text-purple' },
];

export default function ImpactBar() {
  return (
    <section className="relative z-10 px-4 py-14">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="glass-panel p-6"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <s.icon className={`w-5 h-5 ${s.color} mx-auto mb-2 opacity-70`} />
                <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-[11px] text-text-dim uppercase tracking-wider mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
