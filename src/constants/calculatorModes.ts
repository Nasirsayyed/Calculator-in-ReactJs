export interface CalculatorModeDescriptor {
  id: string;
  label: string;
  path: string;
  status: 'available' | 'coming-soon';
}

/**
 * Registry of every calculator mode the platform is designed to support.
 * Only `status: 'available'` modes are routable today; the rest exist here
 * so navigation, search, and settings can reference them ahead of implementation.
 */
export const CALCULATOR_MODES: CalculatorModeDescriptor[] = [
  { id: 'standard', label: 'Standard', path: '/', status: 'available' },
  { id: 'scientific', label: 'Scientific', path: '/scientific', status: 'available' },
  { id: 'programmer', label: 'Programmer', path: '/programmer', status: 'coming-soon' },
  { id: 'date', label: 'Date Calculator', path: '/date', status: 'coming-soon' },
  { id: 'age', label: 'Age Calculator', path: '/age', status: 'coming-soon' },
  { id: 'bmi', label: 'BMI Calculator', path: '/bmi', status: 'coming-soon' },
  { id: 'percentage', label: 'Percentage Calculator', path: '/percentage', status: 'coming-soon' },
  { id: 'discount', label: 'Discount Calculator', path: '/discount', status: 'coming-soon' },
  { id: 'gst', label: 'GST Calculator', path: '/gst', status: 'coming-soon' },
  { id: 'emi', label: 'EMI Calculator', path: '/emi', status: 'coming-soon' },
  { id: 'loan', label: 'Loan Calculator', path: '/loan', status: 'coming-soon' },
  { id: 'mortgage', label: 'Mortgage Calculator', path: '/mortgage', status: 'coming-soon' },
  { id: 'currency', label: 'Currency Calculator', path: '/currency', status: 'coming-soon' },
  { id: 'unit-converter', label: 'Unit Converter', path: '/convert', status: 'coming-soon' },
  { id: 'tip', label: 'Tip Calculator', path: '/tip', status: 'coming-soon' },
  { id: 'split-bill', label: 'Split Bill Calculator', path: '/split-bill', status: 'coming-soon' },
  { id: 'investment', label: 'Investment Calculator', path: '/investment', status: 'coming-soon' },
  {
    id: 'compound-interest',
    label: 'Compound Interest',
    path: '/compound-interest',
    status: 'coming-soon',
  },
  {
    id: 'simple-interest',
    label: 'Simple Interest',
    path: '/simple-interest',
    status: 'coming-soon',
  },
  { id: 'profit-loss', label: 'Profit & Loss', path: '/profit-loss', status: 'coming-soon' },
  { id: 'margin', label: 'Margin Calculator', path: '/margin', status: 'coming-soon' },
  { id: 'ratio', label: 'Ratio Calculator', path: '/ratio', status: 'coming-soon' },
  { id: 'average', label: 'Average Calculator', path: '/average', status: 'coming-soon' },
  { id: 'lcm-gcd', label: 'LCM / GCD', path: '/lcm-gcd', status: 'coming-soon' },
  { id: 'random', label: 'Random Number Generator', path: '/random', status: 'coming-soon' },
  { id: 'statistics', label: 'Statistics Calculator', path: '/statistics', status: 'coming-soon' },
  {
    id: 'probability',
    label: 'Probability Calculator',
    path: '/probability',
    status: 'coming-soon',
  },
  {
    id: 'equation-solver',
    label: 'Equation Solver',
    path: '/equation-solver',
    status: 'coming-soon',
  },
  { id: 'quadratic', label: 'Quadratic Solver', path: '/quadratic', status: 'coming-soon' },
  { id: 'matrix', label: 'Matrix Calculator', path: '/matrix', status: 'coming-soon' },
  { id: 'vector', label: 'Vector Calculator', path: '/vector', status: 'coming-soon' },
  { id: 'polynomial', label: 'Polynomial Calculator', path: '/polynomial', status: 'coming-soon' },
  { id: 'base-converter', label: 'Base Converter', path: '/base-converter', status: 'coming-soon' },
  {
    id: 'roman-numeral',
    label: 'Roman Numeral Converter',
    path: '/roman-numeral',
    status: 'coming-soon',
  },
  { id: 'timezone', label: 'Timezone Converter', path: '/timezone', status: 'coming-soon' },
];

export const isModeAvailable = (id: string): boolean =>
  CALCULATOR_MODES.find((mode) => mode.id === id)?.status === 'available';
