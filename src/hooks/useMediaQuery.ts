import { useEffect, useState } from 'react';

function getInitial(query: string): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia(query).matches;
}

/** Tracks a CSS media query's match state, live. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => getInitial(query));

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const handleChange = (event: MediaQueryListEvent) => setMatches(event.matches);

    mediaQueryList.addEventListener('change', handleChange);
    return () => mediaQueryList.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
}
