import { Link, useLocation } from 'react-router-dom';

const tabs = [
  { path: '/planner', label: 'Планер', icon: {inactive: '/planner-app/img/list-off.png', active: '/planner-app/img/list-on.png'} },
  { path: '/education', label: 'Образование', icon: {inactive: '/planner-app/img/education-off.png', active: '/planner-app/img/education-on.png'} },
  { path: '/profile', label: 'Профиль', icon: {inactive: '/planner-app/img/user-off.png', active: '/planner-app/img/user-on.png'} },
];

function TabBar() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2 z-30">
      {tabs.map((tab) => (
        <Link
          key={tab.path}
          to={tab.path}
          className={`text-sm flex flex-col items-center ${
            location.pathname.startsWith(tab.path) ? 'font-bold text-[#6563ff]' : 'text-gray-500'
          }`}
        >
        {tab.icon && (
          <img
            src={location.pathname .startsWith(tab.path) ? tab.icon.active : tab.icon.inactive}
            className="w-8 h-8"
          />
        )}
        {tab.label}
        </Link>
      ))}
    </nav>
  );
}

export default TabBar;
