// TypeScript's bundled DOM lib includes SpeechRecognitionEvent,
// SpeechRecognitionErrorEvent, SpeechRecognitionResult(List), and
// SpeechRecognitionAlternative, but omits the SpeechRecognition interface
// itself - this fills that one gap rather than pulling in a whole extra
// @types package for it.
interface SpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

// `declare var` (not `const`/`let`) is required here: this merges with the
// global scope the same way lib.dom.d.ts declares its own constructor-style
// globals (e.g. `SpeechRecognitionEvent`), which ESLint's no-var rule can't
// distinguish from an ordinary runtime `var`.
// eslint-disable-next-line no-var
declare var SpeechRecognition: {
  prototype: SpeechRecognition;
  new (): SpeechRecognition;
};

interface Window {
  SpeechRecognition?: typeof SpeechRecognition;
  webkitSpeechRecognition?: typeof SpeechRecognition;
}
