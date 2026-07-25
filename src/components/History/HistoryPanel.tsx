import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { FiCheck, FiCopy, FiSearch, FiStar, FiMapPin, FiTrash2 } from 'react-icons/fi';
import { useHistory } from '@context/HistoryContext';
import { Modal } from '@components/common/Modal';
import { cx } from '@utils/classNames';
import type { HistoryEntry } from '@app-types/history';
import styles from './History.module.css';

export interface HistoryPanelProps {
  onReuse: (result: string) => void;
}

export function HistoryPanel({ onReuse }: HistoryPanelProps) {
  const { entries, deleteEntry, clearAll, togglePin, toggleFavorite } = useHistory();
  const [query, setQuery] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q
      ? entries.filter(
          (entry) =>
            entry.expression.toLowerCase().includes(q) || entry.result.toLowerCase().includes(q),
        )
      : entries;
    return [...base].sort(
      (a, b) => Number(b.pinned) - Number(a.pinned) || b.timestamp - a.timestamp,
    );
  }, [entries, query]);

  const handleCopy = async (entry: HistoryEntry) => {
    try {
      await navigator.clipboard.writeText(entry.result);
      setCopiedId(entry.id);
      window.setTimeout(
        () => setCopiedId((current) => (current === entry.id ? null : current)),
        1200,
      );
    } catch {
      // Clipboard API may be unavailable (permissions, insecure context) - no-op.
    }
  };

  return (
    <div className={styles.panel}>
      <div className={styles.toolbar}>
        <div style={{ position: 'relative', flex: 1 }}>
          <FiSearch
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              opacity: 0.5,
            }}
          />
          <input
            type="text"
            placeholder="Search history"
            aria-label="Search history"
            className={styles.search}
            style={{ paddingLeft: 32 }}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <button
          type="button"
          className={styles.clearButton}
          disabled={entries.length === 0}
          onClick={() => setConfirmOpen(true)}
        >
          Clear all
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className={styles.empty}>
          {entries.length === 0 ? 'No calculations yet.' : 'No matches.'}
        </p>
      ) : (
        <ul className={styles.list}>
          <AnimatePresence initial={false}>
            {filtered.map((entry) => (
              <motion.li
                key={entry.id}
                layout
                className={styles.item}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 24 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  type="button"
                  className={styles.itemMain}
                  onClick={() => onReuse(entry.result)}
                  aria-label={`Reuse result ${entry.result}`}
                >
                  <span className={styles.expr}>{entry.expression}</span>
                  <span className={styles.result}>= {entry.result}</span>
                </button>
                <div className={styles.itemActions}>
                  <button
                    type="button"
                    className={cx(styles.iconGhost, entry.favorite && styles.iconActive)}
                    aria-label={entry.favorite ? 'Unmark favorite' : 'Mark as favorite'}
                    aria-pressed={entry.favorite}
                    onClick={() => toggleFavorite(entry.id)}
                  >
                    <FiStar />
                  </button>
                  <button
                    type="button"
                    className={cx(styles.iconGhost, entry.pinned && styles.iconActive)}
                    aria-label={entry.pinned ? 'Unpin' : 'Pin'}
                    aria-pressed={entry.pinned}
                    onClick={() => togglePin(entry.id)}
                  >
                    <FiMapPin />
                  </button>
                  <button
                    type="button"
                    className={styles.iconGhost}
                    aria-label="Copy result"
                    onClick={() => handleCopy(entry)}
                  >
                    {copiedId === entry.id ? <FiCheck /> : <FiCopy />}
                  </button>
                  <button
                    type="button"
                    className={styles.iconGhost}
                    aria-label="Delete entry"
                    onClick={() => deleteEntry(entry.id)}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}

      <Modal open={confirmOpen} title="Clear history?" onClose={() => setConfirmOpen(false)}>
        <p>
          This removes every unpinned entry. Pinned entries are kept. This can&apos;t be undone.
        </p>
        <div className={styles.confirmActions}>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => setConfirmOpen(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className={styles.dangerButton}
            onClick={() => {
              clearAll();
              setConfirmOpen(false);
            }}
          >
            Yes, clear all
          </button>
        </div>
      </Modal>
    </div>
  );
}
