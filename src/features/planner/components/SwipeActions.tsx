import { motion, useMotionValue, useAnimation } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';

type Props = {
  children: React.ReactNode;
  onEdit?: () => void;
  onDelete?: () => void;
  onComplete?: () => void;
  enableSwipeRight?: boolean;
};

export default function SwipeableItem({
  children,
  onEdit,
  onDelete,
  enableSwipeRight = true,
  onComplete
}: Props) {
  const x = useMotionValue(0);
  const controls = useAnimation();
  const [isCompleting, setIsCompleting] = useState(false);
  const [isLeftOpen, setIsLeftOpen] = useState(false);
  
  // Константы для точек свайпа
  const SNAP_POINT_LEFT = -110;
  const SNAP_POINT_RIGHT = 60;
  const SWIPE_THRESHOLD = 0.7; // Порог срабатывания (50%)

  // Анимация заполнения круга
  const circumference = 2 * Math.PI * 19; // 2πr
  const dashOffset = useMotionValue(circumference);

  // Обновление анимации круга при движении
  useEffect(() => {
    const unsubscribe = x.onChange(value => {
      if (!enableSwipeRight || value < 0) return;
      
      // Рассчитываем прогресс свайпа вправо (0-100%)
      const progress = Math.min(100, (value / SNAP_POINT_RIGHT) * 100);
      
      // Обновляем отступ для эффекта заполнения
      dashOffset.set(circumference - (circumference * progress) / 100);
    });

    return () => unsubscribe();
  }, [x, enableSwipeRight, SNAP_POINT_RIGHT, circumference, dashOffset]);

  // Обработчик завершения перетаскивания
  const handleDragEnd = useCallback(async () => {
    const currentX = x.get();
    
    // Свайп влево
    if (currentX < SNAP_POINT_LEFT * SWIPE_THRESHOLD) {
      await controls.start({ 
        x: SNAP_POINT_LEFT, 
        transition: { duration: 0.2, ease: "easeOut" } 
      });
      setIsLeftOpen(true);
    } 
    // Свайп вправо
    else if (enableSwipeRight && currentX >= SNAP_POINT_RIGHT * SWIPE_THRESHOLD) {
      setIsCompleting(true);
      await controls.start({ 
        x: SNAP_POINT_RIGHT, 
        transition: { duration: 0.2 } 
      });
      
      // Анимация успешного завершения
      await controls.start({ 
        x: 400, 
        transition: { duration: 0.4, ease: "easeIn" } 
      });
      
      onComplete?.();
      await controls.start({ x: 0 }, { duration: 0 });
      setIsCompleting(false);
      setIsLeftOpen(false);
    }
    // Возврат в исходное положение
    else {
      await controls.start({ 
        x: 0, 
        transition: { duration: 0.3, ease: "easeOut" } 
      });
      setIsLeftOpen(false);
    }
  }, [x, controls, enableSwipeRight, onComplete]);

  // Автоматическое закрытие при клике снаружи
  useEffect(() => {
    if (!isLeftOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.swipeable-content')) {
        controls.start({ x: 0, transition: { duration: 0.3 } });
        setIsLeftOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isLeftOpen, controls]);

  return (
    <div className="relative w-full h-[48px] overflow-hidden">
      {/* Кнопки действий (слева) */}
      {!isCompleting && (
        <motion.div 
          className="absolute inset-0 flex justify-end items-center gap-3"
        >
          <button 
            onClick={onEdit} 
            className="w-11 h-11 bg-yellow-400 text-white rounded-full flex items-center justify-center shadow-md"
            aria-label="Редактировать"
          >
            ✏️
          </button>
          <button 
            onClick={onDelete} 
            className="w-11 h-11 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md"
            aria-label="Удалить"
          >
            🗑️
          </button>
        </motion.div>
      )}

      {/* Индикатор завершения (справа) */}
      {enableSwipeRight && (
        <div className="absolute inset-0 flex justify-start items-center w-11 pl-1">
          <svg width="44" height="44" viewBox="0 0 44 44">
            <motion.circle
              cx="22"
              cy="22"
              r="19"
              stroke="#e0e0e0"
              strokeWidth="4"
              fill="none"
            />
            <motion.circle
              cx="22"
              cy="22"
              r="19"
              stroke="#4CAF50"
              strokeWidth="4"
              strokeDasharray={circumference}
              style={{ strokeDashoffset: dashOffset }}
              transform="rotate(-90 22 22)"
              fill="none"
            />
          </svg>
        </div>
      )}

      {/* Перемещаемый контент */}
      <motion.div
        className="swipeable-content absolute inset-0 z-10 flex items-center bg-white rounded-full overflow-hidden shadow-sm"
        drag="x"
        dragConstraints={{ 
          left: isLeftOpen ? SNAP_POINT_LEFT : Math.min(SNAP_POINT_LEFT, 0),
          right: enableSwipeRight ? SNAP_POINT_RIGHT : 0
        }}
        dragElastic={0.1}
        style={{ x }}
        onDragEnd={handleDragEnd}
        animate={controls}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.div>
    </div>
  );
}