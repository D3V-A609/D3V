import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { answerApi } from '../services/answerApi';

type AnswerState = {
  myAnswer: Answer | null;
  otherAnswers: Answer[];
  loading: boolean;
  error: string | null;
};

const initialState: AnswerState = {
  myAnswer: null,
  otherAnswers: [],
  loading: false,
  error: null
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
      });
  },
});

export default answerSlice.reducer;
