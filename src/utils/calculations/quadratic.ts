export interface QuadraticResult {
  discriminant: number;
  isComplex: boolean;
  isLinear: boolean;
  roots: number[];
  realPart: number;
  imaginaryPart: number;
}

export function solveQuadratic(a: number, b: number, c: number): QuadraticResult {
  if (a === 0) {
    if (b === 0)
      return {
        discriminant: 0,
        isComplex: false,
        isLinear: true,
        roots: [],
        realPart: 0,
        imaginaryPart: 0,
      };
    return {
      discriminant: 0,
      isComplex: false,
      isLinear: true,
      roots: [-c / b],
      realPart: 0,
      imaginaryPart: 0,
    };
  }

  const discriminant = b * b - 4 * a * c;

  if (discriminant > 0) {
    const sqrtD = Math.sqrt(discriminant);
    return {
      discriminant,
      isComplex: false,
      isLinear: false,
      roots: [(-b + sqrtD) / (2 * a), (-b - sqrtD) / (2 * a)],
      realPart: 0,
      imaginaryPart: 0,
    };
  }

  if (discriminant === 0) {
    return {
      discriminant,
      isComplex: false,
      isLinear: false,
      roots: [-b / (2 * a)],
      realPart: 0,
      imaginaryPart: 0,
    };
  }

  return {
    discriminant,
    isComplex: true,
    isLinear: false,
    roots: [],
    realPart: -b / (2 * a),
    imaginaryPart: Math.sqrt(-discriminant) / (2 * a),
  };
}
