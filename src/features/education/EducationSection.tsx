import React, { useState } from 'react';
import ArticleCard from './components/ArticleCard';
import QuizCard from './components/QuizCard';
import { articles } from './data/articles';
import { quizzes } from './data/quizzes';
import { Article, Quiz } from './types';

const EducationSection: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<'articles' | 'quizzes'>('articles');

  return (
    <div className="px-4 pb-20">
      <h2 className="text-2xl font-bold mb-4">Образовательный раздел</h2>

      {/* Кнопки для переключения между статьями и квизами */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setSelectedSection('articles')}
          className={`w-full py-2 rounded-md ${selectedSection === 'articles' ? 'bg-[#6563ff] text-white' : 'bg-gray-300'}`}
        >
          Статьи
        </button>
        <button
          onClick={() => setSelectedSection('quizzes')}
          className={`w-full py-2 rounded-md ${selectedSection === 'quizzes' ? 'bg-[#6563ff] text-white' : 'bg-gray-300'}`}
        >
          Квизы
        </button>
      </div>

      {/* Контент, который меняется в зависимости от выбранной секции */}
      <div className="mb-4">
        {selectedSection === 'articles' && (
          <div className="grid grid-cols-1 gap-4">
            <h3 className="font-semibold text-xl">Статьи</h3>
            {articles.map((article: Article, index: number) => (
              <ArticleCard key={index} article={article} />
            ))}
          </div>
        )}

        {selectedSection === 'quizzes' && (
          <div className="grid grid-cols-1 gap-4">
            <h3 className="font-semibold text-xl">Квизы</h3>
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
