import { useEffect, useMemo, useState } from 'react';
import { useCalculator } from '@context/CalculatorContext';
import { useHistory } from '@context/HistoryContext';
import { Layout } from '@components/Layout';
import { Display } from '@components/Display';
import { Keyboard } from '@components/Keyboard';
import { Sidebar } from '@components/Sidebar';
import { AngleModeToggle } from '@components/Scientific';
import { HistoryPanel } from '@components/History';
import { MemoryPanel, MemoryToolbar } from '@components/Memory';
import { SettingsPanel } from '@components/Settings';
import { STANDARD_KEYPAD } from '@constants/standardKeypad';
import { SCIENTIFIC_KEYPAD } from '@constants/scientificKeypad';

export function CalculatorPage() {
  const { state, setExpression } = useCalculator();
  const { addEntry } = useHistory();
  const [historyOpen, setHistoryOpen] = useState(false);
  const [memoryOpen, setMemoryOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

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

  const handleReuse = (result: string) => {
    setExpression(result);
    setHistoryOpen(false);
  };

  return (
    <Layout
      onOpenHistory={() => setHistoryOpen(true)}
      onOpenMemory={() => setMemoryOpen(true)}
      onOpenSettings={() => setSettingsOpen(true)}
    >
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

      <Sidebar open={historyOpen} title="History" onClose={() => setHistoryOpen(false)}>
        <HistoryPanel onReuse={handleReuse} />
      </Sidebar>
      <Sidebar open={memoryOpen} title="Memory" onClose={() => setMemoryOpen(false)}>
        <MemoryPanel />
      </Sidebar>
      <Sidebar open={settingsOpen} title="Settings" onClose={() => setSettingsOpen(false)}>
        <SettingsPanel />
      </Sidebar>
    </Layout>
  );
}
