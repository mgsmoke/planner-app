import React, { useState } from 'react';

interface AddTodoModalProps {
  onClose: () => void;
  onAdd: (text: string, date?: string) => void;
}

const AddTodoModal: React.FC<AddTodoModalProps> = ({ onClose, onAdd }) => {
  const [text, setText] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = () => {
    if (!text.trim()) return;
    onAdd(text.trim(), date || undefined);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-xl w-80 space-y-4">
        <h2 className="text-xl font-bold">Новая задача</h2>

        <input
          type="text"
          placeholder="Введите задачу..."
          className="w-full border rounded p-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input
          type="date"
          className="w-full border rounded p-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
            Отмена
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-[#6563ff] text-white rounded">
            Добавить
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTodoModal;
