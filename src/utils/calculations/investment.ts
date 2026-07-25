export interface InvestmentResult {
  futureValue: number;
  totalContributions: number;
  totalInterestEarned: number;
}

export function calculateInvestment(
  initialAmount: number,
  monthlyContribution: number,
  annualRatePercent: number,
  years: number,
): InvestmentResult {
  const months = Math.round(years * 12);
  if (months <= 0) {
    return {
      futureValue: initialAmount,
      totalContributions: initialAmount,
      totalInterestEarned: 0,
    };
  }

  const monthlyRate = annualRatePercent / 12 / 100;
  const growthFactor = Math.pow(1 + monthlyRate, months);

  const futureValueOfInitial = initialAmount * growthFactor;
  const futureValueOfContributions =
    monthlyRate === 0
      ? monthlyContribution * months
      : monthlyContribution * ((growthFactor - 1) / monthlyRate);

  const futureValue = futureValueOfInitial + futureValueOfContributions;
  const totalContributions = initialAmount + monthlyContribution * months;

  return {
    futureValue,
    totalContributions,
    totalInterestEarned: futureValue - totalContributions,
  };
}
