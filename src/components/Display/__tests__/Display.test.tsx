import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Display } from '../Display';

describe('Display', () => {
  it('shows "0" as a placeholder for an empty expression', () => {
    render(
      <Display
        expression=""
        preview=""
        result=""
        error={null}
        justEvaluated={false}
        errorNonce={0}
      />,
    );
    expect(screen.getAllByTestId('calculator-primary')[0]).toHaveTextContent('0');
  });

  it('shows the live preview under the expression while typing', () => {
    render(
      <Display
        expression="2+2"
        preview="4"
        result=""
        error={null}
        justEvaluated={false}
        errorNonce={0}
      />,
    );
    expect(screen.getAllByTestId('calculator-primary')[0]).toHaveTextContent('2+2');
    expect(screen.getByTestId('calculator-secondary')).toHaveTextContent('= 4');
  });

  it('shows the final result as the primary value once evaluated', () => {
    render(
      <Display expression="2+2" preview="" result="4" error={null} justEvaluated errorNonce={0} />,
    );
    expect(screen.getAllByTestId('calculator-primary')[0]).toHaveTextContent('4');
    expect(screen.getByTestId('calculator-secondary')).toHaveTextContent('2+2');
  });

  it('surfaces an error message in the secondary line', () => {
    render(
      <Display
        expression="1/0"
        preview=""
        result=""
        error="Cannot divide by zero"
        justEvaluated={false}
        errorNonce={1}
      />,
    );
    expect(screen.getByTestId('calculator-secondary')).toHaveTextContent('Cannot divide by zero');
  });
});
