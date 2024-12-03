"use client";

import { useState, useEffect } from "react";
import Settings from "./components/Settings/Settings";
import TradeInput from "./components/TradeInput/TradeInput";
import PositionList from "./components/PositionList/PositionList";
import TotalPnL from "./components/TotalPnL/TotalPnL";
import styles from "./page.module.css";

export default function Home() {
  const [initialAsset, setInitialAsset] = useState(1000);
  const [currentAsset, setCurrentAsset] = useState(1000);
  const [leverage, setLeverage] = useState(1);
  const [feeRate, setFeeRate] = useState(0.1);
  const [positions, setPositions] = useState([]);
  const [usedMargin, setUsedMargin] = useState(0);
  const [isTrading, setIsTrading] = useState(false);

  // 데이터 로드 및 저장 로직은 동일합니다.
  useEffect(() => {
    const savedData = localStorage.getItem("backtesterData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setInitialAsset(parsedData.initialAsset || 1000);
      setCurrentAsset(
        parsedData.currentAsset || parsedData.initialAsset || 1000
      );
      setLeverage(parsedData.leverage || 1);
      setFeeRate(parsedData.feeRate || 0.1);
      setPositions(parsedData.positions || []);
      setUsedMargin(parsedData.usedMargin || 0);
    }
  }, []);

  useEffect(() => {
    const dataToSave = {
      initialAsset,
      currentAsset,
      leverage,
      feeRate,
      positions,
      usedMargin,
    };
    localStorage.setItem("backtesterData", JSON.stringify(dataToSave));
  }, [initialAsset, currentAsset, leverage, feeRate, positions, usedMargin]);

  // 거래 시작 함수
  const startTrading = () => {
    setIsTrading(true);
  };

  // 거래 중지 함수
  const stopTrading = () => {
    setIsTrading(false);
    resetSettings(); // 거래 중지 시 설정 초기화
  };

  // 포지션 추가 시 상태 업데이트
  const addPosition = (newPosition) => {
    setPositions([...positions, newPosition]);
    setUsedMargin((prev) => prev + newPosition.margin);
    setCurrentAsset((prev) => prev - newPosition.margin);
  };

  // 포지션 삭제 시 상태 업데이트
  const deletePosition = (index) => {
    const positionToDelete = positions[index];
    const updatedPositions = positions.filter((_, i) => i !== index);
    setPositions(updatedPositions);
    setUsedMargin((prev) => prev - positionToDelete.margin);
    setCurrentAsset((prev) => prev + positionToDelete.margin); // 마진 반환
  };

  // 포지션 업데이트 함수
  const updatePositions = (updatedPositions) => {
    setPositions(updatedPositions);
    // 사용된 마진 재계산
    const newUsedMargin = updatedPositions.reduce(
      (acc, position) => acc + position.margin,
      0
    );
    setUsedMargin(newUsedMargin);
  };

  const updateUsedMargin = (delta) => {
    setUsedMargin((prev) => prev + delta);
  };

  // 설정 초기화 함수
  const resetSettings = () => {
    setInitialAsset(1000);
    setCurrentAsset(1000);
    setLeverage(1);
    setFeeRate(0.1);
    setPositions([]);
    setUsedMargin(0);
    localStorage.removeItem("backtesterData"); // 로컬스토리지 초기화
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>가상화폐 백테스트 계산기</h1>
      <Settings
        initialAsset={initialAsset}
        setInitialAsset={setInitialAsset}
        isTrading={isTrading}
        startTrading={startTrading}
        stopTrading={stopTrading}
        resetSettings={resetSettings}
      />
      {isTrading && (
        <>
          <TradeInput
            feeRate={feeRate}
            setFeeRate={setFeeRate}
            leverage={leverage}
            setLeverage={setLeverage}
            addPosition={addPosition}
            initialAsset={initialAsset}
            currentAsset={currentAsset}
            usedMargin={usedMargin}
          />
          <PositionList
            positions={positions}
            updatePositions={updatePositions}
            leverage={leverage}
            updateUsedMargin={updateUsedMargin}
            setCurrentAsset={setCurrentAsset}
          />
          <TotalPnL
            positions={positions}
            leverage={leverage}
            initialAsset={initialAsset}
            currentAsset={currentAsset}
            setCurrentAsset={setCurrentAsset}
          />
        </>
      )}
    </div>
  );
}
