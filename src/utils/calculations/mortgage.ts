export interface MortgageResult {
  loanAmount: number;
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
}

export function calculateMortgage(
  homePrice: number,
  downPayment: number,
  annualRatePercent: number,
  tenureYears: number,
): MortgageResult {
  const loanAmount = Math.max(0, homePrice - downPayment);
  const tenureMonths = Math.round(tenureYears * 12);

  if (loanAmount <= 0 || tenureMonths <= 0) {
    return { loanAmount, monthlyPayment: 0, totalInterest: 0, totalCost: downPayment };
  }

  const monthlyRate = annualRatePercent / 12 / 100;
  const monthlyPayment =
    monthlyRate === 0
      ? loanAmount / tenureMonths
      : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
        (Math.pow(1 + monthlyRate, tenureMonths) - 1);

  const totalPayment = monthlyPayment * tenureMonths;
  const totalInterest = totalPayment - loanAmount;

  return {
    loanAmount,
    monthlyPayment,
    totalInterest,
    totalCost: downPayment + totalPayment,
  };
}
