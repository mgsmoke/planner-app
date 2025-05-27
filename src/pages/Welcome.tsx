import { useProfileStore } from '../store/profileStore';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const { name, avatar } = useProfileStore();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)]">
      <div className="w-24 h-24 rounded-full bg-gray-300 overflow-hidden mb-4">
        <img src={avatar} className="w-full h-full object-cover" alt="Аватар" />
      </div>
      <h1 className="text-2xl font-semibold mb-80">Добро пожаловать, {name}!</h1>
      <button 
        className="px-6 py-3 bg-blue-500 text-white rounded-lg text-xl shadow-lg" 
        onClick={() => navigate('/planner')}
      >
        Войти
      </button>
    </div>
  );
}

export default Welcome;