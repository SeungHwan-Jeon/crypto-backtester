// app/components/PartialExitForm/PartialExitForm.jsx

import React, { useState } from "react";
import styles from "./PartialExitForm.module.css";

export default function PartialExitForm({ onPartialExit }) {
  const [exitPrice, setExitPrice] = useState(0);
  const [exitPercentage, setExitPercentage] = useState(0);

  const handleSubmit = () => {
    if (exitPrice <= 0 || exitPercentage <= 0 || exitPercentage > 100) {
      alert("유효한 청산 가격과 퍼센트를 입력하세요.");
      return;
    }
    onPartialExit(exitPrice, exitPercentage);
    setExitPrice(0);
    setExitPercentage(0);
  };

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>분할 청산</h4>
      <div className={styles.formGroup}>
        <label className={styles.label}>청산 가격</label>
        <input
          type="number"
          className={styles.input}
          value={exitPrice}
          onChange={(e) => setExitPrice(Number(e.target.value))}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>청산 퍼센트 (%)</label>
        <input
          type="number"
          className={styles.input}
          value={exitPercentage}
          onChange={(e) => setExitPercentage(Number(e.target.value))}
        />
      </div>
      <button className={styles.button} onClick={handleSubmit}>
        분할 청산
      </button>
    </div>
  );
}
