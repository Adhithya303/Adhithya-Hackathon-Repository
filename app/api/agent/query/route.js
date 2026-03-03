// /api/agent/query — Command Center (Cmd+K) Endpoint
// POST { query: string }
// Returns context-aware logistics intelligence responses

const KNOWLEDGE_BASE = [
  {
    keywords: ['jnpt', 'nhava sheva', 'port', 'congestion', 'mumbai port', 'mundra'],
    response: {
      answer: 'JNPT (Nhava Sheva) Port congestion is currently at 12.8%. There are 18 vessels at anchor with an average wait time of 2.6 days. ETA variance on Asia–India routes is +1.8 days. Recommend activating contingency routing through Mundra Port (congestion: 5.2%) for non-priority cargo.',
      confidence: 0.94,
      source: 'Indian Port Intelligence — real-time AIS + terminal data',
      relatedQueries: [
        'What is the Mundra port status?',
        'Show impacted shipments from JNPT delays',
        'Activate contingency routing plan',
      ],
    },
  },
  {
    keywords: ['rate', 'spot', 'cost', 'pricing', 'freight rate', 'truckload', 'ftl'],
    response: {
      answer: 'Current national avg FTL rate: ₹68/km (↓3.2% vs. last week). Contract-to-spot spread: +₹8/km. Best performing route: PUN→HYD at ₹58/km. Highest: MUM→DEL at ₹78/km (but softening 8.2% over 14 days). Reefer premium: +₹18/km nationally.',
      confidence: 0.91,
      source: 'LoRRI Rate Intelligence Engine — 80,000+ routes analyzed',
      relatedQueries: [
        'Show rate trends for Mumbai to Delhi',
        'Compare contract vs spot rates by region',
        'Which routes have the best savings opportunity?',
      ],
    },
  },
  {
    keywords: ['capacity', 'carrier', 'transporter', 'tender', 'rejection', 'availability'],
    response: {
      answer: 'National tender rejection rate: 4.8% (historically low — 12-month avg: 7.2%). Transporter availability index: 87.3/100. Flatbed capacity is tightest in Western India (rejection: 11.2%). Recommend locking Q4 commitments now — models predict rejections will spike to 14-18% by week 44.',
      confidence: 0.89,
      source: 'Capacity Intelligence Module — 2,200+ transporter signals',
      relatedQueries: [
        'Show transporter performance scorecards',
        'Pre-position Q4 capacity',
        'Which transporters have the best acceptance rates?',
      ],
    },
  },
  {
    keywords: ['shipment', 'track', 'status', 'where', 'delivery', 'transit'],
    response: {
      answer: 'Active shipments: 1,247 in transit. On-time rate: 96.8%. 12 shipments flagged at-risk (ETA deviation >4hrs). Critical: Load #LR-48291 (pharmaceuticals, DEL→MUM) delayed 6hrs due to weather in Maharashtra — reroute recommendation generated. 3 shipments pending POD confirmation.',
      confidence: 0.96,
      source: 'Real-time Visibility Engine — GPS + ELD + geofence data',
      relatedQueries: [
        'Show at-risk shipments',
        'Details on load LR-48291',
        'What is the on-time trend this month?',
      ],
    },
  },
  {
    keywords: ['carbon', 'co2', 'emission', 'sustainability', 'green', 'environment'],
    response: {
      answer: 'YTD carbon reduction: 12,847 metric tons CO₂ (↓18.3% vs. last year). Top contributors: route optimization (42%), mode shifting to intermodal rail (31%), empty km reduction (27%). Current fleet carbon intensity: 1.24 kg CO₂/ton-km (industry avg: 1.61). On track to meet 2026 sustainability target.',
      confidence: 0.92,
      source: 'Sustainability Intelligence Module — certified methodology',
      relatedQueries: [
        'Show carbon savings by route',
        'What is our intermodal utilization?',
        'Generate sustainability report for Q1',
      ],
    },
  },
  {
    keywords: ['warehouse', 'inventory', 'dock', 'dwell', 'cross-dock'],
    response: {
      answer: 'Network dwell time avg: 2.1hrs (target: <2.5hrs). Mumbai cross-dock: 1.4hrs (best). Bangalore hub: 3.8hrs (flagged — dock scheduling conflict on Door 14-17). Inventory turn rate: 14.2x annually. Recommended action: Reallocate 3 Bangalore dock doors from inbound to outbound during 14:00-18:00 window.',
      confidence: 0.88,
      source: 'Warehouse Intelligence — IoT sensor + WMS integration',
      relatedQueries: [
        'Show dock utilization by facility',
        'What is causing Bangalore dwell time increase?',
        'Optimize dock door scheduling',
      ],
    },
  },
  {
    keywords: ['claim', 'damage', 'loss', 'insurance', 'incident'],
    response: {
      answer: 'Active claims: 7 (total value: ₹1.04 Crore). Resolution rate: 94.2% within 30 days. Top cause: load shift damage (43%), temperature excursion (29%). Transporter with highest claim rate: QuickHaul Transport (3.1% — flagged for review). AI recommendation: Switch QuickHaul volume to TCI Express on DEL→BLR route.',
      confidence: 0.87,
      source: 'Claims Intelligence — transporter scorecard + historical patterns',
      relatedQueries: [
        'Show claims trend by transporter',
        'QuickHaul Transport performance history',
        'Generate transporter risk report',
      ],
    },
  },
  {
    keywords: ['agent', 'bot', 'ai', 'autonomous', 'lorri', 'system'],
    response: {
      answer: 'LoRRI Agent Network Status: All 4 core agents operational. NegotiatorAI: 847 negotiations completed today (94.2% win rate). RouteMind: processing 12,400 routes/hr. ClaimsBot: 23 claims auto-resolved this week. DemandOracle: next forecast cycle in 2hrs. System latency: 12ms avg. No anomalies detected.',
      confidence: 0.97,
      source: 'Agent Orchestration Layer — system telemetry',
      relatedQueries: [
        'Show agent performance metrics',
        'What did NegotiatorAI save this week?',
        'Agent error logs',
      ],
    },
  },
  {
    keywords: ['roi', 'savings', 'value', 'benefit', 'cost reduction', 'payback'],
    response: {
      answer: 'Platform ROI (trailing 12 months): 847%. Total savings generated: ₹11.8 Crore. Breakdown — freight cost reduction: ₹9.8 Crore (20.1% reduction), labor savings: ₹1.3 Crore (52% hour reduction), accessorial reduction: ₹70 Lakh. Payback period was 1.4 months. Next milestone: ₹12.5 Crore savings target (projected week 14).',
      confidence: 0.93,
      source: 'Financial Intelligence Module — audited savings methodology',
      relatedQueries: [
        'Show monthly savings trend',
        'Calculate ROI for different spend levels',
        'Generate executive savings report',
      ],
    },
  },
];

