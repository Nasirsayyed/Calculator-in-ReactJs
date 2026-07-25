import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppProviders } from '@context/AppProviders';
import { AppShell } from '../AppShell';
import { SplitBillPage } from '../SplitBillPage';
import { RatioPage } from '../RatioPage';
import { AveragePage } from '../AveragePage';
import { CurrencyPage } from '../CurrencyPage';
import { UnitConverterPage } from '../UnitConverterPage';

function renderApp(initialPath: string) {
  return render(
    <AppProviders>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/split-bill" element={<SplitBillPage />} />
            <Route path="/ratio" element={<RatioPage />} />
            <Route path="/average" element={<AveragePage />} />
            <Route path="/currency" element={<CurrencyPage />} />
            <Route path="/convert" element={<UnitConverterPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </AppProviders>,
  );
}

describe('Split Bill calculator page', () => {
  it('splits a bill with tip across people', async () => {
    const user = userEvent.setup();
    renderApp('/split-bill');

    await user.type(screen.getByLabelText('Bill amount'), '100');
    await user.type(screen.getByLabelText('Number of people'), '4');
    await user.type(screen.getByLabelText('Tip'), '10');

    expect(screen.getByText('27.5')).toBeInTheDocument();
  });
});

describe('Ratio calculator page', () => {
  it('simplifies a ratio', async () => {
    const user = userEvent.setup();
    renderApp('/ratio');

    await user.type(screen.getByLabelText('a'), '8');
    await user.type(screen.getByLabelText('b'), '12');

    expect(screen.getByText('2 : 3')).toBeInTheDocument();
  });

  it('solves a proportion', async () => {
    const user = userEvent.setup();
    renderApp('/ratio');

    await user.click(screen.getByRole('radio', { name: 'Solve a:b = c:x' }));
    await user.type(screen.getByLabelText('a'), '2');
    await user.type(screen.getByLabelText('b'), '3');
    await user.type(screen.getByLabelText('c'), '10');

    expect(screen.getByText('15')).toBeInTheDocument();
  });
});

describe('Average calculator page', () => {
  it('computes summary statistics for a list of numbers', async () => {
    const user = userEvent.setup();
    renderApp('/average');

    await user.type(screen.getByLabelText('Numbers (comma or space separated)'), '1, 2, 3, 4, 5');

    expect(screen.getByText('Mean').nextSibling).toHaveTextContent('3');
    expect(screen.getByText('Sum').nextSibling).toHaveTextContent('15');
  });
});

describe('Currency calculator page', () => {
  it('multiplies amount by exchange rate', async () => {
    const user = userEvent.setup();
    renderApp('/currency');

    await user.type(screen.getByLabelText('Amount'), '100');
    await user.type(screen.getByLabelText('Exchange rate (1 unit = ?)'), '0.85');

    expect(screen.getByText('85')).toBeInTheDocument();
  });
});

describe('Unit Converter page', () => {
  it('converts within the default length category', async () => {
    const user = userEvent.setup();
    renderApp('/convert');

    await user.selectOptions(screen.getByLabelText('From'), 'km');
    await user.selectOptions(screen.getByLabelText('To'), 'm');
    await user.type(screen.getByLabelText('Value'), '1');

    expect(screen.getByText('1000')).toBeInTheDocument();
  });

  it('switches category and resets the unit selects', async () => {
    const user = userEvent.setup();
    renderApp('/convert');

    await user.selectOptions(screen.getByLabelText('Category'), 'temperature');
    await user.selectOptions(screen.getByLabelText('From'), 'c');
    await user.selectOptions(screen.getByLabelText('To'), 'f');
    await user.type(screen.getByLabelText('Value'), '0');

    expect(screen.getByText('32')).toBeInTheDocument();
  });
});
