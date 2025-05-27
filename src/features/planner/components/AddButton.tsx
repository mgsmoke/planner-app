import { useState } from 'react';
import AddTodoModal from '../components/AddTodoModal';
import AddHabitModal from '../components/AddHabitModal';
import { useTodoStore } from '../../../store/todoStore';
import { useHabitStore } from '../../../store/habitStore';

function AddButton() {
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState<'todo' | 'habit' | null>(null);

  const { addTodo } = useTodoStore();
  const { addHabit } = useHabitStore();

  const handleAddTodo = (text: string, date?: string) => {
    addTodo(text, date);
  };

  const handleAddHabit = (name: string, color: string, icon: string) => {
    addHabit(name, color, icon);
  };

  return (
    <>
      {modalType === 'todo' && (
        <AddTodoModal
          onClose={() => setModalType(null)}
          onAdd={handleAddTodo}
        />
      )}
      {modalType === 'habit' && (
        <AddHabitModal
          onClose={() => setModalType(null)}
          onAdd={handleAddHabit}
        />
      )}

      <div className="fixed bottom-20 right-4 flex flex-col items-end gap-2 z-40">
        {open && (
          <div className="flex flex-col gap-2 p-2">
            <button
              onClick={() => {
                setOpen(false);
                setModalType('todo');
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded text-m shadow-lg"
            >
              Добавить задачу
            </button>
            <button
              onClick={() => {
                setOpen(false);
                setModalType('habit');
              }}
              className="px-4 py-2 bg-green-500 text-white rounded text-m shadow-lg"
            >
              Добавить привычку
            </button>
          </div>
        )}
        <button
          onClick={() => setOpen(!open)}
          className="bg-blue-600 text-white w-12 h-12 rounded-full shadow-lg text-4xl flex items-center justify-center"
        >
          +
        </button>
      </div>
    </>
  );
}

export default AddButton;
