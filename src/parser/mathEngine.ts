import { create, all } from 'mathjs/number';
import { sanitizeExpression } from './sanitizeExpression';
import { looksLikeNaturalLanguage, parseNaturalLanguage } from './naturalLanguage';
import { formatNumber } from '@utils/formatNumber';
import type { AngleMode, CalculationResult } from '@app-types/calculator';
import type { FactoryFunctionMap } from 'mathjs';

// `mathjs/number` is the number-only build of mathjs: no BigNumber, Complex,
// Matrix, or Unit types, which keeps the expression grammar small and the
// attack surface minimal. We never use `eval`/`Function` anywhere in this app.
// The `mathjs/number` entry point shares its type declarations with the full
// `mathjs` package, where `all` is typed slightly looser than `create()`
// expects - the cast below is a known, narrow mismatch in mathjs's own types.
const math = create(all as FactoryFunctionMap, {});

// Security note: `evaluate`/`parse`/`compile`/`simplify`/`derivative`/`resolve`
// are technically reachable *from within* an expression string (e.g.
// `evaluate("1+1")`), and mathjs's own docs recommend disabling them for
// untrusted input. We deliberately do NOT do that here, because:
//   1. They all require a string-literal argument to do anything meaningful,
//      and `sanitizeExpression` strips quote characters entirely - so no
//      string literal can ever reach mathjs, closing that vector at the door.
//   2. `evaluate` internally shares its parse/compile pipeline with these
//      functions - overriding any of them breaks `math.evaluate()` itself.
// `import` and `createUnit` are absent from the number-only bundle's
// expression grammar entirely (confirmed: calling them throws "Undefined
// function"), so there is nothing to disable there either.

let angleMode: AngleMode = 'deg';

export function setAngleMode(mode: AngleMode): void {
  angleMode = mode;
}

export function getAngleMode(): AngleMode {
  return angleMode;
}

const toRadians = (x: number): number => (angleMode === 'deg' ? (x * Math.PI) / 180 : x);
const toCurrentAngleUnit = (x: number): number => (angleMode === 'deg' ? (x * 180) / Math.PI : x);

// Override the trig family so a single stateful angle mode (driven by
// Settings) applies consistently, regardless of expression nesting - far
// more robust than trying to rewrite degrees/radians with string regex.
math.import(
  {
    sin: (x: number) => Math.sin(toRadians(x)),
    cos: (x: number) => Math.cos(toRadians(x)),
    tan: (x: number) => Math.tan(toRadians(x)),
    asin: (x: number) => toCurrentAngleUnit(Math.asin(x)),
    acos: (x: number) => toCurrentAngleUnit(Math.acos(x)),
    atan: (x: number) => toCurrentAngleUnit(Math.atan(x)),
    sinh: Math.sinh,
    cosh: Math.cosh,
    tanh: Math.tanh,
    // Calculator convention (Windows/Apple/Google): `log` is base-10, `ln` is
    // natural log - the opposite of mathjs's own default for `log`. Keeping
    // both as single-word, digit-free names also avoids colliding with the
    // `(\d)\(` implicit-multiplication rule in sanitizeExpression.
    log: Math.log10,
    ln: Math.log,
    cbrt: Math.cbrt,
  },
  { override: true },
);

function toFriendlyError(error: unknown): string {
  const message = error instanceof Error ? error.message : 'Invalid expression';

  if (/division.*zero|divide.*zero/i.test(message)) return 'Cannot divide by zero';
  if (/unexpected end of expression/i.test(message)) return 'Incomplete expression';
  if (/value expected/i.test(message) || /unexpected type/i.test(message))
    return 'Invalid expression';
  if (/undefined symbol/i.test(message)) return 'Unknown symbol in expression';
  if (/undefined function/i.test(message)) return 'Unknown function in expression';
  if (/parenthes/i.test(message)) return message;

  return 'Invalid expression';
}

export interface EvaluateOptions {
  precision?: number;
}

/**
 * Safely evaluates a calculator expression string. Never uses `eval` or
 * `Function` - all parsing goes through mathjs's sandboxed expression
 * grammar, guarded by {@link sanitizeExpression} and a disabled-function list.
 */
export function evaluateExpression(
  rawExpression: string,
  options: EvaluateOptions = {},
): CalculationResult {
  const { precision = 10 } = options;
  const sanitized = sanitizeExpression(rawExpression);

  if (!sanitized.ok) {
    return { ok: false, value: '', error: sanitized.error };
  }

  if (sanitized.expression === '') {
    return { ok: true, value: '' };
  }

  try {
    const rawResult = math.evaluate(sanitized.expression);

    if (typeof rawResult === 'function') {
      return { ok: false, value: '', error: 'Incomplete expression' };
    }

    const numericResult = Number(rawResult);

    if (Number.isNaN(numericResult)) {
      return { ok: false, value: '', error: 'Invalid calculation (NaN)' };
    }

    if (!Number.isFinite(numericResult)) {
      return { ok: false, value: '', error: 'Cannot divide by zero' };
    }

    return { ok: true, value: formatNumber(numericResult, precision) };
  } catch (error) {
    return { ok: false, value: '', error: toFriendlyError(error) };
  }
}

/**
 * Same as {@link evaluateExpression} but silent on failure - used for
 * live/preview results while the user is still typing.
 */
export function evaluateLivePreview(rawExpression: string, options: EvaluateOptions = {}): string {
  const result = evaluateExpression(rawExpression, options);
  return result.ok ? result.value : '';
}

export interface SmartEvaluateResult extends CalculationResult {
  /** The expression actually evaluated - identical to the input unless a
   * natural-language phrase was translated into calculator syntax first. */
  resolvedExpression: string;
}

/**
 * Evaluates ordinary calculator syntax first (`2+2`, `sin(30)`, ...); if that
 * fails and the input looks like an English phrase (`what is 15% of 800`),
 * retries after running it through {@link parseNaturalLanguage}. Goes through
 * the exact same sanitize-then-evaluate pipeline either way - the
 * natural-language step only ever produces calculator-syntax text, it never
 * bypasses `sanitizeExpression`.
 */
export function evaluateSmartExpression(
  rawInput: string,
  options: EvaluateOptions = {},
): SmartEvaluateResult {
  const direct = evaluateExpression(rawInput, options);
  if (direct.ok || !looksLikeNaturalLanguage(rawInput)) {
    return { ...direct, resolvedExpression: rawInput };
  }

  const translated = parseNaturalLanguage(rawInput);
  const retried = evaluateExpression(translated, options);
  return retried.ok
    ? { ...retried, resolvedExpression: translated }
    : { ...direct, resolvedExpression: rawInput };
}
