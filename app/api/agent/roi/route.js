// /api/agent/roi — Freight Savings ROI Calculator
// POST { annualSpend: number }
// Returns detailed ROI breakdown using:
//   ROI(%) = (Financial Gain - Investment) / Investment × 100
//   Benefits: 15-25% freight cost reduction, 50% labor hour reduction

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: 'Invalid JSON body. Expected: { "annualSpend": <number> }' },
      { status: 400 }
    );
  }

  const { annualSpend } = body;

  if (typeof annualSpend !== 'number' || annualSpend <= 0) {
    return Response.json(
      { error: '"annualSpend" must be a positive number.' },
      { status: 400 }
    );
  }

  // ─── Configuration ───────────────────────────────────────────
  const FREIGHT_COST_REDUCTION_LOW = 0.15; // 15%
  const FREIGHT_COST_REDUCTION_HIGH = 0.25; // 25%
  const LABOR_HOUR_REDUCTION = 0.50; // 50%
  const PLATFORM_FEE_RATE = 0.03; // 3% of annual spend as platform investment
  const MIN_PLATFORM_FEE = 2_000_000; // ₹20 Lakh minimum annual platform cost
  const AVG_LABOR_COST_PER_HOUR = 500; // ₹/hr fully loaded
  const LABOR_HOURS_PER_CRORE = 42; // estimated manual hours per ₹1 Crore freight spend

  // ─── Calculations ────────────────────────────────────────────

  // Platform investment
  const investment = Math.max(annualSpend * PLATFORM_FEE_RATE, MIN_PLATFORM_FEE);

  // Freight cost savings (use midpoint 20% as expected, show range)
  const freightSavingsLow = annualSpend * FREIGHT_COST_REDUCTION_LOW;
  const freightSavingsHigh = annualSpend * FREIGHT_COST_REDUCTION_HIGH;
  const freightSavingsExpected = annualSpend * ((FREIGHT_COST_REDUCTION_LOW + FREIGHT_COST_REDUCTION_HIGH) / 2);

  // Labor savings
  const currentLaborHours = (annualSpend / 1_00_00_000) * LABOR_HOURS_PER_CRORE;
  const laborHoursSaved = currentLaborHours * LABOR_HOUR_REDUCTION;
  const laborCostSavings = laborHoursSaved * AVG_LABOR_COST_PER_HOUR;

  // Additional efficiency gains (reduced detention, demurrage, accessorials)
  const accessorialSavings = annualSpend * 0.02; // ~2% saved on accessorials

  // Total financial gain
  const totalGainLow = freightSavingsLow + laborCostSavings + accessorialSavings;
  const totalGainHigh = freightSavingsHigh + laborCostSavings + accessorialSavings;
  const totalGainExpected = freightSavingsExpected + laborCostSavings + accessorialSavings;

  // ROI formula: ROI(%) = (Financial Gain - Investment) / Investment × 100
  const roiLow = ((totalGainLow - investment) / investment) * 100;
  const roiHigh = ((totalGainHigh - investment) / investment) * 100;
  const roiExpected = ((totalGainExpected - investment) / investment) * 100;

  // Payback period in months
  const monthlyGain = totalGainExpected / 12;
  const paybackMonths = Math.ceil(investment / monthlyGain);

  // 3-year projection
  const threeYearSavings = totalGainExpected * 3 - investment * 3;

  // ─── Response ────────────────────────────────────────────────
  return Response.json({
    input: {
      annualSpend,
    },
    investment: {
      annual: round(investment),
      monthly: round(investment / 12),
      description: 'LoRRI.ai platform + agent orchestration fee',
    },
    savings: {
      freightCostReduction: {
        low: round(freightSavingsLow),
        expected: round(freightSavingsExpected),
        high: round(freightSavingsHigh),
        reductionRange: '15% – 25%',
        description: 'Direct freight spend reduction via autonomous rate negotiation and lane optimization',
      },
      laborHours: {
        currentAnnualHours: Math.round(currentLaborHours),
        hoursSaved: Math.round(laborHoursSaved),
        reductionPercent: LABOR_HOUR_REDUCTION * 100,
        costSavings: round(laborCostSavings),
        description: 'Manual procurement, tracking, and exception management hours eliminated',
      },
      accessorialReduction: {
        savings: round(accessorialSavings),
        description: 'Reduced detention, demurrage, and accessorial charges through predictive scheduling',
      },
    },
    totalFinancialGain: {
      low: round(totalGainLow),
      expected: round(totalGainExpected),
      high: round(totalGainHigh),
    },
    roi: {
      low: round(roiLow),
      expected: round(roiExpected),
      high: round(roiHigh),
      formula: 'ROI(%) = (Financial Gain - Investment) / Investment × 100',
    },
    paybackPeriod: {
      months: paybackMonths,
      description: `Full ROI recovery in ${paybackMonths} month${paybackMonths !== 1 ? 's' : ''}`,
    },
    threeYearProjection: {
      netSavings: round(threeYearSavings),
      totalGain: round(totalGainExpected * 3),
      totalInvestment: round(investment * 3),
    },
    meta: {
      calculatedAt: new Date().toISOString(),
      model: 'lorri-roi-v2.1',
      confidence: '85-95%',
    },
  });
}

function round(value) {
  return Math.round(value * 100) / 100;
}
