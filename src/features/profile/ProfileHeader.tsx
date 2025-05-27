import { useProfileStore } from '../../store/profileStore';

const ProfileHeader = () => {
  const { name, avatar } = useProfileStore();

  return (
    <div className="text-center">
      <h1 className="text-3xl font-semibold">{name}</h1>
      <div className="w-24 h-24 rounded-full bg-gray-300 overflow-hidden mt-4 mx-auto">
        <img src={avatar} className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default ProfileHeader;
