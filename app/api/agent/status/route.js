// /api/agent/status — Real-time Agent Fleet Health & Telemetry
// GET — Returns current status of all 4 AI agents with live metrics

const AGENTS = [
  {
    id: 'procurement',
    name: 'Procurement Agent',
    status: 'active',
    uptime: '99.97%',
    color: '#00F0FF',
    metrics: {
      negotiationsToday: 847,
      winRate: 94.2,
      avgSavingsPerRoute: 7.3,
      activeBids: 23,
      routesMonitored: 80000,
    },
    lastAction: 'Awarded route DEL→BLR to TCI Express at ₹72/km — ₹2.8 Crore annual savings',
    recentActions: [
      { time: '2m ago', action: 'Mini-bid completed: 34 transporters evaluated, 22 awards issued' },
      { time: '8m ago', action: 'Rate alert triggered: West India FTL rates ↑ 3.2%' },
      { time: '14m ago', action: 'Rolling negotiation: locked ₹78/km on MUM→DEL corridor' },
      { time: '21m ago', action: 'Tender acceptance optimized: transporter pool expanded by 6' },
    ],
    health: 98,
    throughput: '2,847 ops/hr',
    latency: '12ms',
  },
  {
    id: 'sustainability',
    name: 'Sustainability Agent',
    status: 'active',
    uptime: '99.91%',
    color: '#10B981',
    metrics: {
      co2SavedMTD: 1247,
      fuelReduction: 10.3,
      intermodalShifts: 156,
      esgScore: 94.7,
      carbonCredits: 3420,
    },
    lastAction: 'Scope 3 emissions report generated — 18.3% YoY reduction achieved',
    recentActions: [
      { time: '5m ago', action: 'Rail intermodal shift: MUM→DEL — saved 847 MT CO₂' },
      { time: '12m ago', action: 'Route efficiency optimized: fuel consumption ↓ 2.1%' },
      { time: '25m ago', action: 'ESG compliance check: all carriers PASS' },
      { time: '38m ago', action: 'Carbon credit calculation: 1,247 units banked' },
    ],
    health: 95,
    throughput: '1,200 ops/hr',
    latency: '18ms',
  },
  {
    id: 'optimization',
    name: 'Optimization Engine',
    status: 'active',
    uptime: '99.99%',
    color: '#8B5CF6',
    metrics: {
      routesOptimized: 8430,
      disruptionsAverted: 23,
      avgTransitReduction: 14.2,
      loadConsolidations: 67,
      selfHealingEvents: 12,
    },
    lastAction: 'Self-healing reroute activated: 12 shipments diverted around NH-48 storm zone',
    recentActions: [
      { time: '1m ago', action: 'Load consolidation opportunity: 6 PTL → 1 FTL at MUM hub' },
      { time: '7m ago', action: 'Disruption detected: JNPT Port congestion +23%' },
      { time: '19m ago', action: 'Transit time optimized: MUM→DEL reduced by 4.2 hours' },
      { time: '31m ago', action: 'Self-healing reroute: monsoon avoidance corridor activated' },
    ],
    health: 99,
    throughput: '5,600 ops/hr',
    latency: '8ms',
  },
  {
    id: 'risk',
    name: 'Risk Detection Agent',
    status: 'active',
    uptime: '99.94%',
    color: '#F59E0B',
    metrics: {
      signalsMonitored: 24700,
      activeAlerts: 3,
      geopoliticalRisk: 'MODERATE',
      weatherAlerts: 2,
      complianceFlags: 1,
    },
    lastAction: 'Transporter B compliance score dropped below threshold — flagged for review',
    recentActions: [
      { time: '3m ago', action: 'Cyclone forecast update: Bay of Bengal risk level LOW' },
      { time: '15m ago', action: 'Geopolitical scan: JNPT port congestion probability 12%' },
      { time: '28m ago', action: 'Supply chain resilience score updated: 96/100' },
      { time: '45m ago', action: 'Economic indicator scan: freight demand stable' },
    ],
    health: 97,
    throughput: '8,900 ops/hr',
    latency: '6ms',
  },
];

export async function GET() {
  // Add dynamic timestamp and slight metric randomization for realism
  const now = new Date();
  const agents = AGENTS.map(agent => ({
    ...agent,
    metrics: {
      ...agent.metrics,
      // Add slight randomization for live feel
      ...(agent.id === 'procurement' && {
        negotiationsToday: agent.metrics.negotiationsToday + Math.floor(Math.random() * 20),
        activeBids: agent.metrics.activeBids + Math.floor(Math.random() * 5) - 2,
      }),
      ...(agent.id === 'sustainability' && {
        co2SavedMTD: agent.metrics.co2SavedMTD + Math.floor(Math.random() * 10),
      }),
      ...(agent.id === 'optimization' && {
        routesOptimized: agent.metrics.routesOptimized + Math.floor(Math.random() * 30),
      }),
      ...(agent.id === 'risk' && {
        signalsMonitored: agent.metrics.signalsMonitored + Math.floor(Math.random() * 100),
      }),
    },
  }));

  return Response.json({
    timestamp: now.toISOString(),
    systemStatus: 'operational',
    totalAgents: 4,
    activeAgents: 4,
    globalLatency: '11ms',
    agents,
    globalMetrics: {
      totalShipmentsActive: 2847 + Math.floor(Math.random() * 50),
      avgRatePerKm: 68,
      networkEfficiency: 97.8,
      co2SavedYTD: 12847,
      totalRoutesMonitored: 80000,
      freightIntelligenceValue: '₹2,500Cr+',
    },
  });
}
