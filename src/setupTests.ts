import { expect } from 'vitest';
import { toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom/vitest';

expect.extend(toHaveNoViolations);

// jsdom does not implement matchMedia - the theme/reduced-motion hooks rely on
// it, so tests get a minimal stub that reports "no preference" by default.
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = (query: string): MediaQueryList => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}
