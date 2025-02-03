import React from 'react';
import BestAnswer from './BestAnswer';
import MyAnswerRecords from './MyAnswerRecords';

interface BestAnswerProps {
  bestAnswer: BestAnswer;
}

const AnswerToggleSection:React.FC<BestAnswerProps> = ({bestAnswer}) => {
  return(<div>
    <BestAnswer bestAnswer={bestAnswer} />
    <MyAnswerRecords />
  </div>);
}

export default AnswerToggleSection;