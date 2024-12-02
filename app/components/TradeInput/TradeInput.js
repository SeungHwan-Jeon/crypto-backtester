// app/components/TradeInput/TradeInput.jsx

import React, { useState } from "react";
import styles from "./TradeInput.module.css";

export default function TradeInput({ feeRate, addPosition }) {
  const [tradePrice, setTradePrice] = useState(0);
  const [tradeAmount, setTradeAmount] = useState(0);
  const [positionType, setPositionType] = useState("long");

  const handleAddPosition = () => {
    if (tradePrice <= 0 || tradeAmount <= 0) {
      alert("거래 가격과 거래 금액은 0보다 커야 합니다.");
      return;
    }

    const fee = (tradeAmount * feeRate) / 100;
    const netAmount = tradeAmount - fee;

    const newPosition = {
      price: tradePrice,
      amount: netAmount,
      remainingAmount: netAmount,
      fee,
      partialExits: [],
      type: positionType,
      feeRate,
    };

    addPosition(newPosition);
    setTradePrice(0);
    setTradeAmount(0);
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>거래 입력</h2>
      <div className={styles.formGroup}>
        <label className={styles.label}>포지션 타입</label>
        <select
          className={styles.select}
          value={positionType}
          onChange={(e) => setPositionType(e.target.value)}
        >
          <option value="long">롱</option>
          <option value="short">숏</option>
        </select>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>거래 가격</label>
        <input
          type="number"
          className={styles.input}
          value={tradePrice}
          onChange={(e) => setTradePrice(Number(e.target.value))}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>거래 금액 ($)</label>
        <input
          type="number"
          className={styles.input}
          value={tradeAmount}
          onChange={(e) => setTradeAmount(Number(e.target.value))}
        />
      </div>
      <button className={styles.button} onClick={handleAddPosition}>
        포지션 추가
      </button>
    </div>
  );
}
