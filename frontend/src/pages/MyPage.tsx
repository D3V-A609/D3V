import React, { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks/useRedux';
import { shallowEqual } from 'react-redux';

import UserInfoComp from '../features/My/UserInfoComp';

import './MyPage.css'
import SectionContainer from '../components/MyPage/SectionContainer';

import { FaBookmark, FaBook } from "react-icons/fa";
import { BsRobot } from "react-icons/bs";
import { FcVoicePresentation } from "react-icons/fc";
import { IoCheckboxOutline } from "react-icons/io5";
import { CgCloseR } from "react-icons/cg";
import { FiThumbsUp } from "react-icons/fi";
import { GoComment } from "react-icons/go";
import ContentPreviewList from '../components/MyPage/ContentPreviewList';
import { fetchMyLastedQuestions } from '../store/actions/questionActions';
import { QuestionState } from '../store/slices/questionSlice';
const MyPage:React.FC = () => {
    const dispatch = useAppDispatch();
    const user = {
    nickName: '혜워니이이잉',
    job: 'Front-end',
    email: 'n417759@gmail.com',
    githubUri: 'github.com/D3V',
    following: 50,
    follower: 97
    }

    const UserInfoCompMemo = React.memo(UserInfoComp);
    const SectionContainerMemo = React.memo(SectionContainer);
    const ContentPreviewListMemo = React.memo(ContentPreviewList);


    // ===== icon ======
    const icons = useMemo(() => ({
        bookMarkIcon: <FaBookmark size={24} color="#0072EF" />,
        AIIcon: <BsRobot size={24} color='#00518D' />,
        BookIcon: <FaBook size={24} color='#8B4513' />,
        CommuIcon: <FcVoicePresentation size={28} />,
        checkbox: <IoCheckboxOutline size={28} color='#40C463' />,
        xbox: <CgCloseR size={28} color='#FF4C4C' />,
        thumbup: <FiThumbsUp size={28} color='#0072EF' />,
        goComment: <GoComment size={28} color='#0072EF' />,
    }), []);

    //========== 데이터 불러오기===========
    const { MySolvedQuestions, MyUnsolvedQuestions } = useAppSelector((state) => state.questions as QuestionState, shallowEqual)

    useEffect(() => {
    Promise.all([
        // 답변(푼, 못푼) 로드
        dispatch(fetchMyLastedQuestions(true)),
        dispatch(fetchMyLastedQuestions(false)),
    ]);
    }, [dispatch])

    return (
    <div className='my-page-container'>
        <div className='my-detail-info-container'>
            <UserInfoCompMemo user={user} />
        </div>

        <SectionContainerMemo className='my-bookmark-info-container' title='북마크' icon={icons.bookMarkIcon}>하윙</SectionContainerMemo>

        <div className='my-answer-info-container'>
            <ContentPreviewListMemo contents={MySolvedQuestions} title='내가 답변한 질문' titleIcon={icons.checkbox} className='my-question-info'/>
            <ContentPreviewListMemo contents={MyUnsolvedQuestions} title='답변하지 못한 질문' titleIcon={icons.xbox} className='my-question-info' />
        </div>

        {/* <SectionContainerMemo className='my-ai-container' title='AI 면접 연습' icon={icons.AIIcon} /> */}

        <SectionContainerMemo className='my-learning-info-container' title='학습 활동' icon={icons.BookIcon}>
            <div className="my-streak"></div>
            <div className='my-answer-commu-activity'>
                <div className='my-answer-info-container'>
                    <ContentPreviewListMemo contents={MySolvedQuestions} title='추천한 답변' titleIcon={icons.thumbup} className='my-question-info'/>
                    <ContentPreviewListMemo contents={MyUnsolvedQuestions} title='댓글' titleIcon={icons.goComment} className='my-question-info' />
                </div>
            </div>
        </SectionContainerMemo>

        <SectionContainerMemo className='my-commu-info-container' title='커뮤니티 활동' icon={icons.CommuIcon} ></SectionContainerMemo>
    </div>)
}

export default MyPage;