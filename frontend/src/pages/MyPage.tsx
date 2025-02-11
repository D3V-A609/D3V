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
    return (<div className='my-page-container'>
        <UserInfoComp user={user} />
    </div>)
}

export default MyPage;