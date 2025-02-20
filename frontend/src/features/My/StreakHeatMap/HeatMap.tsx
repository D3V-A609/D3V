import React, { useEffect } from "react";
import CalendarHeatmap, { TooltipDataAttrs } from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Tooltip } from "react-tooltip"; // ✅ 최신 버전은 이렇게 사용해야 함

interface HeatmapProps {
  className?: string;
  history: AnswerHistory[];
}

const HeatMap: React.FC<HeatmapProps> = ({ className, history }) => {
  const today = new Date();
  const formattedToday = today.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  const startDate = new Date(today.getFullYear(), today.getMonth() - 11, 0);
  const MonthLabels:[string, string, string, string, string, string, string, string, string, string, string, string] =  ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
  const WeekdayLabels:[string, string, string, string, string, string, string] = ["일", "월", "화", "수", "목", "금", "토"];

  const fillMissingDates = (data: AnswerHistory[], startDate: Date, endDate: Date): AnswerHistory[] => {
    const existingDates = new Set(data.map(({ date }) => date)); // 이미 존재하는 날짜 Set
    const result: AnswerHistory[] = [...data];
  
    // 시작일부터 종료일까지 빠진 날짜를 채우기
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split("T")[0]; // YYYY-MM-DD 형식
      if (!existingDates.has(dateStr)) {
        result.push({ date: dateStr, count: 0 }); // 빠진 날짜 추가
      }
    }
  
    return result.sort((a, b) => a.date.localeCompare(b.date)); // 정렬
  };

  const getColor = (count: number) => {
    if (count >= 14) return "color-scale-4";
    if (count >= 7) return "color-scale-3";
    if (count >= 3) return "color-scale-2";
    if (count >= 2) return "color-scale-1";
    if (count >= 1) return "color-scale-0";
    return "color-empty";
  };

  useEffect(() => {
  }, [history]);

  return (
    <div className={`heatmap-container ${className}`}>
      <div className="heatmap-title">
        <h3>{formattedToday}</h3>
      </div>
      <CalendarHeatmap
        startDate={startDate}
        endDate={today}
        values={fillMissingDates(history, startDate, today)}
        classForValue={(value) => {
          if (!value) return "color-empty";
          return getColor(value.count);
        }}
        showWeekdayLabels={true}
        monthLabels={MonthLabels}
        weekdayLabels={WeekdayLabels}
        titleForValue={(value) => {
          if (!value || !value.date) return "";
          return `${value.date}: ${value.count || 0} 문제 해결`;
        }}
        tooltipDataAttrs={(value) => {
          if (!value || !value.date) return { "data-tooltip-content": "" } as TooltipDataAttrs;
          return {
            "data-tooltip-id": "heatmap-tooltip",
            "data-tooltip-content": `${value.date}: ${value.count || 0} 문제`,
            "data-tooltip-anchor": `heatmap-day-${value.date}`,
          } as TooltipDataAttrs;
        }}
      />
      <Tooltip id="heatmap-tooltip" anchorSelect="[data-tooltip-id='heatmap-tooltip']" place="top" />
    </div>
  );
};

export default HeatMap;
