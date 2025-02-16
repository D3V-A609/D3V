import React, { useEffect, useMemo, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks/useRedux';
import { shallowEqual } from 'react-redux';

import UserInfoComp from '../features/My/UserInfoComp';

import './MyPage.css'
import SectionContainer from '../components/MyPage/SectionContainer';

import { FaBookmark, FaBook } from "react-icons/fa";
import { BsRobot, BsPostcardHeart } from "react-icons/bs";
import { FcVoicePresentation } from "react-icons/fc";
import { IoCheckboxOutline } from "react-icons/io5";
import { CgCloseR } from "react-icons/cg";
import { FiThumbsUp } from "react-icons/fi";
import { GoComment } from "react-icons/go";
import ContentPreviewList from '../components/MyPage/ContentPreviewList';
import { fetchMyLastedQuestions } from '../store/actions/questionActions';
import { QuestionState } from '../store/slices/questionSlice';
import StreakHeatMap from '../features/My/StreakHeatMap/StreakHeatMap';
import { ArticleState } from '../store/slices/articleSlice';
import { fetchMyArticles, fetMyArticleComments } from '../store/actions/articleActions';
import SecureStorage from '../store/services/token/SecureStorage';
import { UserState } from '../store/slices/userSlice';
import { fetchUserInfo } from '../store/actions/userActions';
import { AnswerState } from '../store/slices/answerSlice';
import { fetchLikedAnswers, fetchMyFeedback } from '../store/actions/answerActions';
const MyPage:React.FC = () => {
    const dispatch = useAppDispatch();
    // const user = {
    // nickName: '혜워니이이잉',
    // job: 'Front-end',
    // email: 'n417759@gmail.com',
    // githubUri: 'github.com/D3V',
    // following: 50,
    // follower: 97
    // }

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
        post: <BsPostcardHeart size={28} color='#40C463' />,
        post_answer: <GoComment size={28} color='#40C463' />
    }), []);

    //========== 데이터 불러오기===========
    const { MySolvedQuestions, MyUnsolvedQuestions } = useAppSelector((state) => state.questions as QuestionState, shallowEqual)
    const { myArticles, myArticleComments } = useAppSelector((state) => state.articles as ArticleState, shallowEqual)
    const { likedAnswers, myFeedbacks } = useAppSelector((state) => state.answers as AnswerState, shallowEqual)

    const { me } = useAppSelector((state) => state.user as UserState)

    const memberId = SecureStorage.getMemberId();

    // ✅ API 중복 호출 방지
    const hasFetched = useRef(false);

    useEffect(() => {
        if(memberId !== null && !hasFetched.current){   
            hasFetched.current = true;
            Promise.all([
                // 답변(푼, 못푼) 로드
                dispatch(fetchMyLastedQuestions(true)),
                dispatch(fetchMyLastedQuestions(false)),
                
                // 내가 작성한 게시글/댓글
                dispatch(fetchMyArticles(memberId)),
                dispatch(fetMyArticleComments(memberId)),
                
                // 내가 추천 누른 답변 / 작성한 피드백
                dispatch(fetchLikedAnswers()),
                dispatch(fetchMyFeedback()),

                // 내 정보 불러오기
                dispatch(fetchUserInfo(null)),
            ]);
        }
    }, [dispatch, memberId])

    return (
    <div className='my-page-container'>
        <div className='my-detail-info-container'>
            <UserInfoCompMemo user={me} />
        </div>

        <SectionContainerMemo className='my-bookmark-info-container' title='북마크' icon={icons.bookMarkIcon}>하윙</SectionContainerMemo>

        <div className='my-answer-info-container'>
            <ContentPreviewListMemo contents={MySolvedQuestions} title='내가 답변한 질문' titleIcon={icons.checkbox} className='my-question-info'/>
            <ContentPreviewListMemo contents={MyUnsolvedQuestions} title='답변하지 못한 질문' titleIcon={icons.xbox} className='my-question-info' />
        </div>

        {/* <SectionContainerMemo className='my-ai-container' title='AI 면접 연습' icon={icons.AIIcon} /> */}

        <SectionContainerMemo className='my-learning-info-container' title='학습 활동' icon={icons.BookIcon}>
            <div className="my-streak">
                <StreakHeatMap />
            </div>
            <div className='my-answer-commu-activity'>
                <div className='my-answer-info-container'>
                    <ContentPreviewListMemo contents={likedAnswers} title='추천한 답변' titleIcon={icons.thumbup} className='my-question-info'/>
                    <ContentPreviewListMemo contents={myFeedbacks} title='나의 피드백' titleIcon={icons.goComment} className='my-question-info' />
                </div>
            </div>
        </SectionContainerMemo>

        <SectionContainerMemo className='my-commu-info-container' title='커뮤니티 활동' icon={icons.CommuIcon} >
            <ContentPreviewListMemo contents={myArticles} title='내 커뮤니티' titleIcon={icons.post} className='my-question-info'/>
            <ContentPreviewListMemo contents={myArticleComments} title='내 댓글' titleIcon={icons.post_answer} className='my-question-info' />
        </SectionContainerMemo>
    </div>)
}

export default MyPage;