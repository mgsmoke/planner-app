import React from 'react';
import { Quiz } from '../types';

interface Props {
  quiz: Quiz;
}

const QuizCard: React.FC<Props> = ({ quiz }) => {
  return (
    <div className="p-4 border rounded shadow">
      <h4 className="font-semibold">{quiz.title}</h4>
      <p>{quiz.description}</p>
      <a href={quiz.link} className="text-[#6563ff]">Перейти к квизу</a>
    </div>
  );
};

export default QuizCard;
