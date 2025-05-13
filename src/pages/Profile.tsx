import ProfileHeader from '../features/profile/ProfileHeader';
import ProfileOption from '../features/profile/ProfileOption';

const Profile = () => {
  return (
    <div className="pb-16">
      <h1 className="text-center text-2xl font-bold mt-2">Profile</h1>

      <ProfileHeader />

      <div className="mt-6">
        <ProfileOption icon={<span>👥</span>} label="change profile info" />
        <ProfileOption icon={<span>💳</span>} label="buy sub" />
        <ProfileOption icon={<span>🏅</span>} label="achievements" />
        <ProfileOption icon={<span>⚙️</span>} label="settings" />
      </div>
      
    </div>
  );
};

export default Profile;
