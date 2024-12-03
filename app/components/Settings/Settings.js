import React from "react";
import styles from "./Settings.module.css";

export default function Settings({
  initialAsset,
  setInitialAsset,
  isTrading,
  startTrading,
  resetSettings,
  stopTrading,
}) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>설정</h2>
      <div className={styles.formGroup}>
        <label className={styles.label}>초기 자산 ($)</label>
        <input
          type="number"
          className={styles.input}
          value={initialAsset}
          onChange={(e) => setInitialAsset(Number(e.target.value))}
          disabled={isTrading}
        />
      </div>
      <div className={styles.buttonGroup}>
        {!isTrading ? (
          <button className={styles.startButton} onClick={startTrading}>
            거래 시작
          </button>
        ) : (
          <button className={styles.stopButton} onClick={stopTrading}>
            거래 중지
          </button>
        )}
        <button className={styles.resetButton} onClick={resetSettings}>
          초기화
        </button>
      </div>
    </div>
  );
}
