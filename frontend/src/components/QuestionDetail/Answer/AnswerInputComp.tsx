import React, { useRef } from "react";

import { useState, useEffect } from 'react';

import { CiMicrophoneOn } from "react-icons/ci";
import TimerSetting from "./TimerSetting";
import SelectPublicBtn from "../../../features/Answer/SelectPublicBtn";

const AnswerInputComp: React.FC = () => {

  const [showTimerDropdown, setShowTimerDropdown] = useState(false); // 타이머 선택 드롭다운 상태
  const [selectedTime, setSelectedTime] = useState<number| null>(null); // 선택된 시간(default: null(타이머를 선택하지 않음))
  const [isRunning, setIsRunning] = useState(false); // 타이머 실행 여부

  const remainingTimeRef = useRef<number | null>(null); //useRef로 타이머 시간 상태 관리 (useEffect로 관리 시 클로서 문제 발생 -> 값이 변경되더라도 클로저에 저장된 이전 값이 사용되어 타이머 종료 알림이 중복 발생)
  const [displayTime, setDisplayTime] = useState<number | null>(null); // 렌더링용 상태

  const [selectedPublicOption, setPublicOption] = useState("PUBLIC"); // 답변 공개 범위 설정 상태(default: "PUBLIC(전체공개)" => "PUBLIC", "PRIVATE", "PROTECTED")
  const [isIDK, setIsIDK] = useState(false); // 모르겠어요 체크박스 버튼 상태(default: 알고 있어요(모르겠어요X))
  // 모르겠어요 버튼 변경 핸들러
  const handleIDKBtnChange = () =>{
    setIsIDK(!isIDK);
  }

  // 공개 범위 옵션 변경 핸들러
  const handlePublicOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPublicOption(e.target.value);
  };

  // timer 드롭다운 열기/닫기
  const handleDropdownToggle = () => setShowTimerDropdown(!showTimerDropdown); 

  // timer 시간 선택
  const handleTimeSelect = (time: number | null) => {
    setSelectedTime(time);
    setShowTimerDropdown(false);
    remainingTimeRef.current = time;
    setDisplayTime(time); // 화면에 표시될 남은 타이머 시간 설정정
  };
  
  // 타이머 시작
  const startTimer = () => {
    if (isRunning || remainingTimeRef.current === null) return; // 이미 실행 중이면 무시
    setIsRunning(true);
    remainingTimeRef.current = selectedTime;
    setDisplayTime(selectedTime);  // 타이머 초기화
  };

  // 타이머 동작 관리(변경 필요)
  useEffect(() => {
    if (!isRunning || remainingTimeRef.current === null) return;

    const timer = setInterval(() => {
      if (remainingTimeRef.current !== null) {
        remainingTimeRef.current -= 1;
        setDisplayTime(remainingTimeRef.current);  // UI 업데이트

        if (remainingTimeRef.current <= 0) {
          clearInterval(timer);
          alert("타이머 종료!");
          setIsRunning(false);
          remainingTimeRef.current = null;
        }
      }
    }, 1000);

    return () => clearInterval(timer);  // 컴포넌트 언마운트 시 타이머 정리
  }, [isRunning]);

  return (
    <div className="answer-input-container">
      <div className="answer-title">
        <span className="text-brackets">{"{"}</span>  답변하기  <span className="text-brackets">{"}"}</span>
      </div>
      <div className="answer-subtitle text-gray2">
        면접 질문에 대한 답변을 연습하고, 타이머와 음성 기능으로 실전처럼
        준비해보세요!
      </div>
      <div className="anwer-input-container__input">
        <div className="answer-setting">
          <SelectPublicBtn selectedOption={selectedPublicOption} onChange={handlePublicOptionChange} />
          <TimerSetting
            showTimerDropdown={showTimerDropdown}
            selectedTime={selectedTime}
            remainingTime={displayTime} // 렌더링용
            isRunning={isRunning}
            handleDropdownToggle={handleDropdownToggle}
            handleTimeSelect={handleTimeSelect}
            startTimer={startTimer}
          />

        </div>
        <div className="answer-input">
          <textarea className="answer-input-area"
          placeholder="답변을 입력해주세요." />
        </div>
        <div className="answer-submit">
          <div className="answer-voice">
            <CiMicrophoneOn className="voice-icon" />
            <div>음성으로 입력하기</div>
          </div>
          <div className="btn-answer-submit-group">
             {/* <div className="checkbox-IDK">모르겠어요</div> */}
             <div className="checkbox-IDK">
              <input
                type="checkbox"
                id="idk"
                checked={isIDK}
                onChange={handleIDKBtnChange}
              />
              <label htmlFor="idk">모르겠어요</label>
            </div>
             <div className="btn-submit">저장하기</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerInputComp;
