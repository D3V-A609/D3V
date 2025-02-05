import React, { useRef } from "react";

import { useState, useEffect } from 'react';

import { CiMicrophoneOn } from "react-icons/ci";
import TimerSetting from "./Input/Timer/TimerSetting";
import SelectPublicBtn from "../../../features/Answer/SelectPublicBtn";
// import { useAppDispatch } from "react-redux";
import { useAppDispatch } from "../../../store/hooks/useRedux";
import { registAnswer, registServedAnswer } from "../../../store/slices/answerSlice";
// import { setSelectedQuestionId } from "../../../store/slices/questionSlice";

interface AnswerInputCompProps {
  questionId: number; 
  hasMyAnswers: boolean | undefined;
  handleRegistAnswerSuccess: () => void;
}

const AnswerInputComp: React.FC<AnswerInputCompProps> = ({questionId, hasMyAnswers, handleRegistAnswerSuccess}) => {

  const [showTimerDropdown, setShowTimerDropdown] = useState(false); // 타이머 선택 드롭다운 상태
  const [selectedTime, setSelectedTime] = useState<number| null>(null); // 선택된 시간(default: null(타이머를 선택하지 않음))
  const [isRunning, setIsRunning] = useState(false); // 타이머 실행 여부

  const remainingTimeRef = useRef<number | null>(null); // 실제 남은 시간 저장장 
  //useRef로 타이머 시간 상태 관리 (useEffect로 관리 시 클로서 문제 발생 -> 값이 변경되더라도 클로저에 저장된 이전 값이 사용되어 타이머 종료 알림이 중복 발생)
  const [displayTime, setDisplayTime] = useState<number | null>(null); // 화면 출력용 변수(default: 30초)
  const startTimeRef = useRef<number | null>(null); // 타이머의 시작 시간

  const [selectedPublicOption, setPublicOption] = useState("PUBLIC"); // 답변 공개 범위 설정 상태(default: "PUBLIC(전체공개)" => "PUBLIC", "PRIVATE", "PROTECTED")
  const [isIDK, setIsIDK] = useState(false); // 모르겠어요 체크박스 버튼 상태(default: 알고 있어요(모르겠어요X))

  const answerContent = useRef<HTMLTextAreaElement | null>(null); // 입력값이 변경해도 UI는 달라지지 않으므로 useState 대시 useRef 사용용

  const dispatch = useAppDispatch();

  // 모르겠어요 버튼 변경 핸들러
  const handleIDKBtnChange = () =>{
    setIsIDK(!isIDK);
  }

  // 공개 범위 옵션 변경 핸들러
  const handlePublicOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPublicOption(e.target.value);
  };

  // 답변 등록 함수
  const handleRegistAnswer = async () => {
    const content = answerContent.current?.value.trim() || '';
    // POST할 데이터 생성
    const answerPayload = {
      memberId: 3,  // 예시 멤버 ID
      content: content,
      accessLevel: selectedPublicOption,  // 공개 설정
      // isSolved: !isIDK,
      questionId: questionId,
    };

    const solvedAnswerPayload = {
      memberId: 3, 
      questionId: questionId,
      isSolved: !isIDK, // 풀었는지 여부이므로 반대로 주어야 함
    }

    try{

      if(hasMyAnswers!=undefined && !hasMyAnswers){
        await dispatch(registServedAnswer(solvedAnswerPayload)).unwrap();
      }
      await dispatch(registAnswer(answerPayload)).unwrap() // unwrap으로 감싸서 성공 실패를 쉽게 확인

      // 성공적으로 등록되었을 경우, 입력 필드를 초기화
      if (answerContent.current) {
        answerContent.current.value = '';  // 입력 필드 비우기
        handleRegistAnswerSuccess();
      }
    } catch(error){
      alert("죄송합니다. 잠시 후 다시 시도해주세요.")
      console.log("답변 등록 시 에러 : ", error); // 지워야 함
    }
    

  }

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
  // const startTimer = () => {
  //   if (isRunning || remainingTimeRef.current === null) return; // 이미 실행 중이면 무시
  //   setIsRunning(true);
  //   remainingTimeRef.current = selectedTime;
  //   setDisplayTime(selectedTime);  // 타이머 초기화
  // };

  // 타이머 시작 / 재개
  const startTimer = () => {
    if(isRunning || remainingTimeRef.current === null) return; // 타이머를 이미 실행중이거나 설정하지 않은 경우 무시
    setIsRunning(true);
    startTimeRef.current = Date.now(); // timer의 시작 시점의 시간을 기록록
  }

  // 타이머 일시 정지
  const pauseTimer = () => {
    if(!isRunning || remainingTimeRef.current === null) return; // 실행 중이지 않으면 무시
    setIsRunning(false);

    // 남은 시간을 현재 시점 기준으로 업데이트
    if(startTimeRef.current !== null){
      const currentTime = Date.now();
      const elapsedTime = Math.floor((currentTime-startTimeRef.current) / 1000); // 경과 시간 계산
      remainingTimeRef.current = Math.max(remainingTimeRef.current - elapsedTime, 0); // 남은 시간 업데이트
    }
  };

  // 타이머 동작 관리
  useEffect(() => {
    if (!isRunning || remainingTimeRef.current === null || startTimeRef.current === null) return;

      const timer = setInterval(() => {
      const currentTime = Date.now();

      // startTimeRef와 remainingTimeRef가 null이 아닌지 안전하게 접근
      if (startTimeRef.current !== null && remainingTimeRef.current !== null) {
        const elapsedTime = Math.floor((currentTime - startTimeRef.current) / 1000);
        const newRemainingTime = Math.max(remainingTimeRef.current - elapsedTime, 0);

        setDisplayTime(newRemainingTime);

        // 남은 시간이 0일 경우 타이머 종료
        if (newRemainingTime <= 0) {
          clearInterval(timer);
          setIsRunning(false);
          remainingTimeRef.current = null;
          alert("타이머 종료!");
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
            pauseTimer={pauseTimer}
          />

        </div>
        <div className="answer-input">
          <textarea className="answer-input-area"
          ref={answerContent}
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
             <div className="btn-submit" onClick={handleRegistAnswer}>저장하기</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerInputComp;
