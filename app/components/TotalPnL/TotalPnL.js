import React from "react";
import styles from "./TotalPnL.module.css";

export default function TotalPnL({ positions, leverage, initialAsset }) {
  const calculateStatistics = () => {
    let totalPnL = 0;
    let wins = 0;
    let losses = 0;

    positions.forEach((position) => {
      if (position.isClosed) {
        let positionPnL = 0;
        position.partialExits.forEach((exit) => {
          positionPnL += exit.pnl;
        });
        positionPnL -= position.fee;

        totalPnL += positionPnL;

        if (positionPnL >= 0) {
          wins += 1;
        } else {
          losses += 1;
        }
      }
    });

    const winRate = wins + losses > 0 ? (wins / (wins + losses)) * 100 : 0;
    const finalAsset = initialAsset + totalPnL;

    return { totalPnL, wins, losses, winRate, finalAsset };
  };

  const { totalPnL, wins, losses, winRate, finalAsset } = calculateStatistics();

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>총 손익 및 통계</h2>
      <div className={styles.statItem}>
        <span>총 손익:</span>
        <span
          className={`${styles.amount} ${
            totalPnL >= 0 ? styles.profit : styles.loss
          }`}
        >
          ${totalPnL.toFixed(2)}
        </span>
      </div>
      <div className={styles.statItem}>
        <span>승리 수:</span>
        <span>{wins}</span>
      </div>
      <div className={styles.statItem}>
        <span>패배 수:</span>
        <span>{losses}</span>
      </div>
      <div className={styles.statItem}>
        <span>승률:</span>
        <span>{winRate.toFixed(2)}%</span>
      </div>
      <div className={styles.statItem}>
        <span>최종 자산:</span>
        <span>${finalAsset.toFixed(2)}</span>
      </div>
    </div>
  );
}
