import React from 'react'
import FireFalse from '../../../assets/images/navbar/fire-false.png';
import FireTrue from '../../../assets/images/navbar/fire-false.png';
import { useAppSelector } from '../../../store/hooks/useRedux';
import SecureStorage from '../../../store/services/token/SecureStorage';

interface StreakProp {
  className?: string;
}
const Streak:React.FC<StreakProp> = ({className}) => {
  const memberId = Number(SecureStorage.getMemberId());
  const streak = useAppSelector((state) => state.historys.streak[memberId] || 0);

  return (
    <div className={`streak-container ${className}`}>
      <div className={`streak-img-div ${className}`}>
        {streak>0 ? 
        <img src={FireTrue} className='fire-img'  /> : 
        <img src={FireFalse} className='fire-img' />}
      </div>
      <div className={`streak-text-div ${className}`}>
        {streak>0 ?(
        <><div>핫 뜨거!</div><div> 연속 <span style={{ color: '#FF4C4C', fontWeight: 'bold' }}>{streak}</span>일 째 불꽃이 타오르고 있어요</div></>) : (
        <><div>불꽃이 잠시 꺼졌어요... </div><div>다시 점화해볼까요?🔥</div></>
      )}
      </div>
    </div>
  )
}

export default Streak;