import React, { useState } from "react";
import styles from "./TradeInput.module.css";

export default function TradeInput({
  feeRate,
  setFeeRate,
  leverage,
  setLeverage,
  addPosition,
  initialAsset,
  currentAsset,
  usedMargin,
}) {
  const [tradePrice, setTradePrice] = useState("");
  const [tradeAmount, setTradeAmount] = useState("");
  const [positionType, setPositionType] = useState("long");

  // 사용 가능한 자산은 현재 자산
  const availableMargin = currentAsset;
  const maxNotional = availableMargin * leverage;

  const handleAddPosition = () => {
    const tradeAmountNum = parseFloat(tradeAmount);
    const tradePriceNum = parseFloat(tradePrice);

    if (isNaN(tradeAmountNum) || isNaN(tradePriceNum)) {
      alert("거래 가격과 거래 금액을 올바르게 입력해주세요.");
      return;
    }

    if (tradeAmountNum <= 0 || tradePriceNum <= 0) {
      alert("거래 가격과 거래 금액은 0보다 커야 합니다.");
      return;
    }

    const requiredMargin = tradeAmountNum / leverage;

    if (requiredMargin > availableMargin) {
      alert(
        `거래 금액이 최대 가능 금액을 초과합니다. 최대 거래 가능 금액은 $${maxNotional.toFixed(
          2
        )}입니다.`
      );
      return;
    }

    const fee = (tradeAmountNum * feeRate) / 100;
    const netAmount = tradeAmountNum - fee;

    const newPosition = {
      price: tradePriceNum,
      amount: netAmount,
      remainingAmount: netAmount,
      fee,
      partialExits: [],
      type: positionType,
      feeRate,
      margin: requiredMargin,
    };

    addPosition(newPosition);
    setTradePrice("");
    setTradeAmount("");
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>거래 입력</h2>

      {/* 롱/숏 선택 버튼 */}
      <div className={styles.typeSelector}>
        <button
          className={`${styles.typeButton} ${
            positionType === "long" ? styles.selectedLong : styles.long
          }`}
          onClick={() => setPositionType("long")}
        >
          롱
        </button>
        <button
          className={`${styles.typeButton} ${
            positionType === "short" ? styles.selectedShort : styles.short
          }`}
          onClick={() => setPositionType("short")}
        >
          숏
        </button>
      </div>

      {/* 레버리지 설정 */}
      <div className={styles.formGroup}>
        <label className={styles.label}>레버리지</label>
        <input
          type="number"
          className={styles.input}
          value={leverage}
          onChange={(e) => setLeverage(Number(e.target.value))}
        />
      </div>

      {/* 수수료율 설정 */}
      <div className={styles.formGroup}>
        <label className={styles.label}>수수료율 (%)</label>
        <input
          type="number"
          className={styles.input}
          value={feeRate}
          onChange={(e) => setFeeRate(Number(e.target.value))}
        />
      </div>
      {/* 거래 가격 입력 */}
      <div className={styles.formGroup}>
        <label className={styles.label}>거래 가격</label>
        <input
          type="number"
          className={styles.input}
          value={tradePrice}
          onChange={(e) => setTradePrice(e.target.value)}
        />
      </div>

      {/* 거래 금액 입력 */}
      <div className={styles.formGroup}>
        <label className={styles.label}>거래 금액 ($)</label>
        <input
          type="number"
          className={styles.input}
          value={tradeAmount}
          onChange={(e) => setTradeAmount(e.target.value)}
        />
      </div>

      {/* 최대 거래 가능 금액 및 사용 가능한 자산 표시 */}
      <p className={styles.maxInfo}>
        최대 거래 가능 금액: ${maxNotional.toFixed(2)}
      </p>
      <p className={styles.maxInfo}>
        사용 가능한 자산: ${availableMargin.toFixed(2)}
      </p>

      <button className={styles.submitButton} onClick={handleAddPosition}>
        포지션 추가
      </button>
    </div>
  );
}
