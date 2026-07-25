export type UnitCategory =
  'length' | 'weight' | 'volume' | 'area' | 'speed' | 'time' | 'data' | 'temperature';

export interface UnitDefinition {
  id: string;
  label: string;
  /** Multiply by this factor to convert a value in this unit to the category's base unit. */
  toBase: number;
}

const LENGTH_UNITS: UnitDefinition[] = [
  { id: 'm', label: 'Meters', toBase: 1 },
  { id: 'km', label: 'Kilometers', toBase: 1000 },
  { id: 'cm', label: 'Centimeters', toBase: 0.01 },
  { id: 'mm', label: 'Millimeters', toBase: 0.001 },
  { id: 'mile', label: 'Miles', toBase: 1609.344 },
  { id: 'yard', label: 'Yards', toBase: 0.9144 },
  { id: 'foot', label: 'Feet', toBase: 0.3048 },
  { id: 'inch', label: 'Inches', toBase: 0.0254 },
];

const WEIGHT_UNITS: UnitDefinition[] = [
  { id: 'kg', label: 'Kilograms', toBase: 1 },
  { id: 'g', label: 'Grams', toBase: 0.001 },
  { id: 'mg', label: 'Milligrams', toBase: 0.000001 },
  { id: 'lb', label: 'Pounds', toBase: 0.45359237 },
  { id: 'oz', label: 'Ounces', toBase: 0.0283495231 },
  { id: 'ton', label: 'Metric tons', toBase: 1000 },
];

const VOLUME_UNITS: UnitDefinition[] = [
  { id: 'l', label: 'Liters', toBase: 1 },
  { id: 'ml', label: 'Milliliters', toBase: 0.001 },
  { id: 'gallon', label: 'Gallons (US)', toBase: 3.785411784 },
  { id: 'quart', label: 'Quarts', toBase: 0.946352946 },
  { id: 'pint', label: 'Pints', toBase: 0.473176473 },
  { id: 'cup', label: 'Cups', toBase: 0.2365882365 },
];

const AREA_UNITS: UnitDefinition[] = [
  { id: 'sqm', label: 'Square meters', toBase: 1 },
  { id: 'sqkm', label: 'Square kilometers', toBase: 1_000_000 },
  { id: 'sqft', label: 'Square feet', toBase: 0.09290304 },
  { id: 'acre', label: 'Acres', toBase: 4046.8564224 },
  { id: 'hectare', label: 'Hectares', toBase: 10000 },
];

const SPEED_UNITS: UnitDefinition[] = [
  { id: 'mps', label: 'Meters/second', toBase: 1 },
  { id: 'kmph', label: 'Kilometers/hour', toBase: 1 / 3.6 },
  { id: 'mph', label: 'Miles/hour', toBase: 0.44704 },
  { id: 'knot', label: 'Knots', toBase: 0.514444 },
];

const TIME_UNITS: UnitDefinition[] = [
  { id: 's', label: 'Seconds', toBase: 1 },
  { id: 'min', label: 'Minutes', toBase: 60 },
  { id: 'hr', label: 'Hours', toBase: 3600 },
  { id: 'day', label: 'Days', toBase: 86400 },
  { id: 'week', label: 'Weeks', toBase: 604800 },
];

const DATA_UNITS: UnitDefinition[] = [
  { id: 'byte', label: 'Bytes', toBase: 1 },
  { id: 'kb', label: 'Kilobytes', toBase: 1024 },
  { id: 'mb', label: 'Megabytes', toBase: 1024 ** 2 },
  { id: 'gb', label: 'Gigabytes', toBase: 1024 ** 3 },
  { id: 'tb', label: 'Terabytes', toBase: 1024 ** 4 },
];

export const TEMPERATURE_UNITS: UnitDefinition[] = [
  { id: 'c', label: 'Celsius', toBase: 1 },
  { id: 'f', label: 'Fahrenheit', toBase: 1 },
  { id: 'k', label: 'Kelvin', toBase: 1 },
];

export const UNIT_CATEGORIES: { id: UnitCategory; label: string; units: UnitDefinition[] }[] = [
  { id: 'length', label: 'Length', units: LENGTH_UNITS },
  { id: 'weight', label: 'Weight', units: WEIGHT_UNITS },
  { id: 'volume', label: 'Volume', units: VOLUME_UNITS },
  { id: 'area', label: 'Area', units: AREA_UNITS },
  { id: 'speed', label: 'Speed', units: SPEED_UNITS },
  { id: 'time', label: 'Time', units: TIME_UNITS },
  { id: 'data', label: 'Data', units: DATA_UNITS },
  { id: 'temperature', label: 'Temperature', units: TEMPERATURE_UNITS },
];

function celsiusFrom(value: number, unit: string): number {
  if (unit === 'f') return ((value - 32) * 5) / 9;
  if (unit === 'k') return value - 273.15;
  return value;
}

function celsiusTo(value: number, unit: string): number {
  if (unit === 'f') return (value * 9) / 5 + 32;
  if (unit === 'k') return value + 273.15;
  return value;
}

export function convertTemperature(value: number, fromId: string, toId: string): number {
  return celsiusTo(celsiusFrom(value, fromId), toId);
}

export function convertUnit(
  category: UnitCategory,
  value: number,
  fromId: string,
  toId: string,
): number {
  if (category === 'temperature') return convertTemperature(value, fromId, toId);

  const units = UNIT_CATEGORIES.find((entry) => entry.id === category)?.units ?? [];
  const from = units.find((unit) => unit.id === fromId);
  const to = units.find((unit) => unit.id === toId);
  if (!from || !to) return 0;

  return (value * from.toBase) / to.toBase;
}
