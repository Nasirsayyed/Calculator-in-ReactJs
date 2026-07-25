import { describe, expect, it, beforeEach } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
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

// See the matching helper/comment in CalculatorPage.test.tsx: Framer Motion's
// exit animations never resolve under jsdom, so stale display values can
// stay mounted alongside the current one under the same testid.
async function expectPrimaryToShowViaKeyboard(text: string) {
  await waitFor(() => {
    const nodes = screen.getAllByTestId('calculator-primary');
    expect(nodes.some((node) => node.textContent === text)).toBe(true);
  });
}

describe('accessibility', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('has no axe violations in Standard mode', async () => {
    const { container } = renderPage();
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no axe violations in Scientific mode', async () => {
    const user = userEvent.setup();
    const { container } = renderPage();
    await user.click(screen.getByRole('tab', { name: 'Scientific' }));
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no axe violations with the History panel open', async () => {
    const user = userEvent.setup();
    const { container } = renderPage();
    await user.click(screen.getByRole('button', { name: 'Open history' }));
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no axe violations with the Memory panel open', async () => {
    const user = userEvent.setup();
    const { container } = renderPage();
    await user.click(screen.getByRole('button', { name: 'Open memory' }));
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no axe violations with the Settings panel open', async () => {
    const user = userEvent.setup();
    const { container } = renderPage();
    await user.click(screen.getByRole('button', { name: 'Open settings' }));
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no axe violations with a confirmation modal open', async () => {
    const user = userEvent.setup();
    const { container } = renderPage();
    await user.click(screen.getByRole('button', { name: '1' }));
    await user.click(screen.getByRole('button', { name: 'Equals' }));
    await user.click(screen.getByRole('button', { name: 'Open history' }));
    await user.click(screen.getByRole('button', { name: 'Clear all' }));
    expect(await axe(container)).toHaveNoViolations();
  });

  it('moves focus into the History dialog on open and restores it on close', async () => {
    const user = userEvent.setup();
    renderPage();

    const trigger = screen.getByRole('button', { name: 'Open history' });
    await user.click(trigger);

    const dialog = screen.getByRole('dialog', { name: 'History' });
    expect(dialog.contains(document.activeElement)).toBe(true);

    await user.keyboard('{Escape}');
    expect(trigger).toHaveFocus();
  });

  it('activates a focused button via Enter instead of triggering the global equals shortcut', async () => {
    const user = userEvent.setup();
    renderPage();

    screen.getByRole('button', { name: 'Open history' }).focus();
    await user.keyboard('{Enter}');

    expect(await screen.findByRole('dialog', { name: 'History' })).toBeInTheDocument();
  });

  it('lets the history search box receive typed digits instead of the calculator', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('button', { name: 'Open history' }));
    const search = screen.getByRole('textbox', { name: 'Search history' });
    await user.type(search, '99');

    expect(search).toHaveValue('99');
  });

  it('does not clear the calculator when Escape closes a dialog', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('button', { name: '7' }));
    await user.click(screen.getByRole('button', { name: 'Open settings' }));
    await user.keyboard('{Escape}');

    const nodes = screen.getAllByTestId('calculator-primary');
    expect(nodes.some((node) => node.textContent === '7')).toBe(true);
  });

  it('traps Tab focus inside an open dialog', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('button', { name: 'Open history' }));
    const dialog = screen.getByRole('dialog', { name: 'History' });

    // Tab far more times than there are focusable elements in the dialog -
    // focus must never leave it.
    for (let i = 0; i < 15; i += 1) {
      await user.keyboard('{Tab}');
      expect(dialog.contains(document.activeElement)).toBe(true);
    }
  });

  it('only closes the topmost dialog when a confirmation modal is open over a panel', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('button', { name: '3' }));
    await user.click(screen.getByRole('button', { name: 'Equals' }));
    await user.click(screen.getByRole('button', { name: 'Open history' }));
    await user.click(screen.getByRole('button', { name: 'Clear all' }));

    expect(screen.getByRole('alertdialog', { name: 'Clear history?' })).toBeInTheDocument();

    await user.keyboard('{Escape}');

    // The confirm modal's exit animation never resolves under jsdom (no real
    // requestAnimationFrame), so assert on its opacity heading to 0 instead
    // of immediate DOM removal.
    await waitFor(() => {
      const modal = screen.queryByRole('alertdialog', { name: 'Clear history?' });
      expect(!modal || Number((modal as HTMLElement).style.opacity) < 0.5).toBe(true);
    });
    expect(screen.getByRole('dialog', { name: 'History' })).toBeInTheDocument();
  });

  it('supports operator, backspace, and escape-to-clear physical keyboard shortcuts', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.keyboard('12+7');
    await expectPrimaryToShowViaKeyboard('12+7');
    await user.keyboard('{Backspace}');
    await expectPrimaryToShowViaKeyboard('12+');
    await user.keyboard('{Escape}');
    await expectPrimaryToShowViaKeyboard('0');
  });

  it.each(['Light', 'Dark', 'AMOLED', 'High Contrast'])(
    'has no axe violations (including color contrast) in the %s theme',
    async (themeLabel) => {
      const user = userEvent.setup();
      const { container } = renderPage();

      await user.click(screen.getByRole('button', { name: 'Open settings' }));
      const dialog = screen.getByRole('dialog', { name: 'Settings' });
      await user.click(within(dialog).getByRole('radio', { name: themeLabel }));
      await user.click(within(dialog).getByRole('button', { name: `Close Settings` }));

      expect(await axe(container)).toHaveNoViolations();
    },
  );
});
