type Props = {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
};

const ProfileOption = ({ icon, label, onClick }: Props) => {
  return (
    <button
      type="button"
      className="flex gap-4 py-2 px-4 text-left items-center"
      onClick={onClick}
    >
      <div className="w-6">{icon}</div>
      <span className="text-lg">{label}</span>
    </button>
  );
};

export default ProfileOption;
