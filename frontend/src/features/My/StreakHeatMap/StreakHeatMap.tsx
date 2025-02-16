import React, {useEffect, useRef} from 'react'
import HeatMap from './HeatMap';
import './StreakHeatMap.css'

import { useAppDispatch, useAppSelector } from '../../../store/hooks/useRedux';
import { fetchHistory } from '../../../store/actions/historyActions';
import Streak from './Streak';
import { shallowEqual } from 'react-redux';



const StreakHeatMap: React.FC = () => {
  const memberId = 3;
  const dispatch = useAppDispatch();

  const history = useAppSelector((state) => state.historys.history[memberId]?.data || [], shallowEqual);
  const uploading = useAppSelector((state) => state.historys.uploading)

  const hasFetched = useRef(false); // API 요청 중복 실행 방지지

  useEffect(() => {
    if(history.length === 0 && !uploading && !hasFetched.current){
      dispatch(fetchHistory(memberId));
    }
    hasFetched.current = true;
  }, [dispatch, memberId, history.length, uploading])  

  // 전달받는 데이터 내에서 날짜 데이터 중복 핸들링
  const processData = (data: { date: string; count: number }[]): AnswerHistory[] => {
    const dateMap = new Map<string, number>();
    if(!Array.isArray(data)) return [];
    data.forEach(({ date, count }) => {
      dateMap.set(date, (dateMap.get(date) || 0) + count);
    });
    return Array.from(dateMap, ([date, count]) => ({ date, count }));
  };

  return(
    <div className='streak-heatmap-container'>
      <Streak />
      <HeatMap history={processData(history)} />
    </div>
  )
}

export default StreakHeatMap;