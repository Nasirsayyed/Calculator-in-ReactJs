export type CalculatorMode = 'standard' | 'scientific';

export type AngleMode = 'deg' | 'rad';

export interface CalculationResult {
  ok: boolean;
  value: string;
  error?: string;
}

export interface CalculatorState {
  mode: CalculatorMode;
  expression: string;
  preview: string;
  result: string;
  error: string | null;
  justEvaluated: boolean;
  /** Bumped every time a new error occurs, so the UI can replay a shake animation even for a repeated error. */
  errorNonce: number;
}
