export function convertCurrency(amount: number, exchangeRate: number): number {
  return amount * exchangeRate;
}
