import { describe, expect, it } from 'vitest';
import { calculatorReducer, createInitialCalculatorState } from '../calculatorReducer';

const precision = 10;

describe('calculatorReducer', () => {
  it('auto-closes a missing parenthesis on equals', () => {
    let state = createInitialCalculatorState();
    state = calculatorReducer(state, { type: 'SET_EXPRESSION', expression: 'sin(30', precision });
    state = calculatorReducer(state, { type: 'EQUALS', precision });

    expect(state.error).toBeNull();
    expect(state.expression).toBe('sin(30)');
    expect(Number(state.result)).toBeCloseTo(0.5, 9);
  });

  it('shows a live preview that also tolerates a missing closing paren', () => {
    let state = createInitialCalculatorState();
    state = calculatorReducer(state, { type: 'SET_EXPRESSION', expression: 'sqrt(16', precision });

    expect(state.preview).toBe('4');
  });

  it('starts a fresh expression after equals when a digit is pressed', () => {
    let state = createInitialCalculatorState();
    state = calculatorReducer(state, { type: 'INPUT', value: '5', precision });
    state = calculatorReducer(state, { type: 'EQUALS', precision });
    state = calculatorReducer(state, { type: 'INPUT', value: '7', precision });

    expect(state.expression).toBe('7');
  });

  it('continues from the previous result when an operator is pressed after equals', () => {
    let state = createInitialCalculatorState();
    state = calculatorReducer(state, { type: 'INPUT', value: '5', precision });
    state = calculatorReducer(state, { type: 'EQUALS', precision });
    state = calculatorReducer(state, { type: 'INPUT', value: '+', precision });

    expect(state.expression).toBe('5+');
  });

  it('bumps errorNonce on each new error', () => {
    let state = createInitialCalculatorState();
    state = calculatorReducer(state, { type: 'SET_EXPRESSION', expression: '1/0', precision });
    state = calculatorReducer(state, { type: 'EQUALS', precision });
    expect(state.errorNonce).toBe(1);

    state = calculatorReducer(state, { type: 'SET_EXPRESSION', expression: '1/0', precision });
    state = calculatorReducer(state, { type: 'EQUALS', precision });
    expect(state.errorNonce).toBe(2);
  });

  it('toggles sign by wrapping and unwrapping the expression', () => {
    let state = createInitialCalculatorState();
    state = calculatorReducer(state, { type: 'INPUT', value: '9', precision });
    state = calculatorReducer(state, { type: 'TOGGLE_SIGN', precision });
    expect(state.expression).toBe('-(9)');

    state = calculatorReducer(state, { type: 'TOGGLE_SIGN', precision });
    expect(state.expression).toBe('9');
  });

  it('TOGGLE_SIGN is a no-op on an empty expression', () => {
    const state = createInitialCalculatorState();
    expect(calculatorReducer(state, { type: 'TOGGLE_SIGN', precision })).toBe(state);
  });

  it('DELETE after equals starts a completely fresh calculation', () => {
    let state = createInitialCalculatorState();
    state = calculatorReducer(state, { type: 'INPUT', value: '5', precision });
    state = calculatorReducer(state, { type: 'EQUALS', precision });
    state = calculatorReducer(state, { type: 'DELETE', precision });

    expect(state.expression).toBe('');
    expect(state.justEvaluated).toBe(false);
  });

  it('DELETE removes the last character while typing', () => {
    let state = createInitialCalculatorState();
    state = calculatorReducer(state, { type: 'INPUT', value: '1', precision });
    state = calculatorReducer(state, { type: 'INPUT', value: '2', precision });
    state = calculatorReducer(state, { type: 'DELETE', precision });

    expect(state.expression).toBe('1');
  });

  it('EQUALS is a no-op on an empty expression', () => {
    const state = createInitialCalculatorState();
    expect(calculatorReducer(state, { type: 'EQUALS', precision })).toBe(state);
  });

  it('SET_MODE switches the active mode', () => {
    const state = createInitialCalculatorState('standard');
    const next = calculatorReducer(state, { type: 'SET_MODE', mode: 'scientific' });
    expect(next.mode).toBe('scientific');
  });

  it('CLEAR resets to a fresh state for the current mode', () => {
    let state = createInitialCalculatorState('scientific');
    state = calculatorReducer(state, { type: 'INPUT', value: '9', precision });
    state = calculatorReducer(state, { type: 'CLEAR' });

    expect(state).toEqual(createInitialCalculatorState('scientific'));
  });

  it('ignores unknown action types', () => {
    const state = createInitialCalculatorState();
    // @ts-expect-error - intentionally invalid action for the default branch
    expect(calculatorReducer(state, { type: 'NOT_A_REAL_ACTION' })).toBe(state);
  });
});
