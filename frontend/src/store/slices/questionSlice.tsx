// store/slices/questionSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { fetchDailyQuestions, fetchQuestionById, fetchQuestions } from '../actions/questionActions';

// 질문 관련 상태 타입 정의
export interface QuestionState {
  questions: Question[];         // 일반 질문 목록
  dailyQuestions: Question[];    // 일일 질문 목록
  loading: boolean;              // 로딩 상태
  error: string | null;          // 에러 메시지
  selectedQuestionId: number | null;  // 선택된 질문 ID
  pagination: {                  // 페이지네이션 정보
    currentPage: number;         // 현재 페이지
    totalPages: number;          // 전체 페이지 수
    totalElements: number;       // 전체 항목 수
    size: number;               // 페이지당 항목 수
  };
}

// 초기 상태 정의
export const initialState: QuestionState = {
  questions: [],
  dailyQuestions: [],
  loading: false,
  error: null,
  selectedQuestionId: null,
  pagination: {
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    size: 15,
  },
};

// 질문 관련 리듀서 정의
const questionSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    // 선택된 질문 ID 설정
    setSelectedQuestionId: (state, action) => {
      state.selectedQuestionId = action.payload;
    },
    // 선택된 질문 ID 초기화
    clearSelectedQuestionId: (state) => {
      state.selectedQuestionId = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // 일반 질문 목록 조회 처리
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload.content;
        // 페이지네이션 정보 업데이트
        state.pagination = {
          currentPage: action.payload.number,
          totalPages: action.payload.totalPages,
          totalElements: action.payload.totalElements,
          size: action.payload.size,
        };
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '질문을 불러오는데 실패했습니다.';
      })

      // 일일 질문 조회 처리
      .addCase(fetchDailyQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDailyQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.dailyQuestions = action.payload;
      })
      .addCase(fetchDailyQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '일일 질문을 불러오는데 실패했습니다.';
      })

      // 개별 질문 조회 처리
      .addCase(fetchQuestionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestionById.fulfilled, (state, action) => {
        state.loading = false;
        state.questions[0] = action.payload;
      })
      .addCase(fetchQuestionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '질문을 불러오는데 실패했습니다.';
      })
  },
});

// 액션 생성자 내보내기
export const { setSelectedQuestionId, clearSelectedQuestionId } = questionSlice.actions;
export default questionSlice.reducer;
