import { Article } from '../types';

type Props = {
  article: Article;
};

function ArticleCard({ article }: Props) {
  return (
    <div className="border p-4 rounded mb-4">
      <h3 className="text-lg font-bold">{article.title}</h3>
      {article.image && <img src={article.image} alt="" className="my-2 rounded" />}
      <p>{article.content}</p>
    </div>
  );
}

export default ArticleCard;