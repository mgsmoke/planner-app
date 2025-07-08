import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfileStore } from '../../../store/profileStore';

const EditProfile = () => {
  const navigate = useNavigate();
  const { name, avatar, setName, setAvatar } = useProfileStore();

  const [newName, setNewName] = useState(name);
  const [newAvatar, setNewAvatar] = useState(avatar);

  const handleSave = () => {
    setName(newName);
    setAvatar(newAvatar);
    navigate('/profile');
  };

  return (
    <div className="p-6 pb-20">
      <h1 className="text-2xl font-bold mb-6 text-center">Редактировать профиль</h1>

      <div className="flex flex-col items-center gap-4 mb-8">
        <div className="w-24 h-24 rounded-full bg-gray-300 overflow-hidden">
          <img src={newAvatar} className="w-full h-full object-cover" />
        </div>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="avatarInput"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = () => {
                setNewAvatar(reader.result as string);
              };
              reader.readAsDataURL(file);
            }
          }}
        />

        <label htmlFor="avatarInput" className="text-[#6563ff] cursor-pointer">
          Изменить фото
        </label>

        {newAvatar && (
          <button
            onClick={() => setNewAvatar('')}
            className="text-red-500 text-sm"
          >
          Удалить фото
          </button>
        )}
        
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1 ml-1">Имя</label>
        <input
          type="text"
          placeholder="Ваше имя"
          className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#6563ff]"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </div>

      <button
        className="w-full bg-[#6563ff] text-white py-3 rounded-lg font-medium text-lg"
        onClick={handleSave}
      >
        Сохранить
      </button>

      <button
        className="w-full text-gray-600 pt-4"
        onClick={() => navigate('/profile')}
      >
        Отменить
      </button>
    </div>
  );
};

export default EditProfile;
