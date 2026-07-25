import { describe, expect, it, vi } from 'vitest';

vi.mock('tesseract.js', () => ({
  createWorker: vi.fn().mockResolvedValue({
    setParameters: vi.fn().mockResolvedValue(undefined),
    recognize: vi.fn().mockResolvedValue({ data: { text: '12+34=\n' } }),
  }),
}));

describe('recognizeMathExpression', () => {
  it('strips a trailing "=" and surrounding whitespace from the OCR result', async () => {
    const { recognizeMathExpression } = await import('../ocr');
    const result = await recognizeMathExpression(new Blob());
    expect(result).toBe('12+34');
  });
});
