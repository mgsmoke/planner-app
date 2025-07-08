import { useProfileStore } from '../../store/profileStore';

const ProfileHeader = () => {
  const { name, avatar } = useProfileStore();

  return (
    <div className="text-center">
      <div className="w-24 h-24 rounded-full bg-gray-300 overflow-hidden mx-auto">
        <img src={avatar} className="w-full h-full object-cover" />
      </div>
      <h1 className="text-3xl font-semibold mt-4">{name}</h1>
    </div>
  );
};

export default ProfileHeader;
