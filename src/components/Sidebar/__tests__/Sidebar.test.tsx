import { afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@/i18n/i18n';
import { Sidebar } from '../Sidebar';

function mockMatchMedia(matchesDesktop: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: query.includes('768px') ? matchesDesktop : false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })) as unknown as typeof window.matchMedia;
}

describe('Sidebar resizing', () => {
  const originalMatchMedia = window.matchMedia;

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    window.localStorage.clear();
  });

  it('does not render a resize handle at phone widths', () => {
    mockMatchMedia(false);
    const { container } = render(
      <Sidebar open title="History" onClose={() => {}}>
        content
      </Sidebar>,
    );
    expect(container.querySelector('[class*="resizeHandle"]')).not.toBeInTheDocument();
  });

  it('renders a resize handle at desktop widths and grows the panel when dragged left', () => {
    mockMatchMedia(true);
    render(
      <Sidebar open title="History" onClose={() => {}}>
        content
      </Sidebar>,
    );

    const dialog = screen.getByRole('dialog', { name: 'History' });
    const handle = dialog.querySelector('[class*="resizeHandle"]') as HTMLElement;
    expect(handle).toBeInTheDocument();

    const widthBefore = dialog.style.getPropertyValue('--sidebar-width');

    fireEvent.pointerDown(handle, { clientX: 500 });
    fireEvent.pointerMove(window, { clientX: 400 }); // dragged left -> should grow
    fireEvent.pointerUp(window);

    expect(dialog.style.getPropertyValue('--sidebar-width')).not.toBe(widthBefore);
    expect(dialog.style.getPropertyValue('--sidebar-width')).toBe('480px');
  });

  it('clamps growth to the maximum width', () => {
    mockMatchMedia(true);
    render(
      <Sidebar open title="History" onClose={() => {}}>
        content
      </Sidebar>,
    );

    const dialog = screen.getByRole('dialog', { name: 'History' });
    const handle = dialog.querySelector('[class*="resizeHandle"]') as HTMLElement;

    fireEvent.pointerDown(handle, { clientX: 1000 });
    fireEvent.pointerMove(window, { clientX: -2000 }); // absurdly large drag
    fireEvent.pointerUp(window);

    expect(dialog.style.getPropertyValue('--sidebar-width')).toBe('640px');
  });

  it('persists the resized width to localStorage', () => {
    mockMatchMedia(true);
    render(
      <Sidebar open title="History" onClose={() => {}}>
        content
      </Sidebar>,
    );

    const dialog = screen.getByRole('dialog', { name: 'History' });
    const handle = dialog.querySelector('[class*="resizeHandle"]') as HTMLElement;

    fireEvent.pointerDown(handle, { clientX: 500 });
    fireEvent.pointerMove(window, { clientX: 400 });
    fireEvent.pointerUp(window);

    expect(window.localStorage.getItem('calculator.sidebarWidth')).toBe('480');
  });
});
