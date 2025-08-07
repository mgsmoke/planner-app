import React, { useState } from 'react';
import clsx from 'clsx';

const colors = ['green', 'blue', 'gray', 'purple', 'yellow'];

const icons = [
  { name: '🏃', icon: '🏃' },
  { name: '📖', icon: '📖' },
  { name: '🍎', icon: '🍎' },
  { name: '☕️', icon: '☕️' },
];

interface AddHabitModalProps {
  onClose: () => void;
  onAdd: (name: string, color: string, icon: string) => void;
}

const AddHabitModal: React.FC<AddHabitModalProps> = ({ onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedIcon, setSelectedIcon] = useState(icons[0].name);

  const handleSubmit = () => {
    if (!name.trim()) return;
    onAdd(name.trim(), selectedColor, selectedIcon);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-xl w-80 space-y-4">
        <h2 className="text-xl font-bold">Новая привычка</h2>

        <input
          type="text"
          placeholder="Введите привычку..."
          className="w-full border rounded p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex items-center gap-3">
          <p className="font-medium">Цвет:</p>
          <div className="flex gap-2">
            {colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={clsx('w-6 h-6 rounded-full border-2',`bg-${color}-500`,
                selectedColor === color ? 'border-black' : 'border-transparent'
              )}
            />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <p className="font-medium">Иконка:</p>
          <div className="flex gap-2">
            {icons.map(({ name, icon }) => (
              <button
                key={name}
                onClick={() => setSelectedIcon(name)}
                className={clsx(
                  'p-2 border rounded-full text-xl h-11 w-11 flex justify-center items-center',
                  selectedIcon === name ? 'border-black' : 'border-gray-300'
                )}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded w-[50%]">
            Отмена
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded w-[50%]"
          >
            Добавить
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddHabitModal;
