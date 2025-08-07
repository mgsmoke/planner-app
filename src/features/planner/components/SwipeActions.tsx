import { motion, useMotionValue, useAnimation } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';

type Props = {
  children: React.ReactNode;
  onEdit?: () => void;
  onDelete?: () => void;
  onComplete?: () => void;
};

export default function SwipeableItem({
  children,
  onEdit,
  onDelete,
  onComplete
}: Props) {
  const x = useMotionValue(0);
  const controls = useAnimation();
  const [isLeftOpen, setIsLeftOpen] = useState(false);
  
  // Константы для точек свайпа
  const SNAP_POINT_LEFT = -100;
  const SWIPE_THRESHOLD = 0.3; // Порог срабатывания (30%)

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
    // Возврат в исходное положение
    else {
      await controls.start({ 
        x: 0, 
        transition: { duration: 0.3, ease: "easeOut" } 
      });
      setIsLeftOpen(false);
    }
  }, [x, controls, onComplete]);

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
      {
        <motion.div 
          className="absolute inset-0 flex justify-end items-center gap-3 right-0.5"
        >
          <button 
            onClick={onEdit} 
            className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center"
            aria-label="Редактировать"
          >
            <img src="img/edit.png" className="w-6"></img>
          </button>
          <button 
            onClick={onDelete} 
            className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center"
            aria-label="Удалить"
          >
            <img src="img/delete.png" className="w-6"></img>
          </button>
        </motion.div>
      }

      <motion.div
        className="swipeable-content absolute inset-0 z-10 flex items-center overflow-hidden rounded-full bg-white"
        drag="x"
        dragDirectionLock
        dragConstraints={{ 
          left: isLeftOpen ? SNAP_POINT_LEFT : Math.min(SNAP_POINT_LEFT, 0),
          right: 0,
        }}
        dragElastic={0.1}
        style={{ x }}
        onDragEnd={handleDragEnd}
        animate={controls}
        onClick={onComplete}
      >
        {children}
      </motion.div>
    </div>
  );
}