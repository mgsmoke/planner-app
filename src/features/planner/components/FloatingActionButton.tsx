import { useState } from 'react';
import AddTodoModal from './AddTodoModal';
import AddHabitModal from './AddHabitModal';

function FloatingActionButton() {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState<'todo' | 'habit' | null>(null);

  return (
    <>
      {modal === 'todo' && <AddTodoModal onClose={() => setModal(null)} />}
      {modal === 'habit' && <AddHabitModal onClose={() => setModal(null)} />}

      <div className="fixed bottom-16 right-4 flex flex-col items-end gap-2 z-40">
        {open && (
          <div className="flex flex-col gap-2 bg-white p-2 rounded shadow">
            <button
              onClick={() => {
                setOpen(false);
                setModal('todo');
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded text-sm"
            >
              Добавить задачу
            </button>
            <button
              onClick={() => {
                setOpen(false);
                setModal('habit');
              }}
              className="px-4 py-2 bg-green-500 text-white rounded text-sm"
            >
              Добавить привычку
            </button>
          </div>
        )}
        <button
          onClick={() => setOpen(!open)}
          className="bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg text-3xl flex items-center justify-center"
        >
          +
        </button>
      </div>
    </>
  );
}

export default FloatingActionButton;
