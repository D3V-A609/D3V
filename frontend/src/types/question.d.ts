// types/question.d.ts

// 개별 질문 항목에 대한 인터페이스
interface Question {
  questionId: number;          // 질문의 고유 식별자
  content: string;            // 질문 내용
  standardAnswer: string;     // 모범 답안
  skillList: string[];        // 관련 기술 스택 목록 (예: "C", "Java" 등)
  jobList: string[];         // 관련 직무 목록 (예: "FRONTEND", "BACKEND" 등)
  
  status?: "Solved" | "Unsolved";  // 문제 해결 상태
  challengeCount?: number;         // 도전 횟수
  answerCount?: number;           // 답변 수
}

// 정렬 관련 정보를 담는 인터페이스
interface PageableSort {
  direction: string;    // 정렬 방향 (ASC/DESC)
  nullHandling: string; // null 값 처리 방식
  ascending: boolean;   // 오름차순 여부
  property: string;     // 정렬 기준이 되는 필드명
  ignoreCase: boolean;  // 대소문자 구분 여부
}

// 페이지 정보를 담는 인터페이스
interface Pageable {
  offset: number;         // 현재 페이지의 시작 위치
  sort: PageableSort[];   // 정렬 정보 배열
  pageNumber: number;     // 현재 페이지 번호
  pageSize: number;       // 페이지당 항목 수
  unpaged: boolean;       // 페이지네이션 미적용 여부
  paged: boolean;         // 페이지네이션 적용 여부
}

// API 응답 전체 구조를 정의하는 인터페이스
interface QuestionResponse {
  content: Question[];        // 현재 페이지의 질문 목록
  totalElements: number;      // 전체 질문 수
  totalPages: number;         // 전체 페이지 수
  size: number;              // 페이지당 항목 수
  number: number;            // 현재 페이지 번호
  sort: PageableSort[];      // 정렬 정보
  pageable: Pageable;        // 페이지 정보
  numberOfElements: number;   // 현재 페이지의 항목 수
  first: boolean;            // 첫 페이지 여부
  last: boolean;             // 마지막 페이지 여부
  empty: boolean;            // 결과가 비어있는지 여부
}
