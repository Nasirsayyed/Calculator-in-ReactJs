export type CalculatorModeCategory = 'Core' | 'Finance' | 'Health & Date' | 'Math' | 'Utility';

export interface CalculatorModeDescriptor {
  id: string;
  label: string;
  path: string;
  category: CalculatorModeCategory;
  status: 'available' | 'coming-soon';
}

/**
 * Registry of every calculator mode the platform is designed to support.
 * Only `status: 'available'` modes are routable today; the rest exist here
 * so navigation, search, and settings can reference them ahead of implementation.
 */
export const CALCULATOR_MODES: CalculatorModeDescriptor[] = [
  { id: 'standard', label: 'Standard', path: '/', category: 'Core', status: 'available' },
  {
    id: 'scientific',
    label: 'Scientific',
    path: '/scientific',
    category: 'Core',
    status: 'available',
  },
  {
    id: 'programmer',
    label: 'Programmer',
    path: '/programmer',
    category: 'Core',
    status: 'coming-soon',
  },
  {
    id: 'date',
    label: 'Date Calculator',
    path: '/date',
    category: 'Health & Date',
    status: 'coming-soon',
  },
  {
    id: 'age',
    label: 'Age Calculator',
    path: '/age',
    category: 'Health & Date',
    status: 'available',
  },
  {
    id: 'bmi',
    label: 'BMI Calculator',
    path: '/bmi',
    category: 'Health & Date',
    status: 'available',
  },
  {
    id: 'percentage',
    label: 'Percentage Calculator',
    path: '/percentage',
    category: 'Utility',
    status: 'available',
  },
  {
    id: 'discount',
    label: 'Discount Calculator',
    path: '/discount',
    category: 'Finance',
    status: 'available',
  },
  { id: 'gst', label: 'GST Calculator', path: '/gst', category: 'Finance', status: 'available' },
  { id: 'emi', label: 'EMI Calculator', path: '/emi', category: 'Finance', status: 'available' },
  {
    id: 'loan',
    label: 'Loan Calculator',
    path: '/loan',
    category: 'Finance',
    status: 'coming-soon',
  },
  {
    id: 'mortgage',
    label: 'Mortgage Calculator',
    path: '/mortgage',
    category: 'Finance',
    status: 'coming-soon',
  },
  {
    id: 'currency',
    label: 'Currency Calculator',
    path: '/currency',
    category: 'Finance',
    status: 'coming-soon',
  },
  {
    id: 'unit-converter',
    label: 'Unit Converter',
    path: '/convert',
    category: 'Utility',
    status: 'coming-soon',
  },
  { id: 'tip', label: 'Tip Calculator', path: '/tip', category: 'Utility', status: 'available' },
  {
    id: 'split-bill',
    label: 'Split Bill Calculator',
    path: '/split-bill',
    category: 'Utility',
    status: 'coming-soon',
  },
  {
    id: 'investment',
    label: 'Investment Calculator',
    path: '/investment',
    category: 'Finance',
    status: 'coming-soon',
  },
  {
    id: 'compound-interest',
    label: 'Compound Interest',
    path: '/compound-interest',
    category: 'Finance',
    status: 'available',
  },
  {
    id: 'simple-interest',
    label: 'Simple Interest',
    path: '/simple-interest',
    category: 'Finance',
    status: 'available',
  },
  {
    id: 'profit-loss',
    label: 'Profit & Loss',
    path: '/profit-loss',
    category: 'Finance',
    status: 'coming-soon',
  },
  {
    id: 'margin',
    label: 'Margin Calculator',
    path: '/margin',
    category: 'Finance',
    status: 'coming-soon',
  },
  {
    id: 'ratio',
    label: 'Ratio Calculator',
    path: '/ratio',
    category: 'Utility',
    status: 'coming-soon',
  },
  {
    id: 'average',
    label: 'Average Calculator',
    path: '/average',
    category: 'Utility',
    status: 'coming-soon',
  },
  { id: 'lcm-gcd', label: 'LCM / GCD', path: '/lcm-gcd', category: 'Math', status: 'coming-soon' },
  {
    id: 'random',
    label: 'Random Number Generator',
    path: '/random',
    category: 'Utility',
    status: 'coming-soon',
  },
  {
    id: 'statistics',
    label: 'Statistics Calculator',
    path: '/statistics',
    category: 'Math',
    status: 'coming-soon',
  },
  {
    id: 'probability',
    label: 'Probability Calculator',
    path: '/probability',
    category: 'Math',
    status: 'coming-soon',
  },
  {
    id: 'equation-solver',
    label: 'Equation Solver',
    path: '/equation-solver',
    category: 'Math',
    status: 'coming-soon',
  },
  {
    id: 'quadratic',
    label: 'Quadratic Solver',
    path: '/quadratic',
    category: 'Math',
    status: 'coming-soon',
  },
  {
    id: 'matrix',
    label: 'Matrix Calculator',
    path: '/matrix',
    category: 'Math',
    status: 'coming-soon',
  },
  {
    id: 'vector',
    label: 'Vector Calculator',
    path: '/vector',
    category: 'Math',
    status: 'coming-soon',
  },
  {
    id: 'polynomial',
    label: 'Polynomial Calculator',
    path: '/polynomial',
    category: 'Math',
    status: 'coming-soon',
  },
  {
    id: 'base-converter',
    label: 'Base Converter',
    path: '/base-converter',
    category: 'Utility',
    status: 'coming-soon',
  },
  {
    id: 'roman-numeral',
    label: 'Roman Numeral Converter',
    path: '/roman-numeral',
    category: 'Utility',
    status: 'coming-soon',
  },
  {
    id: 'timezone',
    label: 'Timezone Converter',
    path: '/timezone',
    category: 'Utility',
    status: 'coming-soon',
  },
];

export const isModeAvailable = (id: string): boolean =>
  CALCULATOR_MODES.find((mode) => mode.id === id)?.status === 'available';
