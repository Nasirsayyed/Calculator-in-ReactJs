import { describe, expect, it, beforeEach } from 'vitest';
import { evaluateExpression, evaluateLivePreview, getAngleMode, setAngleMode } from '../mathEngine';

describe('evaluateExpression', () => {
  beforeEach(() => {
    setAngleMode('deg');
  });

  it('evaluates basic arithmetic', () => {
    expect(evaluateExpression('2+3*4')).toEqual({ ok: true, value: '14' });
    expect(evaluateExpression('(2+3)*4')).toEqual({ ok: true, value: '20' });
  });

  it('supports implicit multiplication', () => {
    expect(evaluateExpression('2(3+4)')).toEqual({ ok: true, value: '14' });
    expect(evaluateExpression('(2+1)(3+1)')).toEqual({ ok: true, value: '12' });
  });

  it('supports factorial', () => {
    expect(evaluateExpression('5!')).toEqual({ ok: true, value: '120' });
  });

  it('supports roots and powers', () => {
    expect(evaluateExpression('sqrt(16)')).toEqual({ ok: true, value: '4' });
    expect(evaluateExpression('2^10')).toEqual({ ok: true, value: '1024' });
    expect(evaluateExpression('cbrt(27)')).toEqual({ ok: true, value: '3' });
  });

  it('treats a trailing % as divide-by-100', () => {
    expect(evaluateExpression('50%')).toEqual({ ok: true, value: '0.5' });
    expect(evaluateExpression('200+10%')).toEqual({ ok: true, value: '200.1' });
  });

  it('supports pi and e constants with implicit multiplication', () => {
    const result = evaluateExpression('2pi');
    expect(result.ok).toBe(true);
    expect(Number(result.value)).toBeCloseTo(2 * Math.PI, 9);
  });

  it('supports base-10 log and natural log', () => {
    expect(evaluateExpression('log(100)')).toEqual({ ok: true, value: '2' });
    expect(evaluateExpression('ln(e)')).toEqual({ ok: true, value: '1' });
  });

  it('respects angle mode for trig functions', () => {
    setAngleMode('deg');
    const deg = evaluateExpression('sin(30)');
    expect(Number(deg.value)).toBeCloseTo(0.5, 9);

    setAngleMode('rad');
    const rad = evaluateExpression('sin(pi/2)');
    expect(Number(rad.value)).toBeCloseTo(1, 9);
  });

  it('handles division by zero as a friendly error', () => {
    const result = evaluateExpression('1/0');
    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/divide by zero/i);
  });

  it('handles 0/0 as a friendly NaN error', () => {
    const result = evaluateExpression('0/0');
    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/invalid calculation/i);
  });

  it('rejects unbalanced parentheses', () => {
    const result = evaluateExpression('((2+3)');
    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/parenthes/i);
  });

  it('rejects an incomplete expression', () => {
    const result = evaluateExpression('2+');
    expect(result.ok).toBe(false);
  });

  it('rejects disallowed characters, closing the string-literal injection vector', () => {
    const result = evaluateExpression("evaluate('1+1')");
    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/invalid characters/i);
  });

  it('rejects overly long expressions', () => {
    const result = evaluateExpression('1+'.repeat(400));
    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/too long/i);
  });

  it('returns an empty ok result for an empty expression', () => {
    expect(evaluateExpression('')).toEqual({ ok: true, value: '' });
  });

  it('supports hyperbolic functions', () => {
    expect(Number(evaluateExpression('sinh(0)').value)).toBeCloseTo(0, 9);
    expect(Number(evaluateExpression('cosh(0)').value)).toBeCloseTo(1, 9);
    expect(Number(evaluateExpression('tanh(0)').value)).toBeCloseTo(0, 9);
  });

  it('supports the mod keyword', () => {
    expect(evaluateExpression('10 mod 3')).toEqual({ ok: true, value: '1' });
  });

  it('supports abs, floor, ceil, round, and sign', () => {
    expect(evaluateExpression('abs(-9)')).toEqual({ ok: true, value: '9' });
    expect(evaluateExpression('floor(4.7)')).toEqual({ ok: true, value: '4' });
    expect(evaluateExpression('ceil(4.2)')).toEqual({ ok: true, value: '5' });
    expect(evaluateExpression('round(4.5)')).toEqual({ ok: true, value: '5' });
    expect(evaluateExpression('sign(-8)')).toEqual({ ok: true, value: '-1' });
  });

  it('supports reciprocal via 1/(x)', () => {
    expect(evaluateExpression('1/(4)')).toEqual({ ok: true, value: '0.25' });
  });

  it('respects angle mode for cos, tan, acos, and atan too', () => {
    setAngleMode('deg');
    expect(Number(evaluateExpression('cos(60)').value)).toBeCloseTo(0.5, 9);
    expect(Number(evaluateExpression('tan(45)').value)).toBeCloseTo(1, 9);
    expect(Number(evaluateExpression('acos(1)').value)).toBeCloseTo(0, 9);
    expect(Number(evaluateExpression('atan(1)').value)).toBeCloseTo(45, 9);
  });

  it('setAngleMode/getAngleMode round-trip', () => {
    setAngleMode('rad');
    expect(getAngleMode()).toBe('rad');
    setAngleMode('deg');
    expect(getAngleMode()).toBe('deg');
  });

  it('treats a bare function reference (no call) as an incomplete expression', () => {
    const result = evaluateExpression('sin');
    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/incomplete/i);
  });

  it('reports an unknown symbol with a friendly message', () => {
    const result = evaluateExpression('foo+1');
    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/unknown symbol/i);
  });

  it('reports an unknown function with a friendly message', () => {
    const result = evaluateExpression('bar(1)');
    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/unknown function/i);
  });

  it('evaluateLivePreview returns an empty string instead of throwing on error', () => {
    expect(evaluateLivePreview('1/0')).toBe('');
    expect(evaluateLivePreview('2+2')).toBe('4');
  });
});
