import React from 'react';
import { Chrono } from 'react-chrono';
// import dummyMyAnswerRecords from '../../constants/dummyMyAnswerRecords';
import PageHeader from '../../components/PageHeader/PageHeader';

import { FcCommandLine } from "react-icons/fc";

interface MyAnswerRecordsProps{
  myAnswers: Answer[];
}
const MyAnswerRecords: React.FC<MyAnswerRecordsProps> = ({myAnswers}) => {
  // 오늘 날짜를 가져와 시간을 00:00:00으로 초기화 (날짜 비교를 위해 필요)
  const today = new Date();
  today.setHours(0, 0, 0, 0); // 오늘 날짜의 시간 부분 초기화
  let todayFlag = false; // 오늘 날짜가 첫 번째로 나타나는지 체크하는 플래그

  // 더미 데이터를 날짜 기준으로 내림차순 정렬하고, Chrono에 맞게 변환
  const timelineItems = [...myAnswers]
    .sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() // 최신 날짜가 위로 오도록 정렬
    )
    .map((record) => {
      // createdAt을 Date 객체로 변환
      const date = new Date(record.createdAt); // UTC 시간 기준
      // 로컬 시간으로 변환
      const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000); 

      // 날짜를 포맷팅하여 'MMM DD, YYYY' 형태로 변환 (예: Jan 23, 2024)
      const formattedDate = localDate.toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      });

      // 날짜 비교를 위해 시간 부분을 00:00:00으로 초기화
      localDate.setHours(0, 0, 0, 0);

      // 오늘 날짜인 경우 첫 번째 항목에만 "Today" 표시
      let title = "     "; // 기본적으로 빈 문자열
      if (localDate.getTime() === today.getTime()) {
        if (!todayFlag) {
          title = "Today"; // 첫 번째로 만나는 오늘 날짜만 "Today"로 설정
          todayFlag = true; // 플래그를 설정하여 이후 오늘 날짜는 빈 문자열로 표시
        }
      }

      // Chrono에서 사용할 데이터 구조로 변환
      return {
        title: title, // "Today" 또는 빈 문자열
        cardTitle: formattedDate, // 포맷된 날짜
        cardDetailedText: record.content, // 답변 내용을 카드의 상세 내용으로 설정
      };
    });

  return (
    <div>
      <div className="my-answer-records-container">
        {/* <div className="title">{"{"} 내 답변 로그 {"}"}</div>
        <div className="sub-title">
          과거의 나와 현재의 나, 어떻게 달라졌는지 답변 Log를 통해 비교해보세요.
        </div> */}
        <PageHeader
        title='내 답변 로그'
        description='과거의 나와 현재의 나, 어떻게 달라졌는지 답변 Log를 통해 비교해보세요.' 
        icon={<FcCommandLine />}
        />
        <div className="records-timeline">
          <Chrono
            items={timelineItems} // 정렬 및 변환된 타임라인 아이템 전달
            mode="VERTICAL" // 세로 방향으로 타임라인 표시
            theme={{
              secondary: "#ff9374", // 주요 강조 색상 설정
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MyAnswerRecords;
