type Props = {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void; // необязательный обработчик клика
};

const ProfileOption = ({ icon, label, onClick }: Props) => {
  return (
    <button
      type="button"
      className="flex items-center justify-center gap-4 py-3 px-4 text-left"
      onClick={onClick}
    >
      <div className="text-xl">{icon}</div>
      <span className="text-base">{label}</span>
    </button>
  );
};

export default ProfileOption;
