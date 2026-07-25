import type { KeyDescriptor } from '@app-types/keyboard';

/**
 * Extra function rows shown above the standard keypad in Scientific mode.
 * Every function button follows the same "prefix insert" convention as a
 * normal key: pressing `sin` appends `sin(` to the expression and the user
 * types the argument afterwards - no special per-function wrapping logic
 * needed, and a missing closing paren is auto-completed on `=`.
 */
export const SCIENTIFIC_KEYPAD: KeyDescriptor[][] = [
  [
    { label: 'sin', value: 'sin(', variant: 'function', action: 'input' },
    { label: 'cos', value: 'cos(', variant: 'function', action: 'input' },
    { label: 'tan', value: 'tan(', variant: 'function', action: 'input' },
    { label: 'mod', value: ' mod ', variant: 'function', action: 'input' },
  ],
  [
    {
      label: 'sin⁻¹',
      value: 'asin(',
      variant: 'function',
      action: 'input',
      ariaLabel: 'Inverse sine',
    },
    {
      label: 'cos⁻¹',
      value: 'acos(',
      variant: 'function',
      action: 'input',
      ariaLabel: 'Inverse cosine',
    },
    {
      label: 'tan⁻¹',
      value: 'atan(',
      variant: 'function',
      action: 'input',
      ariaLabel: 'Inverse tangent',
    },
    { label: 'log', value: 'log(', variant: 'function', action: 'input' },
  ],
  [
    { label: 'sinh', value: 'sinh(', variant: 'function', action: 'input' },
    { label: 'cosh', value: 'cosh(', variant: 'function', action: 'input' },
    { label: 'tanh', value: 'tanh(', variant: 'function', action: 'input' },
    { label: 'ln', value: 'ln(', variant: 'function', action: 'input' },
  ],
  [
    { label: '√', value: 'sqrt(', variant: 'function', action: 'input', ariaLabel: 'Square root' },
    { label: '∛', value: 'cbrt(', variant: 'function', action: 'input', ariaLabel: 'Cube root' },
    { label: 'xʸ', value: '^', variant: 'function', action: 'input', ariaLabel: 'Power' },
    { label: 'x!', value: '!', variant: 'function', action: 'input', ariaLabel: 'Factorial' },
  ],
  [
    { label: 'x²', value: '^2', variant: 'function', action: 'input', ariaLabel: 'Square' },
    { label: 'x³', value: '^3', variant: 'function', action: 'input', ariaLabel: 'Cube' },
    { label: '1/x', value: '1/(', variant: 'function', action: 'input', ariaLabel: 'Reciprocal' },
    {
      label: '|x|',
      value: 'abs(',
      variant: 'function',
      action: 'input',
      ariaLabel: 'Absolute value',
    },
  ],
  [
    { label: 'π', value: 'π', variant: 'function', action: 'input', ariaLabel: 'Pi' },
    { label: 'e', value: 'e', variant: 'function', action: 'input', ariaLabel: "Euler's number" },
    { label: '⌊x⌋', value: 'floor(', variant: 'function', action: 'input', ariaLabel: 'Floor' },
    { label: 'round', value: 'round(', variant: 'function', action: 'input' },
  ],
  [
    { label: '(', value: '(', variant: 'function', action: 'input', ariaLabel: 'Open parenthesis' },
    {
      label: ')',
      value: ')',
      variant: 'function',
      action: 'input',
      ariaLabel: 'Close parenthesis',
    },
    { label: '⌈x⌉', value: 'ceil(', variant: 'function', action: 'input', ariaLabel: 'Ceiling' },
    { label: 'sign', value: 'sign(', variant: 'function', action: 'input' },
  ],
];
