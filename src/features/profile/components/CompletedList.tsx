import React from 'react';
import { useTodoStore } from '../../../store/todoStore';
import BackBtn from './BackBtn';

function CompletedList() {
  const { completed, restoreTodo, removeTodo } = useTodoStore();

  return (
    <div className="mb-6">
      <BackBtn />
      <h2 className="text-2xl font-bold text-center">Выполненные задачи</h2>
      {completed.length === 0 ? (
        <p className="text-gray-500 pl-4 pt-4 text-center">Нет выполненных задач</p>
      ) : (
        <ul className="flex flex-col gap-2 p-4">
          {completed.map(todo => (
            <React.Fragment key={todo.id}>
              <div className="flex items-center gap-2">
                <li
                  onClick={() => restoreTodo(todo.id)}
                  key={todo.id}
                  className="flex items-center justify-between bg-[#e0e0ff] rounded-full px-4 py-3 max-h-[48px] cursor-pointer w-full"
                >
                  <div className="flex flex-col ml-2">
                    <span className="text-gray-500">
                      {todo.text}
                    </span>
                    <span className="text-xs text-gray-500">
                      {todo.date && todo.date.split('-').reverse().join('.')}
                    </span>
                  </div>
                </li>
                <button 
                  onClick={() => removeTodo(todo.id)}
                  className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shrink-0"
                >
                  <img src="/planner-app/img/delete.png" className="w-6" />
                </button>
              </div>
            </React.Fragment>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CompletedList;
