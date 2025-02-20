import React, { useCallback, useEffect, useState } from 'react';
import "./OtherPage.css"
import { useAppDispatch, useAppSelector } from '../store/hooks/useRedux';
import { useNavigate, useParams } from 'react-router-dom';
import ContentMoreListView from '../components/MyPage/ContentMoreListView';
import FollowModalView from '../components/MyPage/FollowModalView';
import StreakHeatMap from '../features/My/StreakHeatMap/StreakHeatMap';
import { shallowEqual } from 'react-redux';
import { fetchUserFollowers, fetchUserFollowings, fetchUserInfo, follow, unFollow } from '../store/actions/userActions';
import { FaBookmark, FaBook } from 'react-icons/fa';
import { FcVoicePresentation } from 'react-icons/fc';
import { IoCheckboxOutline } from 'react-icons/io5';
import ContentPreviewList from '../components/MyPage/ContentPreviewList';
import SectionContainer from '../components/MyPage/SectionContainer';
import UserInfoComp from '../features/My/UserInfoComp';
import { QuestionState } from '../store/slices/questionSlice';
import { fetchMyLastedQuestions } from '../store/actions/questionActions';
import { UserState } from '../store/slices/userSlice';

import { fetchAllBookmarks } from '../store/actions/bookmarkActions';
import BookmarkSlider from '../components/MyPage/BookmarkSlider';
import BookmarkDetailModal from '../components/Bookmark/BookmarkDetailModal';


const OtherPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const BookmarkSliderMemo = React.memo(BookmarkSlider)

  const { id } = useParams();

  // 🔹 memberId를 useState로 관리 (초기값 null)
  const [memberId, setMemberId] = useState<number | null>(null);

  useEffect(() => {
    if (id) {
      try {
        const decodedId = parseInt(atob(id));
        if (!isNaN(decodedId)) {
          setMemberId(decodedId);
        } else {
          throw new Error("Invalid ID");
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        alert('잘못된 접근입니다.');
        navigate(-1);
      }
    }
  }, [id, navigate]);

  const { other } = useAppSelector((state) => state.user as UserState, shallowEqual)
  const { MySolvedQuestions } = useAppSelector((state) => state.questions as QuestionState, shallowEqual)

  const { bookmarks } = useAppSelector((state) => state.bookmarks, shallowEqual);
  const [selectedBookmarkId, setSelectedBookmarkId] = useState<number | null>(null);
  const [isOpenBookmark, setIsOpenBookmark] = useState(false);


  // API 중복 호출 방지
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if(memberId && !hasFetched){   
      // hasFetched.current = true;
      setHasFetched(true)
      Promise.all([
        // 사용자가 푼 답변 로드
        dispatch(fetchMyLastedQuestions({isSolved: true, memberId: Number(memberId)})),

        // 사용자 정보 불러오기
        dispatch(fetchUserInfo(Number(memberId))),

        // 사용자의 팔로워, 팔로잉 목록 불러오기
        dispatch(fetchUserFollowers(Number(memberId))),
        dispatch(fetchUserFollowings(Number(memberId))),

        // 북마크 불러오기
        dispatch(fetchAllBookmarks(Number(memberId))),
      ]);
    }
  }, [dispatch, memberId, hasFetched])

  // memberId가 변경될 때마다 다시 데이터 불러오도록 hasFetched 리셋
  useEffect(()=>{
    setHasFetched(false)
  }, [memberId])



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

  const openFollowModal = (mode: string) => { 
    setFollowMode(mode);
    setIsFollowModalOpen(true)
  };

  const [refreshKey, setRefreshKey] = useState(0); // 🔄 리렌더링 트리거용 상태 추가

  const onUnfollow = async (memberId: number) => {
    await dispatch(unFollow(memberId)); // 언팔로우 실행
    await dispatch(fetchUserInfo(Number(memberId))); // 최신 회원 정보 다시 불러오기
    setRefreshKey(prev => prev + 1); // 화면 강제 리렌더링
  };
  
  const onFollow = async (memberId: number) => {
    await dispatch(follow(memberId)); // 팔로우 실행 (올바른 액션으로 변경 필요)
    await dispatch(fetchUserInfo(Number(memberId))); // 최신 회원 정보 다시 불러오기
    setRefreshKey(prev => prev + 1); // 화면 강제 리렌더링
  };

  const handleViewBookmarkDetails = (bookmarkId: number) => {
    setIsOpenBookmark(true);
    setSelectedBookmarkId(bookmarkId);
  };

  const memoizedBookmarks = useCallback(() => {
    if (memberId) {
        dispatch(fetchAllBookmarks(Number(memberId)));
    }
  }, [dispatch, memberId]);


  // ===== icon ======
  const icons = {
      bookMarkIcon: <FaBookmark size={24} color="#0072EF" />,
      BookIcon: <FaBook size={24} color='#8B4513' />,
      CommuIcon: <FcVoicePresentation size={28} />,
      checkbox: <IoCheckboxOutline size={28} color='#40C463' />,
  };

  const UserInfoCompMemo = React.memo(UserInfoComp);
  const SectionContainerMemo = React.memo(SectionContainer);
  const ContentPreviewListMemo = React.memo(ContentPreviewList);
  
  return (
    <div className='other-page-container' key={refreshKey}>
      <div className='my-detail-info-container'>
            <UserInfoCompMemo user={other} openFollowModal={openFollowModal} onUnfollow={onUnfollow} onFollow={onFollow} />
        </div>

        <SectionContainerMemo className='my-bookmark-info-container' title='북마크' icon={icons.bookMarkIcon}>
          {bookmarks.length > 0 ? (
              <BookmarkSliderMemo
                  bookmarks={bookmarks}
                  onViewDetails={handleViewBookmarkDetails}
              />
          ) : (
              <p>북마크가 없습니다.</p>
          )}
      </SectionContainerMemo>

        <div className='my-answer-info-container'>
            <ContentPreviewListMemo contents={MySolvedQuestions} title='내가 답변한 질문' titleIcon={icons.checkbox} className='my-question-info' handleDetail='answer-commu' handleMoreBtn={() => openModal('내 답변', icons.checkbox, MySolvedQuestions, 'answer')}/>
        </div>
        
        <SectionContainerMemo className='my-learning-info-container' title='학습 활동' icon={icons.BookIcon}>
            <div className="my-streak">
                <StreakHeatMap memberId={Number(memberId)} />
            </div>
        </SectionContainerMemo>

        {/* 모달 렌더링 */}
        {isOpenMoreModal && <ContentMoreListView title={modalData.title} titleIcon={modalData.titleIcon} contents={modalData.contents} onClose={closeModal} handleDetail={modalData.handleDetail} />}  
        {isFollowModalOpen && <FollowModalView mode={FollowMode} onClose={() => setIsFollowModalOpen(false)} onUnfollow={onUnfollow} onFollow={onFollow} memberId={Number(memberId)} />}
        {/* BookmarkDetailModal 렌더링 */}
        {isOpenBookmark && selectedBookmarkId && (
            <div className="modal-overlay">
                <BookmarkDetailModal
                  bookmarkId={selectedBookmarkId}
                  onClose={() => setIsOpenBookmark(false)}
                  onBookmarksChanged={memoizedBookmarks}
                  isOwner={false}
                />
            </div>
        )}
    </div>
  )
}

export default OtherPage;