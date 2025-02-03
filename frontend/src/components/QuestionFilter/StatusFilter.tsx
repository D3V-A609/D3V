// components/QuestionFilter/StatusFilter.tsx
import React from "react";
import "./StatusFilter.css";

/**
 * StatusFilter 컴포넌트의 props 인터페이스
 * @param statusFilter 현재 선택된 필터 상태
 * @param onStatusFilterChange 필터 변경 시 호출될 콜백 함수
 */
interface StatusFilterProps {
  statusFilter: "all" | "solved" | "unsolved";
  onStatusFilterChange: (status: "all" | "solved" | "unsolved") => void;
}

/**
 * 문제 상태 필터 컴포넌트
 * 전체/푼 문제/안 푼 문제를 필터링하는 기능 제공
 */
const StatusFilter: React.FC<StatusFilterProps> = ({
  statusFilter,
  onStatusFilterChange,
}) => {
  return (
    <div className="status-filter">
      <span className="separator">•</span>
      <span
        className={statusFilter === "all" ? "active" : ""}
        onClick={() => onStatusFilterChange("all")}
      >
        전체
      </span>
      <span className="separator">•</span>
      <span
        className={statusFilter === "solved" ? "active" : ""}
        onClick={() => onStatusFilterChange("solved")}
      >
        푼 문제
      </span>
      <span className="separator">•</span>
      <span
        className={statusFilter === "unsolved" ? "active" : ""}
        onClick={() => onStatusFilterChange("unsolved")}
      >
        안 푼 문제
      </span>
    </div>
  );
};

export default StatusFilter;