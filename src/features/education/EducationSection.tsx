import ArticleCard from './components/ArticleCard';
import { articles } from './data/articles';

function EducationSection() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Образование</h2>
      {articles.map((a) => (
        <ArticleCard key={a.id} article={a} />
      ))}
    </div>
  );
}

export default EducationSection;