const FALLBACK_RESPONSE = {
  answer:
    'I don\'t have specific real-time data on that topic, but I can help you investigate. Try asking about: port congestion, freight rates, capacity/tender rejections, shipment tracking, carbon emissions, warehouse operations, claims, agent status, or ROI metrics.',
  confidence: 0.5,
  source: 'LoRRI Command Center',
  relatedQueries: [
    'What is the Shanghai port congestion status?',
    'Show current spot rates',
    'How many shipments are in transit?',
    'What is our platform ROI?',
  ],
};

function findBestMatch(query) {
  const normalizedQuery = query.toLowerCase().trim();
  let bestMatch = null;
  let bestScore = 0;

  for (const entry of KNOWLEDGE_BASE) {
    let score = 0;
    for (const keyword of entry.keywords) {
      if (normalizedQuery.includes(keyword)) {
        // Longer keyword matches are weighted higher
        score += keyword.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  return bestMatch;
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: 'Invalid JSON body. Expected: { "query": "<your question>" }' },
      { status: 400 }
    );
  }

  const { query } = body;

  if (!query || typeof query !== 'string' || query.trim().length === 0) {
    return Response.json(
      { error: '"query" must be a non-empty string.' },
      { status: 400 }
    );
  }

  // Simulate a brief processing delay (50-200ms) like a real AI inference
  await new Promise((r) => setTimeout(r, 50 + Math.random() * 150));

  const match = findBestMatch(query);
  const result = match ? match.response : FALLBACK_RESPONSE;

  return Response.json({
    query: query.trim(),
    ...result,
    meta: {
      processedAt: new Date().toISOString(),
      engine: 'lorri-command-center-v3.0',
      queryTokens: query.trim().split(/\s+/).length,
    },
  });
}
