import { describe, expect, it, beforeEach, vi } from 'vitest';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppProviders } from '@context/AppProviders';
import { AppShell } from '../AppShell';
import { CalculatorPage } from '../CalculatorPage';

function renderPage() {
  return render(
    <AppProviders>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/" element={<CalculatorPage />} />
            <Route path="/scientific" element={<CalculatorPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </AppProviders>,
  );
}

// Framer Motion's exit animations never resolve under jsdom (no real
// requestAnimationFrame), so AnimatePresence can leave stale, previously
// displayed values mounted alongside the current one, all sharing this
// testid. Assert that *some* instance shows the expected value instead of
// relying on DOM order.
async function expectPrimaryToShow(text: string) {
  await waitFor(() => {
    const nodes = screen.getAllByTestId('calculator-primary');
    expect(nodes.some((node) => node.textContent === text)).toBe(true);
  });
}

describe('CalculatorPage (Standard mode)', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('computes a basic expression end to end', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('button', { name: '1' }));
    await user.click(screen.getByRole('button', { name: '2' }));
    await user.click(screen.getByRole('button', { name: 'Add' }));
    await user.click(screen.getByRole('button', { name: '7' }));
    await user.click(screen.getByRole('button', { name: 'Equals' }));

    await expectPrimaryToShow('19');
  });

  it('shows a friendly error and does not crash on divide by zero', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('button', { name: '5' }));
    await user.click(screen.getByRole('button', { name: 'Divide' }));
    await user.click(screen.getByRole('button', { name: '0' }));
    await user.click(screen.getByRole('button', { name: 'Equals' }));

    expect(await screen.findByText(/cannot divide by zero/i)).toBeInTheDocument();
  });

  it('clears the expression when Clear is pressed', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('button', { name: '4' }));
    await user.click(screen.getByRole('button', { name: 'Clear' }));

    await expectPrimaryToShow('0');
  });

  it('switches between Standard and Scientific tabs', async () => {
    const user = userEvent.setup();
    renderPage();

    const scientificTab = screen.getByRole('tab', { name: 'Scientific' });
    await user.click(scientificTab);

    expect(scientificTab).toHaveAttribute('aria-selected', 'true');
  });
});

