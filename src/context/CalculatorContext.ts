import { createContext, useContext } from 'react';
import type { CalculatorMode, CalculatorState } from '@app-types/calculator';

export interface CalculatorContextValue {
  state: CalculatorState;
  input: (value: string) => void;
  clear: () => void;
  deleteLast: () => void;
  equals: () => void;
  toggleSign: () => void;
  setMode: (mode: CalculatorMode) => void;
  setExpression: (expression: string) => void;
}

export const CalculatorContext = createContext<CalculatorContextValue | null>(null);

export function useCalculator(): CalculatorContextValue {
  const context = useContext(CalculatorContext);
  if (!context) throw new Error('useCalculator must be used within a CalculatorProvider');
  return context;
}
