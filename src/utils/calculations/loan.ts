export interface LoanYearlyBreakdown {
  year: number;
  principalPaid: number;
  interestPaid: number;
  remainingBalance: number;
}

export interface LoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  yearlyBreakdown: LoanYearlyBreakdown[];
}

export function calculateLoan(
  principal: number,
  annualRatePercent: number,
  tenureYears: number,
): LoanResult {
  const tenureMonths = Math.round(tenureYears * 12);
  if (principal <= 0 || tenureMonths <= 0) {
    return { monthlyPayment: 0, totalPayment: 0, totalInterest: 0, yearlyBreakdown: [] };
  }

  const monthlyRate = annualRatePercent / 12 / 100;
  const monthlyPayment =
    monthlyRate === 0
      ? principal / tenureMonths
      : (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
        (Math.pow(1 + monthlyRate, tenureMonths) - 1);

  let balance = principal;
  const yearlyBreakdown: LoanYearlyBreakdown[] = [];
  let yearPrincipal = 0;
  let yearInterest = 0;

  for (let month = 1; month <= tenureMonths; month += 1) {
    const interestForMonth = balance * monthlyRate;
    const principalForMonth = monthlyPayment - interestForMonth;
    balance = Math.max(0, balance - principalForMonth);
    yearPrincipal += principalForMonth;
    yearInterest += interestForMonth;

    if (month % 12 === 0 || month === tenureMonths) {
      yearlyBreakdown.push({
        year: Math.ceil(month / 12),
        principalPaid: yearPrincipal,
        interestPaid: yearInterest,
        remainingBalance: balance,
      });
      yearPrincipal = 0;
      yearInterest = 0;
    }
  }

  const totalPayment = monthlyPayment * tenureMonths;
  return { monthlyPayment, totalPayment, totalInterest: totalPayment - principal, yearlyBreakdown };
}
