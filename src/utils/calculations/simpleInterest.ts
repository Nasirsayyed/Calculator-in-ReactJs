export interface SimpleInterestResult {
  interest: number;
  totalAmount: number;
}

export function calculateSimpleInterest(
  principal: number,
  ratePercent: number,
  years: number,
): SimpleInterestResult {
  const interest = (principal * ratePercent * years) / 100;
  return { interest, totalAmount: principal + interest };
}
