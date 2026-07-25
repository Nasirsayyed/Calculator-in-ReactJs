export interface CompoundInterestResult {
  interest: number;
  totalAmount: number;
}

export function calculateCompoundInterest(
  principal: number,
  ratePercent: number,
  years: number,
  compoundsPerYear: number,
): CompoundInterestResult {
  const n = compoundsPerYear > 0 ? compoundsPerYear : 1;
  const totalAmount = principal * Math.pow(1 + ratePercent / 100 / n, n * years);
  return { interest: totalAmount - principal, totalAmount };
}
