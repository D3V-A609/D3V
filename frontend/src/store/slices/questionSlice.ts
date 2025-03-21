// store/slices/questionSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchQuestions, fetchDailyQuestions, fetchQuestionById, fetchTop10Questions, fetchMyLastedQuestions } from '../actions/questionActions';

// 질문 상태에 대한 타입 정의
export interface QuestionState {
  question: Question | null;
  questions: Question[];          // 전체 질문 목록
  dailyQuestions: Question[];         // 일일 질문 목록
  top10Questions: Question[];         // Top 10 질문 목록
  MySolvedQuestions: myQuestion[]; // 내 최신 푼 질문(for my page)
  MyUnsolvedQuestions: myQuestion[]; // 내 최신 못푼 질문(for my page)
  selectedQuestionId: number | null;  // 현재 선택된 질문의 ID
  loading: boolean;                   // 로딩 상태
  error: string | null;               // 에러 메시지
  pagination: {
    pageable: Pageable;
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    sort: PageInfo;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
  };
}

// 초기 상태 값 설정
export const initialState: QuestionState = {
  question: null,
  questions: [],                      // 빈 질문 목록으로 초기화
  dailyQuestions: [],                // 빈 일일 질문 목록으로 초기화
  top10Questions: [],                // 빈 Top 10 질문 목록으로 초기화
  MySolvedQuestions: [],          // 내 최신 푼 질문(for my page)
  MyUnsolvedQuestions: [],       // 내 최신 못푼 질문(for my page)
  selectedQuestionId: null,          // 선택된 질문 없음
  loading: false,                    // 초기 로딩 상태 false
  error: null,                       // 초기 에러 없음
  pagination: {
    pageable: {
      pageNumber: 0,
      pageSize: 15,
      sort: {
        empty: true,
        sorted: false,
        unsorted: true
      },
      offset: 0,
      paged: true,
      unpaged: false
    },
    last: false,
    totalElements: 0,
    totalPages: 0,
    size: 15,
    number: 0,
    sort: {
      empty: true,
      sorted: false,
      unsorted: true
    },
    first: true,
    numberOfElements: 0,
    empty: true
  }
};

// 질문 관련 리듀서 정의
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
          pageable: action.payload.pageable,
          last: action.payload.last,
          totalElements: action.payload.totalElements,
          totalPages: action.payload.totalPages,
          size: action.payload.size,
          number: action.payload.number,
          sort: action.payload.sort,
          first: action.payload.first,
          numberOfElements: action.payload.numberOfElements,
          empty: action.payload.empty
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

      // Top10 질문 조회 처리
      .addCase(fetchTop10Questions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTop10Questions.fulfilled, (state, action) => {
        state.loading = false;
        state.top10Questions = action.payload;
        state.error = null;
      })
      .addCase(fetchTop10Questions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'TOP 10 질문을 불러오는데 실패했습니다.';
        state.top10Questions = [];
      })

      // 최신 답변에 대한 질문 조회 처리(for my Page)
      .addCase(fetchMyLastedQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyLastedQuestions.fulfilled, (state, action) => {
        state.loading = false;
        const key = action.meta.arg.isSolved ? "MySolvedQuestions" : "MyUnsolvedQuestions";
        state[key] = action.payload;
        state.error = null;
      })
      .addCase(fetchMyLastedQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '내 최신 기록을 불러오는데 실패했습니다.';
        const key = action.meta.arg ? "MySolvedQuestions" : "MyUnsolvedQuestions";
        state[key] = [];
      })
  },
});

// 액션 생성자 내보내기
export const { setSelectedQuestionId, clearSelectedQuestionId, clearError } = questionSlice.actions;

// 리듀서 내보내기
export default questionSlice.reducer;
