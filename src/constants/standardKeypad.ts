import type { KeyDescriptor } from '@app-types/keyboard';

export const STANDARD_KEYPAD: KeyDescriptor[][] = [
  [
    { label: 'C', value: '', variant: 'danger', action: 'clear', ariaLabel: 'Clear' },
    {
      label: '⌫',
      value: '',
      variant: 'function',
      action: 'delete',
      ariaLabel: 'Delete last character',
    },
    { label: '%', value: '%', variant: 'function', action: 'input', ariaLabel: 'Percent' },
    { label: '÷', value: '/', variant: 'operator', action: 'input', ariaLabel: 'Divide' },
  ],
  [
    { label: '7', value: '7', variant: 'number', action: 'input' },
    { label: '8', value: '8', variant: 'number', action: 'input' },
    { label: '9', value: '9', variant: 'number', action: 'input' },
    { label: '×', value: '*', variant: 'operator', action: 'input', ariaLabel: 'Multiply' },
  ],
  [
    { label: '4', value: '4', variant: 'number', action: 'input' },
    { label: '5', value: '5', variant: 'number', action: 'input' },
    { label: '6', value: '6', variant: 'number', action: 'input' },
    { label: '−', value: '-', variant: 'operator', action: 'input', ariaLabel: 'Subtract' },
  ],
  [
    { label: '1', value: '1', variant: 'number', action: 'input' },
    { label: '2', value: '2', variant: 'number', action: 'input' },
    { label: '3', value: '3', variant: 'number', action: 'input' },
    { label: '+', value: '+', variant: 'operator', action: 'input', ariaLabel: 'Add' },
  ],
  [
    { label: '±', value: '', variant: 'function', action: 'toggleSign', ariaLabel: 'Toggle sign' },
    { label: '0', value: '0', variant: 'number', action: 'input' },
    { label: '.', value: '.', variant: 'number', action: 'input', ariaLabel: 'Decimal point' },
    { label: '=', value: '', variant: 'equals', action: 'equals', ariaLabel: 'Equals' },
  ],
];
