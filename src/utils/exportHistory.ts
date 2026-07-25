import type { HistoryEntry } from '@app-types/history';

function csvEscape(value: string): string {
  return /[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

/** Pure formatting - no DOM/Blob access, so it's trivially unit-testable. */
export function entriesToCsv(entries: HistoryEntry[]): string {
  const header = ['Expression', 'Result', 'Mode', 'Timestamp', 'Pinned', 'Favorite'];
  const rows = entries.map((entry) =>
    [
      entry.expression,
      entry.result,
      entry.mode,
      new Date(entry.timestamp).toISOString(),
      String(entry.pinned),
      String(entry.favorite),
    ]
      .map(csvEscape)
      .join(','),
  );
  return [header.join(','), ...rows].join('\n');
}

export function entriesToJson(entries: HistoryEntry[]): string {
  return JSON.stringify(entries, null, 2);
}

/** Triggers a browser download of in-memory content - not meaningfully
 * unit-testable (jsdom has no real download behavior), so this is the one
 * DOM-touching function in the module; everything it depends on is pure. */
export function downloadTextFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function downloadHistoryAsCsv(entries: HistoryEntry[]): void {
  downloadTextFile(entriesToCsv(entries), 'calculator-history.csv', 'text/csv');
}

export function downloadHistoryAsJson(entries: HistoryEntry[]): void {
  downloadTextFile(entriesToJson(entries), 'calculator-history.json', 'application/json');
}

/**
 * jsPDF's main entry statically pulls in html2canvas/dompurify (used only by
 * its `.html()` renderer, which this never calls) - dynamically importing it
 * keeps that ~250KB out of the main bundle, fetched only when a user
 * actually exports to PDF.
 */
export async function downloadHistoryAsPdf(entries: HistoryEntry[]): Promise<void> {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF();
  const marginX = 14;
  let y = 16;

  doc.setFontSize(16);
  doc.text('Calculator History', marginX, y);
  y += 10;
  doc.setFontSize(10);

  for (const entry of entries) {
    if (y > 280) {
      doc.addPage();
      y = 16;
    }
    const date = new Date(entry.timestamp).toLocaleString();
    doc.text(`${entry.expression} = ${entry.result}`, marginX, y);
    doc.setTextColor(120);
    doc.text(
      `${entry.mode} · ${date}${entry.pinned ? ' · pinned' : ''}${entry.favorite ? ' · favorite' : ''}`,
      marginX,
      y + 5,
    );
    doc.setTextColor(0);
    y += 12;
  }

  doc.save('calculator-history.pdf');
}
