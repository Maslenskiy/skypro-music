import React from 'react';
import styles from './ErrorDisplay.module.css';

interface ErrorDisplayProps {
  error: string | null;
  onClose?: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onClose }) => {
  if (!error) return null;

  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <span className={styles.errorText}>{error}</span>
        {onClose && (
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorDisplay; 