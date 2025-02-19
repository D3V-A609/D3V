import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import { fetchMyArticles, fetchMyArticleComments } from '../store/actions/articleActions';
import SecureStorage from '../store/services/token/SecureStorage';
import { UserState } from '../store/slices/userSlice';
import { fetchUserFollowers, fetchUserFollowings, fetchUserInfo, follow, unFollow } from '../store/actions/userActions';
import { AnswerState } from '../store/slices/answerSlice';
import { fetchLikedAnswers, fetchMyFeedback } from '../store/actions/answerActions';
import { useNavigate } from 'react-router-dom';
import ContentMoreListView from '../components/MyPage/ContentMoreListView';
import FollowModalView from '../components/MyPage/FollowModalView';
import { moveToAllQuesitons } from '../utils/navigation';
import { fetchAllBookmarks } from '../store/actions/bookmarkActions';
import BookmarkSlider from '../components/MyPage/BookmarkSlider';
import BookmarkDetailModal from '../components/Bookmark/BookmarkDetailModal';

const MyPage:React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const UserInfoCompMemo = React.memo(UserInfoComp);
    const SectionContainerMemo = React.memo(SectionContainer);
    const ContentPreviewListMemo = React.memo(ContentPreviewList);

    // ===== icon ======
    const icons = {
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
    };
    

    //========== 데이터 불러오기===========
    const { MySolvedQuestions, MyUnsolvedQuestions } = useAppSelector((state) => state.questions as QuestionState, shallowEqual)
    const { myArticles, myArticleComments } = useAppSelector((state) => state.articles as ArticleState, shallowEqual)
    const { likedAnswers, myFeedbacks } = useAppSelector((state) => state.answers as AnswerState, shallowEqual)

    const { me } = useAppSelector((state) => state.user as UserState)

    // const { isAuthenticated } = useAppSelector((state) => state.auth, shallowEqual);

    const memberId = SecureStorage.getMemberId();

    const { bookmarks } = useAppSelector((state) => state.bookmarks, shallowEqual);
    const [selectedBookmarkId, setSelectedBookmarkId] = useState<number | null>(null);

    // API 중복 호출 방지
    const hasFetched = useRef(false);
    useEffect(() => {
        if(memberId !== null && memberId !== 0 && !hasFetched.current){   
            hasFetched.current = true;
            Promise.all([
                // 답변(푼, 못푼) 로드
                dispatch(fetchMyLastedQuestions({isSolved: true, memberId: memberId})),
                dispatch(fetchMyLastedQuestions({isSolved: false, memberId: memberId})),
                
                // 내가 작성한 게시글/댓글
                dispatch(fetchMyArticles(memberId)),
                dispatch(fetchMyArticleComments(memberId)),
                
                // 내가 추천 누른 답변 / 작성한 피드백
                dispatch(fetchLikedAnswers()),
                dispatch(fetchMyFeedback()),

                // 내 정보 불러오기
                dispatch(fetchUserInfo(memberId)),

                // 내 팔로워, 팔로잉 목록 불러오기
                dispatch(fetchUserFollowers(memberId)),
                dispatch(fetchUserFollowings(memberId)),

                // 북마크 불러오기
                dispatch(fetchAllBookmarks(memberId)),
            ]);
        }
    }, [dispatch, memberId])
    
    // === 모달 관련
    const [isOpenMoreModal, setIsOpenMoreModal] = useState(false);
    const [modalData, setModalData] = useState<{ title: string; titleIcon?: JSX.Element; contents: string[] | ArticleComment[] | ArticleItem[] | Answer[] | Feedback[]; handleDetail:string }>({
        title: '',
        titleIcon: undefined,
        contents: [],
        handleDetail: '',
    });

    // 모달 열기
    const openModal = useCallback(
        (title: string, titleIcon: JSX.Element, contents: string[] | ArticleComment[] | ArticleItem[] | Answer[] | Feedback[], handleDetail: string) => {
            setModalData(prev => ({
                ...prev,
                title,
                titleIcon,
                contents,
                handleDetail
            }));
            setIsOpenMoreModal(true);
        },
        []
    );

    // 모달 닫기
    const closeModal = () => { setIsOpenMoreModal(false); }

    // === 팔로워/팔로잉 모달 열기 
    const [isFollowModalOpen, setIsFollowModalOpen ] = useState(false);
    const [FollowMode, setFollowMode] = useState("follower")

    const { followings, followers } = useAppSelector((state) => state.user, shallowEqual)

    const openFollowModal = (mode: string) => { 
        setFollowMode(mode);
        setIsFollowModalOpen(true)
    };

    const onUnfollow = (memberId: number) => {
        dispatch(unFollow(memberId));
    }
    
    const onFollow = (memberId: number) => {
        dispatch(follow(memberId));
    }

    useEffect(()=>{
        dispatch(fetchUserInfo(Number(memberId)));
    }, [followings, followers])

    return (
    <div className='my-page-container'>
        <div className='my-detail-info-container'>
            <UserInfoCompMemo user={me} openFollowModal={openFollowModal} />
        </div>

        <SectionContainerMemo className='my-bookmark-info-container' title='북마크' icon={icons.bookMarkIcon}>
            {bookmarks.length > 0 ? (
            <BookmarkSlider
                bookmarks={bookmarks}
                onViewDetails={(bookmarkId: number) => setSelectedBookmarkId(bookmarkId)}
            />
            ) : (
            <p>북마크가 없습니다.</p>
            )}
        </SectionContainerMemo>

        <div className='my-answer-info-container'>
            <ContentPreviewListMemo contents={MySolvedQuestions} title='내가 답변한 질문' titleIcon={icons.checkbox} className='my-question-info' handleDetail='answer-detail' handleMoreBtn={() => moveToAllQuesitons(navigate, true)}/>
            <ContentPreviewListMemo contents={MyUnsolvedQuestions} title='답변하지 못한 질문' titleIcon={icons.xbox} className='my-question-info' handleDetail='answer-detail' handleMoreBtn={() => moveToAllQuesitons(navigate, false)}/>
        </div>
        
        <SectionContainerMemo className='my-learning-info-container' title='학습 활동' icon={icons.BookIcon}>
            <div className="my-streak">
                <StreakHeatMap />
            </div>
            <div className='my-answer-commu-activity'>
                <div className='my-answer-info-container'>
                    <ContentPreviewListMemo contents={likedAnswers} title='추천한 답변' titleIcon={icons.thumbup} className='my-question-info' handleDetail='answer-commu' handleMoreBtn={() => openModal('추천한 답변', icons.thumbup, likedAnswers, 'answer-commu')}/>
                    <ContentPreviewListMemo contents={myFeedbacks} title='나의 피드백' titleIcon={icons.goComment} className='my-question-info'handleDetail='answer-commu' handleMoreBtn={() => openModal('나의 피드백', icons.goComment, myFeedbacks, 'answer-commu')} />
                </div>
            </div>
        </SectionContainerMemo>

        <SectionContainerMemo className='my-commu-info-container' title='커뮤니티 활동' icon={icons.CommuIcon} >
            <ContentPreviewListMemo contents={myArticles} title='내 커뮤니티' titleIcon={icons.post} className='my-question-info' handleDetail='article' handleMoreBtn={() => openModal('내 커뮤니티', icons.post, myArticles, 'article')} />
            <ContentPreviewListMemo contents={myArticleComments} title='내 댓글' titleIcon={icons.post_answer} className='my-question-info' handleDetail='article' handleMoreBtn={() => openModal('내 댓글', icons.post_answer, myArticleComments, 'acticle')} />
        </SectionContainerMemo>

        {/* 모달 렌더링 */}
        {isOpenMoreModal && <ContentMoreListView title={modalData.title} titleIcon={modalData.titleIcon} contents={modalData.contents} onClose={closeModal} handleDetail={modalData.handleDetail} />}  
        {isFollowModalOpen && <FollowModalView mode={FollowMode} onClose={() => setIsFollowModalOpen(false)} onUnfollow={onUnfollow} onFollow={onFollow} memberId={null} />}
        {/* BookmarkDetailModal 렌더링 */}
        {selectedBookmarkId && (
            <BookmarkDetailModal bookmarkId={selectedBookmarkId} onClose={closeModal} />
        )}
    </div>)
}



export default MyPage;