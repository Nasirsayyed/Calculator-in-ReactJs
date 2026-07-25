import { useCallback, useState, type FormEvent } from 'react';
import { FiMessageCircle, FiMic, FiMicOff, FiVolume2 } from 'react-icons/fi';
import { useCalculator } from '@context/CalculatorContext';
import { useSettings } from '@context/SettingsContext';
import { useSpeechRecognition } from '@hooks/useSpeechRecognition';
import { evaluateSmartExpression } from '@parser/mathEngine';
import { isSpeechSynthesisSupported, speakText } from '@utils/speechSynthesis';
import styles from './NaturalLanguageInput.module.css';

/**
 * A free-text entry point alongside the keypad: type, speak, or paste a
 * plain question ("what is 15% of 800") and it's translated into calculator
 * syntax and evaluated through the exact same pipeline as keypad input -
 * see `parser/naturalLanguage.ts` for the translation rules. Voice input/
 * output are feature-detected and simply omitted where unsupported (jsdom,
 * non-Chromium browsers) rather than shown as broken buttons.
 */
export function NaturalLanguageInput() {
  const { state, evaluateText } = useCalculator();
  const { settings } = useSettings();
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const evaluateInput = useCallback(
    (input: string) => {
      const trimmed = input.trim();
      if (!trimmed) return;

      const outcome = evaluateSmartExpression(trimmed, { precision: settings.decimalPrecision });
      if (!outcome.ok) {
        setError('Couldn’t understand that — try “what is 15% of 800”');
        return;
      }

      evaluateText(outcome.resolvedExpression);
      setText('');
      setError(null);
    },
    [evaluateText, settings.decimalPrecision],
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    evaluateInput(text);
  };

  const handleVoiceResult = useCallback(
    (transcript: string) => {
      setText(transcript);
      evaluateInput(transcript);
    },
    [evaluateInput],
  );

  const {
    isSupported: micSupported,
    isListening,
    start: startListening,
    stop: stopListening,
  } = useSpeechRecognition(handleVoiceResult);
  const speechOutputSupported = isSpeechSynthesisSupported();
  const canSpeakResult = state.justEvaluated && state.result !== '';

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
      {micSupported && (
        <button
          type="button"
          className={styles.iconButton}
          aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
          aria-pressed={isListening}
          onClick={isListening ? stopListening : startListening}
        >
          {isListening ? <FiMicOff aria-hidden="true" /> : <FiMic aria-hidden="true" />}
        </button>
      )}
      {speechOutputSupported && (
        <button
          type="button"
          className={styles.iconButton}
          aria-label="Read result aloud"
          disabled={!canSpeakResult}
          onClick={() => speakText(state.result)}
        >
          <FiVolume2 aria-hidden="true" />
        </button>
      )}
      {error && (
        <span className={styles.error} role="alert">
          {error}
        </span>
      )}
    </form>
  );
}
