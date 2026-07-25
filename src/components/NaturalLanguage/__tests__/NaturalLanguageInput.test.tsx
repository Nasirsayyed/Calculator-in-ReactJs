import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppProviders } from '@context/AppProviders';
import { NaturalLanguageInput } from '../NaturalLanguageInput';
import { recognizeMathExpression } from '@utils/ocr';

vi.mock('@utils/ocr', () => ({
  recognizeMathExpression: vi.fn(),
}));

class MockSpeechRecognition extends EventTarget {
  lang = '';
  interimResults = false;
  maxAlternatives = 1;
  onresult: ((event: { results: { 0: { transcript: string } }[] }) => void) | null = null;
  onerror: ((event: { error: string }) => void) | null = null;
  onend: (() => void) | null = null;
  start = vi.fn();
  stop = vi.fn(() => this.onend?.());

  constructor() {
    super();
    MockSpeechRecognition.lastInstance = this;
  }

  static lastInstance: MockSpeechRecognition | null = null;
}

function installSpeechApis() {
  window.SpeechRecognition = MockSpeechRecognition as unknown as typeof SpeechRecognition;
  const speak = vi.fn();
  const cancel = vi.fn();
  Object.defineProperty(window, 'speechSynthesis', {
    value: { speak, cancel },
    configurable: true,
    writable: true,
  });
  class MockUtterance {
    lang = '';
    text: string;
    constructor(text: string) {
      this.text = text;
    }
  }
  window.SpeechSynthesisUtterance = MockUtterance as unknown as typeof SpeechSynthesisUtterance;
  return { speak, cancel };
}

function uninstallSpeechApis() {
  delete (window as { SpeechRecognition?: unknown }).SpeechRecognition;
  delete (window as { speechSynthesis?: unknown }).speechSynthesis;
  delete (window as { SpeechSynthesisUtterance?: unknown }).SpeechSynthesisUtterance;
  MockSpeechRecognition.lastInstance = null;
}

describe('NaturalLanguageInput - without Web Speech support (jsdom default)', () => {
  it('renders no mic or speaker button', () => {
    render(
      <AppProviders>
        <NaturalLanguageInput />
      </AppProviders>,
    );
    expect(screen.queryByLabelText('Start voice input')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Read result aloud')).not.toBeInTheDocument();
  });
});

describe('NaturalLanguageInput - with Web Speech support', () => {
  beforeEach(() => {
    installSpeechApis();
  });

  afterEach(() => {
    uninstallSpeechApis();
  });

  it('starts listening on mic click and evaluates the recognized transcript', async () => {
    const user = userEvent.setup();
    render(
      <AppProviders>
        <NaturalLanguageInput />
      </AppProviders>,
    );

    const micButton = screen.getByLabelText('Start voice input');
    await user.click(micButton);

    expect(MockSpeechRecognition.lastInstance?.start).toHaveBeenCalledTimes(1);
    expect(screen.getByLabelText('Stop voice input')).toHaveAttribute('aria-pressed', 'true');

    MockSpeechRecognition.lastInstance?.onresult?.({
      results: [{ 0: { transcript: 'what is 15% of 800' } }],
    });

    await waitFor(() => {
      expect(screen.getByLabelText('Ask a calculation in plain English')).toHaveValue('');
    });
  });

  it('stops listening when the mic button is clicked again', async () => {
    const user = userEvent.setup();
    render(
      <AppProviders>
        <NaturalLanguageInput />
      </AppProviders>,
    );

    await user.click(screen.getByLabelText('Start voice input'));
    await user.click(screen.getByLabelText('Stop voice input'));

    expect(MockSpeechRecognition.lastInstance?.stop).toHaveBeenCalledTimes(1);
    expect(screen.getByLabelText('Start voice input')).toBeInTheDocument();
  });

  it('disables the speak button until a result exists, then speaks it', async () => {
    const user = userEvent.setup();
    const { speak } = installSpeechApis();
    render(
      <AppProviders>
        <NaturalLanguageInput />
      </AppProviders>,
    );

    const speakButton = screen.getByLabelText('Read result aloud');
    expect(speakButton).toBeDisabled();

    await user.type(screen.getByLabelText('Ask a calculation in plain English'), '5 plus 3');
    await user.keyboard('{Enter}');

    await waitFor(() => expect(speakButton).toBeEnabled());
    await user.click(speakButton);

    expect(speak).toHaveBeenCalledTimes(1);
  });
});

describe('NaturalLanguageInput - camera scan', () => {
  beforeEach(() => {
    vi.mocked(recognizeMathExpression).mockReset();
  });

  it('shows a scanning state, then evaluates the recognized expression', async () => {
    const user = userEvent.setup();
    let resolveRecognize: (value: string) => void = () => {};
    vi.mocked(recognizeMathExpression).mockReturnValue(
      new Promise((resolve) => {
        resolveRecognize = resolve;
      }),
    );

    render(
      <AppProviders>
        <NaturalLanguageInput />
      </AppProviders>,
    );

    const file = new File(['fake-image'], 'photo.png', { type: 'image/png' });
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;

    await user.upload(fileInput, file);

    expect(screen.getByLabelText('Scanning photo…')).toBeDisabled();

    resolveRecognize('12+34');

    await waitFor(() => {
      expect(screen.getByLabelText('Ask a calculation in plain English')).toHaveValue('');
    });
    expect(screen.getByLabelText('Scan a photo of a calculation')).toBeEnabled();
  });

  it('shows a scan-specific error when OCR finds nothing usable', async () => {
    const user = userEvent.setup();
    vi.mocked(recognizeMathExpression).mockResolvedValue('not a calculation');

    render(
      <AppProviders>
        <NaturalLanguageInput />
      </AppProviders>,
    );

    const file = new File(['fake-image'], 'photo.png', { type: 'image/png' });
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    await user.upload(fileInput, file);

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Couldn’t read a calculation from that photo',
    );
  });

  it('shows a scan-specific error when OCR itself throws', async () => {
    const user = userEvent.setup();
    vi.mocked(recognizeMathExpression).mockRejectedValue(new Error('model failed to load'));

    render(
      <AppProviders>
        <NaturalLanguageInput />
      </AppProviders>,
    );

    const file = new File(['fake-image'], 'photo.png', { type: 'image/png' });
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    await user.upload(fileInput, file);

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Couldn’t read a calculation from that photo',
    );
  });
});
