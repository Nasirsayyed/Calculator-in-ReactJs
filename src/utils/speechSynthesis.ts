export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

/** Reads text aloud via the browser's SpeechSynthesis API. No-ops silently
 * in any environment without it (jsdom, unsupported browsers). */
export function speakText(text: string, lang?: string): void {
  if (!isSpeechSynthesisSupported() || !text) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  if (lang) utterance.lang = lang;
  window.speechSynthesis.speak(utterance);
}
