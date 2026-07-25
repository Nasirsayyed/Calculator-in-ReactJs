import type { Worker } from 'tesseract.js';

// Self-hosted (not CDN) - see public/ocr/ and the globIgnores note in
// vite.config.ts. Restricting the whitelist to calculator symbols
// dramatically improves recognition accuracy over general-purpose text OCR,
// since the model never has to choose between e.g. "0" and "O".
const CHAR_WHITELIST = '0123456789+-*/.()%=';

let workerPromise: Promise<Worker> | null = null;

async function getWorker(): Promise<Worker> {
  workerPromise ??= (async () => {
    const { createWorker } = await import('tesseract.js');
    const worker = await createWorker('eng', 1, {
      workerPath: '/ocr/worker.min.js',
      corePath: '/ocr/tesseract-core-simd-lstm.wasm.js',
      langPath: '/ocr',
      gzip: true,
    });
    await worker.setParameters({ tessedit_char_whitelist: CHAR_WHITELIST });
    return worker;
  })();
  return workerPromise;
}

/**
 * Runs OCR on a photographed/scanned math expression and returns the raw
 * recognized text (a trailing "=" is stripped, since a photographed
 * equation often ends with one but it isn't valid calculator syntax). The
 * caller is responsible for running the result through the same
 * sanitize-then-evaluate pipeline as any other input - this never bypasses
 * that.
 */
export async function recognizeMathExpression(image: Blob | HTMLCanvasElement): Promise<string> {
  const worker = await getWorker();
  const { data } = await worker.recognize(image);
  return data.text.trim().replace(/=+$/, '').trim();
}
