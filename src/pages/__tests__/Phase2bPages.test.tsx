import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppProviders } from '@context/AppProviders';
import { AppShell } from '../AppShell';
import { LoanPage } from '../LoanPage';
import { MortgagePage } from '../MortgagePage';
import { InvestmentPage } from '../InvestmentPage';
import { ProfitLossPage } from '../ProfitLossPage';
import { MarginPage } from '../MarginPage';

function renderApp(initialPath: string) {
  return render(
    <AppProviders>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/loan" element={<LoanPage />} />
            <Route path="/mortgage" element={<MortgagePage />} />
            <Route path="/investment" element={<InvestmentPage />} />
            <Route path="/profit-loss" element={<ProfitLossPage />} />
            <Route path="/margin" element={<MarginPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </AppProviders>,
  );
}

describe('Loan calculator page', () => {
  it('computes a monthly payment and a yearly breakdown', async () => {
    const user = userEvent.setup();
    renderApp('/loan');

    await user.type(screen.getByLabelText('Loan amount'), '100000');
    await user.type(screen.getByLabelText('Annual interest rate'), '10');
    await user.type(screen.getByLabelText('Tenure'), '1');

    expect(screen.getByText('8791.59')).toBeInTheDocument();
    expect(screen.getByText('Yearly breakdown')).toBeInTheDocument();
  });
});

describe('Mortgage calculator page', () => {
  it('subtracts the down payment from the home price', async () => {
    const user = userEvent.setup();
    renderApp('/mortgage');

    await user.type(screen.getByLabelText('Home price'), '300000');
    await user.type(screen.getByLabelText('Down payment'), '60000');
    await user.type(screen.getByLabelText('Annual interest rate'), '6');
    await user.type(screen.getByLabelText('Loan term'), '30');

    expect(screen.getByText('240000')).toBeInTheDocument();
  });
});

describe('Investment calculator page', () => {
  it('computes a future value greater than total contributions when rate > 0', async () => {
    const user = userEvent.setup();
    renderApp('/investment');

    await user.type(screen.getByLabelText('Initial investment'), '1000');
    await user.type(screen.getByLabelText('Monthly contribution'), '100');
    await user.type(screen.getByLabelText('Expected annual return'), '8');
    await user.type(screen.getByLabelText('Duration'), '5');

    expect(screen.getByText('Future value')).toBeInTheDocument();
  });
});

describe('Profit & Loss calculator page', () => {
  it('labels a gain as Profit', async () => {
    const user = userEvent.setup();
    renderApp('/profit-loss');

    await user.type(screen.getByLabelText('Cost price'), '100');
    await user.type(screen.getByLabelText('Selling price'), '150');

    expect(screen.getByText('Profit')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
  });

  it('labels a decline as Loss', async () => {
    const user = userEvent.setup();
    renderApp('/profit-loss');

    await user.type(screen.getByLabelText('Cost price'), '200');
    await user.type(screen.getByLabelText('Selling price'), '150');

    expect(screen.getByText('Loss')).toBeInTheDocument();
  });
});

describe('Margin calculator page', () => {
  it('computes gross margin and markup', async () => {
    const user = userEvent.setup();
    renderApp('/margin');

    await user.type(screen.getByLabelText('Cost'), '80');
    await user.type(screen.getByLabelText('Revenue'), '100');

    expect(screen.getByText('20%')).toBeInTheDocument();
    expect(screen.getByText('25%')).toBeInTheDocument();
  });
});
