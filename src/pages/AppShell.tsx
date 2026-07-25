import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useCalculator } from '@context/CalculatorContext';
import { useSettings } from '@context/SettingsContext';
import { Layout } from '@components/Layout';
import { Sidebar } from '@components/Sidebar';
import { HistoryPanel } from '@components/History';
import { MemoryPanel } from '@components/Memory';
import { SettingsPanel } from '@components/Settings';
import { ModesLauncher } from '@components/Modes';
import { CALCULATOR_MODES } from '@constants/calculatorModes';
import { STORAGE_KEYS } from '@constants/storageKeys';
import { readFromStorage, writeToStorage } from '@services/storage';

function resolveDefaultPath(defaultMode: string): string {
  if (defaultMode === 'last-used') {
    return readFromStorage(STORAGE_KEYS.lastVisitedPath, '/');
  }
  return (
    CALCULATOR_MODES.find((mode) => mode.id === defaultMode && mode.status === 'available')?.path ??
    '/'
  );
}

export function AppShell() {
  const { setExpression } = useCalculator();
  const { settings } = useSettings();
  const navigate = useNavigate();
  const location = useLocation();
  const [historyOpen, setHistoryOpen] = useState(false);
  const [memoryOpen, setMemoryOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [modesOpen, setModesOpen] = useState(false);
  const hasAppliedDefaultMode = useRef(false);

  // On first load only, jump to the user's configured default/last-used
  // calculator - but only from the app's natural entry route, so clicking
  // "Standard" later is never hijacked back to some other page.
  useEffect(() => {
    if (hasAppliedDefaultMode.current) return;
    hasAppliedDefaultMode.current = true;
    if (location.pathname !== '/' || settings.defaultMode === 'standard') return;

    const targetPath = resolveDefaultPath(settings.defaultMode);
    if (targetPath !== '/') navigate(targetPath, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentionally runs once on mount
  }, []);

  useEffect(() => {
    const isKnownModePath = CALCULATOR_MODES.some(
      (mode) => mode.path === location.pathname && mode.status === 'available',
    );
    if (isKnownModePath) writeToStorage(STORAGE_KEYS.lastVisitedPath, location.pathname);
  }, [location.pathname]);

  const handleReuse = (result: string) => {
    setExpression(result);
    setHistoryOpen(false);
    navigate('/');
  };

  return (
    <Layout
      onOpenHistory={() => setHistoryOpen(true)}
      onOpenMemory={() => setMemoryOpen(true)}
      onOpenSettings={() => setSettingsOpen(true)}
      onOpenModes={() => setModesOpen(true)}
    >
      <Outlet />

      <Sidebar open={historyOpen} title="History" onClose={() => setHistoryOpen(false)}>
        <HistoryPanel onReuse={handleReuse} />
      </Sidebar>
      <Sidebar open={memoryOpen} title="Memory" onClose={() => setMemoryOpen(false)}>
        <MemoryPanel />
      </Sidebar>
      <Sidebar open={settingsOpen} title="Settings" onClose={() => setSettingsOpen(false)}>
        <SettingsPanel />
      </Sidebar>
      <Sidebar open={modesOpen} title="Calculators" onClose={() => setModesOpen(false)}>
        <ModesLauncher onNavigate={() => setModesOpen(false)} />
      </Sidebar>
    </Layout>
  );
}
