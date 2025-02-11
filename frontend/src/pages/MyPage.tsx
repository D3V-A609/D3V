import React from 'react';
import UserInfoComp from '../features/My/UserInfoComp';

import './MyPage.css'

const MyPage:React.FC = () => {
    const user = {
        nickName: '혜워니이이잉',
        job: 'Front-end',
        email: 'n417759@gmail.com',
        githubUri: 'github.com/D3V',
        following: 50,
        follower: 97
      }
    return (
    <div className='my-page-container'>
        <div className='my-detail-info-container'>
            <UserInfoComp user={user} />
        </div>
        <div className='my-bookmark-info-container'></div>
        <div className='my-answer-info-container'></div>
        <div className='my-learning-info-container'>
            <div className="my-streak"></div>
            <div className='my-answer-commu-activity'></div>
        </div>
        <div className='my-commu-info-container'></div>
    </div>)
}

export default MyPage;