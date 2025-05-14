// /src/features/education/EducationSection.tsx

import React, { useState } from 'react';
import ArticleCard from './components/ArticleCard';
import QuizCard from './components/QuizCard';
import { articles } from './data/articles';  // Заглушка с данными
import { quizzes } from './data/quizzes';    // Заглушка с данными
import { Article, Quiz } from './types';

const EducationSection: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<'articles' | 'quizzes'>('articles');

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Образовательный раздел</h2>

      {/* Кнопки для переключения между статьями и квизами */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setSelectedSection('articles')}
          className={`w-full py-2 rounded-md ${selectedSection === 'articles' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        >
          Статьи
        </button>
        <button
          onClick={() => setSelectedSection('quizzes')}
          className={`w-full py-2 rounded-md ${selectedSection === 'quizzes' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        >
          Квизы
        </button>
      </div>

      {/* Контент, который меняется в зависимости от выбранной секции */}
      <div className="mb-6">
        {selectedSection === 'articles' && (
          <div className="grid grid-cols-1 gap-6">
            <h3 className="font-semibold text-xl">Статьи</h3>
            {articles.map((article: Article, index: number) => (
              <ArticleCard key={index} article={article} />
            ))}
          </div>
        )}

        {selectedSection === 'quizzes' && (
          <div className="grid grid-cols-1 gap-6">
            <h3 className="font-semibold text-xl mb-4">Квизы</h3>
            {quizzes.map((quiz: Quiz, index: number) => (
              <QuizCard key={index} quiz={quiz} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationSection;
