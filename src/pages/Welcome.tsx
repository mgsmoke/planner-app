import { useProfileStore } from '../store/profileStore';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const { name, avatar } = useProfileStore();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen] pt-24">
      <div className="w-28 h-28 rounded-full bg-gray-300 overflow-hidden mb-4 ">
        <img src={avatar} className="w-full h-full object-cover" alt="" />
      </div>
      <h1 className="text-2xl font-semibold mb-60">Добро пожаловать, {name}!</h1>
      <button 
        className="px-6 py-3 bg-[#6563ff] text-white rounded-lg text-xl shadow-lg" 
        onClick={() => navigate('/planner')}
      >
        Войти
      </button>
    </div>
  );
}

export default Welcome;