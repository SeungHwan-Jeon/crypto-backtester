// app/components/PositionList/PositionList.jsx

import React from "react";
import PositionItem from "./PositionItem";
import styles from "./PositionList.module.css";

// 추가된 부분을 강조하여 표시

export default function PositionList({ positions, updatePositions, leverage }) {
  // 포지션 분류
  const openPositions = positions.filter((position) => !position.isClosed);
  const closedPositions = positions.filter((position) => position.isClosed);

  const deletePosition = (index) => {
    const updatedPositions = positions.filter((_, i) => i !== index);
    updatePositions(updatedPositions);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>포지션 목록</h2>

      {/* 오픈 포지션 */}
      {openPositions.length === 0 ? (
        <p className={styles.emptyText}>오픈된 포지션이 없습니다.</p>
      ) : (
        openPositions.map((position, index) => (
          <PositionItem
            key={index}
            index={positions.indexOf(position)}
            position={position}
            positions={positions}
            updatePositions={updatePositions}
            leverage={leverage}
            deletePosition={deletePosition}
          />
        ))
      )}

      {/* 종료된 포지션 */}
      {closedPositions.length > 0 && (
        <div className={styles.closedPositions}>
          <h3 className={styles.subtitle}>종료된 포지션</h3>
          {closedPositions.map((position, index) => (
            <PositionItem
              key={index}
              index={positions.indexOf(position)}
              position={position}
              positions={positions}
              updatePositions={updatePositions}
              leverage={leverage}
            />
          ))}
        </div>
      )}
    </div>
  );
}
