import React from 'react';
import { MdOutlineTimer } from 'react-icons/md';
import { FaRegCirclePlay } from "react-icons/fa6";
import { FaPauseCircle } from "react-icons/fa";

import { useTimer } from '../../../../../context/TimerContext';

import "./TimerSetting.css";

interface TimerSettingProps {
  showTimerDropdown: boolean;
  handleDropdownToggle: () => void;
}

const TimerSetting: React.FC<TimerSettingProps> = ({
  showTimerDropdown,
  handleDropdownToggle,

}) => {
  const {selectedTime, remainingTime, isRunning, handleTimeSelect, startTimer, pauseTimer } = useTimer();


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

      {remainingTime !== null && (
        <div>
          {isRunning ? (
            <FaPauseCircle className="play-icon" onClick={pauseTimer} />
          ) : (
            <FaRegCirclePlay className="play-icon" onClick={()=>startTimer(selectedTime)} />
          )}
        </div>
      )}
    </div>
  );
};

export default TimerSetting;