import React, { useState, useEffect } from "react";
import { CiMicrophoneOn } from "react-icons/ci";
import TimerSetting from "../Input/Timer/TimerSetting";
import SelectPublicBtn from "../../../../features/Answer/SelectPublicBtn";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks/useRedux";
import { registServedAnswer, registAnswer } from "../../../../store/actions/answerActions";
import { useRecordingContext } from "../../../../context/RecordingContext"
import { VoiceState } from "../../../../store/slices/voiceSlice";
import PageHeader from "../../../PageHeader/PageHeader";
import { BsChatSquareQuote } from "react-icons/bs";

interface AnswerInputCompProps {
  questionId: number;  // 질문 ID
  hasMyAnswers: boolean | undefined;  // 사용자가 이미 답변했는지 여부
  handleRegistAnswerSuccess: () => void;  // 답변 등록 성공 시 호출되는 콜백
}

const AnswerInputComp: React.FC<AnswerInputCompProps> = ({
  questionId,
  hasMyAnswers,
  handleRegistAnswerSuccess,
}) => {
  // 타이머 관련 상태 및 변수 관리
  const [showTimerDropdown, setShowTimerDropdown] = useState(false);  // 타이머 드롭다운 표시 여부

  // 답변 공개 범위 및 입력값 상태 관리
  const [selectedPublicOption, setPublicOption] = useState("PUBLIC");  // 답변 공개 범위
  const [isIDK, setIsIDK] = useState(false);  // '모르겠어요' 체크박스 상태
  const [answerContent, setAnswerText] = useState<string>("");  // 사용자가 입력한 답변 내용

  // 녹음 모드 관리
  const { enterRecordingMode } = useRecordingContext();

  // 녹음 후 변환된 텍스트 데이터
  const { speechToText } = useAppSelector((state) => state.voice as VoiceState);

  useEffect(() => {
    if (speechToText) {
      setAnswerText(speechToText);  // 서버 응답이 들어오면 answerContent에 반영
    }
  }, [speechToText]);

  // Redux의 dispatch 사용 설정
  const dispatch = useAppDispatch();

  // '모르겠어요' 체크박스 변경 핸들러
  const handleIDKBtnChange = () => {
    setIsIDK(!isIDK);
  };

  // 답변 공개 범위 옵션 변경 핸들러
  const handlePublicOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPublicOption(e.target.value);
  };

  // 답변 입력 값 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswerText(e.target.value);
  };

  // 답변 등록 버튼 클릭 시 실행되는 함수
  const handleRegistAnswer = async () => {
    let content = answerContent.trim();  // 공백 제거한 답변 내용

     // 🔹 '모르겠어요' 체크되었으면 마지막에 " IDK" 추가
     if (isIDK) {
      content = content ? `${content} IDK` : "IDK"; // 기존 답변이 있으면 붙이고, 없으면 "IDK"만 설정
    }

    // 서버에 전송할 답변 데이터 생성
    const answerPayload = {
      memberId: 3,  // 예제 멤버 ID (실제 코드에서는 동적 설정 필요)
      content: content,
      accessLevel: selectedPublicOption,
      questionId: questionId,
      isSolved: !isIDK,
    };

    // 풀었는지 여부를 서버에 전송하기 위한 데이터
    const solvedAnswerPayload = {
      memberId: 3,
      questionId: questionId,
      isSolved: !isIDK,
    };

    try {
      // 사용자가 첫 답변을 등록하는 경우, 추가 정보 전송
      if (hasMyAnswers !== undefined && !hasMyAnswers) {
        await dispatch(registServedAnswer(solvedAnswerPayload)).unwrap();
      }

      // 답변 데이터 서버에 전송
      await dispatch(registAnswer(answerPayload)).unwrap();
      
      // 성공적으로 답변이 등록된 경우 입력 필드를 초기화
      setAnswerText("");
      handleRegistAnswerSuccess();  // 성공 콜백 호출
    } catch (error) {
      alert("죄송합니다. 잠시 후 다시 시도해주세요.");
      console.error("답변 등록 시 에러:", error);
    }
  };

  // 타이머 드롭다운 표시/숨김 토글 함수
  const handleDropdownToggle = () => setShowTimerDropdown(!showTimerDropdown);

  return (
    <div className="answer-input-container">
      {/* <div className="answer-title">
        <span className="text-brackets">{"{"}</span> 답변하기 <span className="text-brackets">{"}"}</span>
      </div>
      <div className="answer-subtitle text-gray2">
        면접 질문에 대한 답변을 연습하고, 타이머와 음성 기능으로 실전처럼 준비해보세요!
      </div> */}

      <PageHeader 
        title="답변하기"
        description="면접 질문에 대한 답변을 연습하고, 타이머와 음성 기능으로 실전처럼 준비해보세요!"
        icon={<BsChatSquareQuote />}
        iconStyle="chat-quote"
      />


      <div className="anwer-input-container__input">
        <div className="answer-setting">
          {/* 공개 범위 선택 컴포넌트 */}
          <SelectPublicBtn selectedOption={selectedPublicOption} onChange={handlePublicOptionChange} />
          {/* 타이머 설정 컴포넌트 */}
          <TimerSetting
            showTimerDropdown={showTimerDropdown}
            handleDropdownToggle={handleDropdownToggle}
          />
        </div>
        <div className="answer-input">
          {/* 답변 입력 영역 */}
          <textarea
            className="answer-input-area"
            value={answerContent}
            onChange={handleInputChange}
            placeholder="답변을 입력해주세요."
          />
        </div>
        <div className="answer-submit">
          {/* 음성 입력 버튼 */}
          <div className="answer-voice" onClick={enterRecordingMode}>
            <CiMicrophoneOn className="voice-icon" />
            <div>음성으로 입력하기</div>
          </div>
          <div className="btn-answer-submit-group">
            {/* '모르겠어요' 체크박스 */}
            <div className="checkbox-IDK">
              <input type="checkbox" id="idk" checked={isIDK} onChange={handleIDKBtnChange} />
              <label htmlFor="idk">모르겠어요</label>
            </div>
            {/* 답변 저장 버튼 */}
            <div className="btn-submit" onClick={handleRegistAnswer}>
              저장하기
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerInputComp;
