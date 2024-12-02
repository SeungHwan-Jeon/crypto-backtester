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

  const addPosition = (newPosition) => {
    setPositions([...positions, newPosition]);
  };

  const updatePositions = (updatedPositions) => {
    setPositions(updatedPositions);
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
      />
      <TotalPnL
        positions={positions}
        leverage={leverage}
        initialAsset={initialAsset}
      />
    </div>
  );
}
