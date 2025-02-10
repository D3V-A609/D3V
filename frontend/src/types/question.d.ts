// types/question.d.ts

// 질문의 기본 구조
interface Question {
  id: number;                   // 질문 고유 ID
  content: string;              // 질문 내용
  standardAnswer: string;       // 모범 답안
  answerCount: number;         // 답변 수
  challengeCount: number;      // 도전 수
  answerAverage: number;       // 답변 평균 점수
  questionJobs: null;          // 레거시 필드 (사용되지 않음)
  status: "solved" | "unSolved" | "notSolved";  // 질문 상태
  skillList: string[];         // 기술 스택 목록 (예: "REACT", "DOCKER" 등)
  jobList: string[];          // 직무 목록 (예: "FRONTEND", "DEVOPS" 등)
}

// 일일 질문 목록 타입
type DailyQuestions = Question[];

// 질문 상태를 나타내는 타입
type QuestionStatus = "solved" | "unSolved" | "notSolved";

// 정렬 관련 옵션
type SortOrder = "desc" | "asc";                // 정렬 방향
type SortField = "acnt" | "ccnt" | "avg";      // 정렬 기준 필드 (답변수, 도전수, 평균점수)

// API 요청 시 사용되는 파라미터 타입
interface QuestionParams {
  jobs?: string[];             // 직무 필터
  skills?: string[];           // 기술 스택 필터
  solved?: QuestionStatus;     // 상태 필터
  order?: SortOrder;           // 정렬 방향 (기본값: desc)
  sort?: SortField;           // 정렬 기준 (기본값: acnt)
  page?: number;              // 페이지 번호 (기본값: 0)
  size?: number;              // 페이지 크기 (기본값: 15)
  keyword?: string;           // 검색 키워드
}

// 페이지네이션 정보 관련 타입
interface PageInfo {
  empty: boolean;             // 정렬 정보가 비어있는지 여부
  sorted: boolean;            // 정렬되었는지 여부
  unsorted: boolean;          // 정렬되지 않았는지 여부
}

// 페이지 정보를 담는 타입
interface Pageable {
  pageNumber: number;         // 현재 페이지 번호
  pageSize: number;          // 페이지 크기
  sort: PageInfo;            // 정렬 정보
  offset: number;            // 페이지 오프셋
  paged: boolean;            // 페이징 처리 여부
  unpaged: boolean;          // 페이징 미처리 여부
}

// API 응답 타입
interface QuestionResponse {
  content: Question[];        // 질문 목록
  pageable: Pageable;        // 페이지 정보
  last: boolean;             // 마지막 페이지 여부
  totalElements: number;     // 전체 요소 수
  totalPages: number;        // 전체 페이지 수
  size: number;              // 페이지 크기
  number: number;            // 현재 페이지 번호
  sort: PageInfo;            // 정렬 정보
  first: boolean;            // 첫 페이지 여부
  numberOfElements: number;  // 현재 페이지의 요소 수
  empty: boolean;            // 결과가 비어있는지 여부
}
