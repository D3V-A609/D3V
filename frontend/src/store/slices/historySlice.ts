import { createSlice } from '@reduxjs/toolkit';
import { fetchHistory, fetchTodayStreak } from '../actions/historyActions';

const MAX_HISTORY_USERS = 30; // ✅ 최대 30명의 사용자의 데이터만 저장 (LRU 캐시 방식 적용)
const CACHE_EXPIRY_TIME = 1000 * 60 * 60 * 2; // ✅ 최대 2시간 동안만 사용자 데이터 저장 (TTL 적용)

export interface HistoryState {
  uploading: boolean;
  uploadSuccess: boolean;
  error: string | null;
  todayStreak: number;
  history: { [memberId: number]: { data: AnswerHistory[]; lastUpdated: number } }; // ✅ 각 사용자별 `history` 데이터 + 마지막 업데이트 시간 저장
  streak: { [memberId: number]: number }; // ✅ 사용자별 streak (연속 풀이 일수)
}

export const initialState: HistoryState = {
  uploading: false,
  uploadSuccess: false,
  error: null,
  history: {},
  streak: {},
  todayStreak: 0
};

// ✅ streak 계산 함수 (연속 문제 풀이 일수 계산)
const calculateStreaks = (history: AnswerHistory[]): number => {
  if (!Array.isArray(history) || history.length === 0) return 0;

  // ✅ 문제를 푼 날만 필터링 (count > 0)
  const validHistory = history.filter(({ count }) => count > 0);
  if (validHistory.length === 0) return 0; // 풀이 기록이 없으면 streak = 0

  let currentStreak = 0;
  const todayTime = new Date().setHours(0, 0, 0, 0); // ✅ 오늘 날짜 (시간 초기화)

  // ✅ 최신 날짜부터 연속된 날짜를 확인 (오름차순 정렬 가정)
  for (let i = validHistory.length - 1; i >= 0; i--) {
    const currentDate = new Date(validHistory[i].date).getTime();
    const diffDays = (todayTime - currentDate) / (1000 * 60 * 60 * 24); // 날짜 차이 계산

    if (diffDays === currentStreak) {
      currentStreak++; // ✅ 하루 차이면 streak 증가
    } else {
      break; // ✅ 연속되지 않은 날짜가 나오면 종료
    }
  }

  return currentStreak;
};

const historySlice = createSlice({
  name: 'historys',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistory.pending, (state) => {
        state.uploading = true;
        state.uploadSuccess = false;
        state.error = null; // ✅ 요청 시작 시 로딩 상태로 변경
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        const history = action.payload;
        const memberId = action.meta.arg;
        const now = Date.now();

        // ✅ TTL 적용: 2시간이 지난 캐시된 데이터 삭제
        Object.entries(state.history).forEach(([id, data]) => {
          const cachedMemberId = Number(id);
          if (now - (data?.lastUpdated || 0) > CACHE_EXPIRY_TIME) {
            delete state.history[cachedMemberId];
            delete state.streak[cachedMemberId];
          }
        });

        // ✅ LRU 캐시 적용: 최대 저장 개수 초과 시 가장 오래된 데이터 삭제
        const historyEntries = Object.entries(state.history);
        if (historyEntries.length >= MAX_HISTORY_USERS) {
          const oldestEntry = historyEntries
            .map(([id, data]) => ({
              memberId: Number(id),
              lastUpdated: data.lastUpdated,
            }))
            .sort((a, b) => a.lastUpdated - b.lastUpdated)[0]; // ✅ 가장 오래된 데이터 찾기

          if (oldestEntry && historyEntries.length > MAX_HISTORY_USERS) {
            delete state.history[oldestEntry.memberId]; // ✅ 가장 오래된 사용자 데이터 삭제
            delete state.streak[oldestEntry.memberId];
          }
        }

        // ✅ 최신 데이터 저장
        state.history[memberId] = { data: history, lastUpdated: now };
        state.streak[memberId] = calculateStreaks(history); // ✅ streak 계산 후 저장
        state.uploading = false;
        state.uploadSuccess = true;
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.uploading = false;
        state.uploadSuccess = false;
        state.error = action.payload as string; // ✅ 요청 실패 시 에러 저장
      })

      .addCase(fetchTodayStreak.pending, (state) => {
        state.uploading=true;
        state.uploadSuccess = false;
        state.error = null;
      })
      .addCase(fetchTodayStreak.fulfilled, (state, action) => {
        state.uploading=false;
        state.uploadSuccess = true;
        state.todayStreak = action.payload as number;
        state.error = null;
      })
      .addCase(fetchTodayStreak.rejected, (state, action) => {
        state.uploading=false;
        state.uploadSuccess = false;
        state.error = action.payload as string;
      })

  },
});

export default historySlice.reducer;
