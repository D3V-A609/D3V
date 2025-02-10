// store/slices/questionSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchQuestions, fetchDailyQuestions, fetchQuestionById } from '../actions/questionActions';

// 질문 상태에 대한 타입 정의
export interface QuestionState {
  question: Question | null;
  questions: DailyQuestions;          // 전체 질문 목록
  dailyQuestions: Question[];         // 일일 질문 목록
  selectedQuestionId: number | null;  // 현재 선택된 질문의 ID
  loading: boolean;                   // 로딩 상태
  error: string | null;               // 에러 메시지
  pagination: {                       // 페이지네이션 정보
    totalElements: number;            // 전체 질문 수
    totalPages: number;              // 전체 페이지 수
    currentPage: number;             // 현재 페이지 번호
    size: number;                    // 페이지당 질문 수
  };
}

// 초기 상태 값 설정
export const initialState: QuestionState = {
  question: null,
  questions: [],                      // 빈 질문 목록으로 초기화
  dailyQuestions: [],                // 빈 일일 질문 목록으로 초기화
  selectedQuestionId: null,          // 선택된 질문 없음
  loading: false,                    // 초기 로딩 상태 false
  error: null,                       // 초기 에러 없음
  pagination: {
    totalElements: 0,
    totalPages: 0,
    currentPage: 0,
    size: 15,                        // 기본 페이지 크기 15
  },
};



// Redux Slice 정의
const questionSlice = createSlice({
  name: 'questions',                  // slice 이름
  initialState,
  reducers: {
    // 질문 ID 선택 액션
    setSelectedQuestionId: (state, action) => {
      state.selectedQuestionId = action.payload;
    },
    // 선택된 질문 ID 초기화 액션
    clearSelectedQuestionId: (state) => {
      state.selectedQuestionId = null;
    },
    // 에러 상태 초기화 액션
    clearError: (state) => {
      state.error = null;
    },
  },
  // 비동기 액션에 대한 리듀서
  extraReducers: (builder) => {
    builder
      // 전체 질문 목록 조회
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;         // 로딩 시작
        state.error = null;           // 에러 초기화
      })
      .addCase(fetchQuestions.fulfilled, (state, action: PayloadAction<QuestionResponse>) => {
        state.loading = false;        // 로딩 완료
        state.questions = action.payload.content;  // 질문 목록 업데이트
        // 페이지네이션 정보 업데이트
        state.pagination = {
          totalElements: action.payload.totalElements,
          totalPages: action.payload.totalPages,
          currentPage: action.payload.number,
          size: action.payload.size,
        };
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;        // 로딩 완료
        state.error = action.error.message || '질문 목록을 불러오는데 실패했습니다.';
      })
      // 일일 질문 조회
      .addCase(fetchDailyQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDailyQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.dailyQuestions = action.payload;  // 일일 질문 목록 업데이트
      })
      .addCase(fetchDailyQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '일일 질문을 불러오는데 실패했습니다.';
      })
      // 개별 질문 조회
      .addCase(fetchQuestionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestionById.fulfilled, (state, action) => {
        state.loading = false;
        state.question = action.payload;  // 개별 질문 정보 업데이트
      })
      .addCase(fetchQuestionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '질문을 불러오는데 실패했습니다.';
      })
  },
});

// 액션 생성자 내보내기
export const { setSelectedQuestionId, clearSelectedQuestionId, clearError } = questionSlice.actions;

// 리듀서 내보내기
export default questionSlice.reducer;
