import React, { useState, useEffect, useRef } from "react";
import { useTimer } from "../../context/TimerContext";
import "./RecordView.css";
import { useRecordingContext } from "../../context/RecordingContext";
import { RiArrowGoBackLine, RiResetRightLine } from "react-icons/ri";
import { IoIosPause } from "react-icons/io";
import { IoStop } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";
import { sendVoiceRecording } from "../../store/actions/voiceActions";
import { useAppDispatch } from "../../store/hooks/useRedux";

interface RecordProp {
  content: string;
}

const RecordView: React.FC<RecordProp> = ({ content }) => {

  const dispatch = useAppDispatch();

  const { remainingTime, startTimer, resetTimer, formatTime, selectedTime } = useTimer();  // 타이머 관리
  // const [elapsedRecordingTime, setElapsedRecordingTime] = useState(0);  // 경과 시간 관리
  const [elapsedTime, setElapsedTime] = useState(0);  // 경과 시간
  const [showButtons, setShowButtons] = useState(false);  // 하단 버튼 표시 여부

  const {
    isRecording,
    isPaused,
    isRecordingStopped,
    isStartRecordFirst,
    mediaBlob,
    audioLevel,
    startRecording,
    stopRecording,
    togglePauseResume,
    resetRecording,
    exitRecordingMode
  } = useRecordingContext();

  const startTimeRef = useRef<number | null>(null);

  // 녹음 경과 시간 업데이트 (녹음 중일 때만 실행)
  useEffect(() => {
    if (!showButtons || isPaused || isRecordingStopped) return;

    startTimeRef.current = Date.now();

    const timerId = setInterval(() => {
      if(startTimeRef.current){
        const now = Date.now();
        const actualElapsedTime = Math.floor((now - startTimeRef.current) / 1000);
        setElapsedTime(actualElapsedTime);
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [showButtons, isPaused, isRecordingStopped]);

  // 타이머가 종료되었을 때 녹음을 자동으로 중지
  useEffect(() => {
    console.log("time: ", remainingTime)
    if (remainingTime && remainingTime === 1 && isRecording) {
      setTimeout(() => {
        stopRecording();
        resetTimer();
      }, 1000); 
      
    }
  }, [remainingTime, isRecording]);

  // 볼륨에 따라 테두리 크기 조정 (5px ~ 20px)
  const borderSize = Math.min(25, Math.max(5, audioLevel / 10));

  // 녹음 시작 핸들러
  const handleStartRecording = () => {
    if(isRecording || isStartRecordFirst) return;
    setElapsedTime(0);  // 경과 시간 초기화
    setShowButtons(true);  // 하단 버튼 표시

    if(selectedTime){
      startTimer(selectedTime);
    }else{
      startTimer(null);  // 타이머 시작
    }

    startRecording();  // 녹음 시작
    
  };

  // 초기화 핸들러
  const handleReset = () => {
    stopRecording();
    resetRecording();
    
    // 타이머의 선택된 시간을 유지하고 남은 시간만 초기화
    if (selectedTime !== null) {
      startTimer(selectedTime);  // 초기 설정된 시간으로 다시 시작
    } else {
      resetTimer();  // 타이머 완전히 초기화
    }

    setElapsedTime(0);  // 경과 시간 초기화
    setShowButtons(false);  // 하단 버튼 숨기기
  };

  // detail 질문 창으로 돌아가기 버튼
  const handleGoBackDetailPage = () =>{
    const isConfirmed = confirm("녹음된 내용이 모두 저장되지 않습니다. 그래도 돌아가시겠습니까?");
    if(isConfirmed){
      handleReset();
      exitRecordingMode(); // 질문 직접 입력 창으로 돌아가기
    }
  }

  // 서버로 녹음 파일 데이터 전송 버튼
  const uploadRecording = (mediaBlob: Blob) => {
    if(mediaBlob){
      // const formData = new FormData();
      // formData.append('audio', mediaBlob);
      dispatch(sendVoiceRecording(mediaBlob));
    }
      // fetch(mediaBlob)
      //   .then((response) => response.blob())
      //   .then((blob) => {
      //     dispatch(sendVoiceRecording(blob));  // 녹음 데이터 서버로 전송
      //   });
    // }
  }

  const handleSubmitRecording = (mediaBlob: Blob | undefined) => {
    if(!mediaBlob) return;
    // const blobUrl = URL.createObjectURL(mediaBlob);
    uploadRecording(mediaBlob);
    exitRecordingMode();
  }

  return (
    <div className="record-view-container">
      <div className="go-back-btn-container">
        <div className="go-back-btn" onClick={handleGoBackDetailPage}>
          <RiArrowGoBackLine className="go-back-icon" />
          돌아가기        
        </div>
      </div>

      <p className="record-view-title">{content}</p>

      <h3 className="record-view-timer">
        {selectedTime && remainingTime !== null ? formatTime(remainingTime) : formatTime(elapsedTime)}
      </h3>

      {/* 녹음 시작 버튼 */}
      {mediaBlob === undefined ?
      <div className="record-start-div record-div">
        <div className="record-start-btn"
        style={{
          border: `2px solid #D9E9FF`,
          borderRadius: "50%",
          padding: "10px",
          transition: "border-width 0.1s ease-in-out",  // 부드러운 애니메이션 효과
          boxShadow: isRecording
          ? `0 0 ${borderSize * 7}px ${borderSize}px rgb(217, 233, 255)`
          : 'none',
        }}
        onClick={handleStartRecording}>
          🎙️ 
        </div>
        <div className="record-start-text">녹음 시작</div>
      </div> : (
      mediaBlob !== undefined && (<div className="record-div audio-bar" >
        <audio controls src={URL.createObjectURL(mediaBlob)} />
      </div>)
    )}

      {/* 녹음 중일 때만 표시되는 버튼 */}
      {showButtons && (
        <div className="record-view-buttons">
          <div className="reset-btn-div">
            <button className="record-btn reset-btn" onClick={handleReset}>
              <RiResetRightLine />
            </button>
            <div className="reset-btn-text">초기화</div>
          </div>
          <div className="toggle-btn-div">
            <button
              className="record-btn toggle-btn"
              onClick={togglePauseResume}
              disabled={isRecordingStopped}  // 녹음 종료 시 비활성화
            >
              {isPaused? <FaPlay color="#00518D" /> : <IoIosPause color="red" />}
            </button>
            <div className="toggle-btn-text">{isPaused ? "재생" : "일시정지"}</div>
          </div>
          <div className="stop-btn-div">
          <button
              className="record-btn stop-btn"
              onClick={stopRecording}
              disabled={isRecordingStopped}  // 녹음 종료 시 비활성화
            >
              <IoStop />
            </button>
            <div className="stop-btn-text">종료</div>
          </div>
        </div>
      )}

      {/* 녹음 종료 후 오디오 재생 */}
      {mediaBlob!==undefined && (
        <div className="after-recording-div">
          <div className="recorded-audio-section" onClick={() => handleSubmitRecording(mediaBlob)}>
            제출하기
          </div>
        </div>
      )}
    </div>
  );
};

export default RecordView;
