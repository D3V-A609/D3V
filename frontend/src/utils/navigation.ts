import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "../store"; // Redux Dispatch 타입
import { setSelectedQuestionId } from '../store/slices/questionSlice';
import SecureStorage from "../store/services/token/SecureStorage";

/**
 * 특정 페이지로 이동하는 공통 함수
 * @param navigate - react router의 navigate 함수
 * @param path - 이동할 경로
 * @param state - 추가적으로 전달하는 상태(선택)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const navigateTo = (navigate: NavigateFunction, path: string, state?: any) => {
  navigate(path, { state })
}

/**
 * 질문 상세 페이지로 이동(내가 못푼 질문 or 푼 질문으로부터 이동)
 * @param navigate - react route navagate 함수
 * @param dispatch - redux dispatch 함수
 * @param id - 이동할 질문의 id
 * @param showCommunity - 커뮤니티 탭 활성화 여부(기본값: false)
 */
export const moveToQuestionDetail = (
  navigate: NavigateFunction,
  dispatch: AppDispatch,
  id: number,
  showCommunity: boolean = false
) => {
  dispatch(setSelectedQuestionId(id));
  navigateTo(navigate, `/question`, {showCommunity})
}

/**
 * 전체 질문 목록 페이지 이동(푼 문제/못 푼 문제로 이동, 더보기 버튼 클릭 시 사용)
 * @param navigate - react route navagate 함수
 * @param isSolved - boolean 타입, 푼 문제인지 안 푼 문제인지 구별("solved" or "unSolved")
 */
export const moveToAllQuesitons = (
  navigate: NavigateFunction,
  isSolved: boolean
) => {
  const solvedCondition = isSolved ? "solved" : "unSolved";
  navigateTo(navigate, `/all-questions`, { solved: solvedCondition })
}

/**
 * 게시글 상세 페이지로 이동
 * @param navigate - react route navagate 함수
 * @param id - 게시글 ID
 * @param state - mypage에서 이동했는지를 체크하는 변수.. true일 경우 state에 /my를 담아서 이동
 */
export const moveToArticleDetail = (
  navigate: NavigateFunction,
  id: number,
  state?: string
) => {
  navigateTo(navigate, `/board`, {
    selectedArticleId: id,
    currentView: 'detail',
    ...(state ? {prevPath: state} : {})
  })
}

/**
 * 다른 사람의 상세 정보 페이지로 이동
 * @param navigate - react route navagate 함수
 * @param memberId - 보고자하는 다른 사람의 memberId
 */
export const moveToOtherProfile = (
  navigate: NavigateFunction,
  memberId: number
) => {
  if(memberId === Number(SecureStorage.getMemberId())){
    navigateTo(navigate, `/my`);
  }else{
    const encodedId = btoa(memberId.toString());
    navigateTo(navigate, `/profile/${encodedId}`)
  }
}