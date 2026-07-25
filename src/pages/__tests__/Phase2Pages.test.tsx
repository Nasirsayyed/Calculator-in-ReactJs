import { describe, expect, it, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppProviders } from '@context/AppProviders';
import { AppShell } from '../AppShell';
import { CalculatorPage } from '../CalculatorPage';
import { PercentagePage } from '../PercentagePage';
import { BmiPage } from '../BmiPage';
import { EmiPage } from '../EmiPage';
import { AgePage } from '../AgePage';

function renderApp(initialPath: string) {
  return render(
    <AppProviders>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/" element={<CalculatorPage />} />
            <Route path="/scientific" element={<CalculatorPage />} />
            <Route path="/percentage" element={<PercentagePage />} />
            <Route path="/bmi" element={<BmiPage />} />
            <Route path="/emi" element={<EmiPage />} />
            <Route path="/age" element={<AgePage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </AppProviders>,
  );
}

describe('Modes launcher navigation', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('navigates to an available calculator and back', async () => {
    const user = userEvent.setup();
    renderApp('/');

    await user.click(screen.getByRole('button', { name: 'Browse calculators' }));
    await user.click(screen.getByRole('link', { name: 'BMI Calculator' }));

    expect(screen.getByRole('heading', { name: 'BMI Calculator' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Back to calculators' }));
    expect(screen.getByRole('tab', { name: 'Standard' })).toHaveAttribute('aria-selected', 'true');
  });

  it('filters the launcher by search query', async () => {
    const user = userEvent.setup();
    renderApp('/');

    await user.click(screen.getByRole('button', { name: 'Browse calculators' }));
    const dialog = screen.getByRole('dialog', { name: 'Calculators' });
    await user.type(within(dialog).getByRole('textbox', { name: 'Search calculators' }), 'emi');

    expect(within(dialog).getByRole('link', { name: 'EMI Calculator' })).toBeInTheDocument();
    expect(within(dialog).queryByText('BMI Calculator')).not.toBeInTheDocument();
  });

  it('does not let you click into a coming-soon calculator', async () => {
    const user = userEvent.setup();
    renderApp('/');

    await user.click(screen.getByRole('button', { name: 'Browse calculators' }));
    const dialog = screen.getByRole('dialog', { name: 'Calculators' });
    expect(within(dialog).queryByRole('link', { name: 'Programmer' })).not.toBeInTheDocument();
    expect(within(dialog).getByText('Programmer')).toHaveAttribute('aria-disabled', 'true');
  });
});

describe('Percentage calculator page', () => {
  it('computes "X% of Y" live as the user types', async () => {
    const user = userEvent.setup();
    renderApp('/percentage');

    await user.type(screen.getByLabelText('Value (X)'), '15');
    await user.type(screen.getByLabelText('Of value (Y)'), '800');

    expect(screen.getByText('120')).toBeInTheDocument();
  });
});

describe('EMI calculator page', () => {
  it('computes a known EMI and formats it to 2 decimal places', async () => {
    const user = userEvent.setup();
    renderApp('/emi');

    await user.type(screen.getByLabelText('Loan amount'), '100000');
    await user.type(screen.getByLabelText('Annual interest rate'), '10');
    await user.click(screen.getByRole('radio', { name: 'Months' }));
    await user.type(screen.getByLabelText('Tenure', { exact: true }), '12');

    expect(screen.getByText('8791.59')).toBeInTheDocument();
  });
});

describe('BMI calculator page', () => {
  it('computes BMI and category live', async () => {
    const user = userEvent.setup();
    renderApp('/bmi');

    await user.type(screen.getByLabelText('Height'), '180');
    await user.type(screen.getByLabelText('Weight'), '75');

    expect(screen.getByText('23.1')).toBeInTheDocument();
    expect(screen.getByText('Normal')).toBeInTheDocument();
  });
});

describe('Age calculator page', () => {
  it('shows a placeholder until a birth date is entered', () => {
    renderApp('/age');
    expect(screen.getAllByText('—').length).toBeGreaterThan(0);
  });
});

describe('Default calculator setting', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('redirects to the configured default mode on a fresh app load', async () => {
    const user = userEvent.setup();
    const first = renderApp('/');

    await user.click(screen.getByRole('button', { name: 'Open settings' }));
    const dialog = screen.getByRole('dialog', { name: 'Settings' });
    await user.selectOptions(within(dialog).getByLabelText('Default calculator'), 'bmi');
    first.unmount();

    // Simulate a fresh page load reading the same persisted settings.
    renderApp('/');
    expect(await screen.findByRole('heading', { name: 'BMI Calculator' })).toBeInTheDocument();
  });

  it('remembers the last visited calculator when set to "Remember last used"', async () => {
    const user = userEvent.setup();
    const first = renderApp('/');

    await user.click(screen.getByRole('button', { name: 'Open settings' }));
    const dialog = screen.getByRole('dialog', { name: 'Settings' });
    await user.selectOptions(within(dialog).getByLabelText('Default calculator'), 'last-used');
    await user.click(within(dialog).getByRole('button', { name: 'Close Settings' }));

    await user.click(screen.getByRole('button', { name: 'Browse calculators' }));
    await user.click(screen.getByRole('link', { name: 'EMI Calculator' }));
    first.unmount();

    renderApp('/');
    expect(await screen.findByRole('heading', { name: 'EMI Calculator' })).toBeInTheDocument();
  });

  it('does not redirect away from a directly-visited route', () => {
    renderApp('/bmi');
    expect(screen.getByRole('heading', { name: 'BMI Calculator' })).toBeInTheDocument();
  });
});
