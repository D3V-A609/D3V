import React, { useCallback, useEffect, useRef, useState } from 'react';
import "./OtherPage.css"
import { useAppDispatch, useAppSelector } from '../store/hooks/useRedux';
import { useNavigate, useParams } from 'react-router-dom';
import ContentMoreListView from '../components/MyPage/ContentMoreListView';
import FollowModalView from '../components/MyPage/FollowModalView';
import StreakHeatMap from '../features/My/StreakHeatMap/StreakHeatMap';
import { shallowEqual } from 'react-redux';
import { fetchUserFollowers, fetchUserFollowings, fetchUserInfo, unFollow } from '../store/actions/userActions';
import { BsPostcardHeart } from 'react-icons/bs';
import { FaBookmark, FaBook } from 'react-icons/fa';
import { FcVoicePresentation } from 'react-icons/fc';
import { GoComment } from 'react-icons/go';
import { IoCheckboxOutline } from 'react-icons/io5';
import ContentPreviewList from '../components/MyPage/ContentPreviewList';
import SectionContainer from '../components/MyPage/SectionContainer';
import UserInfoComp from '../features/My/UserInfoComp';
import { QuestionState } from '../store/slices/questionSlice';
import { ArticleState } from '../store/slices/articleSlice';
import { fetchMyArticles, fetchMyArticleComments } from '../store/actions/articleActions';
import { fetchMyLastedQuestions } from '../store/actions/questionActions';
import { UserState } from '../store/slices/userSlice';


const OtherPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  let memberId: unknown;
  try{
    memberId = atob(id || ''); 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch(_error){
    alert('잘못된 접근입니다.')
    navigate(-1);
  }

  const { other } = useAppSelector((state) => state.user as UserState, shallowEqual)
  const { MySolvedQuestions } = useAppSelector((state) => state.questions as QuestionState, shallowEqual)
  const { myArticles, myArticleComments } = useAppSelector((state) => state.articles as ArticleState, shallowEqual)

  // API 중복 호출 방지
  const hasFetched = useRef(false);

  useEffect(() => {
    if(memberId !== null && memberId !== undefined && !hasFetched.current){   
      hasFetched.current = true;
      Promise.all([
        // 사용자가 푼 답변 로드
        dispatch(fetchMyLastedQuestions(true)), // 바꿔야 함
        
        // 사용자가 작성한 게시글/댓글
        dispatch(fetchMyArticles(Number(memberId))),
        dispatch(fetchMyArticleComments(Number(memberId))),

        // 사용자 정보 불러오기
        dispatch(fetchUserInfo(Number(memberId))),

        // 사용자의 팔로워, 팔로잉 목록 불러오기
        dispatch(fetchUserFollowers(Number(memberId))),
        dispatch(fetchUserFollowings(Number(memberId))),
      ]);
    }
  }, [])



  // === 모달 관련(커뮤니티 더보기 모달) ===
  const [isOpenMoreModal, setIsOpenMoreModal] = useState(false);
  const [modalData, setModalData] = useState<{ title: string; titleIcon?: JSX.Element; contents: string[] | myQuestion[] | ArticleComment[] | ArticleItem[] | Answer[] | Feedback[]; handleDetail:string }>({
      title: '',
      titleIcon: undefined,
      contents: [],
      handleDetail: '',
  });
  const openModal = useCallback( // 모달 열기
    (title: string, titleIcon: JSX.Element, contents: string[] | myQuestion[] | ArticleComment[] | ArticleItem[] | Answer[] | Feedback[], handleDetail: string) => {
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
  const closeModal = () => { setIsOpenMoreModal(false); } // 모달 닫기

  // === 팔로잉/언팔로잉 ===
  const [isFollowModalOpen, setIsFollowModalOpen ] = useState(false); // 팔로워/팔로잉 모달 열기 
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
    dispatch(unFollow(memberId));
  }  

  useEffect(()=>{
    dispatch(fetchUserInfo(Number(memberId)));
  }, [followings, followers])

  // ===== icon ======
  const icons = {
      bookMarkIcon: <FaBookmark size={24} color="#0072EF" />,
      BookIcon: <FaBook size={24} color='#8B4513' />,
      CommuIcon: <FcVoicePresentation size={28} />,
      checkbox: <IoCheckboxOutline size={28} color='#40C463' />,
      post: <BsPostcardHeart size={28} color='#40C463' />,
      post_answer: <GoComment size={28} color='#40C463' />
  };

  const UserInfoCompMemo = React.memo(UserInfoComp);
  const SectionContainerMemo = React.memo(SectionContainer);
  const ContentPreviewListMemo = React.memo(ContentPreviewList);
  
  return (
    <div className='other-page-container'>
      <div className='my-detail-info-container'>
            <UserInfoCompMemo user={other} openFollowModal={openFollowModal} />
        </div>

        <SectionContainerMemo className='my-bookmark-info-container' title='북마크' icon={icons.bookMarkIcon}>하윙</SectionContainerMemo>

        <div className='my-answer-info-container'>
            <ContentPreviewListMemo contents={MySolvedQuestions} title='내가 답변한 질문' titleIcon={icons.checkbox} className='my-question-info' handleDetail='answer-detail' handleMoreBtn={() => openModal('내 답변', icons.checkbox, MySolvedQuestions, 'answer')}/>
            {/* <ContentPreviewListMemo contents={MyUnsolvedQuestions} title='답변하지 못한 질문' titleIcon={icons.xbox} className='my-question-info' handleDetail='answer-detail' handleMoreBtn={() => moveToAllQuesitons(navigate, false)}/> */}
        </div>
        
        <SectionContainerMemo className='my-learning-info-container' title='학습 활동' icon={icons.BookIcon}>
            <div className="my-streak">
                <StreakHeatMap />
            </div>
            {/* <div className='my-answer-commu-activity'>
                <div className='my-answer-info-container'>
                    <ContentPreviewListMemo contents={likedAnswers} title='추천한 답변' titleIcon={icons.thumbup} className='my-question-info' handleDetail='answer-commu' handleMoreBtn={() => openModal('추천한 답변', icons.thumbup, likedAnswers, 'answer-commu')}/>
                    <ContentPreviewListMemo contents={myFeedbacks} title='나의 피드백' titleIcon={icons.goComment} className='my-question-info'handleDetail='answer-commu' handleMoreBtn={() => openModal('나의 피드백', icons.goComment, myFeedbacks, 'answer-commu')} />
                </div>
            </div> */}
        </SectionContainerMemo>

        <SectionContainerMemo className='my-commu-info-container' title='커뮤니티 활동' icon={icons.CommuIcon} >
            <ContentPreviewListMemo contents={myArticles} title='내 커뮤니티' titleIcon={icons.post} className='my-question-info' handleDetail='article' handleMoreBtn={() => openModal('내 커뮤니티', icons.post, myArticles, 'article')} />
            <ContentPreviewListMemo contents={myArticleComments} title='내 댓글' titleIcon={icons.post_answer} className='my-question-info' handleDetail='article' handleMoreBtn={() => openModal('내 댓글', icons.post_answer, myArticleComments, 'acticle')} />
        </SectionContainerMemo>

        {/* 모달 렌더링 */}
        {isOpenMoreModal && <ContentMoreListView title={modalData.title} titleIcon={modalData.titleIcon} contents={modalData.contents} onClose={closeModal} handleDetail={modalData.handleDetail} />}  
        {isFollowModalOpen && <FollowModalView mode={FollowMode} onClose={() => setIsFollowModalOpen(false)} onUnfollow={onUnfollow} onFollow={onFollow} />}
    </div>
  )
}

export default OtherPage;