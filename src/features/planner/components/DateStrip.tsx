import React from 'react';
import { format, addDays, isToday, isSameDay } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useSelectedDateStore } from '../../../store/dateStore';

interface DateStripProps {
  daysToShow?: number;
}

const DateStrip: React.FC<DateStripProps> = ({ daysToShow = 7 }) => {
  const { selectedDate, setSelectedDate } = useSelectedDateStore();

  const today = new Date();
  const startDate = addDays(today, -today.getDay() + 1);
  const dates = Array.from({ length: daysToShow }, (_, i) => addDays(startDate, i));

  return (
    <div className="overflow-x-auto scrollbar-hide w-fit mx-auto">
      <div className="flex gap-2">
        {dates.map((date) => {
          const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;

          return (
            <button
              key={date.toDateString()}
              onClick={() => setSelectedDate(date)}
              className={`
                flex flex-col items-center justify-center
                w-12 h-12 rounded-lg transition-colors
                ${
                  isSelected
                    ? isToday(date)
                      ? 'bg-blue-500 text-white'
                      : 'bg-blue-500 text-white'
                    : isToday(date)
                      ? 'bg-blue-100 border border-blue-300'
                      : 'border border-gray-200'
                }
              `}
            >
              <span className="text-xs font-medium">
                {format(date, 'EEE', { locale: ru })}
              </span>
              <span className={`text-lg font-bold ${isSelected ? 'text-white' : isToday(date) ? '' : 'text-gray-800'}`}>
                {format(date, 'd')}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DateStrip;
