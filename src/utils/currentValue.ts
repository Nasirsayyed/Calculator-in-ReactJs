import type { CalculatorState } from '@app-types/calculator';

/** Resolves the number a Memory action should act on: the evaluated result if
 * available, otherwise the live preview, otherwise a raw numeric expression. */
export function getCurrentNumericValue(
  state: Pick<CalculatorState, 'justEvaluated' | 'result' | 'preview' | 'expression'>,
): number | null {
  const raw = state.justEvaluated ? state.result : state.preview || state.expression;
  if (!raw) return null;
  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
}
