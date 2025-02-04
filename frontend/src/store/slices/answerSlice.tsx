import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { answerApi } from '../services/answerApi';

// type AnswerState = {
//   myAnswer: Answer | null;
//   otherAnswers: Answer[];
//   loading: boolean;
//   error: string | null;
//   // 추가한 부분
//   myAnswerArr: Answer[];
// };

interface AnswerState  {
  myAnswer: Answer | null;
  otherAnswers: Answer[];
  loading: boolean;
  error: string | null;
  // 추가한 부분
  myAnswerArr: Answer[];
};

const initialState: AnswerState = {
  myAnswer: null,
  otherAnswers: [],
  loading: false,
  error: null,
  // 추가한 부분
  myAnswerArr: []
};

export const fetchMyAnswer = createAsyncThunk(
  'answers/fetchMyAnswer',
  async (questionId: number, { rejectWithValue }) => {
    try {
      const response = await answerApi.getMyAnswer(questionId);
      return response;
    } catch (error) {
      console.error('내 답변 조회 실패:', error);
      return rejectWithValue('답변을 불러오는데 실패했습니다.');
    }
  }
);

export const fetchOtherAnswers = createAsyncThunk(
  'answers/fetchOtherAnswers',
  async (questionId: number, { rejectWithValue }) => {
    try {
      const response = await answerApi.getOtherAnswers(questionId);
      return response;
    } catch (error) {
      console.error('다른 답변들 조회 실패:', error);
      return rejectWithValue('답변들을 불러오는데 실패했습니다.');
    }
  }
);

// 추가한 부분
// 질문에 대한 내 모든 답변 불러오기
export const fetchAllMyAnswersByQID = createAsyncThunk(
  'answers/fetchMyAllAnswerByQID',
  async (questionId:number) => {
    const response = await answerApi.getMyAllAnswerByQId(questionId);
    return response.data;
  }
)

export const toggleLike = createAsyncThunk(
  'answers/toggleLike',
  async (answerId: number, { dispatch, getState }) => {
    const state = getState() as { answers: AnswerState };
    const answer = state.answers.otherAnswers.find(a => a.answerId === answerId);
    if (!answer) throw new Error('Answer not found');

    const response = answer.isLiked
      ? await answerApi.unlikeAnswer(answerId)
      : await answerApi.likeAnswer(answerId);
    
    dispatch(fetchOtherAnswers(response.questionId));
    return response;
  }
);

const answerSlice = createSlice({
  name: 'answers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyAnswer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyAnswer.fulfilled, (state, action) => {
        state.loading = false;
        state.myAnswer = action.payload || null;
        state.error = null;
      })
      .addCase(fetchMyAnswer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.myAnswer = null;
      })
      .addCase(fetchOtherAnswers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOtherAnswers.fulfilled, (state, action) => {
        state.loading = false;
        state.otherAnswers = action.payload || [];
        state.error = null;
      })
      .addCase(fetchOtherAnswers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.otherAnswers = [];
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        const updatedAnswer = action.payload;
        state.otherAnswers = state.otherAnswers.map(answer => 
          answer.answerId === updatedAnswer.answerId 
            ? { ...answer, like: updatedAnswer.like, isLiked: updatedAnswer.isLiked }
            : answer
        );
      }) // ;

      // 질문 상세 조회
      .addCase(fetchAllMyAnswersByQID.pending, (state) => { // 비동기 작업 시작
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllMyAnswersByQID.fulfilled, (state, action) => { // 비동기 작업 성공
        state.loading = false;
        state.myAnswerArr = action.payload;
      })
      .addCase(fetchAllMyAnswersByQID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '질문을 불러오는데 실패했습니다.';
      });
  },
});

export default answerSlice.reducer;