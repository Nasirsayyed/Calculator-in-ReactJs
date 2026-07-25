import { useState, type FormEvent } from 'react';
import { FiMessageCircle } from 'react-icons/fi';
import { useCalculator } from '@context/CalculatorContext';
import { useSettings } from '@context/SettingsContext';
import { evaluateSmartExpression } from '@parser/mathEngine';
import styles from './NaturalLanguageInput.module.css';

/**
 * A free-text entry point alongside the keypad: type or paste a plain
 * question ("what is 15% of 800") and it's translated into calculator
 * syntax and evaluated through the exact same pipeline as keypad input -
 * see `parser/naturalLanguage.ts` for the translation rules.
 */
export function NaturalLanguageInput() {
  const { evaluateText } = useCalculator();
  const { settings } = useSettings();
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    const outcome = evaluateSmartExpression(trimmed, { precision: settings.decimalPrecision });
    if (!outcome.ok) {
      setError('Couldn’t understand that — try “what is 15% of 800”');
      return;
    }

    evaluateText(outcome.resolvedExpression);
    setText('');
    setError(null);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} role="search">
      <FiMessageCircle className={styles.icon} aria-hidden="true" />
      <input
        type="text"
        className={styles.input}
        placeholder="Ask e.g. “what is 15% of 800”"
        aria-label="Ask a calculation in plain English"
        value={text}
        onChange={(event) => {
          setText(event.target.value);
          setError(null);
        }}
      />
      {error && (
        <span className={styles.error} role="alert">
          {error}
        </span>
      )}
    </form>
  );
}
