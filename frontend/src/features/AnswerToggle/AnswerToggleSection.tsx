import React from 'react';
import BestAnswer from './BestAnswer';
import MyAnswerRecords from './MyAnswerRecords';

interface BestAnswerProps {
  bestAnswer: string;
  myAnswers: Answer[];
}

const AnswerToggleSection:React.FC<BestAnswerProps> = ({bestAnswer, myAnswers}) => {
  return(<div>
    <BestAnswer bestAnswer={bestAnswer} />
    <MyAnswerRecords myAnswers={myAnswers} />
  </div>);
}

export default AnswerToggleSection;