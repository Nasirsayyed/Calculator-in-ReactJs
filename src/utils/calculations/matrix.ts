export type Matrix = number[][];

function sameShape(a: Matrix, b: Matrix): boolean {
  return a.length === b.length && a.every((row, i) => row.length === b[i]!.length);
}

export function addMatrices(a: Matrix, b: Matrix): Matrix {
  if (!sameShape(a, b)) throw new Error('Matrices must have the same dimensions to add.');
  return a.map((row, i) => row.map((value, j) => value + b[i]![j]!));
}

export function subtractMatrices(a: Matrix, b: Matrix): Matrix {
  if (!sameShape(a, b)) throw new Error('Matrices must have the same dimensions to subtract.');
  return a.map((row, i) => row.map((value, j) => value - b[i]![j]!));
}

export function multiplyMatrices(a: Matrix, b: Matrix): Matrix {
  const aCols = a[0]?.length ?? 0;
  if (aCols !== b.length) {
    throw new Error('Number of columns in A must match number of rows in B.');
  }

  return a.map((row) =>
    b[0]!.map((_, colIndex) => row.reduce((sum, value, k) => sum + value * b[k]![colIndex]!, 0)),
  );
}

export function transpose(matrix: Matrix): Matrix {
  if (matrix.length === 0) return [];
  return matrix[0]!.map((_, colIndex) => matrix.map((row) => row[colIndex]!));
}

export function determinant(matrix: Matrix): number {
  const n = matrix.length;
  if (n !== matrix[0]?.length) throw new Error('Determinant requires a square matrix.');

  if (n === 1) return matrix[0]![0]!;
  if (n === 2) return matrix[0]![0]! * matrix[1]![1]! - matrix[0]![1]! * matrix[1]![0]!;
  if (n === 3) {
    const [r0, r1, r2] = matrix as [number[], number[], number[]];
    return (
      r0[0]! * (r1[1]! * r2[2]! - r1[2]! * r2[1]!) -
      r0[1]! * (r1[0]! * r2[2]! - r1[2]! * r2[0]!) +
      r0[2]! * (r1[0]! * r2[1]! - r1[1]! * r2[0]!)
    );
  }

  throw new Error('Determinant is only supported for 1x1, 2x2, and 3x3 matrices.');
}
