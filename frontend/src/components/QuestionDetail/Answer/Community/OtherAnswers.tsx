import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../../../../store/hooks/useRedux';
import AnswerItem from './AnswerItem';
import "./OtherAnswers.css";
import PageHeader from '../../../PageHeader/PageHeader';
import { PiEyesFill } from "react-icons/pi";
import { fetchMultipleUserInfo } from '../../../../store/actions/userActions';

interface OtherAnswersProps {
  answers: Answer[];
}

const OtherAnswers: React.FC<OtherAnswersProps> = ({ answers }) => {
  // console.log('OtherAnswers received answers:', answers);
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState<'latest' | 'comments' | 'likes'>('latest');
  const answersPerPage = 10;

  useEffect(() => {
    const uniqueUserIds = [...new Set(answers.map(answer => answer.memberId))];
    dispatch(fetchMultipleUserInfo(uniqueUserIds));
  }, [dispatch, answers]);

  const getSortedAnswers = () => {
    return [...answers].sort((a, b) => {
      if (sortType === 'latest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortType === 'comments') {
        return b.count - a.count;
      }
      return b.like - a.like;
    });
  };

  const sortedAnswers = getSortedAnswers();
  const totalPages = Math.ceil(sortedAnswers.length / answersPerPage);
  const indexOfLastAnswer = currentPage * answersPerPage;
  const indexOfFirstAnswer = indexOfLastAnswer - answersPerPage;
  const currentAnswers = sortedAnswers.slice(indexOfFirstAnswer, indexOfLastAnswer);

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="other-answers-container">
      <div className="other-answers-header">
        <PageHeader
          title='다른 사람들의 답변 보기' 
          description='다양한 면접 답변과 의견을 한 눈에 보며 인사이트를 얻어보세요.' 
          icon={<PiEyesFill />}
          iconStyle="other-answer"
        />
        <select 
          className="sort-select"
          value={sortType}
          onChange={(e) => setSortType(e.target.value as 'latest' | 'comments' | 'likes')}
        >
          <option value="latest">최신순</option>
          <option value="comments">댓글순</option>
          <option value="likes">추천순</option>
        </select>
      </div>
      <div className="answers-list">
        {currentAnswers.map((answer) => (
          <AnswerItem key={answer.answerId} answer={answer} />
        ))}
      </div>
      <div className="pagination">
        <button 
          className="arrow-button"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {getPageNumbers().map(number => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={currentPage === number ? 'active' : ''}
          >
            {number}
          </button>
        ))}
        <button 
          className="arrow-button"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default OtherAnswers;