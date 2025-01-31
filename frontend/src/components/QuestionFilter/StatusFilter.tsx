// components/QuestionFilter/StatusFilter.tsx
import React from "react";
import "./StatusFilter.css";

interface StatusFilterProps {
  statusFilter: "all" | "solved" | "unsolved";
  onStatusFilterChange: (status: "all" | "solved" | "unsolved") => void;
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
