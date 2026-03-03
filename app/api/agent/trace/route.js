// /api/agent/trace — Streaming ReAct (Reasoning & Acting) Loop
// Returns a Server-Sent Events stream of Thought → Action → Observation events.

export const runtime = 'nodejs';

const SCENARIOS = [
  {
    goal: 'Optimize West Coast freight lane',
    steps: [
      {
        type: 'thought',
        content:
          'I need to analyze the current rate environment for the LA → Seattle corridor. Market volatility index is elevated at 0.73. Let me pull the latest spot rate data and compare against contract benchmarks.',
        duration: 1200,
      },
      {
        type: 'action',
        tool: 'MarketIntelligence.scan',
        input: '{ region: "US-West", lanes: ["LA-SEA", "LA-PDX", "OAK-SEA"], depth: "90d" }',
        content: 'Analyzing $150B in market data across 12,400 active lanes...',
        duration: 1800,
      },
      {
        type: 'observation',
        content:
          'Spot rates on LA→SEA have softened 8.2% over the past 14 days. Current avg: $2,847/load vs. contract rate of $3,210/load. Carrier acceptance ratio: 94.1%. Tender rejection rate dropped to 3.7%.',
        duration: 1000,
      },
      {
        type: 'thought',
        content:
          'Spot is significantly below contract. This is a renegotiation opportunity. I should also check if any carriers are offering capacity guarantees at the lower rate tier. The tender rejection rate is already very low — carriers are hungry for volume.',
        duration: 1400,
      },
      {
        type: 'action',
        tool: 'RateNegotiator.execute',
        input: '{ lane: "LA-SEA", strategy: "competitive_bid", target_rate: 2900, carriers: 6 }',
        content: 'Negotiating spot rate for West Coast Lane with 6 qualified carriers...',
        duration: 2200,
      },
      {
        type: 'observation',
        content:
          'Secured rate of $2,785/load with Werner Enterprises (98.7% on-time score). Backup allocation at $2,830/load with Schneider. Projected annual savings: $1.27M across 2,980 shipments on this lane.',
        duration: 1000,
      },
      {
        type: 'thought',
        content:
          'Excellent outcome — we beat even our target rate. Now I should trigger the cycle time analysis to compress the overall order-to-delivery window. The dock scheduling data shows a 4.2hr average dwell time at the SEA terminal that we can attack.',
        duration: 1200,
      },
      {
        type: 'action',
        tool: 'CycleTimeOptimizer.run',
        input: '{ lane: "LA-SEA", focus: ["dwell_time", "appointment_scheduling", "gate_turn"] }',
        content: 'Reducing cycle time by 90% through AI-powered dock scheduling...',
        duration: 2000,
      },
      {
        type: 'observation',
        content:
          'Cycle time reduced from 4.2hrs → 0.42hrs avg dwell. Gate turn time improved by 67%. Estimated annual productivity gain: 11,200 driver-hours recovered. Lane efficiency score: 97.3/100.',
        duration: 1000,
      },
    ],
  },
  {
    goal: 'Resolve Shanghai port congestion impact',
    steps: [
      {
        type: 'thought',
        content:
          'Shanghai port congestion alerts triggered across 3 inbound ocean lanes. I need to assess current vessel delays and model the downstream impact on inland distribution.',
        duration: 1100,
      },
      {
        type: 'action',
        tool: 'GlobalVisibility.track',
        input: '{ port: "CNSHA", scope: "inbound", vessel_count: true, eta_variance: true }',
        content: 'Scanning 847 active vessels in Shanghai port approach zone...',
        duration: 1600,
      },
      {
        type: 'observation',
        content:
          'Current congestion: 14.2%. 23 vessels at anchor (avg wait: 3.8 days). ETA variance: +2.1 days on Asia-USWC routes. 4 of our contracted vessels (MV Clarity, MV Horizon, MV Pacific Star, MV Jade Fortune) affected.',
        duration: 1000,
      },
      {
        type: 'thought',
        content:
          'With a +2.1 day ETA shift, 340 containers will miss their inland rail connections at Long Beach. I need to pre-book drayage and reroute to the Inland Empire cross-dock to avoid $890K in demurrage exposure.',
        duration: 1300,
      },
      {
        type: 'action',
        tool: 'ContingencyPlanner.activate',
        input: '{ trigger: "port_delay", containers: 340, reroute: "IE-CrossDock", priority: "high" }',
        content: 'Activating contingency plan — rebooking 340 containers to backup routing...',
        duration: 2000,
      },
      {
        type: 'observation',
        content:
          'Rerouted 340 containers: 280 via drayage to IE cross-dock (secured 12 carriers), 60 via emergency rail to Chicago. Demurrage exposure reduced from $890K to $47K. Customer impact: 0 stockouts prevented.',
        duration: 1000,
      },
    ],
  },
  {
    goal: 'Q4 capacity pre-positioning strategy',
    steps: [
      {
        type: 'thought',
        content:
          'Peak season modeling shows Q4 demand surge of 34% over baseline. Last year we faced 18% tender rejections during weeks 44-48. I need to secure capacity commitments now, 6 weeks ahead of the ramp.',
        duration: 1200,
      },
      {
        type: 'action',
        tool: 'DemandForecaster.project',
        input: '{ horizon: "Q4-2026", granularity: "weekly", confidence: 0.95 }',
        content: 'Analyzing $150B in market data to project Q4 capacity requirements...',
        duration: 1900,
      },
      {
        type: 'observation',
        content:
          'Projected load volume: 48,200 loads (weeks 40-52). Peak week 47: 5,100 loads (+41% vs. baseline). Critical lanes: DAL→ATL (capacity gap: 340 loads/wk), CHI→NYC (gap: 280 loads/wk). Recommended carrier commitments: 24 asset carriers + 8 brokerage partners.',
        duration: 1200,
      },
      {
        type: 'thought',
        content:
          'The DAL→ATL lane is the biggest risk. I should lock in dedicated fleet capacity and set up a dynamic pricing waterfall — committed rate first, then mini-bid, then spot as last resort. Targeting 96% first-tender acceptance.',
        duration: 1300,
      },
      {
        type: 'action',
        tool: 'CapacityBroker.secure',
        input: '{ strategy: "waterfall", lanes: ["DAL-ATL", "CHI-NYC"], duration: "13wk", target_acceptance: 0.96 }',
        content: 'Reducing cycle time by 90% — securing committed capacity across 32 carrier partners...',
        duration: 2400,
      },
      {
        type: 'observation',
        content:
          'Capacity secured: 32 carriers committed for Q4. DAL→ATL: 380 loads/wk guaranteed (Werner, JB Hunt, Heartland). CHI→NYC: 310 loads/wk guaranteed (Schneider, XPO, Saia). Blended rate: 7.3% below projected spot. Estimated Q4 savings: $4.8M vs. ad-hoc procurement.',
        duration: 1000,
      },
    ],
  },
];

