import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppProviders } from '@context/AppProviders';
import { AppShell } from '../AppShell';
import { LcmGcdPage } from '../LcmGcdPage';
import { StatisticsPage } from '../StatisticsPage';
import { ProbabilityPage } from '../ProbabilityPage';
import { QuadraticPage } from '../QuadraticPage';
import { EquationSolverPage } from '../EquationSolverPage';

function renderApp(initialPath: string) {
  return render(
    <AppProviders>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/lcm-gcd" element={<LcmGcdPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
            <Route path="/probability" element={<ProbabilityPage />} />
            <Route path="/quadratic" element={<QuadraticPage />} />
            <Route path="/equation-solver" element={<EquationSolverPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </AppProviders>,
  );
}

describe('LCM/GCD calculator page', () => {
  it('computes GCD and LCM for a list of numbers', async () => {
    const user = userEvent.setup();
    renderApp('/lcm-gcd');

    await user.type(screen.getByLabelText('Numbers (comma or space separated)'), '12, 18');

    expect(screen.getByText('GCD').nextSibling).toHaveTextContent('6');
    expect(screen.getByText('LCM').nextSibling).toHaveTextContent('36');
  });
});

describe('Statistics calculator page', () => {
  it('computes mean and population standard deviation', async () => {
    const user = userEvent.setup();
    renderApp('/statistics');

    await user.type(
      screen.getByLabelText('Numbers (comma or space separated)'),
      '2, 4, 4, 4, 5, 5, 7, 9',
    );

    expect(screen.getByText('Mean').nextSibling).toHaveTextContent('5');
    expect(screen.getByText('Std deviation (population)').nextSibling).toHaveTextContent('2');
  });
});

describe('Probability calculator page', () => {
  it('computes nPr by default', async () => {
    const user = userEvent.setup();
    renderApp('/probability');

    await user.type(screen.getByLabelText('n (total items)'), '5');
    await user.type(screen.getByLabelText('r (chosen items)'), '2');

    expect(screen.getByText('20')).toBeInTheDocument();
  });

  it('computes an event probability as a percentage', async () => {
    const user = userEvent.setup();
    renderApp('/probability');

    await user.click(screen.getByRole('radio', { name: 'Event probability' }));
    await user.type(screen.getByLabelText('Favorable outcomes'), '1');
    await user.type(screen.getByLabelText('Total outcomes'), '4');

    expect(screen.getByText('25%')).toBeInTheDocument();
  });
});

describe('Quadratic solver page', () => {
  it('finds two real roots', async () => {
    const user = userEvent.setup();
    renderApp('/quadratic');

    await user.type(screen.getByLabelText('a'), '1');
    await user.type(screen.getByLabelText('b'), '-3');
    await user.type(screen.getByLabelText('c'), '2');

    expect(screen.getByText('2, 1')).toBeInTheDocument();
  });

  it('finds complex roots when the discriminant is negative', async () => {
    const user = userEvent.setup();
    renderApp('/quadratic');

    await user.type(screen.getByLabelText('a'), '1');
    await user.type(screen.getByLabelText('c'), '1');

    expect(screen.getByText('0 ± 1i')).toBeInTheDocument();
  });
});

describe('Equation solver page', () => {
  it('solves a unique 2x2 linear system', async () => {
    const user = userEvent.setup();
    renderApp('/equation-solver');

    await user.type(screen.getByLabelText('a₁'), '1');
    await user.type(screen.getByLabelText('b₁'), '1');
    await user.type(screen.getByLabelText('c₁'), '10');
    await user.type(screen.getByLabelText('a₂'), '1');
    await user.type(screen.getByLabelText('b₂'), '-1');
    await user.type(screen.getByLabelText('c₂'), '2');

    expect(screen.getByText('x').nextSibling).toHaveTextContent('6');
    expect(screen.getByText('y').nextSibling).toHaveTextContent('4');
  });
});
