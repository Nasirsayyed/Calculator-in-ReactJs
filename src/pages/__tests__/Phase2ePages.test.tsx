import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppProviders } from '@context/AppProviders';
import { AppShell } from '../AppShell';
import { MatrixPage } from '../MatrixPage';
import { VectorPage } from '../VectorPage';
import { PolynomialPage } from '../PolynomialPage';
import { BaseConverterPage } from '../BaseConverterPage';
import { RomanNumeralPage } from '../RomanNumeralPage';
import { TimezoneConverterPage } from '../TimezoneConverterPage';
import { getSupportedTimeZones } from '@utils/calculations/timezoneConverter';

function renderApp(initialPath: string) {
  return render(
    <AppProviders>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/matrix" element={<MatrixPage />} />
            <Route path="/vector" element={<VectorPage />} />
            <Route path="/polynomial" element={<PolynomialPage />} />
            <Route path="/base-converter" element={<BaseConverterPage />} />
            <Route path="/roman-numeral" element={<RomanNumeralPage />} />
            <Route path="/timezone" element={<TimezoneConverterPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </AppProviders>,
  );
}

describe('Matrix calculator page', () => {
  it('adds two 2x2 matrices', async () => {
    const user = userEvent.setup();
    renderApp('/matrix');

    await user.clear(screen.getByLabelText('Matrix A cell 1'));
    await user.type(screen.getByLabelText('Matrix A cell 1'), '1');
    await user.clear(screen.getByLabelText('Matrix B cell 1'));
    await user.type(screen.getByLabelText('Matrix B cell 1'), '5');

    const resultCells = screen.getAllByText('6');
    expect(resultCells.length).toBeGreaterThan(0);
  });

  it('computes a determinant', async () => {
    const user = userEvent.setup();
    renderApp('/matrix');

    await user.click(screen.getByRole('radio', { name: '|A|' }));
    await user.clear(screen.getByLabelText('Matrix A cell 1'));
    await user.type(screen.getByLabelText('Matrix A cell 1'), '1');
    await user.clear(screen.getByLabelText('Matrix A cell 2'));
    await user.type(screen.getByLabelText('Matrix A cell 2'), '2');
    await user.clear(screen.getByLabelText('Matrix A cell 3'));
    await user.type(screen.getByLabelText('Matrix A cell 3'), '3');
    await user.clear(screen.getByLabelText('Matrix A cell 4'));
    await user.type(screen.getByLabelText('Matrix A cell 4'), '4');

    expect(screen.getByText('Determinant').nextSibling).toHaveTextContent('-2');
  });
});

describe('Vector calculator page', () => {
  it('computes the dot product of two 3D vectors', async () => {
    const user = userEvent.setup();
    renderApp('/vector');

    await user.click(screen.getByRole('radio', { name: 'A · B' }));
    const aInputs = [1, 2, 3];
    for (let i = 0; i < aInputs.length; i += 1) {
      const field = screen.getByLabelText(`Vector A component ${i + 1}`);
      await user.clear(field);
      await user.type(field, String(aInputs[i]));
    }
    const bInputs = [4, 5, 6];
    for (let i = 0; i < bInputs.length; i += 1) {
      const field = screen.getByLabelText(`Vector B component ${i + 1}`);
      await user.clear(field);
      await user.type(field, String(bInputs[i]));
    }

    expect(screen.getByText('Result').nextSibling).toHaveTextContent('32');
  });
});

describe('Polynomial calculator page', () => {
  it('evaluates a polynomial at a given x', async () => {
    const user = userEvent.setup();
    renderApp('/polynomial');

    await user.type(screen.getByLabelText('P coefficients (constant term first)'), '1, 3, 2');
    await user.type(screen.getByLabelText('x'), '2');

    expect(screen.getByText('15')).toBeInTheDocument();
  });
});

describe('Base Converter page', () => {
  it('converts decimal to binary', async () => {
    const user = userEvent.setup();
    renderApp('/base-converter');

    await user.type(screen.getByLabelText('Value'), '10');

    expect(screen.getByText('1010')).toBeInTheDocument();
  });
});

describe('Roman Numeral Converter page', () => {
  it('converts a number to a roman numeral', async () => {
    const user = userEvent.setup();
    renderApp('/roman-numeral');

    await user.type(screen.getByLabelText('Number (1-3999)'), '1994');

    expect(screen.getByText('MCMXCIV')).toBeInTheDocument();
  });
});

describe('Timezone Converter page', () => {
  it('converts a fixed-offset zone correctly', async () => {
    const user = userEvent.setup();
    renderApp('/timezone');

    // The exact IANA alias available (Kolkata vs. the legacy Calcutta name)
    // depends on the runtime's ICU data, but it's always a fixed UTC+5:30 zone.
    const indiaZone =
      getSupportedTimeZones().find((zone) => /Kolkata|Calcutta/.test(zone)) ?? 'UTC';

    const main = screen.getByRole('main');
    await user.selectOptions(within(main).getByLabelText('From timezone'), 'UTC');
    await user.selectOptions(within(main).getByLabelText('To timezone'), indiaZone);
    const dateField = screen.getByLabelText('Date & time');
    await user.clear(dateField);
    await user.type(dateField, '2024-06-01T12:00');

    expect(screen.getByText('Converted time').nextSibling).toHaveTextContent('5:30:00 PM');
  });
});
