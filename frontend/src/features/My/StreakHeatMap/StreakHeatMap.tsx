import React, {useEffect} from 'react'
import HeatMap from './HeatMap';
import './StreakHeatMap.css'

import { useAppDispatch, useAppSelector } from '../../../store/hooks/useRedux';
// import { HistoryState } from '../../../store/slices/historySlice';
import { fetchHistory } from '../../../store/actions/historyActions';
import Streak from './Streak';



const StreakHeatMap: React.FC = () => {
  const memberId = 3;
  const year = 2025;

  const dispatch = useAppDispatch();
  const { history = [] } = useAppSelector((state) => state.historys)

  useEffect(() => {
    dispatch(fetchHistory({memberId, year}));
  }, [dispatch, memberId, year])  

  // 전달받는 데이터 내에서 날짜 데이터 중복 핸들링
  const processData = (data: { date: string; count: number }[]): AnswerHistory[] => {
    const dateMap = new Map<string, number>();
    if(!Array.isArray(data)) return [];
    data.forEach(({ date, count }) => {
      dateMap.set(date, (dateMap.get(date) || 0) + count);
    });
    return Array.from(dateMap, ([date, count]) => ({ date, count }));
  };

  // streak 계산
  const calculateStreaks = (history: AnswerHistory[]): number => {
    if (!Array.isArray(history) || history.length === 0) return 0;
  
    // 1️⃣ 문제를 푼 날짜만 남김 (count > 0)
    const validHistory = history.filter(({ count }) => count > 0);
    if (validHistory.length === 0) return 0;
  
    let currentStreak = 0;
    const todayTime = new Date().setHours(0, 0, 0, 0); // 오늘 날짜 (00:00:00)
  
    // 2️⃣ 최신 날짜부터 거꾸로 탐색 (오름차순 정렬 상태)
    for (let i = validHistory.length - 1; i >= 0; i--) {
      const currentDate = new Date(validHistory[i].date).getTime();
  
      // 날짜 차이 계산
      const diffDays = (todayTime - currentDate) / (1000 * 60 * 60 * 24);
  
      if (diffDays === currentStreak) {
        currentStreak++; // 연속된 날짜면 streak 증가
      } else {
        break; // 연속이 끊기면 즉시 종료
      }
    }
  
    return currentStreak;
  }; 

  return(
    <div className='streak-heatmap-container'>
      <Streak streak={calculateStreaks(history)} />
      <HeatMap history={processData(history)} />
    </div>
  )
}

export default StreakHeatMap;