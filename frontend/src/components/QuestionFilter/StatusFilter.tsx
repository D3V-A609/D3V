// components/QuestionFilter/StatusFilter.tsx
import React from "react";
import "./StatusFilter.css";

interface StatusFilterProps {
  statusFilter: QuestionStatus | "all";
  onStatusFilterChange: (status: QuestionStatus | "all") => void;
}

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
        풀었음
      </span>
      <span className="separator">•</span>
      <span
        className={statusFilter === "notSolved" ? "active" : ""}
        onClick={() => onStatusFilterChange("notSolved")}
      >
        안 풀었음
      </span>
      <span className="separator">•</span>
      <span
        className={statusFilter === "unSolved" ? "active" : ""}
        onClick={() => onStatusFilterChange("unSolved")}
      >
        모르겠어요 문제
      </span>
    </div>
  );
};

export default StatusFilter;
