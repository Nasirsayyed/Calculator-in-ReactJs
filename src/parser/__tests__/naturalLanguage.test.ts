import { describe, expect, it } from 'vitest';
import { looksLikeNaturalLanguage, parseNaturalLanguage } from '../naturalLanguage';

describe('looksLikeNaturalLanguage', () => {
  it('detects English arithmetic phrases', () => {
    expect(looksLikeNaturalLanguage('what is 15% of 800')).toBe(true);
    expect(looksLikeNaturalLanguage('5 plus 3')).toBe(true);
  });

  it('does not flag ordinary calculator syntax', () => {
    expect(looksLikeNaturalLanguage('2+2')).toBe(false);
    expect(looksLikeNaturalLanguage('sin(30)')).toBe(false);
  });
});

describe('parseNaturalLanguage', () => {
  it('translates "what is X% of Y"', () => {
    expect(parseNaturalLanguage('what is 15% of 800')).toBe('(15/100)*800');
  });

  it('translates "X percent of Y"', () => {
    expect(parseNaturalLanguage('20 percent of 50')).toBe('(20/100)*50');
  });

  it('translates plus/minus/times/divided by', () => {
    expect(parseNaturalLanguage('5 plus 3')).toBe('5+3');
    expect(parseNaturalLanguage('10 minus 4')).toBe('10-4');
    expect(parseNaturalLanguage('6 times 7')).toBe('6*7');
    expect(parseNaturalLanguage('20 divided by 4')).toBe('20/4');
  });

  it('translates add/subtract phrasing', () => {
    expect(parseNaturalLanguage('add 5 and 3')).toBe('5+3');
    expect(parseNaturalLanguage('subtract 4 from 10')).toBe('10-4');
  });

  it('translates square/cube root and powers', () => {
    expect(parseNaturalLanguage('square root of 16')).toBe('sqrt(16)');
    expect(parseNaturalLanguage('cube root of 27')).toBe('cbrt(27)');
    expect(parseNaturalLanguage('2 to the power of 8')).toBe('2^8');
    expect(parseNaturalLanguage('5 squared')).toBe('5^2');
    expect(parseNaturalLanguage('3 cubed')).toBe('3^3');
  });

  it('translates log/ln', () => {
    expect(parseNaturalLanguage('log of 100')).toBe('log(100)');
    expect(parseNaturalLanguage('ln of 1')).toBe('ln(1)');
  });

  it('strips filler prefixes and trailing punctuation', () => {
    expect(parseNaturalLanguage('What is 5 plus 3?')).toBe('5+3');
    expect(parseNaturalLanguage('Calculate 5 plus 3.')).toBe('5+3');
    expect(parseNaturalLanguage('please solve 5 plus 3')).toBe('5+3');
  });

  it('passes through unrecognized text unchanged (aside from casing)', () => {
    expect(parseNaturalLanguage('banana')).toBe('banana');
  });
});
