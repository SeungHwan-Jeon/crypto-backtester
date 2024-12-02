// app/components/Settings/Settings.jsx

import React from "react";
import styles from "./Settings.module.css";

export default function Settings({
  initialAsset,
  setInitialAsset,
  leverage,
  setLeverage,
  feeRate,
  setFeeRate,
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
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>레버리지</label>
        <input
          type="number"
          className={styles.input}
          value={leverage}
          onChange={(e) => setLeverage(Number(e.target.value))}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>수수료율 (%)</label>
        <input
          type="number"
          className={styles.input}
          value={feeRate}
          onChange={(e) => setFeeRate(Number(e.target.value))}
        />
      </div>
    </div>
  );
}
