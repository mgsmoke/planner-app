import ArticleCard from './components/ArticleCard';
import { articles } from './data/articles';
import BottomSearchBar from './components/BottomSearchBar';

function EducationSection() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Образование</h2>
      {articles.map((a) => (
        <ArticleCard key={a.id} article={a} />
      ))}
      <BottomSearchBar />
    </div>
  );
}

export default EducationSection;