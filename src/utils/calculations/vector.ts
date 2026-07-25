export type Vector = number[];

function assertSameLength(a: Vector, b: Vector): void {
  if (a.length !== b.length) throw new Error('Vectors must have the same number of components.');
}

export function addVectors(a: Vector, b: Vector): Vector {
  assertSameLength(a, b);
  return a.map((value, i) => value + b[i]!);
}

export function subtractVectors(a: Vector, b: Vector): Vector {
  assertSameLength(a, b);
  return a.map((value, i) => value - b[i]!);
}

export function dotProduct(a: Vector, b: Vector): number {
  assertSameLength(a, b);
  return a.reduce((sum, value, i) => sum + value * b[i]!, 0);
}

export function crossProduct(a: Vector, b: Vector): Vector {
  if (a.length !== 3 || b.length !== 3) {
    throw new Error('Cross product is only defined for 3D vectors.');
  }
  return [
    a[1]! * b[2]! - a[2]! * b[1]!,
    a[2]! * b[0]! - a[0]! * b[2]!,
    a[0]! * b[1]! - a[1]! * b[0]!,
  ];
}

export function magnitude(vector: Vector): number {
  return Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0));
}
