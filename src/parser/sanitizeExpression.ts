const MAX_EXPRESSION_LENGTH = 500;

// Only characters a calculator expression should ever contain. Anything else
// is rejected before it ever reaches the math engine.
const ALLOWED_CHARS_REGEX = /^[0-9a-zA-Z+\-*/^%.,()!\s×÷−π√]*$/;

export interface SanitizeResult {
  ok: boolean;
  expression: string;
  error?: string;
}

function hasBalancedParentheses(expression: string): boolean {
  let depth = 0;
  for (const char of expression) {
    if (char === '(') depth += 1;
    if (char === ')') depth -= 1;
    if (depth < 0) return false;
  }
  return depth === 0;
}

/**
 * Converts calculator-friendly input (unicode operators, `%`, implicit
 * multiplication, `√`) into a strict mathjs-compatible expression string.
 * Never executes anything - pure string transformation with a character
 * whitelist, so malformed or hostile input fails fast with a friendly error
 * instead of reaching the evaluator.
 */
export function sanitizeExpression(rawExpression: string): SanitizeResult {
  const trimmed = rawExpression.trim();

  if (trimmed.length === 0) {
    return { ok: true, expression: '' };
  }

  if (trimmed.length > MAX_EXPRESSION_LENGTH) {
    return { ok: false, expression: '', error: 'Expression is too long' };
  }

  if (!ALLOWED_CHARS_REGEX.test(trimmed)) {
    return { ok: false, expression: '', error: 'Expression contains invalid characters' };
  }

  let expr = trimmed
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-')
    .replace(/π/g, 'pi')
    .replace(/√\s*\(/g, 'sqrt(')
    .replace(/√\s*(\d+(\.\d+)?)/g, 'sqrt($1)');

  // Percentage: `50%` -> `(50/100)`. Applied before implicit-multiplication
  // insertion so the generated parens are covered by the rules below too.
  expr = expr.replace(/(\d+(\.\d+)?)%/g, '($1/100)');

  // Implicit multiplication: `2(3+4)` -> `2*(3+4)`, `)(` -> `)*(`, `)2` -> `)*2`.
  expr = expr
    .replace(/(\d)\(/g, '$1*(')
    .replace(/\)(\d)/g, ')*$1')
    .replace(/\)\(/g, ')*(')
    .replace(/(\d)(?=(pi|e)\b)/g, '$1*')
    .replace(/\b(pi|e)(?=\d)/g, '$1*')
    .replace(/\b(pi|e)\(/g, '$1*(');

  if (!hasBalancedParentheses(expr)) {
    return { ok: false, expression: '', error: 'Unbalanced parentheses' };
  }

  return { ok: true, expression: expr };
}
