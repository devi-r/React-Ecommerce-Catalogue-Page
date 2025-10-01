import React from "react";
import styles from "./errorState.module.scss";

const ErrorState = ({ error, onRetry }) => {
  return (
    <div className={styles.container}>
      <div className={styles.errorContent}>
        <div className={styles.errorIcon}>⚠️</div>
        <h2 className={styles.errorTitle}>Something went wrong</h2>
        <p className={styles.errorMessage}>
          {error?.message ||
            "We're having trouble loading the page. Please try again."}
        </p>
        <button className={styles.retryButton} onClick={onRetry}>
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorState;
