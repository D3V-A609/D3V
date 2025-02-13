import React from 'react'
import FireFalse from '../../../assets/images/navbar/fire-false.png';
import FireTrue from '../../../assets/images/navbar/fire-false.png';

interface StreakProps {
  streak: number;
}
const Streak:React.FC<StreakProps> = ({streak}) => {
  return (
    <div className='streak-container'>
      <div className='streak-img-div'>
        {streak>0 ? 
        <img src={FireTrue} className='fire-img'  /> : 
        <img src={FireFalse} className='fire-img' />}
      </div>
      <div className='streak-text-div'>
        {streak>0 ?(
        <><div>핫 뜨거!</div><div> 연속 <span style={{ color: '#FF4C4C', fontWeight: 'bold' }}>{streak}</span>일 째 불꽃이 타오르고 있어요</div></>) : (
        <><div>불꽃이 잠시 꺼졌어요... </div><div>다시 점화해볼까요? 🔥</div></>
      )}
      </div>
    </div>
  )
}

export default Streak;