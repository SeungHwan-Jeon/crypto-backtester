// app/page.jsx

"use client";

import { useState, useEffect } from "react";
import Settings from "./components/Settings/Settings";
import TradeInput from "./components/TradeInput/TradeInput";
import PositionList from "./components/PositionList/PositionList";
import TotalPnL from "./components/TotalPnL/TotalPnL";
import styles from "./page.module.css";

export default function Home() {
  const [initialAsset, setInitialAsset] = useState(0);
  const [leverage, setLeverage] = useState(1);
  const [feeRate, setFeeRate] = useState(0.1);
  const [positions, setPositions] = useState([]);
  const [usedMargin, setUsedMargin] = useState(0);

  // 가용 마진 계산
  const maxNotional = initialAsset * leverage; // 최대 거래 가능 금액
  const availableMargin = initialAsset - usedMargin; // 사용 가능한 자산

  // 데이터 로드 및 저장 로직은 동일합니다.
  useEffect(() => {
    const savedData = localStorage.getItem("backtesterData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setInitialAsset(parsedData.initialAsset || 0);
      setLeverage(parsedData.leverage || 1);
      setFeeRate(parsedData.feeRate || 0.1);
      setPositions(parsedData.positions || []);
    }
  }, []);

  useEffect(() => {
    const dataToSave = {
      initialAsset,
      leverage,
      feeRate,
      positions,
    };
    localStorage.setItem("backtesterData", JSON.stringify(dataToSave));
  }, [initialAsset, leverage, feeRate, positions]);

  // 포지션 추가 시 사용된 마진 업데이트
  const addPosition = (newPosition) => {
    setPositions([...positions, newPosition]);
    setUsedMargin((prev) => prev + newPosition.margin); // 사용된 마진 업데이트
  };

  // 포지션 삭제 시 사용된 마진 업데이트
  const deletePosition = (index) => {
    const positionToDelete = positions[index];
    const updatedPositions = positions.filter((_, i) => i !== index);
    setPositions(updatedPositions);
    setUsedMargin((prev) => prev - positionToDelete.margin); // 사용된 마진 감소
  };

  // 포지션 업데이트 함수도 업데이트
  const updatePositions = (updatedPositions) => {
    // 사용된 마진 재계산
    const newUsedMargin = updatedPositions.reduce(
      (acc, position) => acc + position.margin,
      0
    );
    setPositions(updatedPositions);
    setUsedMargin(newUsedMargin);
  };

  const updateUsedMargin = (delta) => {
    setUsedMargin((prev) => prev + delta);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>가상화폐 백테스트 계산기</h1>
      <Settings
        initialAsset={initialAsset}
        setInitialAsset={setInitialAsset}
        leverage={leverage}
        setLeverage={setLeverage}
        feeRate={feeRate}
        setFeeRate={setFeeRate}
      />
      <TradeInput feeRate={feeRate} addPosition={addPosition} />
      <PositionList
        positions={positions}
        updatePositions={updatePositions}
        leverage={leverage}
        updateUsedMargin={updateUsedMargin}
      />
      <TotalPnL
        positions={positions}
        leverage={leverage}
        initialAsset={initialAsset}
      />
      ;
    </div>
  );
}
