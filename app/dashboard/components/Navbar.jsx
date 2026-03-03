'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-panel px-5 py-2.5">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan to-purple flex items-center justify-center">
            <span className="text-white font-bold text-sm">L</span>
          </div>
          <div>
            <span className="text-sm font-bold text-text-primary tracking-tight">LoRRI<span className="text-cyan">.ai</span></span>
            <span className="block text-[9px] text-text-dim -mt-0.5 tracking-wider">by LogisticsNow</span>
          </div>
        </a>

        {/* Center — Status */}
        <div className="hidden sm:flex items-center gap-2 text-[11px] text-text-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
          Autonomous Freight Layer — All Systems Online
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="text-xs text-text-secondary hover:text-text-primary transition px-3 py-1.5 rounded-lg hover:bg-glass"
          >
            Landing Page
          </a>
          <a
            href="https://lorri.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs px-4 py-2 rounded-xl bg-gradient-to-r from-cyan to-purple text-white font-semibold hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] transition"
          >
            lorri.in <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
