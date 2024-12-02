// app/components/TradeInput/TradeInput.jsx

import React, { useState } from "react";
import styles from "./TradeInput.module.css";

export default function TradeInput({
  feeRate,
  addPosition,
  initialAsset,
  leverage,
  usedMargin,
}) {
  const [tradePrice, setTradePrice] = useState(0);
  const [tradeAmount, setTradeAmount] = useState(0);
  const [positionType, setPositionType] = useState("long");

  // 최대 거래 가능 금액 및 최대 마진 계산
  const maxNotional = (initialAsset - usedMargin) * leverage;
  const maxMargin = initialAsset - usedMargin;

  const handleAddPosition = () => {
    // 필요한 마진 계산
    const requiredMargin = tradeAmount / leverage;

    if (requiredMargin > maxMargin) {
      alert(
        `거래 금액이 최대 가능 금액을 초과합니다. 최대 거래 가능 금액은 $${maxNotional.toFixed(
          2
        )}입니다.`
      );
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
      margin: requiredMargin, // 마진 추가
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
      <p>최대 거래 가능 금액: ${maxNotional.toFixed(2)}</p>
      <p>사용 가능한 자산: ${maxMargin.toFixed(2)}</p>
      <button className={styles.button} onClick={handleAddPosition}>
        포지션 추가
      </button>
    </div>
  );
}
