import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import styles from './PageHeader.module.css';

export interface PageHeaderProps {
  title: string;
}

export function PageHeader({ title }: PageHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <button
        type="button"
        className={styles.backButton}
        aria-label="Back to calculators"
        onClick={() => navigate('/')}
      >
        <FiArrowLeft />
      </button>
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
}
