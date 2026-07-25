export type GstMode = 'add' | 'remove';

export interface GstResult {
  baseAmount: number;
  gstAmount: number;
  totalAmount: number;
}

/**
 * `mode: 'add'` treats `amount` as GST-exclusive (base price) and adds GST on top.
 * `mode: 'remove'` treats `amount` as GST-inclusive and extracts the base/GST split.
 */
export function calculateGst(amount: number, ratePercent: number, mode: GstMode): GstResult {
  if (mode === 'add') {
    const gstAmount = (amount * ratePercent) / 100;
    return { baseAmount: amount, gstAmount, totalAmount: amount + gstAmount };
  }

  const baseAmount = amount / (1 + ratePercent / 100);
  return { baseAmount, gstAmount: amount - baseAmount, totalAmount: amount };
}