describe('History panel', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('records a successful calculation and can reuse it', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('button', { name: '3' }));
    await user.click(screen.getByRole('button', { name: 'Add' }));
    await user.click(screen.getByRole('button', { name: '4' }));
    await user.click(screen.getByRole('button', { name: 'Equals' }));
    await expectPrimaryToShow('7');

    await user.click(screen.getByRole('button', { name: 'Open history' }));
    const dialog = screen.getByRole('dialog', { name: 'History' });
    expect(within(dialog).getByText('3+4')).toBeInTheDocument();

    await user.click(within(dialog).getByRole('button', { name: 'Reuse result 7' }));
    await expectPrimaryToShow('7');
  });

  it('deletes a single history entry', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('button', { name: '9' }));
    await user.click(screen.getByRole('button', { name: 'Equals' }));
    await expectPrimaryToShow('9');

    await user.click(screen.getByRole('button', { name: 'Open history' }));
    const dialog = screen.getByRole('dialog', { name: 'History' });
    await user.click(within(dialog).getByRole('button', { name: 'Delete entry' }));

    expect(within(dialog).getByText('No calculations yet.')).toBeInTheDocument();
  });

  it('clears history after confirming in the dialog', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('button', { name: '2' }));
    await user.click(screen.getByRole('button', { name: 'Equals' }));
    await expectPrimaryToShow('2');

    await user.click(screen.getByRole('button', { name: 'Open history' }));
    const dialog = screen.getByRole('dialog', { name: 'History' });
    await user.click(within(dialog).getByRole('button', { name: 'Clear all' }));
    await user.click(screen.getByRole('button', { name: 'Yes, clear all' }));

    expect(within(dialog).getByText('No calculations yet.')).toBeInTheDocument();
  });

  it('filters entries by search query', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('button', { name: '3' }));
    await user.click(screen.getByRole('button', { name: 'Add' }));
    await user.click(screen.getByRole('button', { name: '4' }));
    await user.click(screen.getByRole('button', { name: 'Equals' }));
    await expectPrimaryToShow('7');
    await user.click(screen.getByRole('button', { name: 'Clear' }));

    await user.click(screen.getByRole('button', { name: '9' }));
    await user.click(screen.getByRole('button', { name: 'Equals' }));
    await expectPrimaryToShow('9');

    await user.click(screen.getByRole('button', { name: 'Open history' }));
    const dialog = screen.getByRole('dialog', { name: 'History' });
    expect(within(dialog).getByText('3+4')).toBeInTheDocument();
    expect(within(dialog).getByText('9')).toBeInTheDocument();

    await user.type(within(dialog).getByRole('textbox', { name: 'Search history' }), '3+4');

    expect(within(dialog).getByText('3+4')).toBeInTheDocument();
    expect(within(dialog).queryByText('No matches.')).not.toBeInTheDocument();
  });

  it('marks an entry as a favorite and copies its result', async () => {
    const user = userEvent.setup();
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      configurable: true,
    });
    renderPage();

    await user.click(screen.getByRole('button', { name: '6' }));
    await user.click(screen.getByRole('button', { name: 'Equals' }));
    await expectPrimaryToShow('6');

    await user.click(screen.getByRole('button', { name: 'Open history' }));
    const dialog = screen.getByRole('dialog', { name: 'History' });
    const favorite = within(dialog).getByRole('button', { name: 'Mark as favorite' });
    await user.click(favorite);
    expect(favorite).toHaveAttribute('aria-pressed', 'true');

    await user.click(within(dialog).getByRole('button', { name: 'Copy result' }));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('6');
  });
});

describe('Memory panel', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('MS saves the current value and MR recalls it', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('button', { name: '5' }));
    await user.click(screen.getByRole('button', { name: 'MS' }));
    await user.click(screen.getByRole('button', { name: 'Clear' }));

    await user.click(screen.getByRole('button', { name: 'MR' }));
    await expectPrimaryToShow('5');
  });

  it('M+ adds to the saved memory value', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('button', { name: '5' }));
    await user.click(screen.getByRole('button', { name: 'MS' }));
    await user.click(screen.getByRole('button', { name: 'Clear' }));

    await user.click(screen.getByRole('button', { name: '3' }));
    await user.click(screen.getByRole('button', { name: 'M+' }));

    await user.click(screen.getByRole('button', { name: 'Open memory' }));
    const dialog = screen.getByRole('dialog', { name: 'Memory' });
    expect(within(dialog).getByText('8')).toBeInTheDocument();
  });

  it('renames a memory entry', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('button', { name: '7' }));
    await user.click(screen.getByRole('button', { name: 'MS' }));

    await user.click(screen.getByRole('button', { name: 'Open memory' }));
    const dialog = screen.getByRole('dialog', { name: 'Memory' });
    await user.click(within(dialog).getByRole('button', { name: 'Rename memory' }));

    const input = within(dialog).getByRole('textbox', { name: 'Memory label' });
    await user.clear(input);
    await user.type(input, 'Tax rate{Enter}');

    expect(within(dialog).getByText('Tax rate')).toBeInTheDocument();
  });

  it('MC clears all saved memory', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('button', { name: '4' }));
    await user.click(screen.getByRole('button', { name: 'MS' }));
    await user.click(screen.getByRole('button', { name: 'MC' }));

    await user.click(screen.getByRole('button', { name: 'Open memory' }));
    const dialog = screen.getByRole('dialog', { name: 'Memory' });
    expect(within(dialog).getByText(/no saved values yet/i)).toBeInTheDocument();
  });
});

