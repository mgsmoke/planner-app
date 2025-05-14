import { useState } from 'react';
import AddModal from '../../../components/AddModal';
import { useTodoStore } from '../../../store/todoStore';
import { useHabitStore } from '../../../store/habitStore';

function FloatingActionButton() {
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState<'todo' | 'habit' | null>(null);

  const { addTodo } = useTodoStore();
  const { addHabit } = useHabitStore();

  const handleAddTodo = (input: string) => {
    addTodo(input);
  };

  const handleAddHabit = (input: string) => {
    addHabit(input);
  };

  return (
    <>
      {modalType === 'todo' && (
        <AddModal
          onClose={() => setModalType(null)}
          onAdd={handleAddTodo}
          title="Новая задача"
          placeholder="Введите задачу..."
          buttonLabel="Добавить задачу"
        />
      )}
      {modalType === 'habit' && (
        <AddModal
          onClose={() => setModalType(null)}
          onAdd={handleAddHabit}
          title="Новая привычка"
          placeholder="Введите привычку..."
          buttonLabel="Добавить привычку"
        />
      )}

      <div className="fixed bottom-16 right-4 flex flex-col items-end gap-2 z-40">
        {open && (
          <div className="flex flex-col gap-2 bg-white p-2 rounded shadow">
            <button
              onClick={() => {
                setOpen(false);
                setModalType('todo');
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded text-sm"
            >
              Добавить задачу
            </button>
            <button
              onClick={() => {
                setOpen(false);
                setModalType('habit');
              }}
              className="px-4 py-2 bg-green-500 text-white rounded text-sm"
            >
              Добавить привычку
            </button>
          </div>
        )}
        <button
          onClick={() => setOpen(!open)}
          className="bg-blue-600 text-white w-11 h-11 rounded-full shadow-lg text-3xl flex items-center justify-center"
        >
          +
        </button>
      </div>
    </>
  );
}

export default FloatingActionButton;
