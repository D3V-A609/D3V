import React, { createContext, useContext, useState, useEffect, useRef } from "react";

interface TimerContextProps {
  remainingTime: number | null;
  isRunning: boolean;
  selectedTime: number | null;
  startTimeRef: number | null;
  handleTimeSelect: (time: number | null) => void;
  startTimer: (initialTime: number | null) => void;
  pauseTimer: () => void;
  resetTimer: () => void;
}

const TimerContext = createContext<TimerContextProps | undefined>(undefined);

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // ✅ 타이머 시간 선택 핸들러
  const handleTimeSelect = (time: number | null) => {
    setSelectedTime(time);
    setRemainingTime(time);
  };

  // ✅ 타이머 시작 함수
  const startTimer = (time: number | null) => {
    if (time === null) return;
    if (isRunning || remainingTime === null) return;
    setSelectedTime(time);
    setRemainingTime(time);
    setIsRunning(true);
    startTimeRef.current = Date.now();
  };

  // ✅ 타이머 일시 정지 함수
  const pauseTimer = () => {
    if (!isRunning || startTimeRef.current === null) return;
    setIsRunning(false);
    const currentTime = Date.now();
    const elapsedTime = Math.floor((currentTime - startTimeRef.current) / 1000);
    setRemainingTime((prev) => Math.max((prev ?? 0) - elapsedTime, 0));
  };

  // ✅ 타이머 초기화 함수
  const resetTimer = () => {
    setIsRunning(false);
    setRemainingTime(null);
    setSelectedTime(null);
    startTimeRef.current = null;
  };

  useEffect(() => {
    if (!isRunning || remainingTime === null || startTimeRef.current === null) return;

    const timerId = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = Math.floor((currentTime - (startTimeRef.current ?? currentTime)) / 1000);
      const newRemainingTime = Math.max((remainingTime ?? 0) - elapsedTime, 0);

      setRemainingTime(newRemainingTime);

      if (newRemainingTime <= 0) {
        clearInterval(timerId);
        resetTimer();
        alert("타이머 종료");
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [isRunning]);

  return (
    <TimerContext.Provider
      value={{
        startTimeRef: startTimeRef.current,
        remainingTime,
        isRunning,
        selectedTime,
        handleTimeSelect,
        startTimer,
        pauseTimer,
        resetTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
};
