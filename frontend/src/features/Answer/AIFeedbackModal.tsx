import React from 'react';
import "./AIFeedbackModal.css";
import { useAiModal } from '../../context/AiModalContext';
import { useAppSelector } from '../../store/hooks/useRedux';
import AiLoading from '../../assets/images/ai-loading.gif'

interface AiProps {
  question: string
}

const AIFeedbackModal: React.FC<AiProps> = ({ question }) => {

  const { selectAnswer, closeAiModal, aifeedback } = useAiModal();
  const { loading } = useAppSelector(state => state.aifeedbacks);

  console.log("피드백", aifeedback);

  return(
  <div className='ai-feedback-modal-overlay' onClick={closeAiModal}>
    <div className='ai-feedback-content'>
      <div className='close-btn'>
        <span className='close' onClick={closeAiModal}>X</span>
      </div>
      <div className='ai-feedback-quesiton'>
        Q. {question}
      </div>
      <div className='ai-feedback-myanswer'>
        <span className='me'>A.</span>
        <span className='answer'>{selectAnswer !== null ? selectAnswer.content : ''}</span>
      </div>
      
        {!loading ? <div className='ai-feedback-text'>
          {/* <Markdown components={{
            h4: ({ children }) => {
              // 📌 "부족한 점"이 포함된 경우 `data-section="bad"` 속성 추가
              const text = String(children);
              const isBadSection = text.includes("부족한 점");
              return <h4 className="feedback-heading" data-section={isBadSection ? "bad" : undefined}>{children}</h4>;
            },  
                      
          }}>{aifeedback}</Markdown> */}
          <h4 className='ai-feedback-title'>잘한 점 👍</h4>
          {aifeedback !== null && aifeedback?.good && aifeedback.good.length > 0 ? (
            <ul>
              {aifeedback.good.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          ) : (
            <p className='p'>조금만 더 노력해봅시다!📣</p>
          )}

          <h4 className='ai-feedback-title' data-section="bad">부족한 점 ⚠️</h4>
          {aifeedback !== null && aifeedback?.bad && aifeedback.bad.length > 0 ? (
            <ul>
              {aifeedback.bad.map((g) => (
                <li key={g} >{g}</li>
              ))}
            </ul>
          ) : (
            <p className='p'>아주 훌륭해요!😊</p>
          )}

          <h4 className='ai-feedback-title'>피드백을 반영한 추천 답안 📜</h4>
          {aifeedback !== null && aifeedback?.feedback && aifeedback.feedback.length > 0 && (
            aifeedback.feedback.map((g) => (
              <p className='p' key={g}>{g}</p>
            ))
          )}

          </div> :
          <div className='ai-loading-div'>
            <div className='gif'>
              <img src={AiLoading} />
            </div>
            <div className='text'>AI 면접관이 채점 중이에요!</div>
          </div>}
    </div>
  </div>)
}

export default AIFeedbackModal;