import { useCallback, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { FiCamera, FiMessageCircle, FiMic, FiMicOff, FiVolume2 } from 'react-icons/fi';
import { useCalculator } from '@context/CalculatorContext';
import { useSettings } from '@context/SettingsContext';
import { useSpeechRecognition } from '@hooks/useSpeechRecognition';
import { evaluateSmartExpression } from '@parser/mathEngine';
import { isSpeechSynthesisSupported, speakText } from '@utils/speechSynthesis';
import { recognizeMathExpression } from '@utils/ocr';
import { cx } from '@utils/classNames';
import styles from './NaturalLanguageInput.module.css';

const UNDERSTAND_ERROR = 'Couldn’t understand that — try “what is 15% of 800”';
const SCAN_ERROR = 'Couldn’t read a calculation from that photo — try a clearer, closer shot';

/**
 * A free-text entry point alongside the keypad: type, speak, or photograph a
 * plain question ("what is 15% of 800", a handwritten "12+34") and it's
 * translated into calculator syntax and evaluated through the exact same
 * pipeline as keypad input - see `parser/naturalLanguage.ts` for the
 * translation rules. Voice input/output and camera scanning are all
 * feature-detected and simply omitted where unsupported (jsdom,
 * non-Chromium browsers) rather than shown as broken buttons.
 */
export function NaturalLanguageInput() {
  const { state, evaluateText } = useCalculator();
  const { settings } = useSettings();
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const evaluateInput = useCallback(
    (input: string, onFail: string = UNDERSTAND_ERROR) => {
      const trimmed = input.trim();
      if (!trimmed) return;

      const outcome = evaluateSmartExpression(trimmed, { precision: settings.decimalPrecision });
      if (!outcome.ok) {
        setError(onFail);
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

  const handleScanFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    setIsScanning(true);
    setError(null);
    try {
      const recognized = await recognizeMathExpression(file);
      setText(recognized);
      evaluateInput(recognized, SCAN_ERROR);
    } catch {
      setError(SCAN_ERROR);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <>
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
        <button
          type="button"
          className={cx(styles.iconButton, isScanning && styles.scanning)}
          aria-label={isScanning ? 'Scanning photo…' : 'Scan a photo of a calculation'}
          disabled={isScanning}
          onClick={() => fileInputRef.current?.click()}
        >
          <FiCamera aria-hidden="true" />
        </button>
        {error && (
          <span className={styles.error} role="alert">
            {error}
          </span>
        )}
      </form>
      {/* Outside the <form>: a form's implicit Enter-to-submit behavior is
          only defined when it contains a single text-like field, so a second
          <input> (even type="file") inside it would silently break the
          natural-language field's Enter-key submission. */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className={styles.hiddenFileInput}
        aria-hidden="true"
        tabIndex={-1}
        onChange={(event) => void handleScanFileChange(event)}
      />
    </>
  );
}
