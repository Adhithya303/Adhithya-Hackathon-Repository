# LoRRI.ai — 1-Page Hackathon Summary

---

## Problem Understanding

India's freight logistics industry — worth **₹12.5 Lakh Crore** — remains fundamentally broken. Over 80% of freight procurement still runs on phone calls, WhatsApp messages, and Excel spreadsheets. Shippers negotiate rates manually across thousands of lanes, have zero visibility into carbon emissions, react to disruptions (weather, strikes, port congestion) only after they've caused damage, and lack any systematic compliance monitoring for GST, e-way bills, or carrier safety. The result: **18–25% cost leakage**, mounting ESG non-compliance risk, and chronic inefficiency at every level of the supply chain. Existing freight-tech solutions digitize paperwork but don't *think* — they automate forms, not decisions.

---

## Proposed Solution

**LoRRI.ai** (Logistics Real-time Reasoning Intelligence) is an **AI-native SaaS platform** that deploys **four autonomous agents** to replace manual freight decision-making:

| Agent | What It Does |
|-------|-------------|
| **Procurement Agent** | Autonomously negotiates rates, benchmarks bids, and generates contracts across 50,000+ lanes |
| **Sustainability Agent** | Tracks per-shipment CO₂, scores green routes, and generates BRSR-ready ESG reports |
| **Optimization Agent** | Self-healing route engine that detects disruptions and reroutes in real-time |
| **Risk Detection Agent** | Scans 24,700+ signals for carrier risk, trade compliance (GST/e-way), and anomalies |

These agents operate through a **central orchestrator** connected via an **Agentic Knowledge Graph** — they share context, trigger each other (e.g., risk agent flags a carrier → procurement agent re-negotiates), and provide full **Glass Box reasoning transparency** so shippers see *why* every decision was made.

---

## AI / Agent / Optimization Techniques

- **ReAct (Reasoning + Acting) Loop** — Each agent follows a Thought → Action → Observation → Result pipeline, streamed in real-time via NDJSON so users see live reasoning traces
- **Multi-Agent Orchestration** — Central orchestrator coordinates 4 specialized agents with cross-agent signaling (e.g., sustainability constraints fed into procurement bidding)
- **Agentic Knowledge Graph** — Graph topology connecting data sources → orchestrator → agents → outputs, enabling context propagation and collaborative decision-making
- **Self-Healing Optimization** — Continuous monitoring of route conditions with autonomous rerouting when disruptions are detected (weather, strikes, congestion)
- **Confidence Scoring** — Real-time confidence gauges across procurement, sustainability, and optimization accuracy, providing calibrated uncertainty estimates
- **Natural Language Interface** — ⌘K command palette and AI chat for conversational freight queries ("What are Mumbai-Delhi rates this week?")

---

## System Architecture (High-Level)

```
┌─────────────────────────────────────────────────────────────┐
│  PRESENTATION        Glass Box UI (Dark/Light themes)       │
│  ┌─────────────┐     ┌──────────────────────────────────┐   │
│  │ Landing Page │     │ React Dashboard                  │   │
│  │ (HTML/CSS/JS)│     │ (Next.js 14 + Tailwind v4 +     │   │
│  │             │     │  Framer Motion + Canvas graphs)  │   │
│  └─────────────┘     └──────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  API LAYER           Next.js API Routes (8 endpoints)       │
│  Chat · Reasoning (NDJSON) · Query · Intelligence ·         │
│  Status · ROI · Trace (SSE) · Simulator                     │
├─────────────────────────────────────────────────────────────┤
│  AGENT LAYER         Multi-Agent Orchestration              │
│  ┌────────────┐ ┌──────────────┐ ┌────────────┐ ┌────────┐ │
│  │Procurement │ │Sustainability│ │Optimization│ │  Risk  │ │
│  │   Agent    │ │    Agent     │ │   Agent    │ │ Agent  │ │
│  └────────────┘ └──────────────┘ └────────────┘ └────────┘ │
│         ↕               ↕              ↕            ↕       │
│  ┌─────────────────────────────────────────────────────┐    │
│  │        Agentic Knowledge Graph (Orchestrator)       │    │
│  │   Data Sources ←→ Agents ←→ Outputs + Cross-Signals│    │
│  └─────────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────────┤
│  DATA SOURCES        Market Data · Carrier Bids ·           │
│                      IoT/Telematics · Geo & News Feeds      │
├─────────────────────────────────────────────────────────────┤
│  DEPLOYMENT          Render (Node.js) · Standalone Build    │
└─────────────────────────────────────────────────────────────┘
```

---

## Expected Impact & Measurable Outcomes

| Metric | Current (Industry Avg.) | With LoRRI | Improvement |
|--------|------------------------|------------|-------------|
| Freight Cost | ₹100 Cr baseline | ₹77–82 Cr | **18–23% savings** |
| CO₂ Emissions | Untracked | Measured + optimized | **34% reduction** |
| Disruption Response | 4–8 hours (manual) | < 5 minutes (auto-reroute) | **~98% faster** |
| Risk Signals Monitored | ~50 (manual checks) | 24,700+ (real-time) | **494x coverage** |
| RFQ Processing | 2–3 days per lane | Minutes (auto-negotiation) | **~99% faster** |
| Compliance (GST/e-way) | Spot-check based | Continuous scanning | **100% coverage** |

**For a shipper spending ₹100 Cr/year on freight, LoRRI delivers ₹18–23 Cr in annual savings** while simultaneously achieving ESG compliance and near-zero disruption impact.

---

## Why Our Team

- **LogisticsNow** is an operating freight-tech company — not a hackathon-only project. We already serve enterprise clients including **Saint Gobain, Onida, Perfetti Van Melle, Apollo Tyres, Bajaj Electricals, and Shell**
- Deep domain expertise in Indian freight: FTL/PTL pricing, Indian transporter networks, GST/e-way compliance, BRSR sustainability reporting
- Technical capability demonstrated in this prototype: full-stack AI-native SaaS with streaming agent reasoning, interactive knowledge graphs, and production-ready deployment
- We understand both the **logistics domain** and **AI/agent engineering** — the intersection where this problem lives
- Active platform at [lorri.in](https://lorri.in) processing real freight data across 50,000+ lanes with 200+ verified carriers

---

*LoRRI.ai — Replacing spreadsheets with autonomous intelligence for India's ₹12.5 Lakh Crore freight market.*
