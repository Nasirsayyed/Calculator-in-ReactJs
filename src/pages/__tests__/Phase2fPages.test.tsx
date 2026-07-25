import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppProviders } from '@context/AppProviders';
import { AppShell } from '../AppShell';
import { DateCalculatorPage } from '../DateCalculatorPage';
import { ProgrammerPage } from '../ProgrammerPage';
import { RandomNumberPage } from '../RandomNumberPage';

function renderApp(initialPath: string) {
  return render(
    <AppProviders>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/date" element={<DateCalculatorPage />} />
            <Route path="/programmer" element={<ProgrammerPage />} />
            <Route path="/random" element={<RandomNumberPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </AppProviders>,
  );
}

describe('Date Calculator page', () => {
  it('computes the difference between two dates', async () => {
    const user = userEvent.setup();
    renderApp('/date');

    const fields = screen.getAllByLabelText(/date/i);
    await user.clear(fields[0]!);
    await user.type(fields[0]!, '2024-01-01');
    await user.clear(fields[1]!);
    await user.type(fields[1]!, '2024-01-11');

    expect(screen.getByText('Total days').nextSibling).toHaveTextContent('10');
  });

  it('adds days to a date', async () => {
    const user = userEvent.setup();
    renderApp('/date');

    await user.click(screen.getByRole('radio', { name: 'Add / subtract days' }));
    const startField = screen.getByLabelText('Start date');
    await user.clear(startField);
    await user.type(startField, '2024-01-01');
    await user.type(screen.getByLabelText('Days to add (negative to subtract)'), '10');

    expect(screen.getByText('Resulting date').nextSibling).toHaveTextContent('January 11, 2024');
  });
});

describe('Programmer calculator page', () => {
  it('shows a decimal input in all bases', async () => {
    const user = userEvent.setup();
    renderApp('/programmer');

    const valueA = screen.getByLabelText('Value A');
    await user.clear(valueA);
    await user.type(valueA, '255');

    expect(screen.getByText('A in all bases')).toBeInTheDocument();
    expect(screen.getAllByText('FF').length).toBeGreaterThan(0);
    expect(screen.getAllByText('11111111').length).toBeGreaterThan(0);
  });

  it('computes a bitwise AND between two values', async () => {
    const user = userEvent.setup();
    renderApp('/programmer');

    const valueA = screen.getByLabelText('Value A');
    await user.clear(valueA);
    await user.type(valueA, '12');
    const valueB = screen.getByLabelText('Value B');
    await user.clear(valueB);
    await user.type(valueB, '10');

    expect(screen.getAllByText('8').length).toBeGreaterThan(0);
  });
});

describe('Random Number Generator page', () => {
  it('generates numbers within the requested range', async () => {
    const user = userEvent.setup();
    renderApp('/random');

    await user.clear(screen.getByLabelText('Minimum'));
    await user.type(screen.getByLabelText('Minimum'), '5');
    await user.clear(screen.getByLabelText('Maximum'));
    await user.type(screen.getByLabelText('Maximum'), '5');
    await user.clear(screen.getByLabelText('How many'));
    await user.type(screen.getByLabelText('How many'), '3');
    await user.click(screen.getByRole('button', { name: 'Generate' }));

    expect(screen.getByText('5, 5, 5')).toBeInTheDocument();
  });
});
