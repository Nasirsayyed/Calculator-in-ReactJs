import { useCallback, useMemo, useReducer, type ReactNode } from 'react';
import { useSettings } from './SettingsContext';
import { calculatorReducer, createInitialCalculatorState } from '@store/calculatorReducer';
import { CalculatorContext, type CalculatorContextValue } from './CalculatorContext';
import type { CalculatorMode } from '@app-types/calculator';

export function CalculatorProvider({ children }: { children: ReactNode }) {
  const { settings } = useSettings();
  const [state, dispatch] = useReducer(calculatorReducer, undefined, createInitialCalculatorState);
  const precision = settings.decimalPrecision;

  const input = useCallback(
    (value: string) => dispatch({ type: 'INPUT', value, precision }),
    [precision],
  );
  const clear = useCallback(() => dispatch({ type: 'CLEAR' }), []);
  const deleteLast = useCallback(() => dispatch({ type: 'DELETE', precision }), [precision]);
  const equals = useCallback(() => dispatch({ type: 'EQUALS', precision }), [precision]);
  const toggleSign = useCallback(() => dispatch({ type: 'TOGGLE_SIGN', precision }), [precision]);
  const setMode = useCallback((mode: CalculatorMode) => dispatch({ type: 'SET_MODE', mode }), []);
  const setExpression = useCallback(
    (expression: string) => dispatch({ type: 'SET_EXPRESSION', expression, precision }),
    [precision],
  );
  const evaluateText = useCallback(
    (expression: string) => dispatch({ type: 'EVALUATE_EXPRESSION', expression, precision }),
    [precision],
  );

  const value = useMemo<CalculatorContextValue>(
    () => ({
      state,
      input,
      clear,
      deleteLast,
      equals,
      toggleSign,
      setMode,
      setExpression,
      evaluateText,
    }),
    [state, input, clear, deleteLast, equals, toggleSign, setMode, setExpression, evaluateText],
  );

  return <CalculatorContext.Provider value={value}>{children}</CalculatorContext.Provider>;
}
