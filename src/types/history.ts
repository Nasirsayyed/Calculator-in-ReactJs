export interface HistoryEntry {
  id: string;
  expression: string;
  result: string;
  mode: string;
  timestamp: number;
  pinned: boolean;
  favorite: boolean;
}
