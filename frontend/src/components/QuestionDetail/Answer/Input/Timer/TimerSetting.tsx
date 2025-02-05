import React, { useState } from 'react';
import { MdOutlineTimer } from 'react-icons/md';
import { FaRegCirclePlay } from "react-icons/fa6";
import { FaPauseCircle } from "react-icons/fa";
import "./TimerSetting.css";

interface TimerSettingProps {
  showTimerDropdown: boolean;
  selectedTime: number | null;
  remainingTime: number | null;
  isRunning: boolean;
  handleDropdownToggle: () => void;
  handleTimeSelect: (time: number | null ) => void;
  startTimer: () => void;
  pauseTimer: () => void;
}

const TimerSetting: React.FC<TimerSettingProps> = ({
  showTimerDropdown,
  selectedTime,
  remainingTime,
  isRunning,
  handleDropdownToggle,
  handleTimeSelect,
  startTimer,
  pauseTimer
}) => {
  return(
    <div className="timer-setting-container">
      {!showTimerDropdown? (
        <div className="timer-initial" onClick={handleDropdownToggle}>
          <span>{remainingTime !== null ? `${remainingTime}초` : "타이머 설정"}</span>
          <MdOutlineTimer className="timer-icon" />
        </div>
      ) : (
        <div className="timer-dropdown">
          <div className="dropdown-menu">
            <div
              className={`dropdown-item ${selectedTime === null ? 'selected' : ''}`}
              onClick={() => handleTimeSelect(null)}  // ✅ null 선택
            >
              선택 안 함
            </div>
            {[30, 60, 180].map((time) => (
              <div
                key={time}
                className={`dropdown-item ${selectedTime === time ? 'selected' : ''}`}  // ✅ 선택된 값 표시
                onClick={() => handleTimeSelect(time)}
              >
                {time === 30 ? "30초" : time === 60 ? "1분" : "3분"}
              </div>
            ))}
            </div>
          </div>
        )}
{/* 
      {remainingTime != null && (
        isStart ? (
        <FaRegCirclePlay
          className={`play-icon ${isRunning ? "disabled" : ""}`}
          onClick={
            !isRunning && !isStart ? startTimer : clickTimerStart} /> ) : (
        <FaPauseCircle 
          className={`play-icon ${isRunning ? "disabled" : ""}`}
          onClick={!isRunning && isStart ? pauseTimer : clickTimerStart } />)
      )} */}

      {remainingTime !== null && (
        <div>
          {isRunning ? (
            <FaPauseCircle className="play-icon" onClick={pauseTimer} />
          ) : (
            <FaRegCirclePlay className="play-icon" onClick={startTimer} />
          )}
        </div>
      )}
    </div>
  );
};

export default TimerSetting;