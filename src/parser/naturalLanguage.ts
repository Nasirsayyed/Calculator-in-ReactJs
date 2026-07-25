const NUMBER = String.raw`\d+(?:\.\d+)?`;

type Rule = { pattern: RegExp; replace: string };

// Applied in order, most specific first, on a lowercased/trimmed string.
// Each replace runs repeatedly (via the `g` flag) so multiple phrases in one
// sentence ("5 plus 3 and 10 plus 2") all get converted.
const RULES: Rule[] = [
  {
    pattern: new RegExp(`(${NUMBER})\\s*%?\\s*percent\\s*of\\s*(${NUMBER})`, 'g'),
    replace: '($1/100)*$2',
  },
  { pattern: new RegExp(`(${NUMBER})\\s*%\\s*of\\s*(${NUMBER})`, 'g'), replace: '($1/100)*$2' },
  { pattern: new RegExp(`square\\s*root\\s*of\\s*(${NUMBER})`, 'g'), replace: 'sqrt($1)' },
  { pattern: new RegExp(`cube\\s*root\\s*of\\s*(${NUMBER})`, 'g'), replace: 'cbrt($1)' },
  {
    pattern: new RegExp(`(${NUMBER})\\s*to\\s*the\\s*power\\s*of\\s*(${NUMBER})`, 'g'),
    replace: '$1^$2',
  },
  {
    pattern: new RegExp(`(${NUMBER})\\s*to\\s*the\\s*(${NUMBER})(?:st|nd|rd|th)?\\s*power`, 'g'),
    replace: '$1^$2',
  },
  { pattern: new RegExp(`(${NUMBER})\\s*squared`, 'g'), replace: '$1^2' },
  { pattern: new RegExp(`(${NUMBER})\\s*cubed`, 'g'), replace: '$1^3' },
  { pattern: new RegExp(`log\\s*of\\s*(${NUMBER})`, 'g'), replace: 'log($1)' },
  { pattern: new RegExp(`ln\\s*of\\s*(${NUMBER})`, 'g'), replace: 'ln($1)' },
  { pattern: new RegExp(`subtract\\s*(${NUMBER})\\s*from\\s*(${NUMBER})`, 'g'), replace: '$2-$1' },
  { pattern: new RegExp(`add\\s*(${NUMBER})\\s*(?:and|to)\\s*(${NUMBER})`, 'g'), replace: '$1+$2' },
  { pattern: new RegExp(`(${NUMBER})\\s*plus\\s*(${NUMBER})`, 'g'), replace: '$1+$2' },
  { pattern: new RegExp(`(${NUMBER})\\s*minus\\s*(${NUMBER})`, 'g'), replace: '$1-$2' },
  {
    pattern: new RegExp(`(${NUMBER})\\s*(?:times|multiplied\\s*by)\\s*(${NUMBER})`, 'g'),
    replace: '$1*$2',
  },
  { pattern: new RegExp(`(${NUMBER})\\s*divided\\s*by\\s*(${NUMBER})`, 'g'), replace: '$1/$2' },
];

const FILLER_PREFIX = /^(?:please\s+)?(?:what(?:'s|\s+is)|calculate|compute|solve|find)\s+/i;

const NATURAL_LANGUAGE_KEYWORDS =
  /\b(what|calculate|compute|solve|find|plus|minus|times|divided|multiplied|percent|squared|cubed|power|square root|cube root|subtract|add)\b/i;

/**
 * Heuristic check for whether input looks like an English phrase rather than
 * a calculator expression, so the natural-language fallback only engages for
 * input that actually needs it.
 */
export function looksLikeNaturalLanguage(input: string): boolean {
  return NATURAL_LANGUAGE_KEYWORDS.test(input);
}

/**
 * Best-effort translation of an English arithmetic phrase into a
 * calculator expression string. Never executes anything - pure regex
 * substitution over a small, fixed rule set. Unrecognized phrases are
 * passed through unchanged, so the caller's normal expression evaluator
 * still gets a chance (and a normal "invalid expression" error) rather than
 * this silently swallowing input it doesn't understand.
 */
export function parseNaturalLanguage(input: string): string {
  let text = input
    .trim()
    .toLowerCase()
    .replace(/[?.!]+$/g, '');
  text = text.replace(FILLER_PREFIX, '');

  for (const rule of RULES) {
    text = text.replace(rule.pattern, rule.replace);
  }

  return text.trim();
}
