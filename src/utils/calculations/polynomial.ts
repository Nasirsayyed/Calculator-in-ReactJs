/** Coefficients are ordered from the constant term up: coeffs[i] is the coefficient of x^i. */
export type Polynomial = number[];

export function evaluatePolynomial(coeffs: Polynomial, x: number): number {
  return coeffs.reduce((sum, coeff, power) => sum + coeff * Math.pow(x, power), 0);
}

export function addPolynomials(a: Polynomial, b: Polynomial): Polynomial {
  const length = Math.max(a.length, b.length);
  return Array.from({ length }, (_, i) => (a[i] ?? 0) + (b[i] ?? 0));
}

export function multiplyPolynomials(a: Polynomial, b: Polynomial): Polynomial {
  if (a.length === 0 || b.length === 0) return [];
  const result = new Array(a.length + b.length - 1).fill(0);
  for (let i = 0; i < a.length; i += 1) {
    for (let j = 0; j < b.length; j += 1) {
      result[i + j] += a[i]! * b[j]!;
    }
  }
  return result;
}

export function formatPolynomial(coeffs: Polynomial): string {
  const terms = coeffs
    .map((coeff, power) => ({ coeff, power }))
    .filter(({ coeff }) => coeff !== 0)
    .reverse();

  if (terms.length === 0) return '0';

  return terms
    .map(({ coeff, power }, index) => {
      const magnitude = Math.abs(coeff);
      const coefficientPart = power === 0 || magnitude !== 1 ? String(magnitude) : '';
      const variablePart = power === 0 ? '' : power === 1 ? 'x' : `x^${power}`;
      const term = `${coefficientPart}${variablePart}`;
      if (index === 0) return coeff < 0 ? `-${term}` : term;
      return coeff < 0 ? `- ${term}` : `+ ${term}`;
    })
    .join(' ');
}
