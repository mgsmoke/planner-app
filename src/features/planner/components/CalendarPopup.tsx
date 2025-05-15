import { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { ru } from 'date-fns/locale';

const CalendarPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const toggleCalendar = () => setIsOpen(!isOpen);
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const selectDate = (day: Date) => {
    setSelectedDate(day);
    setIsOpen(false);
    // Здесь можно добавить колбэк для передачи выбранной даты родительскому компоненту
  };

  return (
    <div className="relative">
      {/* Кнопка для открытия календаря */}
      <button
        onClick={toggleCalendar}
        className="items-center justify-center w-12 h-12 rounded-full border border-gray-200"
      >
        {<span>📅</span>}
      </button>

      {/* Модальное окно календаря */}
      {isOpen && (
        <div className="absolute z-10 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-64">
          {/* Шапка календаря с контролами */}
          <div className="flex justify-between items-center mb-4">
            <button 
              onClick={prevMonth}
              className="p-1 hover:bg-gray-100 rounded"
            >
              &lt;
            </button>
            <span className="font-semibold">
              {format(currentMonth, 'LLLL yyyy', { locale: ru })}
            </span>
            <button 
              onClick={nextMonth}
              className="p-1 hover:bg-gray-100 rounded"
            >
              &gt;
            </button>
          </div>

          {/* Дни недели */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
              <div key={day} className="text-center text-xs font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>

          {/* Ячейки календаря */}
          <div className="grid grid-cols-7 gap-1">
            {monthDays.map(day => {
              const isSelected = isSameDay(day, selectedDate);
              const isCurrentMonth = isSameMonth(day, currentMonth);

              return (
                <button
                  key={day.toString()}
                  onClick={() => selectDate(day)}
                  className={`
                    h-8 rounded-full text-sm
                    ${isSelected ? 'bg-blue-500 text-white' : ''}
                    ${!isCurrentMonth ? 'text-gray-400' : 'hover:bg-gray-100'}
                    ${isSameDay(day, new Date()) ? 'border border-blue-300' : ''}
                  `}
                  disabled={!isCurrentMonth}
                >
                  {format(day, 'd')}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPopup;