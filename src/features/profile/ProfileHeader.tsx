const ProfileHeader = () => {
    return (
      <div className="text-center mt-4">
        <h2 className="text-lg font-semibold">Имя профиля</h2>
        <div className="w-24 h-24 mx-auto mt-2 border rounded-md flex items-center justify-center">
          <img src="/placeholder-image.png" alt="Фото" className="w-12" />
        </div>
      </div>
    );
  };
  
  export default ProfileHeader;
  