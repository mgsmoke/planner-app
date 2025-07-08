import React, { useState, useEffect } from 'react';
import { useTodoStore } from '../../../store/todoStore';

interface EditTodoModalProps {
  todoId: number;
  onClose: () => void;
}

const EditTodoModal: React.FC<EditTodoModalProps> = ({ todoId, onClose }) => {
  const { todos, editTodo } = useTodoStore();
  const todo = todos.find(t => t.id === todoId);

  const [text, setText] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (todo) {
      setText(todo.text);
      setDate(todo.date || '');
    }
  }, [todo]);

  const handleSubmit = () => {
    if (!text.trim()) return;
    editTodo(todoId, text.trim(), date || undefined);
    onClose();
  };

  if (!todo) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-xl w-80 space-y-4">
        <h2 className="text-xl font-bold">Редактировать задачу</h2>

        <input
          type="text"
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
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Отмена</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-[#6563ff] text-white rounded">Сохранить</button>
        </div>
      </div>
    </div>
  );
};

export default EditTodoModal;
