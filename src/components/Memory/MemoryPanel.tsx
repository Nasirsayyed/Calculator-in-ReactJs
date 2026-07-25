import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FiCheck, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useMemoryBank } from '@context/MemoryContext';
import { Modal } from '@components/common/Modal';
import { formatNumber } from '@utils/formatNumber';
import type { MemoryEntry } from '@app-types/memory';
import styles from './Memory.module.css';

function MemoryRow({ entry }: { entry: MemoryEntry }) {
  const { deleteEntry, rename } = useMemoryBank();
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(entry.label);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const commitRename = () => {
    const trimmed = label.trim();
    rename(entry.id, trimmed || entry.label);
    setEditing(false);
  };

  return (
    <motion.li
      layout
      className={styles.item}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24 }}
      transition={{ duration: 0.2 }}
    >
      {editing ? (
        <input
          ref={inputRef}
          className={styles.labelInput}
          value={label}
          aria-label="Memory label"
          onChange={(event) => setLabel(event.target.value)}
          onKeyDown={(event) => event.key === 'Enter' && commitRename()}
        />
      ) : (
        <span className={styles.label}>{entry.label}</span>
      )}
      <span className={styles.value}>{formatNumber(entry.value)}</span>
      <div className={styles.itemActions}>
        {editing ? (
          <button
            type="button"
            className={styles.iconGhost}
            aria-label="Save label"
            onClick={commitRename}
          >
            <FiCheck />
          </button>
        ) : (
          <button
            type="button"
            className={styles.iconGhost}
            aria-label="Rename memory"
            onClick={() => setEditing(true)}
          >
            <FiEdit2 />
          </button>
        )}
        <button
          type="button"
          className={styles.iconGhost}
          aria-label="Delete memory"
          onClick={() => deleteEntry(entry.id)}
        >
          <FiTrash2 />
        </button>
      </div>
    </motion.li>
  );
}

export function MemoryPanel() {
  const { entries, clear } = useMemoryBank();
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div className={styles.panel}>
      <div className={styles.toolbarRow}>
        <button
          type="button"
          className={styles.clearButton}
          disabled={entries.length === 0}
          onClick={() => setConfirmOpen(true)}
        >
          Clear all
        </button>
      </div>

      {entries.length === 0 ? (
        <p className={styles.empty}>No saved values yet. Use MS, M+, or M- while calculating.</p>
      ) : (
        <ul className={styles.list}>
          <AnimatePresence initial={false}>
            {entries.map((entry) => (
              <MemoryRow key={entry.id} entry={entry} />
            ))}
          </AnimatePresence>
        </ul>
      )}

      <Modal open={confirmOpen} title="Clear memory?" onClose={() => setConfirmOpen(false)}>
        <p>This removes every saved memory value. This can&apos;t be undone.</p>
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
              clear();
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
