// app/components/PositionList/PositionItem.jsx

import React from "react";
import PartialExitForm from "../PartialExitForm/PartialExitForm";
import styles from "./PositionItem.module.css";

export default function PositionItem({
  index,
  position,
  positions,
  updatePositions,
  leverage,
  deletePosition,
}) {
  const calculatePositionPnL = () => {
    let totalPnL = 0;
    position.partialExits.forEach((exit) => {
      totalPnL += exit.pnl;
    });
    totalPnL -= position.fee; // 진입 수수료 차감
    return totalPnL;
  };

  const deletePartialExit = (exitIndex) => {
    const updatedPositions = [...positions];
    const currentPosition = updatedPositions[index];
    const exit = currentPosition.partialExits[exitIndex];

    // remainingAmount를 복구
    currentPosition.remainingAmount += exit.amount + exit.fee;

    // partialExits에서 해당 청산 제거
    currentPosition.partialExits.splice(exitIndex, 1);

    // 포지션 상태 업데이트
    if (currentPosition.remainingAmount > 0) {
      currentPosition.isClosed = false;
    }

    updatePositions(updatedPositions);
  };

  const handlePartialExit = (exitPrice, exitPercentage) => {
    const updatedPositions = [...positions];
    const currentPosition = updatedPositions[index];

    const exitAmount = currentPosition.remainingAmount * (exitPercentage / 100);
    const fee = (exitAmount * currentPosition.feeRate) / 100;
    const netExitAmount = exitAmount - fee;

    currentPosition.remainingAmount -= exitAmount;

    // 청산 시 PNL 계산
    let pnl;
    if (currentPosition.type === "long") {
      pnl =
        ((exitPrice - currentPosition.price) / currentPosition.price) *
        netExitAmount *
        leverage;
    } else {
      pnl =
        ((currentPosition.price - exitPrice) / currentPosition.price) *
        netExitAmount *
        leverage;
    }

    currentPosition.partialExits.push({
      price: exitPrice,
      amount: netExitAmount,
      fee,
      pnl, // PNL 추가
    });

    // 남은 금액이 0이면 포지션 종료
    if (currentPosition.remainingAmount <= 0) {
      currentPosition.isClosed = true;
    }

    updatePositions(updatedPositions);
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>
        포지션 {index + 1} - {position.type === "long" ? "롱" : "숏"}
      </h3>
      <p>진입 가격: {position.price}</p>
      <p>총 금액: ${position.amount.toFixed(2)}</p>
      <p>남은 금액: ${position.remainingAmount.toFixed(2)}</p>
      <p>진입 수수료: ${position.fee.toFixed(2)}</p>

      <PartialExitForm onPartialExit={handlePartialExit} />

      <button
        className={styles.deleteButton}
        onClick={() => deletePosition(index)}
      >
        포지션 삭제
      </button>

      {position.partialExits.length > 0 && (
        <div className={styles.exitHistory}>
          <h4 className={styles.subtitle}>청산 내역</h4>
          {position.isClosed && (
            <p className={styles.closedMessage}>포지션이 종료되었습니다.</p>
          )}
          <table className={styles.table}>
            <thead>
              <tr>
                <th>가격</th>
                <th>금액 ($)</th>
                <th>수수료 ($)</th>
                <th>손익 ($)</th>
              </tr>
            </thead>
            <tbody>
              {position.partialExits.map((exit, i) => (
                <tr key={i}>
                  <td>{exit.price}</td>
                  <td>{exit.amount.toFixed(2)}</td>
                  <td>{exit.fee.toFixed(2)}</td>
                  <td>{exit.pnl.toFixed(2)}</td>
                  <td>
                    <button
                      className={styles.deleteButton}
                      onClick={() => deletePartialExit(i)}
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {position.isClosed && (
        <div className={styles.pnlContainer}>
          <p className={styles.pnlLabel}>포지션 손익:</p>
          <p
            className={`${styles.pnlValue} ${
              calculatePositionPnL() >= 0 ? styles.profit : styles.loss
            }`}
          >
            ${calculatePositionPnL().toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
}
