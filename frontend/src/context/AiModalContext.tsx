import React, { createContext, useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks/useRedux";
import { fetchMyAiFeedback } from "../store/actions/aiFeedbackActions";

interface AiModalContextType {
  isAiModalOpen: boolean;
  openAiModal: () => void;
  closeAiModal: () => void;
  selectAnswer: Answer | null;
  setSelectAnswer: (answer: Answer) => void;
  aifeedback: string;
}

const AiModalContext = createContext<AiModalContextType | undefined>(undefined);

export const AiModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const aiFeedbacks = useAppSelector(state => state.aifeedbacks.aifeedback)

  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [selectAnswer, setSelectAnswer] = useState<Answer | null>(null);

  const [aifeedback, setAiFeedback] = useState<string>("");

  const openAiModal = () => {
    setIsAiModalOpen(true);
  }
  const closeAiModal = () => {
    setSelectAnswer(null)
    setAiFeedback('');
    setIsAiModalOpen(false)
  };

  // selectAnswer 변경시마다 실행행
  useEffect(() => {
    if (selectAnswer !== null) {
      const feedback = aiFeedbacks[selectAnswer.answerId];

      if (typeof feedback === "string" && feedback.trim().length > 0) {
        // Redux 상태에 이미 데이터가 있으면, API 호출 없이 바로 할당
        setAiFeedback(feedback);
      } else {
        // Redux 상태에 데이터가 없으면, API 호출 후 상태 업데이트
        dispatch(fetchMyAiFeedback(selectAnswer));
      }
    }
  }, [dispatch, selectAnswer]);

  useEffect(() => {
    if(selectAnswer !== null ){
      const feedback = aiFeedbacks[selectAnswer.answerId];
      if(typeof feedback === "string" && feedback.trim().length > 0) {
        setAiFeedback(feedback)
      }
    }
  }, [aiFeedbacks, selectAnswer])

  return (
    <AiModalContext.Provider 
      value={{ 
        isAiModalOpen, 
        openAiModal, 
        closeAiModal, 
        selectAnswer, 
        setSelectAnswer, 
        aifeedback
      }}
    >
      {children}
    </AiModalContext.Provider>
  );
};

// Context를 쉽게 사용하기 위한 커스텀 훅
export const useAiModal = () => {
  const context = useContext(AiModalContext);
  if (!context) {
    throw new Error("useAiModal must be used within an AiModalProvider");
  }
  return context;
};
