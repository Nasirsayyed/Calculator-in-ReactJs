import { evaluateExpression, evaluateLivePreview } from '@parser/mathEngine';
import type { CalculatorMode, CalculatorState } from '@app-types/calculator';

const CONTINUATION_TOKENS = new Set(['+', '-', '*', '/', '^']);

/** Auto-completes missing closing parentheses, e.g. `sin(30` -> `sin(30)`. */
function autoCloseParens(expression: string): string {
  const opens = (expression.match(/\(/g) ?? []).length;
  const closes = (expression.match(/\)/g) ?? []).length;
  const missing = opens - closes;
  return missing > 0 ? expression + ')'.repeat(missing) : expression;
}

export function createInitialCalculatorState(mode: CalculatorMode = 'standard'): CalculatorState {
  return {
    mode,
    expression: '',
    preview: '',
    result: '',
    error: null,
    justEvaluated: false,
    errorNonce: 0,
  };
}

export type CalculatorAction =
  | { type: 'INPUT'; value: string; precision: number }
  | { type: 'CLEAR' }
  | { type: 'DELETE'; precision: number }
  | { type: 'EQUALS'; precision: number }
  | { type: 'SET_MODE'; mode: CalculatorMode }
  | { type: 'SET_EXPRESSION'; expression: string; precision: number }
  | { type: 'EVALUATE_EXPRESSION'; expression: string; precision: number }
  | { type: 'TOGGLE_SIGN'; precision: number };

function withPreview(expression: string, precision: number): { preview: string } {
  return {
    preview: expression ? evaluateLivePreview(autoCloseParens(expression), { precision }) : '',
  };
}

/** Shared by EQUALS (evaluates state.expression) and EVALUATE_EXPRESSION
 * (evaluates an explicitly-supplied expression, e.g. from natural-language
 * input) so both produce identical result/error state shapes. */
function evaluateAndUpdate(
  state: CalculatorState,
  expression: string,
  precision: number,
): CalculatorState {
  const completedExpression = autoCloseParens(expression);
  const outcome = evaluateExpression(completedExpression, { precision });

  if (!outcome.ok) {
    return {
      ...state,
      expression,
      error: outcome.error ?? 'Invalid expression',
      errorNonce: state.errorNonce + 1,
      justEvaluated: false,
    };
  }

  return {
    ...state,
    expression: completedExpression,
    result: outcome.value,
    preview: '',
    error: null,
    justEvaluated: true,
  };
}

export function calculatorReducer(
  state: CalculatorState,
  action: CalculatorAction,
): CalculatorState {
  switch (action.type) {
    case 'INPUT': {
      const startsFresh = state.justEvaluated && !CONTINUATION_TOKENS.has(action.value);
      const base = state.justEvaluated
        ? CONTINUATION_TOKENS.has(action.value)
          ? state.result
          : ''
        : state.expression;
      const expression = base + action.value;

      return {
        ...state,
        expression,
        error: null,
        justEvaluated: false,
        result: startsFresh ? '' : state.result,
        ...withPreview(expression, action.precision),
      };
    }

    case 'DELETE': {
      if (state.justEvaluated) {
        return createInitialCalculatorState(state.mode);
      }
      const expression = state.expression.slice(0, -1);
      return { ...state, expression, error: null, ...withPreview(expression, action.precision) };
    }

    case 'CLEAR':
      return createInitialCalculatorState(state.mode);

    case 'TOGGLE_SIGN': {
      if (!state.expression) return state;
      const expression =
        state.expression.startsWith('-(') && state.expression.endsWith(')')
          ? state.expression.slice(2, -1)
          : `-(${state.expression})`;
      return { ...state, expression, ...withPreview(expression, action.precision) };
    }

    case 'EQUALS': {
      if (!state.expression) return state;
      return evaluateAndUpdate(state, state.expression, action.precision);
    }

    case 'EVALUATE_EXPRESSION': {
      if (!action.expression) return state;
      return evaluateAndUpdate(state, action.expression, action.precision);
    }

    case 'SET_MODE':
      return { ...state, mode: action.mode };

    case 'SET_EXPRESSION':
      return {
        ...state,
        expression: action.expression,
        error: null,
        justEvaluated: false,
        ...withPreview(action.expression, action.precision),
      };

    default:
      return state;
  }
}
