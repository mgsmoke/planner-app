import ProfileHeader from '../features/profile/ProfileHeader';
import ProfileOption from '../features/profile/ProfileOption';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4">

      <ProfileHeader />

      <div className="mt-5 flex flex-col gap-3">
        <ProfileOption 
        icon={<img src="img/edit-profile.png"></img>} 
        label="Изменить профиль" 
        onClick={() => navigate('/profile/edit')}
        />

        <ProfileOption
          icon={<img src="img/completed.png"></img>}
          label="Показать завершенные"
          onClick={() => navigate('/profile/completed')}
        />

        <ProfileOption icon={<img src="img/subscription.png"></img>} label="Подписка" />
        <ProfileOption icon={<img src="img/settings.png"></img>} label="Настройки" />
      </div>
    </div>
  );
};

export default Profile;
