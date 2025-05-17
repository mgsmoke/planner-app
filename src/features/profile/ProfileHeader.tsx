import { useProfileStore } from '../../store/profileStore';

const ProfileHeader = () => {
  const { name, avatar } = useProfileStore();

  return (
    <div className="text-center">
      <h2 className="text-lg font-semibold pt-4">{name}</h2>
      <div className="w-24 h-24 rounded-full bg-gray-300 overflow-hidden mt-2 mx-auto">
        <img src={avatar} className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default ProfileHeader;
