// LoRRI.ai — ROI Simulator API
// POST /api/simulator/roi

export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const annualSpend = Math.min(Math.max(body.annualSpend || 10_000_000, 1_000_000), 50_000_000_000);

  // Model parameters (2026 benchmarks)
  const savingsRate = 0.15 + Math.random() * 0.10;          // 15–25%
  const procurementEfficiency = 0.50 + Math.random() * 0.10; // 50–60%
  const co2Factor = 0.00012;                                  // tons CO₂ per ₹ spent
  const firstTimeMatchRatio = 0.85 + Math.random() * 0.04;   // 85–89%
  const assetUtilGain = 0.18 + Math.random() * 0.04;         // 18–22%
  const rfqSpeedMultiplier = 85 + Math.round(Math.random() * 10); // 85–95% faster

  const grossSavings = annualSpend * savingsRate;
  const implementationCost = annualSpend * 0.012;             // ~1.2% of spend
  const netSavings = grossSavings - implementationCost;
  const roi = (netSavings / implementationCost) * 100;
  const co2Avoided = Math.round(annualSpend * co2Factor * savingsRate);
  const paybackMonths = Math.max(1, Math.round((implementationCost / (grossSavings / 12))));

  const formatINR = (v) => {
    if (v >= 1e7) return `₹${(v / 1e7).toFixed(1)} Cr`;
    if (v >= 1e5) return `₹${(v / 1e5).toFixed(1)} L`;
    return `₹${v.toLocaleString('en-IN')}`;
  };

  return Response.json({
    input: {
      annualSpend,
      formatted: formatINR(annualSpend),
    },
    savings: {
      gross: grossSavings,
      net: netSavings,
      formatted: formatINR(netSavings),
      rate: `${(savingsRate * 100).toFixed(1)}%`,
    },
    roi: {
      percentage: Math.round(roi),
      formatted: `${Math.round(roi)}%`,
    },
    efficiency: {
      rfqSpeed: `${rfqSpeedMultiplier}% faster`,
      procurementReduction: `${(procurementEfficiency * 100).toFixed(0)}% fewer manual tasks`,
      firstTimeMatch: `${(firstTimeMatchRatio * 100).toFixed(0)}%`,
      assetUtilization: `+${(assetUtilGain * 100).toFixed(0)}%`,
    },
    sustainability: {
      co2AvoidedTons: co2Avoided,
      formatted: `${co2Avoided.toLocaleString('en-IN')} metric tons CO₂`,
    },
    payback: {
      months: paybackMonths,
      description: paybackMonths <= 3 ? `${paybackMonths} months — Rapid payback` : `${paybackMonths} months`,
    },
    implementationCost: {
      value: implementationCost,
      formatted: formatINR(implementationCost),
    },
    timestamp: new Date().toISOString(),
    version: 'lorri-roi-v2.0',
  });
}
