export interface MarginResult {
  profit: number;
  grossMarginPercent: number;
  markupPercent: number;
}

export function calculateMargin(cost: number, revenue: number): MarginResult {
  const profit = revenue - cost;
  return {
    profit,
    grossMarginPercent: revenue === 0 ? 0 : (profit / revenue) * 100,
    markupPercent: cost === 0 ? 0 : (profit / cost) * 100,
  };
}
