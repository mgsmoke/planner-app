import React from 'react';
import { Article } from '../types';

interface Props {
  article: Article;
}

const ArticleCard: React.FC<Props> = ({ article }) => {
  return (
    <div className="p-4 border rounded shadow">
      <h4 className="font-semibold">{article.title}</h4>
      <p>{article.description}</p>
    </div>
  );
};

export default ArticleCard;
