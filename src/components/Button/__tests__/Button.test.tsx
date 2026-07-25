import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';

describe('Button', () => {
  it('renders its children as the accessible label when no ariaLabel is given', () => {
    render(<Button onClick={() => {}}>7</Button>);
    expect(screen.getByRole('button', { name: '7' })).toBeInTheDocument();
  });

  it('uses ariaLabel over visible text for the accessible name', () => {
    render(
      <Button onClick={() => {}} ariaLabel="Add">
        +
      </Button>,
    );
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
  });

  it('calls onClick when pressed', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>=</Button>);

    await user.click(screen.getByRole('button', { name: '=' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button onClick={onClick} disabled>
        =
      </Button>,
    );

    await user.click(screen.getByRole('button', { name: '=' }));
    expect(onClick).not.toHaveBeenCalled();
  });
});
