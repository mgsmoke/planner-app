import ProfileHeader from '../features/profile/ProfileHeader';
import ProfileOption from '../features/profile/ProfileOption';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-bold">Профиль</h1>

      <ProfileHeader />

      <div className="mt-5 flex flex-col items-center">
        <ProfileOption 
        icon={<span>👥</span>} 
        label="Изменить профиль" 
        onClick={() => navigate('/edit')}
        />
        <ProfileOption
          icon={<span>✅</span>}
          label="Показать завершенные"
          onClick={() => navigate('/completed')}
        />
        <ProfileOption icon={<span>💳</span>} label="Подписка" />
        <ProfileOption icon={<span>🏅</span>} label="Достижения" />
        <ProfileOption icon={<span>⚙️</span>} label="Настройки" />
      </div>
    </div>
  );
};

export default Profile;
