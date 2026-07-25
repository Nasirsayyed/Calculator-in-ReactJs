import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useCalculator } from '@context/CalculatorContext';
import { useHistory } from '@context/HistoryContext';
import { Display } from '@components/Display';
import { Keyboard } from '@components/Keyboard';
import { AngleModeToggle } from '@components/Scientific';
import { MemoryToolbar } from '@components/Memory';
import { NaturalLanguageInput } from '@components/NaturalLanguage';
import { STANDARD_KEYPAD } from '@constants/standardKeypad';
import { SCIENTIFIC_KEYPAD } from '@constants/scientificKeypad';

export function CalculatorPage() {
  const { state, setMode } = useCalculator();
  const { addEntry } = useHistory();
  const location = useLocation();

  useEffect(() => {
    setMode(location.pathname === '/scientific' ? 'scientific' : 'standard');
  }, [location.pathname, setMode]);

  useEffect(() => {
    if (state.justEvaluated && !state.error) {
      addEntry(state.expression, state.result, state.mode);
    }
  }, [state.justEvaluated, state.result, state.error, state.expression, state.mode, addEntry]);

  const layout = useMemo(
    () =>
      state.mode === 'scientific' ? [...SCIENTIFIC_KEYPAD, ...STANDARD_KEYPAD] : STANDARD_KEYPAD,
    [state.mode],
  );

  return (
    <>
      <NaturalLanguageInput />
      <Display
        expression={state.expression}
        preview={state.preview}
        result={state.result}
        error={state.error}
        justEvaluated={state.justEvaluated}
        errorNonce={state.errorNonce}
      />
      <MemoryToolbar />
      {state.mode === 'scientific' && <AngleModeToggle />}
      <Keyboard layout={layout} />
    </>
  );
}