export async function POST(request) {
  // Optionally receive a scenario index; default to random
  let scenarioIndex;
  try {
    const body = await request.json();
    scenarioIndex = body.scenario;
  } catch {
    // empty body is fine
  }

  if (scenarioIndex === undefined || scenarioIndex < 0 || scenarioIndex >= SCENARIOS.length) {
    scenarioIndex = Math.floor(Math.random() * SCENARIOS.length);
  }

  const scenario = SCENARIOS[scenarioIndex];

  // Build a ReadableStream that emits SSE-formatted events with delays
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      // Send the goal first
      controller.enqueue(
        encoder.encode(
          `data: ${JSON.stringify({ type: 'goal', content: scenario.goal, timestamp: new Date().toISOString() })}\n\n`
        )
      );

      for (const step of scenario.steps) {
        // Simulate processing time
        await new Promise((r) => setTimeout(r, step.duration));

        const event = {
          type: step.type,
          content: step.content,
          timestamp: new Date().toISOString(),
        };

        if (step.tool) event.tool = step.tool;
        if (step.input) event.input = step.input;

        controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
      }

      // Final summary event
      await new Promise((r) => setTimeout(r, 600));
      controller.enqueue(
        encoder.encode(
          `data: ${JSON.stringify({ type: 'complete', content: 'ReAct loop complete. All objectives achieved.', timestamp: new Date().toISOString() })}\n\n`
        )
      );

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
