import React, {useEffect, useState} from 'react'
import HeatMap from './HeatMap';
import './StreakHeatMap.css'

import { useAppDispatch, useAppSelector } from '../../../store/hooks/useRedux';
import { fetchHistory } from '../../../store/actions/historyActions';
import Streak from './Streak';
import { shallowEqual } from 'react-redux';
import SecureStorage from '../../../store/services/token/SecureStorage';

interface StreakHeatMapProp {
  memberId: number | undefined;
}

const StreakHeatMap: React.FC<StreakHeatMapProp> = ({memberId}) => {
  memberId = memberId? memberId : Number(SecureStorage.getMemberId());
  const dispatch = useAppDispatch();

  const history = useAppSelector((state) => state.historys.history[memberId], shallowEqual);
  const uploading = useAppSelector((state) => state.historys.uploading)

  const [hasFetched, setHasFetched] = useState(false); // API 요청 중복 실행 방지지

  useEffect(() => {
    if(!uploading && !hasFetched){
      dispatch(fetchHistory(memberId));
      setHasFetched(true);
    }
  }, [dispatch, memberId, uploading])  

  // memberId가 변경될 때 Redux 상태 초기화
  useEffect(() => {
    setHasFetched(false); // 새로운 사용자일 경우 다시 데이터를 불러오도록 변경
  }, [memberId]);

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