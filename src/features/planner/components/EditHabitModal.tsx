import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useHabitStore } from '../../../store/habitStore';

const colors = ['green', 'blue', 'gray', 'purple', 'yellow'];

const icons = [
  { name: '🏃', icon: '🏃' },
  { name: '📖', icon: '📖' },
  { name: '🍎', icon: '🍎' },
  { name: '☕️', icon: '☕️' },
];

interface EditHabitModalProps {
  habitId: string;
  onClose: () => void;
}

const EditHabitModal: React.FC<EditHabitModalProps> = ({ habitId, onClose }) => {
  const { habits, editHabit } = useHabitStore();
  const habit = habits.find(h => h.id === habitId);

  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedIcon, setSelectedIcon] = useState(icons[0].name);

  useEffect(() => {
    if (habit) {
      setName(habit.name);
      setSelectedColor(habit.color);
      setSelectedIcon(habit.icon);
    }
  }, [habit]);

  const handleSubmit = () => {
    if (!name.trim()) return;
    editHabit(habitId, name.trim(), selectedColor, selectedIcon);
    onClose();
  };

  if (!habit) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-xl w-80 space-y-4">
        <h2 className="text-xl font-bold">Редактировать привычку</h2>

        <input
          type="text"
          className="w-full border rounded p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div>
          <p className="font-medium mb-1">Цвет:</p>
          <div className="flex gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={clsx(
                  'w-6 h-6 rounded-full border-2',
                  `bg-${color}-500`,
                  selectedColor === color ? 'border-black' : 'border-transparent'
                )}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="font-medium mb-1">Иконка:</p>
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

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Отмена</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-[#6563ff] text-white rounded">Сохранить</button>
        </div>
      </div>
    </div>
  );
};

export default EditHabitModal;
