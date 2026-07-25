export interface SplitBillResult {
  totalWithTip: number;
  amountPerPerson: number;
  tipAmount: number;
}

export function calculateSplitBill(
  billAmount: number,
  numberOfPeople: number,
  tipPercent: number,
): SplitBillResult {
  if (billAmount <= 0 || numberOfPeople <= 0) {
    return { totalWithTip: 0, amountPerPerson: 0, tipAmount: 0 };
  }

  const tipAmount = billAmount * (tipPercent / 100);
  const totalWithTip = billAmount + tipAmount;
  return { totalWithTip, amountPerPerson: totalWithTip / numberOfPeople, tipAmount };
}
