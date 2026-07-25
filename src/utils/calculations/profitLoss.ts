export interface ProfitLossResult {
  amount: number;
  percent: number;
  isProfit: boolean;
}

export function calculateProfitLoss(costPrice: number, sellingPrice: number): ProfitLossResult {
  const amount = sellingPrice - costPrice;
  const percent = costPrice === 0 ? 0 : (amount / costPrice) * 100;
  return { amount: Math.abs(amount), percent: Math.abs(percent), isProfit: amount >= 0 };
}
