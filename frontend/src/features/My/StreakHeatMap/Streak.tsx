import React, { useEffect } from 'react'
import FireFalse from '../../../assets/images/navbar/fire-false.png';
import FireTrue from '../../../assets/images/navbar/fire-true.png';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/useRedux';
import SecureStorage from '../../../store/services/token/SecureStorage';
import { shallowEqual } from 'react-redux';
import { fetchTodayStreak } from '../../../store/actions/historyActions';

interface StreakProp {
  className?: string;
  memberId?: number;
}
const Streak:React.FC<StreakProp> = ({className, memberId}) => {
  const dispatch = useAppDispatch();
  memberId = memberId ? memberId : Number(SecureStorage.getMemberId());
  
  const todayStreak = useAppSelector((state) => state.historys.todayStreak[memberId], shallowEqual);
  const realStreak = Number(todayStreak)

  useEffect(() => {
    if(memberId){
      dispatch(fetchTodayStreak(memberId));
    }
  }, [dispatch, memberId])


  return (
    <div className={`streak-container ${className}`}>
      <div className={`streak-img-div ${className}`}>
        {realStreak>0 ? 
        <img src={FireTrue} className='fire-img'  loading="lazy"/> : 
        <img src={FireFalse} className='fire-img' loading="lazy"/>}
      </div>
      <div className={`streak-text-div ${className}`}>
        {realStreak>0 ?(
        <><div>핫 뜨거!</div><div> 연속 <span style={{ color: '#FF4C4C', fontWeight: 'bold' }}>{realStreak}</span>일 째</div><div> 타오르고 있어요</div></>) : (
        <><div>불꽃이 잠시 꺼졌어요... </div><div>다시 점화해볼까요?🔥</div></>
      )}
      </div>
    </div>
  )
}

export default Streak;