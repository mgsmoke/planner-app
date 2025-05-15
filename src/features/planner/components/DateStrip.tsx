import React from 'react';
import { format, addDays, isToday, isSameDay } from 'date-fns';
import { ru } from 'date-fns/locale';

interface DateStripProps {
  daysToShow?: number;
  selectedDate?: Date;
  onDateClick?: (date: Date) => void;
}

const DateStrip: React.FC<DateStripProps> = ({
  daysToShow = 7,
  selectedDate,
  onDateClick,
}) => {
  const today = new Date();
  
  // Генерируем массив дат для отображения
  const dates = Array.from({ length: daysToShow }, (_, i) => addDays(today, i));

  return (
    <div className="overflow-x-auto scrollbar-hide w-fit mx-auto">
      <div className="flex gap-2">
        {dates.map((date) => {
          const isCurrentDay = isToday(date);
          const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;

          return (
            <button
              key={date.toString()}
              onClick={() => onDateClick?.(date)}
              className={`
                flex flex-col items-center justify-center
                w-12 h-12 rounded-lg transition-colors
                ${isCurrentDay
                  ? 'bg-blue-500 text-white'
                  : isSelected
                    ? 'bg-blue-100 text-blue-600 border border-blue-300'
                    : 'border border-gray-200'}
              `}
            >
              <span className="text-xs font-medium">
                {format(date, 'EEE', { locale: ru })}
              </span>
              <span className={`text-lg font-bold ${isCurrentDay ? 'text-white' : 'text-gray-800'}`}>
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