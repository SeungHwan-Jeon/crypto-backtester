import React, { useState, useEffect } from "react";
import PartialExitForm from "../PartialExitForm/PartialExitForm";
import styles from "./PositionItem.module.css";

export default function PositionItem({
  index,
  position,
  positions,
  updatePositions,
  leverage,
  deletePosition,
  updateUsedMargin,
  setCurrentAsset,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  // 포지션 종료 시
  useEffect(() => {
    if (position.isClosed && !position.assetUpdated) {
      // 포지션 종료 시 마진 반환
      updateUsedMargin(-position.margin);
      // 마진은 자산에 영향을 주지 않음
      position.assetUpdated = true;
    }
  }, [position.isClosed]);

  const calculatePositionPnL = () => {
    let totalPnL = 0;
    position.partialExits.forEach((exit) => {
      totalPnL += exit.pnl;
    });
    totalPnL -= position.fee; // 진입 수수료 차감
    position.partialExits.forEach((exit) => {
      totalPnL -= exit.fee; // 청산 수수료 차감
    });
    return totalPnL;
  };

  const deletePartialExit = (exitIndex) => {
    const updatedPositions = [...positions];
    const currentPosition = updatedPositions[index];
    const exit = currentPosition.partialExits[exitIndex];

    // 수정 후
    const updatedPosition = { ...position };
    updatedPosition.remainingAmount += exit.amount;
    updatedPosition.partialExits.splice(exitIndex, 1);

    // 손익 업데이트 - 해당 청산의 손익과 수수료를 제거
    setCurrentAsset((prevAsset) => prevAsset - exit.pnl + exit.fee);

    if (currentPosition.isClosed) {
      // 포지션이 다시 열리면 마진 재차감
      updateUsedMargin(currentPosition.margin);
      currentPosition.isClosed = false;
      currentPosition.assetUpdated = false;
    }

    updatePositions(updatedPositions);
  };

  const calculateFee = (amount) => {
    return (amount * position.feeRate) / 100;
  };

  const calculatePnL = (entryPrice, exitPrice, amount, positionType) => {
    if (positionType === "long") {
      return (amount * (exitPrice - entryPrice)) / entryPrice;
    } else {
      return (amount * (entryPrice - exitPrice)) / entryPrice;
    }
  };

  const handlePartialExit = (exitPrice, exitPercentage) => {
    const exitAmount = (position.remainingAmount * exitPercentage) / 100;
    const exitFee = calculateFee(exitAmount);
    const netExitAmount = exitAmount - exitFee;

    const pnl = calculatePnL(
      position.price,
      exitPrice,
      netExitAmount,
      position.type
    );

    const newExit = {
      price: exitPrice,
      amount: netExitAmount,
      fee: exitFee,
      pnl: pnl,
    };

    const updatedPosition = {
      ...position,
      remainingAmount: position.remainingAmount - exitAmount,
      partialExits: [...position.partialExits, newExit],
    };

    if (updatedPosition.remainingAmount <= 0) {
      updatedPosition.isClosed = true;
      // 포지션이 완전히 종료되면 마진 반환
      if (!position.assetUpdated) {
        updateUsedMargin(-position.margin);
        updatedPosition.assetUpdated = true;
      }
    }

    const updatedPositions = [...positions];
    updatedPositions[index] = updatedPosition;
    updatePositions(updatedPositions);

    // 손익 업데이트 - 현재 청산에 대한 손익만 반영
    setCurrentAsset((prevAsset) => {
      // 이전 청산 내역은 이미 prevAsset에 반영되어 있음
      return prevAsset + pnl - exitFee;
    });
  };

  const handleDeletePosition = () => {
    if (!position.isClosed) {
      // 진행 중인 포지션 삭제 시 마진 반환
      updateUsedMargin(-position.margin);
    }
    deletePosition(index);
  };

  return (
    <div className={styles.card}>
      {/* 요약 정보 */}
      <div
        className={styles.summary}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className={styles.title}>
          포지션 {index + 1} - {position.type === "long" ? "롱" : "숏"}
        </h3>
        <p>진입 가격: {position.price}</p>
        <p>
          상태:{" "}
          {position.isClosed ? (
            <span className={styles.closed}>종료</span>
          ) : (
            <span className={styles.open}>진행 중</span>
          )}
        </p>
      </div>
      {isExpanded && (
        <div className={styles.details}>
          <p>총 금액: ${position.amount.toFixed(2)}</p>
          <p>남은 금액: ${position.remainingAmount.toFixed(2)}</p>
          <p>진입 수수료: ${position.fee.toFixed(2)}</p>

          {!position.isClosed && (
            <PartialExitForm onPartialExit={handlePartialExit} />
          )}

          <button
            className={styles.deleteButton}
            onClick={handleDeletePosition}
          >
            포지션 삭제
          </button>

          {/* 청산 내역 */}
          {position.partialExits.length > 0 && (
            <div className={styles.exitHistory}>
              <h4 className={styles.subtitle}>청산 내역</h4>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>가격</th>
                    <th>금액 ($)</th>
                    <th>수수료 ($)</th>
                    <th>손익 ($)</th>
                    <th>액션</th>
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

          {/* 포지션 손익 */}
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
      )}
    </div>
  );
}
