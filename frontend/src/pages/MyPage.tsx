import React from 'react';
import UserInfoComp from '../features/My/UserInfoComp';

import './MyPage.css'
import SectionContainer from '../components/MyPage/SectionContainer';

import { FaBookmark, FaBook } from "react-icons/fa";
import { BsRobot } from "react-icons/bs";
import { FcVoicePresentation } from "react-icons/fc";
const MyPage:React.FC = () => {
    const user = {
        nickName: '혜워니이이잉',
        job: 'Front-end',
        email: 'n417759@gmail.com',
        githubUri: 'github.com/D3V',
        following: 50,
        follower: 97
      }

      const bookMarkIcon = <FaBookmark size={24} color="#0072EF" />;
      const AIIcon = <BsRobot size={24} color='#00518D' />;
      const BookIcon = <FaBook size={24} color='#8B4513' />;
      const CommuIcon = <FcVoicePresentation size={28} />
    return (
    <div className='my-page-container'>
        <div className='my-detail-info-container'>
            <UserInfoComp user={user} />
        </div>

        <SectionContainer className='my-bookmark-info-container' title='북마크' icon={bookMarkIcon}>하윙</SectionContainer>

        <div className='my-answer-info-container'></div>

        <SectionContainer className='my-ai-container' title='AI 면접 연습' icon={AIIcon}></SectionContainer>

        <SectionContainer className='my-learning-info-container' title='학습 활동' icon={BookIcon}>
            <div className="my-streak"></div>
            <div className='my-answer-commu-activity'></div>
        </SectionContainer>

        <SectionContainer className='my-commu-info-container' title='커뮤니티 활동' icon={CommuIcon} />


        
        {/* <div className='my-bookmark-info-container'></div> */}
        {/* <div className='my-answer-info-container'></div> */}
        {/* <div className='my-learning-info-container'>
            <div className="my-streak"></div>
            <div className='my-answer-commu-activity'></div>
        </div> */}
        <div className='my-commu-info-container'></div>
    </div>)
}

export default MyPage;