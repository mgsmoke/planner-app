import {format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, getDay} from 'date-fns';
import { ru } from 'date-fns/locale';
import { useState, useEffect } from 'react';
import { useSelectedDateStore } from '../../../store/dateStore';

const CalendarButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { selectedDate, setSelectedDate } = useSelectedDateStore();

  useEffect(() => {
    setCurrentMonth(selectedDate);
  }, [selectedDate]);

  const toggleCalendar = () => setIsOpen(!isOpen);
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const weekdayOffset = (getDay(monthStart) + 6) % 7;

  const selectDate = (day: Date) => {
    setSelectedDate(day);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleCalendar}
        className="items-center justify-center w-12 h-12 rounded-full border border-gray-200"
      >
        <span>📅</span>
      </button>

      {isOpen && (
        <div className="absolute z-20 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-64">
          <div className="flex justify-between items-center mb-4">
            <button onClick={prevMonth} className="p-1 rounded">
              &lt;
            </button>
            <span className="font-semibold">
              {format(currentMonth, 'LLLL yyyy', { locale: ru })}
            </span>
            <button onClick={nextMonth} className="p-1 rounded">
              &gt;
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
              <div key={day} className="text-center text-xs font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: weekdayOffset }).map((_, index) => (
              <div key={`empty-${index}`} />
            ))}

            {monthDays.map(day => {
              const isSelected = isSameDay(day, selectedDate);
              const isCurrentMonth = isSameMonth(day, currentMonth);

              return (
                <button
                  key={day.toString()}
                  onClick={() => selectDate(day)}
                  className={`
                    h-8 rounded-full text-sm
                    ${isSelected ? 'bg-blue-500 text-white border-blue-500' : ''}
                    ${!isCurrentMonth ? 'text-gray-400' : ''}
                    ${isSameDay(day, new Date()) ? 'border border-blue-300 bg-blue-100' : ''}
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

export default CalendarButton;