describe('Settings panel', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('switches theme and applies it to the document root', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('button', { name: 'Open settings' }));
    const dialog = screen.getByRole('dialog', { name: 'Settings' });
    await user.click(within(dialog).getByRole('radio', { name: 'AMOLED' }));

    expect(document.documentElement).toHaveAttribute('data-theme', 'amoled');
  });

  it('changes the accent color CSS variable', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('button', { name: 'Open settings' }));
    const dialog = screen.getByRole('dialog', { name: 'Settings' });
    await user.click(within(dialog).getByRole('radio', { name: 'Accent color #0984e3' }));

    expect(document.documentElement.style.getPropertyValue('--accent')).toBe('#0984e3');
  });

  it('resets settings to defaults after confirming', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('button', { name: 'Open settings' }));
    const dialog = screen.getByRole('dialog', { name: 'Settings' });
    await user.click(within(dialog).getByRole('radio', { name: 'AMOLED' }));
    expect(document.documentElement).toHaveAttribute('data-theme', 'amoled');

    await user.click(within(dialog).getByRole('button', { name: /reset to defaults/i }));
    await user.click(screen.getByRole('button', { name: 'Yes, reset' }));

    expect(document.documentElement).not.toHaveAttribute('data-theme', 'amoled');
  });

  it('hides the accent picker and locks the accent variable in High Contrast', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('button', { name: 'Open settings' }));
    const dialog = screen.getByRole('dialog', { name: 'Settings' });
    await user.click(within(dialog).getByRole('radio', { name: 'High Contrast' }));

    expect(
      within(dialog).queryByRole('radiogroup', { name: 'Accent color' }),
    ).not.toBeInTheDocument();
    expect(document.documentElement.style.getPropertyValue('--accent')).toBe('');
  });

  it('adjusts decimal precision and applies it to new calculations', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('button', { name: 'Open settings' }));
    const dialog = screen.getByRole('dialog', { name: 'Settings' });
    const precisionSlider = within(dialog).getByRole('slider', { name: 'Decimal precision' });
    fireEvent.change(precisionSlider, { target: { value: '2' } });
    await user.click(within(dialog).getByRole('button', { name: 'Close Settings' }));

    await user.click(screen.getByRole('button', { name: '1' }));
    await user.click(screen.getByRole('button', { name: 'Divide' }));
    await user.click(screen.getByRole('button', { name: '3' }));
    await user.click(screen.getByRole('button', { name: 'Equals' }));

    await expectPrimaryToShow('0.33');
  });

  it('switches layout density', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('button', { name: 'Open settings' }));
    const dialog = screen.getByRole('dialog', { name: 'Settings' });
    const compact = within(dialog).getByRole('radio', { name: 'Compact' });
    await user.click(compact);

    expect(compact).toHaveAttribute('aria-checked', 'true');
    expect(document.documentElement.style.getPropertyValue('--space-unit')).toBe('6px');
  });

  it('updates the history limit', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('button', { name: 'Open settings' }));
    const dialog = screen.getByRole('dialog', { name: 'Settings' });
    const limitInput = within(dialog).getByRole('spinbutton', { name: 'History limit' });
    fireEvent.change(limitInput, { target: { value: '50' } });

    expect(limitInput).toHaveValue(50);
  });

  it('toggles sound, haptics, and reduced motion preferences', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('button', { name: 'Open settings' }));
    const dialog = screen.getByRole('dialog', { name: 'Settings' });

    const sound = within(dialog).getByRole('checkbox', { name: 'Sound effects' });
    const haptics = within(dialog).getByRole('checkbox', { name: 'Haptic feedback' });
    const reducedMotion = within(dialog).getByRole('checkbox', { name: 'Reduce motion' });

    await user.click(sound);
    await user.click(haptics);
    await user.click(reducedMotion);

    expect(sound).toBeChecked();
    expect(haptics).not.toBeChecked();
    expect(reducedMotion).toBeChecked();
  });
});
