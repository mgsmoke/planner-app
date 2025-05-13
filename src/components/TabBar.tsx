import { Link, useLocation } from 'react-router-dom';

const tabs = [
  { path: '/', label: 'Планер' },
  { path: '/education', label: 'Образование' },
  { path: '/profile', label: 'Профиль' },
];

function TabBar() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2 z-50">
      {tabs.map((tab) => (
        <Link
          key={tab.path}
          to={tab.path}
          className={`text-sm ${
            location.pathname === tab.path ? 'font-bold text-blue-600' : 'text-gray-500'
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}

export default TabBar;
