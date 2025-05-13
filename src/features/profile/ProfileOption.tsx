type Props = {
    icon: React.ReactNode;
    label: string;
  };
  
  const ProfileOption = ({ icon, label }: Props) => {
    return (
      <div className="flex items-center gap-4 py-3 px-4">
        <div className="text-xl">{icon}</div>
        <span className="text-base">{label}</span>
      </div>
    );
  };
  
  export default ProfileOption;
  