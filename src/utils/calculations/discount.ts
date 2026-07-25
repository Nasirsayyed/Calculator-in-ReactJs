export interface DiscountResult {
  discountAmount: number;
  finalPrice: number;
}

export function calculateDiscount(originalPrice: number, discountPercent: number): DiscountResult {
  const discountAmount = (originalPrice * discountPercent) / 100;
  return { discountAmount, finalPrice: originalPrice - discountAmount };
}
