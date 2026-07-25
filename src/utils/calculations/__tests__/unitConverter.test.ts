import { describe, expect, it } from 'vitest';
import { convertTemperature, convertUnit } from '../unitConverter';

describe('convertUnit', () => {
  it('converts length units through the base unit', () => {
    expect(convertUnit('length', 1, 'km', 'm')).toBe(1000);
    expect(convertUnit('length', 1000, 'm', 'km')).toBe(1);
  });

  it('converts weight units', () => {
    expect(convertUnit('weight', 1, 'kg', 'g')).toBe(1000);
  });

  it('converts data units', () => {
    expect(convertUnit('data', 1, 'mb', 'kb')).toBe(1024);
  });

  it('returns 0 for an unknown unit id', () => {
    expect(convertUnit('length', 1, 'unknown', 'm')).toBe(0);
  });
});

describe('convertTemperature', () => {
  it('converts Celsius to Fahrenheit', () => {
    expect(convertTemperature(0, 'c', 'f')).toBe(32);
    expect(convertTemperature(100, 'c', 'f')).toBe(212);
  });

  it('converts Celsius to Kelvin', () => {
    expect(convertTemperature(0, 'c', 'k')).toBeCloseTo(273.15, 6);
  });

  it('converts Fahrenheit to Celsius', () => {
    expect(convertTemperature(32, 'f', 'c')).toBeCloseTo(0, 6);
  });

  it('is a no-op when converting a unit to itself', () => {
    expect(convertTemperature(37, 'c', 'c')).toBe(37);
  });
});
