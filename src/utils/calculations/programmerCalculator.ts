export interface AllBases {
  bin: string;
  oct: string;
  dec: string;
  hex: string;
}

export function toAllBases(value: number): AllBases {
  const normalized = Math.max(0, Math.floor(value)) >>> 0;
  return {
    bin: normalized.toString(2),
    oct: normalized.toString(8),
    dec: normalized.toString(10),
    hex: normalized.toString(16).toUpperCase(),
  };
}

export type BitwiseOp = 'AND' | 'OR' | 'XOR' | 'NOT' | 'LSHIFT' | 'RSHIFT';

/**
 * Operates on 32-bit unsigned integers (JS bitwise ops are 32-bit signed
 * under the hood; results are normalized back to unsigned for display).
 */
export function bitwiseOperate(a: number, b: number, op: BitwiseOp): number {
  switch (op) {
    case 'AND':
      return (a & b) >>> 0;
    case 'OR':
      return (a | b) >>> 0;
    case 'XOR':
      return (a ^ b) >>> 0;
    case 'NOT':
      return ~a >>> 0;
    case 'LSHIFT':
      return (a << b) >>> 0;
    case 'RSHIFT':
      return a >>> b;
  }
}
