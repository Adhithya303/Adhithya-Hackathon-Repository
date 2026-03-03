'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-glass-border mt-10">
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan to-purple flex items-center justify-center">
                <span className="text-white font-bold text-xs">L</span>
              </div>
              <span className="text-sm font-bold text-text-primary">LoRRI<span className="text-cyan">.ai</span></span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              The Autonomous Freight Layer by LogisticsNow. AI-native logistics command center powering
              50,000+ lanes with real-time freight intelligence.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-[11px] text-text-dim uppercase tracking-wider font-semibold mb-4">Product</h4>
            <ul className="space-y-2.5">
              {['Procurement Agent', 'Sustainability Agent', 'Self-Healing Logic', 'Rate Intelligence', 'Digital Twin'].map((l) => (
                <li key={l}>
                  <a href="#" className="text-xs text-text-muted hover:text-text-primary transition">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[11px] text-text-dim uppercase tracking-wider font-semibold mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li><a href="https://logisticsnow.in" target="_blank" rel="noopener" className="text-xs text-text-muted hover:text-text-primary transition flex items-center gap-1">LogisticsNow <ExternalLink className="w-2.5 h-2.5" /></a></li>
              <li><a href="https://lorri.in" target="_blank" rel="noopener" className="text-xs text-text-muted hover:text-text-primary transition flex items-center gap-1">lorri.in <ExternalLink className="w-2.5 h-2.5" /></a></li>
              <li><a href="https://procurement.lorri.in" target="_blank" rel="noopener" className="text-xs text-text-muted hover:text-text-primary transition flex items-center gap-1">Procurement Portal <ExternalLink className="w-2.5 h-2.5" /></a></li>
              <li><a href="#" className="text-xs text-text-muted hover:text-text-primary transition">Careers</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-[11px] text-text-dim uppercase tracking-wider font-semibold mb-4">Connect</h4>
            <ul className="space-y-2.5">
              <li><a href="mailto:hello@lorri.in" className="text-xs text-text-muted hover:text-text-primary transition">hello@lorri.in</a></li>
              <li><a href="tel:+912268269999" className="text-xs text-text-muted hover:text-text-primary transition">+91 22 6826 9999</a></li>
              <li className="text-xs text-text-dim">Mumbai, Maharashtra, India</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-glass-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] text-text-dim">© 2026 LogisticsNow Pvt. Ltd. All rights reserved.</span>
          <span className="text-[10px] text-text-dim font-trace">Built with Next.js · React 19 · Framer Motion · Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
}
